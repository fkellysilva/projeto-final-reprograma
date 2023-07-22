const express = require("express");
const walletController = require("../controllers/wallet");

const router = express.Router();

router.post("/", walletController.create);
router.get("/", walletController.getWallet);
router.delete("/:walletId",walletController.deleteWallet)

module.exports = router;
