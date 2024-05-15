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
        const jalsah = await Jalsah.findById(req.params.jalsahId).exec();
        res.json(jalsah);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error fetching jalsah", error: error.message });
    }
}

async function createJalsah(req, res) {
    try {
        const { user, gameAccess, time, location, shortLocation, description } = req.body;
        const newJalsah = new Jalsah({
            user,
            gameAccess,
            time,
            location,
            shortLocation,
            description,
        });
        newJalsah.players.push(user);
        await newJalsah.save();
        res.json({ message: "Jalsah created successfully" });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error creating Jalsah", error: error.message });
    }
}

async function joinJalsah(req, res) {
    try {
        const jalsahId = req.params.jalsahId;
        const { currUser } = req.body;
        console.log(currUser)
        // Find the jalsah
        const jalsah = await Jalsah.findById(jalsahId);
        if (!jalsah) {
            return res.status(404).json({ message: 'Jalsah not found' });
        }
        if (jalsah.players.length > 4) {
            return res.status(400).json({ message: 'Jalsah reached its maximum capacity' });
        }
        
        jalsah.players.push(currUser);

        await jalsah.save();

        res.status(200).json({ message: 'User has joined the Jalsah' });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error joining Jalsah", error: error.message });
    }
}

async function leaveJalsah(req, res) {
    try {
        const { jalsahId } = req.params;
        const { currUser } = req.body;

        // Find the jalsah
        const jalsah = await Jalsah.findById(jalsahId);
        if (!jalsah) {
            return res.status(404).json({ message: 'Jalsah not found' });
        }

        // Check if the user is in the players list
        const playerIndex = jalsah.players.indexOf(currUser);
        if (playerIndex === -1) {
            return res.status(400).json({ message: 'User is not in the Jalsah' });
        }

        // Remove the user from the players list
        jalsah.players.splice(playerIndex, 1);

        // Save the updated jalsah
        await jalsah.save();

        res.status(200).json({ message: 'User has left the Jalsah' });    
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error leaving Jalsah", error: error.message });
    }
}

async function deleteJalsah(req, res) {
    try {
        console.log(req.params.jalsahId)
        const jalsah = await Jalsah.findByIdAndDelete(req.params.jalsahId);
        if (!jalsah) {
            return res.status(404).json({ message: 'Jalsah not found' });
        }
        res.json({ message: 'Jalsah deleted successfully' });
    } catch (error) {
        console.error('Error deleting Jalsah:', error);
        res.status(500).json({ message: 'An error occurred while deleting the jalsah' });
    }
}

module.exports = {
    getAllJalsaat,
    getJalsahById,
    createJalsah,
    joinJalsah,
    leaveJalsah,
    deleteJalsah
}