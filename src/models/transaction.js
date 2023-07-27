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

    category_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }
  },
  { timestamp: true }
);

const Model = mongoose.model("Transaction", transactionSchema);

module.exports = Model;
