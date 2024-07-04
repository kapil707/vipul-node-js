const express = require("express");
const {handleGetAllMedicines,
    handleGetFindByNameMedicines} = require("../controllers/medicine"); 
const router = express.Router();

router.route("/all").
    get(handleGetAllMedicines);

router.route("/").
    get(handleGetFindByNameMedicines);

module.exports = router;