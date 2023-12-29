const LocalDbService = require("../services/localdb.service");

class LocalDbController {
  async getAll(req, res) {
    try {
      const data = await LocalDbService.getAll();
      res.status(200).send(data);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const data = await LocalDbService.getOne(id);
      res.status(200).send(data);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const data = await LocalDbService.update(id, updateData);
      res.status(200).send(data);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }

  async getProductsBySize(req, res) {
    try {
      const { size } = req.params;
      const data = await LocalDbService.getProductsBySize(size);
      res.status(200).send(data);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }

  async getProductsByParams(req, res) {
    try {
      const { brand, price, model, size } = req.query;

      const params = { brand, price, model, size };

      const data = await LocalDbService.getProductsByParams(params);

      res.status(200).send(data);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }
}

module.exports = new LocalDbController();
