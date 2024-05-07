const Mcu = require("../models/mcuModel");

async function getAllCharacters(req, res) {
    try {
        let results = await Mcu.find({}); //empty obj to return all

        res.json({
            message: "success",
            payload: results,
        });
    } catch (error) {
        let errorObj = {
            message: "get all Characters failure",
            payload: error,
        };

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function getCharacterByName(req, res) {
    try {
        let result = await Mcu.findOne({
            name: req.params.name,
        });

        res.json({
            message: "success",
            payload: result,
        });
    } catch (error) {
        let errorObj = {
            message: "get ONE Mcu failure",
            payload: error,
        };

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function createOneMcu(req, res) {
    try {
        // Accepting the front-end form data from the client to generate the document

        let newMcu = req.body; // assumes req.body is in correct format with name, debutFilm, debutYear

        // post the new document to the Mcu collection
        await Mcu.create(newMcu);

        res.json({
            message: "success",
            payload: newMcu,
        });
    } catch (error) {
        let errorObj = {
            message: "create one Mcu failure",
            payload: error,
        };

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function deleteOneMcu(req, res) {
    try {
        // dont have to save to a variable but then don't get the same payload message
        // await Mcu.deleteOne({ name: req.params.id });
        // res.json({
        //     message: "success",
        //     payload: req.params.id,
        // });

        let targetCharacter = req.params.id;

        let deletedCharacter = await Mcu.deleteOne({ _id: targetCharacter });

        res.json({
            message: "success",
            payload: deletedCharacter,
        });
    } catch (error) {
        let errorObj = {
            message: "delete one Mcu failure",
            payload: error,
        };

        console.log(errorObj);

        res.json(errorObj);
    }
}

async function updateOneMcu(req, res) {
    try {
        let targetMcu = await Mcu.findOne({
            _id: req.params.id,
            // using id to be the most accurate
        });

        // ternaries avoid inputting undefined values
        let updatedMcu = {
            _id: targetMcu.id,
            name: targetMcu.name,
            debutFilm: req.body.debutFilm
                ? req.body.debutFilm
                : targetMcu.debutFilm,
            debutYear: req.body.debutYear
                ? req.body.debutYear
                : targetMcu.debutYear,
        };

        await Mcu.updateOne(
            { _id: req.params.id },
            { $set: updatedMcu },
            { upsert: true },
        );

        res.json({
            message: "success",
            payload: updatedMcu,
        });
    } catch (error) {
        let errorObj = {
            message: "update one Mcu failure",
            payload: error,
        };

        console.log(errorObj);

        res.json(errorObj);
    }
}

module.exports = {
    getAllCharacters,
    getCharacterByName,
    createOneMcu,
    deleteOneMcu,
    updateOneMcu,
};
