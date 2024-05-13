const mongoose = require("../config/db");

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }
})

const jalsahSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    gameAccess: { type: String, enum: ["public", "private"], required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
})

const User = mongoose.model("User", userSchema);
const Jalsah = mongoose.model("Jalsah", jalsahSchema);

module.exports = { User, Jalsah };