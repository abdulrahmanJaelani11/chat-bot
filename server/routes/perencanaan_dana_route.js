let express = require("express");
let router = express.Router();

// const PerencanaanDanaController = require("../controllers/perencanaan_dana_controller");
const MenuController = require("../controllers/menu_controller");
const AnggotaController = require("../controllers/anggota_controller");

// router.get("/perencanaan_dana", PerencanaanDanaController.getAllPerencanaanDana);

// Anggota
router.get("/perencanaan_dana/anggota/get", AnggotaController.getData);

// Menu
router.get("/perencanaan_dana/menu/get", MenuController.getDataMenu);

module.exports = router;