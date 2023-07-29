const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");
const jwt = require("jsonwebtoken");

const create = async (request, response) => {
  try {
    const [, token] = request.get("Authorization").split(" ");
    const { userId } = jwt.decode(token);
    const wallet = await Wallet.findOne({ user: userId });

    if(!wallet){
      return response.status(404).json({message:"Wallet not found"})
    }
    const newBalance =
      request.body.type === "in"
        ? wallet.balance + request.body.amount
        : wallet.balance - request.body.amount;

    await Wallet.updateOne({ _id: wallet.id }, { balance: newBalance });

    const createTransaction = await Transaction.create(request.body);
    return response.status(200).json(createTransaction);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const deleteTransaction = async (request, response) => {
  try {
    const [, token] = request.get("Authorization").split(" ");
    const { userId } = jwt.decode(token);

    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return response.status(404).json({
        message: "Transaction not found",
      });
    }

    const { id } = request.params;
    const transaction = await Transaction.findOne({
      _id: id,
    });
    if (!transaction) {
      return response.status(404).json({
        message: "Transaction not found",
      });
    }

    const newBalance =
      transaction.type === "in"
        ? wallet.balance - transaction.amount
        : wallet.balance + transaction.amount;
    await Wallet.updateOne({ _id: wallet.id }, { balance: newBalance });

    await Transaction.deleteOne({
      _id: transaction.id,
    });

    return response.status(200).json({
      message: "Transaction successefully deleted",
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const index = async (_, response) => {
  try {
    const transactions = await Transaction.find();
    return response.status(200).json(transactions);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const update = async (request, response) => {
  try {
    const { id } = request.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return response.status(404).json({ message: "Transaction not found" });
    }
    const [, token] = request.get("Authorization").split(" ");
    const { userId } = jwt.decode(token);
    const wallet = await Wallet.findOne({ user: userId });

    if (request.body.amount) {
      if (transaction.type === "in") {
        const newBalance = request.body.amount - transaction.amount;
        await Wallet.updateOne(
          { _id: wallet.id },
          { balance: wallet.balance + newBalance }
        );
      } else {
        const newBalance = request.body.amount - transaction.amount;
        await Wallet.updateOne(
          { _id: wallet.id },
          { balance: wallet.balance - newBalance }
        );
      }
    }

    await Transaction.updateOne({ _id: transaction._id }, request.body);
    return response
      .status(200)
      .json({ message: "Transaction successfully updated" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
module.exports = {
  create,
  deleteTransaction,
  index,
  update,
};
