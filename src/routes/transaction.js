const express = require("express");
const transactionController = require("../controllers/transaction");

const router = express.Router();

router.post("/", transactionController.create); 
router.delete("/:id", transactionController.deleteTransaction);
router.get("/", transactionController.index)
router.patch("/:id", transactionController.update)

module.exports = router;
