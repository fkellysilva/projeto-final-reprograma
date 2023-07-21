const express = require("express");
const walletController = require("../controllers/wallet");

const router = express.Router();

router.post("/", walletController.create);
router.get("/", walletController.getWallet);

module.exports = router;
