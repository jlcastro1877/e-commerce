const router = require("express").Router();
const { Category, Product } = require("../../models");

// Get all categories and their associated products
router.get("/", async (req, res) => {
  try {
    // Find all categories, including their associated products
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res
      .status(500)
      .json({ message: "Failed to retrieve categories.", error: err.message });
  }
});

// Get a single category and its associated products by ID
router.get("/:id", async (req, res) => {
  try {
    // Find the category with the matching ID, including its associated products
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If the category is not found, send a 404 status with a custom message
    if (!category) {
      res.status(404).json({ message: "Category not found with this ID." });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res
      .status(500)
      .json({ message: "Failed to retrieve category.", error: err.message });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    // Create a new category using the data in the request body
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    // Handle errors by sending a 400 status with a custom message
    res
      .status(400)
      .json({ message: "Failed to create category.", error: err.message });
  }
});

// Update a category by ID
router.put("/:id", async (req, res) => {
  try {
    // Update the category with the matching ID using the data in the request body
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    // If the category is not found, send a 404 status with a custom message
    if (!updated) {
      res.status(404).json({ message: "Category not found with this ID." });
      return;
    }

    res.status(200).json({ message: "Category updated successfully." });
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res
      .status(500)
      .json({ message: "Failed to update category.", error: err.message });
  }
});

// Delete a category by ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete the category with the matching ID
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    // If the category is not found, send a 404 status with a custom message
    if (!deleted) {
      res.status(404).json({ message: "Category not found with this ID." });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (err) {
    // If there is an error, send a 500 status with the error
    res
      .status(500)
      .json({ message: "Failed to delete category.", error: err.message });
  }
});

module.exports = router;
