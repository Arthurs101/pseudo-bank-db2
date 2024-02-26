
const {TransactionModel} = require('../models/TransactionModel');
const {User} = require('../models/UserModel');

// POST para crear una nueva transacción
const newTransaction =  async (req, res) => {
    const { user_code, password, origin_account_number, destination_account_number, amount, currency } = req.body;

    try {
        // Verificar la autenticidad del usuario
        const user = await User.findOne({ user_code, hashed_password: password });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales de usuario incorrectas' });
        }

        // Verificar que las cuentas de origen y destino existan
        const originAccount = user.accounts.find(account => account.account_number === origin_account_number);
        const destinationAccount = await Account.findOne({ account_number: destination_account_number });
        if (!originAccount || !destinationAccount) {
            return res.status(404).json({ message: 'Cuenta de origen o destino no encontrada' });
        }

        // Verificar que la cantidad a transferir no exceda el saldo disponible en la cuenta de origen
        if (originAccount.balance < amount) {
            return res.status(400).json({ message: 'Saldo insuficiente en la cuenta de origen' });
        }

        // Actualizar los saldos de las cuentas correspondientes
        originAccount.balance -= amount;
        destinationAccount.balance += amount;

        // Aplicar las tasas de cambio si es necesario (aquí puedes implementar la lógica necesaria)

        // Guardar las cuentas actualizadas en la base de datos
        await originAccount.save();
        await destinationAccount.save();

        // Crear y guardar la transacción en la base de datos
        const transaction = new TransactionModel({
            amount,
            date: new Date().toISOString(),
            currency,
            account_from: origin_account_number,
            account_to: destination_account_number
        });
        await transaction.save();

        res.status(201).json({ message: 'Transacción creada exitosamente', transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const { TransactionModel } = require('../models/TransactionModel');
const { Account } = require('../models/AccountModel');

// GET para obtener el historial de transacciones de una cuenta
const getAccountTransactionHistory = async (req, res) => {
  const { account_number } = req.params;

  try {
    // Buscar transacciones relacionadas con la cuenta (origen o destino)
    const transactions = await TransactionModel.aggregate([
      {
        $match: {
          $or: [
            { account_from: account_number },
            { account_to: account_number }
          ]
        }
      },
      {
        $lookup: {
          from: "accounts",
          localField: "account_to",
          foreignField: "account_number",
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
          "destination_account.account_number": 1, // Include account_number if needed
          "destination_account.names": 1, // Select only names
        }
      }
    ]);

    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el historial de transacciones' });
  }
};


module.exports = { getAccountTransactionHistory };

module.exports = {newTransaction};
