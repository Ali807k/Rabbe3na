const { Jalsah } = require("../models/db_schema")

async function getAllJalsaat(req, res) {
    try {
        const jalsaat = await Jalsah.find().exec();
        res.json(jalsaat);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error fetching jalsaat", error: error.message });
    }
}

async function getJalsahById(req, res) {
    try {
        const jalsah = await Jalsah.findById(req.params.id).exec();
        res.json(jalsah);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error fetching jalsah", error: error.message });
    }
}

async function createJalsah(req, res) {
    try {
        const { user, gameAccess, time, location, description } = req.body;
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
}


module.exports = {
    getAllJalsaat,
    getJalsahById,
    createJalsah
}