let express = require("express");
let response = require("../response");

let PerencanaanDanaModel = require("../models/perencanaan_dana_model");
let PerencanaanDanaService = require("../services/perencanaan_dana_service");
const { formatListAnggota, formaInfoPerencanaanDana, formatInfoTabungan, formatInfoEstimasiBiaya } = PerencanaanDanaService;

class PerencanaanDanaController {
    static async getInfoPerencanaanDana(nama_anggota){
        try {
            let data = await PerencanaanDanaModel.getDataInfoPerencanaanDana(nama_anggota);
            data = await formaInfoPerencanaanDana(data, nama_anggota);
            return data;
        } catch (error) {
            response(500, null, "Gagal mendapatkan data perencanaan", res, error);
        }   
    }

    static async getInfoTabungan(nama_anggota){
        try {
            let data = await PerencanaanDanaModel.getDataInfoTabungan(nama_anggota);
            data = await formatInfoTabungan(data, nama_anggota);
            return data;
        } catch (error) {
            response(500, null, "Gagal mendapatkan data perencanaan", res, error);
        }   
    }

    static async getInfoEstimasiBiaya(nama_anggota){
        try {
            let data = await PerencanaanDanaModel.getDataInfoEstimasiBiaya(nama_anggota);
            data = await formatInfoEstimasiBiaya(data, nama_anggota);
            return data;
        } catch (error) {
            response(500, null, "Gagal mendapatkan data perencanaan", res, error);
        }   
    }

    static async addTabungan(formData){
        try {
            let data = await PerencanaanDanaModel.insertTabungan(formData);
            let response = "Galgal menambahkan data tabungan";
            if(data){
                response = "Berhasil menambahkan data tabungan";
            }
            return response;
        } catch (error) {
            response(500, null, "Gagal mendapatkan data perencanaan", res, error);
        }   
    }
    
    static async getDataAnggota(req, res) {
        try {
            let anggota = await PerencanaanDanaModel.getListAnggota();
            anggota = await formatListAnggota(anggota);
            return anggota;
        } catch (error) {
            response(500, null, "Gagal mendapatkan data anggota", res, error);
        }
    }
}

module.exports = PerencanaanDanaController;