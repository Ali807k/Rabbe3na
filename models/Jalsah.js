const mongoose = require("mongoose");

const JalsahSchema = new mongoose.Schema({
  user: { type: String, required: false },
  gameAccess: { type: String, enum: ["public", "private"], required: true },
  time: { type: Object, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

const Jalsah = mongoose.model("Jalsah", JalsahSchema);

module.exports = Jalsah;
