const mongoose = require("../config/db");

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    joined: { type: Date, default: Date.now() }
})

const jalsahSchema = mongoose.Schema({
    user: { type: String, require: true },
    gameAccess: { type: String, enum: ["public", "private"], required: true },
    time: { type: Object, required: true },
    location: { type: String, required: true },
    shortLocation: { type: String, required: true },
    description: { type: String, required: true },
    players: {type: Array, default: []}
})

const chatSchema = mongoose.Schema({
    jalsahId: { type: mongoose.Schema.ObjectId, ref: 'Jalsah'},
    user: { type: String, require: true },
    message: { type: String, require: true },
    time : { type: Date, require: true, default: Date.now() }
})

const User = mongoose.model("User", userSchema);
const Jalsah = mongoose.model("Jalsah", jalsahSchema);
const Chat = mongoose.model("Chat", chatSchema)

module.exports = { User, Jalsah, Chat };