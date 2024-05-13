const express = require("express");
const router = express.Router();

const {
    registerUser,
    logInUser
} = require("../controllers/user_controller")

router.get("/", async function(req, res) {
    return res.json({message: "FUCK YOU"})
});

router.post("/login", logInUser);

router.post("/register", registerUser);

module.exports = router;