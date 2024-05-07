const router = require("express").Router();

const {
    getAllCharacters,
    getCharacterByName,
    createOneMcu,
    deleteOneMcu,
    updateOneMcu,
} = require("../controllers/mcuController");

// localhost:3001/api/allCharacters
router.get("/allCharacters", getAllCharacters);

// localhost:3001/api/oneMcu/:name
router.get("/oneMcu/:name", getCharacterByName);

// localhost:3001/api/createOneMcu
router.post("/createOneMcu", createOneMcu);

// localhost:3001/api/deleteOneMcu/:id
router.delete("/deleteOneMcu/:id", deleteOneMcu);

// localhost:3001/api/updateOneMcu/:id
router.put("/updateOneMcu/:id", updateOneMcu);

module.exports = router;
