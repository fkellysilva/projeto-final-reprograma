const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },

    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["in", "out"],
      required: true,
    },

    description: {
      type: String,
    },
  },
  { timestamp: true }
);

const Model = mongoose.model("Transaction", transactionSchema);

module.exports = Model;
