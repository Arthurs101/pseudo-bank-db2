
const {TransactionModel} = require('../models/TransactionModel');
const {User} = require('../models/UserModel');
const mongoose = require('mongoose');
const castAggregation = require('mongoose-cast-aggregation');
const { ObjectId } = require('mongodb');
// POST para crear una nueva transacción
const newTransaction =  async (req, res) => {
    const { user_id, account_from, account_to, amount, currency } = req.body;

    try {
        // Verificar la autenticidad del usuario
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales de usuario incorrectas' });
        }

        // Verificar que las cuentas de origen y destino existan
        console.log(new ObjectId(String(account_from)))
        const originAccount = user.accounts.find(account => account._id.toString() == (String(account_from)));
        let destinationAccount = await User.findOne({ "accounts._id":new ObjectId(String(account_to))},{"accounts":1});
        if (!originAccount || !destinationAccount) {
            return res.status(404).json({ message: 'Cuenta de origen o destino no encontrada' });
        }

        // Verificar que la cantidad a transferir no exceda el saldo disponible en la cuenta de origen
        if (originAccount.balance < Number(amount)) {
            return res.status(400).json({ message: 'Saldo insuficiente en la cuenta de origen' });
        }

        // Actualizar los saldos de las cuentas correspondientes
        originAccount.balance -= amount;
        destinationAccount.balance += amount;

        // Aplicar las tasas de cambio si es necesario (aquí puedes implementar la lógica necesaria)

        // Guardar las cuentas actualizadas en la base de datos
        await originAccount.save();
        await destinationAccount.save();

        // // Crear y guardar la transacción en la base de datos
        // const transaction = new TransactionModel({
        //     amount,
        //     date: new Date().toISOString(),
        //     currency,
        //     account_from: origin_account_number,
        //     account_to: destination_account_number
        // });
        // await transaction.save();

        // res.status(201).json({ message: 'Transacción creada exitosamente', transaction });
        res.status(200).json({status: 'OK'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getUserTransactions = async (req, res) => {
    try {
        // ID del usuario proporcionado en la solicitud
        // Realiza la agregación utilizando el método aggregate()
        const user_id = String(req.query.userId)
        const result = await User.aggregate([
            {
                $unwind: "$accounts"
              },
            {
            $match: {
               "_id":new ObjectId(user_id)}
            },
            {$lookup: {
                from: "transactions",
                localField: "accounts._id",
                foreignField: "account_from",
                as: "account_transactions"
              }}
              ,
              {
                  $unwind: "$account_transactions"
              },
               {$lookup: {
                     from: "users",
                     localField: "account_transactions.account_to",
                     foreignField: "accounts._id",
                     as: "foreign_user"
                   }},
              {$unwind: "$foreign_user"},
              {
              $project: {
                "account_transactions._id": 1,
                "account_transactions.currency": 1,
                "account_transactions.account_to": 1,
                "account_transactions.account_from":1,
                "account_transactions.date":1,
                "account_transactions.ammount":1,
                "foreign_user": {
                    "names":1,
                    "lastnames":1,
                    "accounts":{$filter: {
                      input: "$foreign_user.accounts",
                      as: "item",
                      cond: { $eq: ["$$item._id","$account_transactions.account_to"]}
                    }}
                }
              }},
              {$unwind: "$foreign_user.accounts"},
              {$addFields: {"account_transactions.account_type" :"$foreign_user.accounts.account_type",
              "account_transactions.account_owner_name":"$foreign_user.names",
              "account_transactions.account_owner_lastname":"$foreign_user.lastnames",
              "account_transactions.transaction_type":"usermade",
                   
              }},
              {$project: {"account_transactions":1}},
              //convert result into array
              {$group: { _id: null, "transactions": {$push: "$account_transactions"}}},
              //remove the _id null with another project
              {$project: {"transactions":1,"_id":0}}
        ])
    
        res.json(result[0].transactions); // Devuelve el resultado como JSON
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las transacciones del usuario' });
      }
}
//obtener las transaacciones recibidas
const getUserRecived = async (req, res) => {
    try {
        // ID del usuario proporcionado en la solicitud
        // Realiza la agregación utilizando el método aggregate()
        const user_id = String(req.query.userId)
        console.log(new ObjectId("65dc054482403143ff509771"))
        console.log()
        const result = await User.aggregate([
            {
                $unwind: "$accounts"
              },
            {
            $match: {
               "_id":new ObjectId(user_id)}
            },
            {$lookup: {
                from: "transactions",
                localField: "accounts._id",
                foreignField: "account_to",
                as: "account_transactions"
              }}
              ,
              {
                  $unwind: "$account_transactions"
              },
               {$lookup: {
                     from: "users",
                     localField: "account_transactions.account_from",
                     foreignField: "accounts._id",
                     as: "foreign_user"
                   }},
              {$unwind: "$foreign_user"},
              {
              $project: {
                "account_transactions._id": 1,
                "account_transactions.currency": 1,
                "account_transactions.account_to": 1,
                "account_transactions.account_from":1,
                "account_transactions.date":1,
                "account_transactions.ammount":1,
                "foreign_user": {
                    "names":1,
                    "lastnames":1,
                    "accounts":{$filter: {
                      input: "$foreign_user.accounts",
                      as: "item",
                      cond: { $eq: ["$$item._id","$account_transactions.account_from"]}
                    }}
                }
              }},
              {$unwind: "$foreign_user.accounts"},
              {$addFields: {"account_transactions.account_type" :"$foreign_user.accounts.account_type",
              "account_transactions.account_owner_name":"$foreign_user.names",
              "account_transactions.account_owner_lastname":"$foreign_user.lastnames",
              "account_transactions.transaction_type":"usergot" ,
              }},
              {$project: {"account_transactions":1}},
              //convert result into array
              {$group: { _id: null, "transactions": {$push: "$account_transactions"}}},
              //remove the _id null with another project
              {$project: {"transactions":1,"_id":0}}
        ])
    
        res.json(result[0].transactions); // Devuelve el resultado como JSON
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las transacciones del usuario' });
      }    
}
module.exports = {newTransaction,getUserTransactions,getUserRecived
};
