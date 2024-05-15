const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    registerUser,
    logInUser
} = require("../controllers/user_controller")

router.get("/", getAllUsers)

router.post("/login", logInUser);

router.post("/register", registerUser);

module.exports = router;