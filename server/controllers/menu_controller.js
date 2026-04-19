let express = require("express");
let response = require("../response");

const MenuModel = require("../models/menu_model");

class MenuController {
    static async getDataMenu(req, res) {
        try {
            let data = await MenuModel.getDataMenu();
            response(200, data, "Berhasil Mendapatkan Menu", res, null);
        } catch (error) {
            response(500, data, "Gagal Mendapatkan Menu", res, null);
        }
    }
}

module.exports = MenuController;