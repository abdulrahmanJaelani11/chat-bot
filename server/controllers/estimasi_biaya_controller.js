let express = require("express");
let response = require("../response");
const hasher = require("../services/hashids");

const EstimasiBiayaModel = require("../models/estimasi_biaya_model");

class EstimasiBiayaController { 
    static async getData(req, res) {
        try {
            let id_perencanaan = hasher.decode(req.body.id_perencanaan) ?? null;
            let data = await EstimasiBiayaModel.getData({id_perencanaan});
            data.forEach((item) => {
                item.nominal = parseInt(item.nominal);
                item.total = parseInt(item.total);
            });
            response(200, data, "Berhasil Mendapatkan Data Estimasi Biaya", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendapatkan Data Estimasi Biaya", res, null);
        }
    }
}

module.exports = EstimasiBiayaController ;