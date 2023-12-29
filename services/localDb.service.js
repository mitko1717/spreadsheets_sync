const { Op } = require("sequelize");
const { models } = require("./db");
const { formatSizes } = require("../helpers/formatting");

class LocalDbService {
  async getAll() {
    return await models.product.findAll();
  }

  async getOne(id) {
    return await models.product.findAll({ where: { articleNumber: id } });
  }

  async create(row) {
    try {
      const name = row["Імя"];
      const modelNameMatches = name.match(/Nike|Adidas/gi);
      const brand = modelNameMatches ? modelNameMatches[0] : "";
      const model = name.replace(new RegExp(brand, "gi"), "").trim();

      const product = {
        model: model,
        articleNumber: row["Код товару"],
        name,
        price: parseFloat(row["Ціна"]),
        sizes: formatSizes(row),
        category: "",
        subcategory: "",
        brand: brand,
        productModel: model,
      };

      await models.product.create(product);
      console.log(`Product created with articleNumber: ${name}`);
    } catch (error) {
      console.error("Error creating/updating product:", error);
      throw new Error("Failed to create/update product");
    }
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

  async updateSizes(articleNumber, newSizes) {
    // console.log({ newSizes });
    try {
      const productToUpdate = await models.product.findOne({
        where: { articleNumber },
      });

      if (!productToUpdate) throw new Error("Product not found");

      await productToUpdate.update({ sizes: newSizes });

      return true;
    } catch (error) {
      console.error("Error updating sizes:", error);
      throw new Error("Failed to update sizes");
    }
  }

  async getBySize(size) {
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
    if (params.model) {
      whereConditions.model = {
        [Op.like]: `%${params.model}%`,
      };
    }

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

  async getByArticleNumber(number) {
    return await models.product.findOne({
      where: { articleNumber: number },
    });
  }
}

module.exports = new LocalDbService();
