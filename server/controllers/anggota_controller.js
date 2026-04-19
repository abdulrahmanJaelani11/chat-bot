let express = require("express");
let response = require("../response");

const AnggotaModel = require("../models/anggota_model");

class AnggotaController {
    static async getData(req, res) {
        try {
            let data = await AnggotaModel.getData();
            response(200, data, "Berhasil Mendapatkan Menu", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendapatkan Menu", res, null);
        }
    }
}

module.exports = AnggotaController;