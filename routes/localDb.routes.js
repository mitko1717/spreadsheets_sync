const express = require("express");
const router = express.Router();
const localDbController = require("../controllers/localDb.controller");

router.get("/params", localDbController.getProductsByParams);
router.get("/", localDbController.getAll);
router.get("/:id", localDbController.getOne);
router.get("/size/:size", localDbController.getBySize);
router.put("/:id", localDbController.update);

module.exports = router;
