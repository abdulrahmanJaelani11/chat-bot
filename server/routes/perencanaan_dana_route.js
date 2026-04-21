let express = require("express");
let router = express.Router();

const PerencanaanDanaController = require("../controllers/perencanaan_dana_controller");
const MenuController = require("../controllers/menu_controller");
const AnggotaController = require("../controllers/anggota_controller");
const TahunController = require("../controllers/tahun_controller");
const BulanController = require("../controllers/bulan_controller");
const TabunganController = require("../controllers/tabungan_controller");
const JenisTargetController = require("../controllers/jenis_target_controller");

// router.get("/perencanaan_dana", PerencanaanDanaController.getAllPerencanaanDana);

// Anggota
router.get("/perencanaan_dana/anggota/get", AnggotaController.getData);

// Tahun
router.get("/perencanaan_dana/tahun/get", TahunController.getData);

// Bulan
router.get("/perencanaan_dana/bulan/get", BulanController.getData);

// Jenis Target
router.get("/perencanaan_dana/jenis-target/get", JenisTargetController.getData);

// Menu
router.get("/perencanaan_dana/menu/get", MenuController.getDataMenu);

// Perencanaan Dana
router.get("/perencanaan_dana/get", PerencanaanDanaController.getAllPerencanaanDana);
router.get("/perencanaan_dana/get/:id", PerencanaanDanaController.getInfoPerencanaanDanaById);

// Tabungan
router.post("/perencanaan_dana/tabungan/get", TabunganController.getData);

module.exports = router;