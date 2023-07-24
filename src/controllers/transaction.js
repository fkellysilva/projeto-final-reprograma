const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");
const jwt = require("jsonwebtoken");

const create = async (request, response) => {
  try {
    const [, token] = request.get("Authorization").split(" ");
    const { user_id } = jwt.decode(token);
    const wallet = await Wallet.findOne({ user: user_id });

    if (request.body.type === "in") {
      const newBalance = wallet.balance + request.body.amount;
      await Wallet.updateOne({ _id: wallet.id }, { balance: newBalance });
    }

    if (request.body.type === "out") {
      if (wallet.balance < request.body.amount) {
        return response.status(400).json({ message: "Insufficient funds" });
      }
      const newBalance = wallet.balance - request.body.amount;
      await Wallet.updateOne({ _id: wallet.id }, { balance: newBalance });
    }
    const createTransaction = await Transaction.create(request.body);
    return response.status(200).json(createTransaction);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
};
