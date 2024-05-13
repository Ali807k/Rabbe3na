const express = require("express");
const router = express.Router();
const Jalsah = require("../models/db_schema");
const { createJalsah, getAllJalsaat, getJalsahById } = require("../controllers/jalsah_controller");

router.get("/", getAllJalsaat);

router.get("/:id", getJalsahById);

router.post("/createJalsah", createJalsah);

module.exports = router;
