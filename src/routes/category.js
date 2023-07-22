const express = require("express")
const categoryController = require("../controllers/category")

const router = express.Router()

router.post("/", categoryController.create);
router.get("/", categoryController.index);

module.exports = router; 


