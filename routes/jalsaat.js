const express = require("express");
const router = express.Router();
const { createJalsah, getAllJalsaat, getJalsahById, joinJalsah, leaveJalsah, deleteJalsah } = require("../controllers/jalsah_controller");

router.get("/", getAllJalsaat);

router.get("/:jalsahId", getJalsahById);

router.post("/createJalsah", createJalsah);

router.post("/joinJalsah/:jalsahId", joinJalsah)

router.post('/leaveJalsah/:jalsahId', leaveJalsah);

router.delete("/deleteJalsah/:jalsahId", deleteJalsah)

module.exports = router;
