const express = require("express");
const categoryController = require("../controllers/category");

const router = express.Router();

router.post("/", categoryController.create);
router.get("/", categoryController.index);
router.get("/:id", categoryController.getById);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.deleteCategory)

module.exports = router;
