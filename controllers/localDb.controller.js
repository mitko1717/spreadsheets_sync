const LocalDbService = require("../services/localDb.service");

class LocalDbController {
  async getAll(req, res) {
    try {
      await LocalDbService.get();
      res.status(200).send(`processed successfully`);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }

  async getOne(req, res) {
    try {
      await LocalDbService.getOne();
      res.status(200).send(`processed successfully`);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }

  async update(req, res) {
    try {
      await LocalDbService.update();
      res.status(200).send(`processed successfully`);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }

  async getByProductSize(req, res) {
    try {
      await LocalDbService.getByProductSize();
      res.status(200).send(`processed successfully`);
    } catch (error) {
      console.error("Error handling LocalDb:", error);
      res.status(500).send("Internal server error");
    }
  }
}

module.exports = new LocalDbController();
