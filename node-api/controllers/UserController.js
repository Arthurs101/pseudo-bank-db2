const {User,newUserModel} = require('../models/UserModel');
const {TransactionModel }  = require('../models/TransactionModel');
//login del usuario
const login = async (req, res)  => {
        try {
          // Obtener el user_id y la contraseña del cuerpo de la solicitud
          const { user_code, password } = req.body;
          // Buscar el usuario por user_id
          const user = await User.findOne({ user_code: Number(user_code) });
          // Verificar si el usuario existe y la contraseña coincide
          if (!user || user.hashed_password !== password) {
            // Devolver un mensaje de error si el usuario no se encuentra o la contraseña no coincide
            return res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
          }
      
          // Si el usuario y la contraseña son correctos, devolver los detalles del usuario
          res.json(user);
        } catch (error) {
          // Manejar cualquier error
          res.status(500).json({ message: 'Error al iniciar sesión' });
        }
}

const updateUser = async (req, res) => {
    // body response must be like this:
    //user_code: string
    //password: string
    //fields: list[{"fielname": "new value}], example: {"hashed_password": "new password"}"}
    try{
        const { user_code, password ,fields} = req.body;
        const user = await User.findOneAndUpdate({user_code: user_code, hashed_password: password},fields,{new: true});
        // Verificar si el usuario existe y la contraseña coincide
        if (!user ) {
        // Devolver un mensaje de error si el usuario no se encuentra o la contraseña no coincide
            return res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
        }
    
        res.status(200).json({message:"success"});
           
    }    catch (error) {
        res.status(500).json({ message: 'Error interno al actualizar datos' });
    }
}

const getUserTransactions = async (req, res) => {
  const { user_code } = req.params;

  try {
      // Buscar el usuario por su código
      const user = await User.findOne({ user_code: Number(user_code) });

      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Obtener las transacciones del usuario
      const userTransactions = await Transaction.aggregate([
          {
              $match: {
                  $or: [
                      { account_from: user_code },
                      { account_to: user_code }
                  ]
              }
          },
          {
              $lookup: {
                  from: "users",
                  localField: "account_to",
                  foreignField: "user_code",
                  as: "destination_account"
              }
          },
          {
              $addFields: {
                  destination_account: { $arrayElemAt: ["$destination_account", 0] }
              }
          },
          {
              $project: {
                  _id: 0,
                  amount: 1,
                  date: 1,
                  currency: 1,
                  destination_account: {
                      names: 1,
                      lastnames: 1,
                      accounts: {
                          type: 1,
                          currency: 1
                      }
                  }
              }
          }
      ]).exec();

      res.status(200).json(userTransactions);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
  }
};

const createUser = async (req, res) => {
/**
 * pasar user_code y password de quien esté creando el nuevo suario, para el nuevo usuario se deben de pasar con la llave
 * newuser el siguiente json: 
 * {
    "names": "Nombre del usuario",
    "lastnames": "Apellidos del usuario",
    "birthdate": "Fecha de nacimiento del usuario (en formato YYYY-MM-DD)",
    "nationality": "Nacionalidad del usuario",
    "hashed_password": "Contraseña del usuario (ya debe estar encriptada)",
    "phones": [
        {
            "number": "Número de teléfono del usuario",
            "postal_code": "Código postal",
            "brand": "Marca del teléfono"
        }
    ],
    "addresses": [
        {
            "street_name": "Nombre de la calle",
            "zip_code": "Código postal",
            "city": "Ciudad"
        }
    ],
    "type": "Tipo de usuario (admin, personnel o client)"
}
 */
  try {
    // Extraer user_code y password del cuerpo de la solicitud
    const { user_code, password ,newuser} = req.body;
    const isAuth = await User.findOne({ user_code:Number(user_code), hashed_password: password, $or: [{ type: "admin" }, { type: "personnel" }] }, { user_code: 1 });
    if (isAuth) {
      if (newuser) {
        try{
          const newUser = new newUserModel(newuser);
        // Guardar el nuevo usuario en la base de datos
          await newUser.save();
          // Devolver una respuesta exitosa
          res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
        }catch(error){
          res.status(500).json({ message: "Error al crear nuevo usuario",error:error.message });
        }
        
      } else {
        res.status(500).json({ message: "field newuser not provided" });
      }
    } else {
      // Si está autorizado, responder con un mensaje de no autorizado
      res.status(400).json({ message: "No está autorizado para dicha acción" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor",error:error });
  }
};


module.exports = {
    login,
    updateUser,
    getUserTransactions,
    createUser
}