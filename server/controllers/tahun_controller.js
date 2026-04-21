let express = require("express");
let response = require("../response");

const TahunModel = require("../models/tahun_model");

class TahunController {
    static async getData(req, res) {
        try {
            let data = await TahunModel.getData();
            response(200, data, "Berhasil Mendapatkan Tahun", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendapatkan Tahun", res, null);
        }
    }
}

module.exports = TahunController;