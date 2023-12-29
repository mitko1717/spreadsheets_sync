const { models } = require("./db");

class LocalDbService {
  async getAll() {
    return await models.product.findAll();
  }

  async getOne(id) {
    return await models.product.findAll({ where: { articleNumber: id } });
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
    return true;
  }
}

module.exports = new LocalDbService();
