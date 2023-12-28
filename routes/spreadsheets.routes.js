const express = require("express");
const router = express.Router();
const spreadsheetsController = require("../controllers/spreadsheets.controller");

router.post("/", spreadsheetsController.get);

module.exports = router;
