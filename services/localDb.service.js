const { Op } = require("sequelize");
const { models } = require("./db");

class LocalDbService {
  async getAll() {
    return await models.product.findAll();
  }

  async getOne(id) {
    return await models.product.findAll({ where: { articleNumber: id } });
  }

  async create(product) {
    await models.product.create(product);
  }

  async update(id, newData) {
    try {
      const productToUpdate = await models.product.findOne({
        where: { articleNumber: id },
      });
      if (!productToUpdate) throw new Error("Product not found");

      await productToUpdate.update(newData);

      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  }

  async getProductsBySize(size) {
    try {
      const allProducts = await models.product.findAll();

      // filter products based on the provided size
      return allProducts.filter((product) => {
        const sizes = JSON.parse(product.sizes);
        return sizes[size];
      });
    } catch (error) {
      console.error("Error retrieving products by size:", error);
      throw error;
    }
  }

  async getProductsByParams(params) {
    const whereConditions = {};

    if (params.brand) whereConditions.brand = params.brand;

    if (params.price) {
      const priceOperator = params.price.startsWith(">=")
        ? Op.gte
        : params.price.startsWith("<=")
        ? Op.lte
        : params.price.startsWith(">")
        ? Op.gt
        : params.price.startsWith("<")
        ? Op.lt
        : Op.eq;

      whereConditions.price = {
        [priceOperator]: parseFloat(params.price.replace(/^(>=?|<=?)/, "")),
      };
    }

    if (params.model) {
      whereConditions.model = {
        [Op.like]: `%${params.model}%`,
      };
    }

    try {
      let filteredProducts = await models.product.findAll({
        where: whereConditions,
      });

      if (params.size) {
        filteredProducts = filteredProducts.filter((product) => {
          const sizes = JSON.parse(product.sizes);
          return sizes[params.size];
        });
      }

      return filteredProducts;
    } catch (error) {
      console.error("Error retrieving products:", error);
      throw error;
    }
  }
}

module.exports = new LocalDbService();
