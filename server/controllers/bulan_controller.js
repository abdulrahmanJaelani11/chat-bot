let express = require("express");
let response = require("../response");

const BulanModel = require("../models/bulan_model");

class BulanController {
    static async getData(req, res) {
        try {
            let data = await BulanModel.getData();
            response(200, data, "Berhasil Mendapatkan Bulan", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendapatkan Bulan", res, null);
        }
    }
}

module.exports = BulanController;