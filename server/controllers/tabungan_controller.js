let express = require("express");
let response = require("../response");
const hasher = require("../services/hashids");

const TabunganModel = require("../models/tabungan_model");

class TabunganController {
    static async getData(req, res) {
        try {
            let id_perencanaan = hasher.decode(req.body.id_perencanaan) ?? null;
            let id = req.body.id ?? null;
            let data = await TabunganModel.getData({id_perencanaan, id});
            data.forEach((item) => {
                item.nominal_tabungan_masuk = parseInt(item.nominal_tabungan_masuk);
                item.saldo_kumulatif = parseInt(item.saldo_kumulatif);
                item.nominal_target_perbulan = parseInt(item.nominal_target_perbulan);
            });
            response(200, data, "Berhasil Mendapatkan Data Tabungan", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendapatkan Data Tabungan", res, null);
        }
    }

    static async insertTabungan(req, res) {
        try {
            let data = req.body;
            await TabunganModel.insertTabungan(data);
            response(200, null, "Berhasil Menambahkan Data Tabungan", res, null);
        } catch (error) {
            response(500, null, "Gagal Menambahkan Data Tabungan", res, null);
        }
    }
}

module.exports = TabunganController;