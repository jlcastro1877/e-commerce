const router = require("express").Router();
const { Tag, Product } = require("../../models");

// Get all tags and their associated products
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tags.", error: err.message });
  }
});

// Get a single tag and its associated products by ID
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found with this ID." });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tag.", error: err.message });
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create tag.", error: err.message });
  }
});

// Update a tag by ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      res.status(404).json({ message: "Tag not found with this ID." });
      return;
    }
    res.status(200).json({ message: "Tag updated successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update tag.", error: err.message });
  }
});

// Delete a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ message: "Tag not found with this ID." });
      return;
    }
    res.status(200).json({ message: "Tag deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete tag.", error: err.message });
  }
});

module.exports = router;
