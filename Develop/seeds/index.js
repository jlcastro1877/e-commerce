const sequelize = require("../../Main/config/connection");
const seedCategories = require("./categorySeedData.json");
const seedProducts = require("./productSeedData.json");
const seedTags = require("./tagSeedData.json");
const seedProductTags = require("./productTagSeedData.json");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await seedCategories();
    console.log("\n----- CATEGORIES SEEDED -----\n");

    await seedProducts();
    console.log("\n----- PRODUCTS SEEDED -----\n");

    await seedTags();
    console.log("\n----- TAGS SEEDED -----\n");

    await seedProductTags();
    console.log("\n----- PRODUCT TAGS SEEDED -----\n");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    process.exit(0);
  }
};

seedAll();
