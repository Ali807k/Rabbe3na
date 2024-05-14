const express = require("express");
const router = express.Router();

const { forgot_password, reset_password} = require("../controllers/email_controller");

router.post("/forgot_password", forgot_password);

router.get("/reset_password/:token", reset_password);

router.post("/reset_password/:token", reset_password);

module.exports = router;