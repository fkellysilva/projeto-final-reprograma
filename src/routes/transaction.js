const express = require("express");
const transactionController = require("../controllers/transaction");

const router = express.Router();

router.post("/", transactionController.create); 

module.exports = router;
