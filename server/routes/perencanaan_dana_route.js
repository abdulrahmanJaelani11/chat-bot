let express = require("express");
let router = express.Router();

const PerencanaanDanaController = require("../controllers/perencanaan_dana_controller");
const MenuController = require("../controllers/menu_controller");
const AnggotaController = require("../controllers/anggota_controller");
const TahunController = require("../controllers/tahun_controller");
const BulanController = require("../controllers/bulan_controller");
const TabunganController = require("../controllers/tabungan_controller");
const JenisTargetController = require("../controllers/jenis_target_controller");
const EstimasiBiayaController = require("../controllers/estimasi_biaya_controller");
const AuthController = require("../controllers/auth_controller");
const DashboardController = require("../controllers/dashboard_controller");

const verifyToken = require("../middlewares/verify_token");

// AUTH
router.post("/perencanaan_dana/auth/register", AuthController.register);
router.post("/perencanaan_dana/auth/login", AuthController.login);

// Dashboard
router.post("/perencanaan_dana/dashboard", verifyToken, DashboardController.getData);

// Anggota
router.get("/perencanaan_dana/anggota/get", verifyToken, AnggotaController.getData);

// Tahun
router.get("/perencanaan_dana/tahun/get", verifyToken, TahunController.getData);

// Bulan
router.get("/perencanaan_dana/bulan/get", verifyToken, BulanController.getData);

// Jenis Target
router.get("/perencanaan_dana/jenis-target/get", verifyToken, JenisTargetController.getData);

// Menu
router.get("/perencanaan_dana/menu/get", verifyToken, MenuController.getDataMenu);

// Perencanaan Dana
router.get("/perencanaan_dana/get", verifyToken, PerencanaanDanaController.getAllPerencanaanDana);
router.post("/perencanaan_dana/save", verifyToken, PerencanaanDanaController.savePerencanaanDana);
router.get("/perencanaan_dana/get/:id", verifyToken, PerencanaanDanaController.getInfoPerencanaanDanaById);

// Tabungan
router.post("/perencanaan_dana/tabungan/get", verifyToken, TabunganController.getData);

// Estimasi Biaya
router.post("/perencanaan_dana/estimasi_biaya/get", verifyToken, EstimasiBiayaController.getData);

module.exports = router;