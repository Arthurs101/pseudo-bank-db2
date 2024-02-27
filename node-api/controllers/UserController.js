const {User,newUserModel} = require('../models/UserModel');
const {TransactionModel }  = require('../models/TransactionModel');
const  ObjectID = require('mongodb').ObjectID;
//login del usuario
const login = async (req, res)  => {
        try {
          // Obtener el user_id y la contraseña del cuerpo de la solicitud
          const { user_code, password } = req.body;
          // Buscar el usuario por user_id
          const user = await User.findOne({ user_code: Number(user_code) });
          console.log(user);
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
    "adrresses": [
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
        let newUser = new newUserModel(newuser);
        // Guardar el nuevo usuario en la base de datos
        // Recorrer todos los campos de newUser
        let userFields = {}
        for (const key in newUser._doc) {
          if (newUser._doc.hasOwnProperty(key)) {
            // Asignar el valor del campo de newUser al objeto userFields
            userFields[key] = newUser[key];
          }
        }
        // Crear una instancia de User con los campos recopilados
          newUser = new User(userFields);
          // Guardar la instancia de User en la base de datos
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

const deletePhone = async (req, res) => {
  const {user_code, password, phone_number} = req.body
  const user = await User.findOne({ user_code: Number(user_code)},{hashed_password: 1 ,phones: 1});
  // Verificar si el usuario existe y la contraseña coincide
  if (!user || user.hashed_password !== password) {
    res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
  }
  if (user.phones.length === 1) {
    res.status(400).json({ message: 'No se puede eliminar el único teléfono del usuario' });
  }
  try{
    user.phones = user.phones.filter(phone => phone.number !== Number(phone_number));
    await user.save();
    res.status(200).json({ message: 'Teléfono eliminado correctamente', user });

  }catch(error){
    res.status(400).json({ message: "Error eliminadno el teléfono indicado",eror: error.message });
  }
}

const addPhone = async (req, res) => {
  const {user_code, password, new_phone} = req.body
  const user = await User.findOne({ user_code: Number(user_code) },{hashed_password:1,phones:1});
  if (!user || user.hashed_password !== password) {
    res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
  }
  //check if phone number is already in account
  const existingPhone = user.phones.filter(p => p.number === Number(new_phone.number));
  if (existingPhone.length > 0) {
      return res.status(400).json({ message: 'El teléfono ya existe para este usuario' });
  }
  // Agregar el teléfono al usuario
  var parsedPhone = {number: Number(new_phone.number) , postal_code: String(new_phone.postal_code) , brand: String(new_phone.brand)}
  user.phones.push(parsedPhone);
  user.save();
  res.status(200).json({ message: 'Teléfono agregado correctamente', user });
}
const updatePhone = async (req, res) => {
  try{
    const { user_code, password ,phone_number, new_phone_data} = req.body;
    let updateFields = {};
    Object.keys(new_phone_data).forEach(key => {
        updateFields[`phones.$.${key}`] = new_phone_data[key];
    });

    const user = await User.findOneAndUpdate(
        { 
            user_code: user_code, 
            hashed_password: password, 
            "phones.number": Number(phone_number) 
        },
        { 
            $set: updateFields
        },
        { 
            new: true 
        }
    );

    // Verificar si el usuario existe y la contraseña coincide
    if (!user ) {
    // Devolver un mensaje de error si el usuario no se encuentra o la contraseña no coincide
        return res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta o no existe el número indicado' });
    }

    res.status(200).json({message:"success",data:user});
       
}    catch (error) {
    res.status(500).json({ message: 'Error interno al actualizar datos del teléfono' ,error: error.message });
}
}

const addAddress = async (req, res) => {
  try {
    const { user_code, password, new_address } = req.body;
    const user = await User.findOne({ user_code: Number(user_code) }, { user_code: 1, names:1 ,hashed_password: 1, adrresses: 1 });

    if (!user || user.hashed_password !== password) {
      res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
    }
    // Verificar si la dirección ya existe para el usuario
    const existingAddress = user.adrresses.find(a =>
      a.street_name === new_address.street_name &&
      a.zip_code === new_address.zip_code &&
      a.city === new_address.city
    );

    if (existingAddress) {
      console.log(user)
      res.status(400).json({ message: 'La dirección ya existe para este usuario' });
    }else{
      // Agregar la dirección al usuario
      var parsed = {
        street_name : String(new_address.street_name) ,
        zip_code :String( new_address.zip_code) ,
        city : String(new_address.city)
      }
      user.adrresses.push(new_address);
      await user.save();
      res.status(200).json({ message: 'Dirección agregada correctamente', user });
    }

    
  } catch (error) {
    res.status(500).json({ message: 'Error interno al agregar dirección', error: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { user_code, password, old_address, new_address_data } = req.body;
    let updateFields = {};
    Object.keys(new_address_data).forEach(key => {
      updateFields[`adrresses.$.${key}`] = new_address_data[key];
    });
    const user = await User.findOneAndUpdate(
      {
        user_code: Number(user_code),
        hashed_password: password,
        "adrresses.street_name": old_address.street_name,
        "adrresses.zip_code": old_address.zip_code,
        "adrresses.city": old_address.city
      },
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado, contraseña incorrecta o dirección no encontrada' });
    }

    res.status(200).json({ message: 'Dirección actualizada correctamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error interno al actualizar dirección', error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  const {user_code, password, address} = req.body
  const user = await User.findOne({ user_code: Number(user_code)},{hashed_password: 1 ,adrresses: 1});
  // Verificar si el usuario existe y la contraseña coincide
  if (!user || user.hashed_password !== password) {
    res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
  }
  if (user.adrresses.length === 1) {
    res.status(400).json({ message: 'No se puede eliminar la dirección única del usuario' });
  }
  try{
    user.adrresses = user.adrresses.filter(ad => ad.street_name !== address.street_name &&
      ad.zip_code !== address.zip_code &&
      ad.city !== address.city);
    await user.save();
    res.status(200).json({ message: 'Direccion eliminada correctamente', user });

  }catch(error){
    res.status(400).json({ message: "Error eliminadno la direccion indicada",eror: error.message });
  }
}
const addAccount = async(req, res) => {
  const { user_id ,accountData }  = req.body;
  const user = await User.findById(String(user_id),{accounts:1});
  if(!user){
    res.status(404).json({message:"usuario no hallado"})
  }else{
    user.accounts.push(accountData)
    user.save()
    res.status(200).json(user)
  }
  
}

module.exports = {
    login,
    updateUser,
    getUserTransactions,
    createUser,
    deletePhone,
    addPhone,
    updatePhone,
    addAddress,
    updateAddress,
    deleteAddress,
    addAccount
}