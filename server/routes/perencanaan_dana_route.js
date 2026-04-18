let express = require("express");
let router = express.Router();

let PerencanaanDanaController = require("../controllers/perencanaan_dana_controller");

router.get("/perencanaan_dana", PerencanaanDanaController.getAllPerencanaanDana);

module.exports = router;