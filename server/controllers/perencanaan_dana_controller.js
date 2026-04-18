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
                formData.nominal_tabungan_masuk = parseInt(formData.nominal_tabungan_masuk).toLocaleString("id-ID", {style: "currency", currency: "IDR"});
                response = `Berhasil menambahkan data tabungan\n\n🗓️Tahun : ${formData.tahun}\n🗓️Bulan : ${formData.bulan}\n💰Nominal Tabungan Masuk : ${formData.nominal_tabungan_masuk}\n\n📋Hari ini kamu milih jadi versi kamu yang lebih bijak. Tabungan ini bakal jadi saksi perjuangan kamu. Semangat, sedikit demi sedikit lama-lama jadi bukit.😊\n\nSemangat Terus ya, Inget Kita itu Punya Cita-Cita yang perlu Di Realisasikan!🔥`;

            }
            return response;
        } catch (error) {
            response(500, null, "Gagal mendapatkan data perencanaan", res, error);
        }   
    }

    static async deleteTabungan(formData){
        try {
            let data = await PerencanaanDanaModel.deleteTabungan(formData);
            let response = "Galgal menghapus data tabungan";
            if(data){
                response = "Berhasil menghapus data tabungan";
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