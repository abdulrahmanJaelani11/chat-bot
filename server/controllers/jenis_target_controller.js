let express = require("express");
let response = require("../response");
const moment = require("moment");
const hasher = require("../services/hashids");

const JenisTargetModel = require("../models/jenis_target_model");

class JenisTargetController {
    static async getData(req, res) {
        try {
            let data = await JenisTargetModel.getData();
            data.forEach(item => {
                item.id = hasher.encode(item.id);
                item.created_date = item.created_date != null ? moment(item.created_date).locale("id").format("LL, LTS") : null;;
                item.updated_date = item.updated_date != null ? moment(item.updated_date).locale("id").format("LL, LTS") : null;
            });
            response(200, data, "Berhasil Mendapatkan Jenis Target", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendapatkan Jenis Target", res, null);
        }
    }
}

module.exports = JenisTargetController;