const express = require("express");
const walletController = require("../controllers/wallet");

const router = express.Router();

router.post("/", walletController.create);

module.exports = router;
