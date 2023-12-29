const LocalDbService = require("../services/localDb.service");

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
}

module.exports = new LocalDbController();
