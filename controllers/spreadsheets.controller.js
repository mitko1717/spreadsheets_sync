const SpreadsheetsService = require("../services/spreadsheets.service");

class SpreadsheetsController {
  async get(req, res) {
    try {
      const data = await SpreadsheetsService.get();
      res.status(200).send(data);
    } catch (error) {
      console.error("Error handling spreadsheets:", error);
      res.status(500).send("Internal server error");
    }
  }
}

module.exports = new SpreadsheetsController();
