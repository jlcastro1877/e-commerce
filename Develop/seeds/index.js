const sequelize = require("../../Main/config/connection");
const { Category, Product, Tag, ProductTag } = require("../../Main/models"); // Adjust the path to your models

// Import seed data
const seedData = {
  Category: require("./categorySeedData.json"),
  Product: require("./productSeedData.json"),
  Tag: require("./tagSeedData.json"),
  ProductTag: require("./productTagSeedData.json"),
};

// Define a function to seed each model
const seedModel = async (modelName, data) => {
  try {
    await modelName.bulkCreate(data, { individualHooks: true });
    console.log(`\n----- ${modelName.name.toUpperCase()} SEEDED -----\n`);
  } catch (error) {
    console.error(`Error seeding ${modelName.name}:`, error);
  }
};

const seedAll = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    // Seed each model
    for (const [modelName, data] of Object.entries(seedData)) {
      await seedModel(eval(modelName), data); // Use eval to get the model class by name
    }

    console.log("\n----- SEEDING COMPLETED -----\n");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    process.exit(0);
  }
};

seedAll();
