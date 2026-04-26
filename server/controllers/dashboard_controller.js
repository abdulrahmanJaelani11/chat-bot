let express = require("express");
let response = require("../response");

const PerencanaanDanaModel = require("../models/perencanaan_dana_model");

class DashboardController {
    static async getData(req, res) {
        let data = null;
        const { nama_anggota } = req.body;
        try {
            data = await PerencanaanDanaModel.getDataInfoPerencanaanDana(nama_anggota);
            response(200, data, "Berhasil Mendapatkan Dashboard", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendapatkan Dashboard", res, null);
        }
    }
}

module.exports = DashboardController;