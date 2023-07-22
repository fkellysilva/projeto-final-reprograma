const mongoose = require("mongoose");
const User = require("./user");

const walletSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamp: true }
);
const Model = mongoose.model("Wallet", walletSchema);

module.exports = Model;
