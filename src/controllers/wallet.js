const jwt = require("jsonwebtoken");
const Wallet = require("../models/wallet");

const create = async (request, response) => {
  try {
    const walletFound = await Wallet.findOne({
      name: request.body.name,
    });
    if (walletFound) {
      return response.status(406).json({
        message: "This wallet already exists.",
      });
    }
    const [, token] = request.get("Authorization").split(" ");
    const {userId} = jwt.decode(token);

    const createdWallet = await Wallet.create({ ...request.body, user: userId });
    return response.status(200).json(createdWallet);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
};