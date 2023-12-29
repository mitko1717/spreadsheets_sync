const express = require("express");
const router = express.Router();
const spreadsheetsController = require("../controllers/spreadsheets.controller");

router.get("/", spreadsheetsController.get);

module.exports = router;
