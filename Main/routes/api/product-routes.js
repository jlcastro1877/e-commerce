const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// Get all products, including associated Category and Tag data
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products.", error: err.message });
  }
});

// Get a single product, including associated Category and Tag data
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: "Product not found with this ID." });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve product.", error: err.message });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    // Create the product
    const product = await Product.create(req.body);

    // If tagIds are provided, create associations between the product and the tags
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIds = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIds);
    }

    res.status(201).json(product);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create product.", error: err.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    // Update the product with the matching ID using the data in the request body
    await Product.update(req.body, { where: { id: req.params.id } });

    // Retrieve product tags and their IDs
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    // Filter new product tags and create new ones
    const newProductTags = req.body.tagIds
      ? req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => ({ product_id: req.params.id, tag_id }))
      : [];

    // Filter product tags to remove and delete them
    const productTagsToRemove = productTags
      ? productTags
          .filter(
            ({ tag_id }) =>
              !req.body.tagIds || !req.body.tagIds.includes(tag_id)
          )
          .map(({ id }) => id)
      : [];

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    // Respond with the updated product including new tags
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Tag }],
    });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product.", error: error.message });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete the product with the matching ID
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ message: "Product not found with this ID." });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete product.", error: err.message });
  }
});

module.exports = router;
