const Category = require("../models/category");

const create = async (request, response) => {
  try {
    const categoryFound = await Category.findOne({ name: request.body.name });
    if (categoryFound) {
      return response.status(409).json({
        message: "This category already exists.",
      });
    }

    const createCategory = await Category.create(request.body);

    return response.status(200).json(createCategory);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const index = async (_, response) => {
  try {
    const categories = await Category.find();
    return response.status(200).json(categories);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const getById = async (request, response) => {
  try {
    const { id } = request.params;
    const category = await Category.findById(id);
    if (!category) {
      return response.status(404).json({
        message: "Category not found",
      });
    }
    return response.status(200).json(category);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};

const update = async (request, response) => {
  try {
    const { id } = request.params;
    const categoryFound = await Category.findById(id);
    if (!categoryFound) {
      return response.status(404).json({ message: "Not found" });
    }

    await Category.updateOne({ _id: categoryFound._id }, request.body);

    return response
      .status(200)
      .json({ message: "Category updated successfully" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  index,
  getById,
  update,
};
