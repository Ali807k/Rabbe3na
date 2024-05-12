const express = require("express");
const router = express.Router();
const Jalsah = require("../models/Jalsah");

router.post("/createJalsah", async (req, res) => {
  const { user, gameAccess, time, location, description } = req.body;
  try {
    const newJalsah = new Jalsah({
      user,
      gameAccess,
      time,
      location,
      description,
    });
    await newJalsah.save();
    res.json({ message: "Jalsah created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Jalsah", error: error.message });
  }
});
module.exports = router;
