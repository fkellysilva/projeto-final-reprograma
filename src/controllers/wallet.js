const jwt = require("jsonwebtoken");
const Wallet = require("../models/wallet");

const create = async (request, response) => {
  try {
    const [, token] = request.get("Authorization").split(" ");
    const { user_id } = jwt.decode(token);

    const walletFound = await Wallet.findOne({
      $or: [{ name: request.body.name }, { user: user_id }],
    });
    if (walletFound) {
      return response.status(409).json({
        message: "This wallet already exists.",
      });
    }

    const createdWallet = await Wallet.create({
      ...request.body,
      user: user_id,
    });
    return response.status(200).json(createdWallet);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const getWallet = async (request, response) => {
  try {
    const [, token] = request.get("Authorization").split(" ");
    const { user_id } = jwt.decode(token);
    const walletFound = await Wallet.findOne({
      user: user_id,
    });
    if (!walletFound) {
      return response.status(404).json({
        message: "Wallet not found.",
      });
    }

    return response.status(200).json(walletFound);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const deleteWallet = async (request, response) => {
  try {
    const { walletId } = request.params;
    const walletFound = await Wallet.findById(walletId);

    if (!walletFound) {
      return response.status(404).json({ message: "Wallet not found." });
    }

    await Wallet.deleteOne({
      _id: walletFound._id,
    });

    return response.status(200).json({
      message: `Wallet '${walletFound.name}' was successfully deleted`,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const updateWallet = async (request, response) => {
  try {
    const { walletId } = request.params;

    const walletFound = await Wallet.findById(walletId);
    if (!walletFound) {
      return response.status(404).json({ message: "Not found" });
    }

    await Wallet.updateOne({ _id: walletFound._id }, request.body);

    return response
      .status(200)
      .json({ message: "Wallet updated successfully" });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  create,
  getWallet,
  deleteWallet,
  updateWallet,
};
