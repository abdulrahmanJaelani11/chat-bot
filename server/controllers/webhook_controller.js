let express = require("express");
let response = require("../response");

const PerencanaanDanaController = require("./perencanaan_dana_controller");
const WebhooModel = require("../models/webhook_model");
let WebhookService = require("../services/webhook_service");
let {checkMessage, sendMessage, getDataInstagram, getFollowersInstagram, getStroryInstagram} = WebhookService;


class Controller {
    static async ChatAI(req, res) {
        try {
            let {sender, message} = req.body;
            if(message.includes("ig:")){
                const username = message.split(":")[1];
                const data = await getDataInstagram(username);
                await sendMessage(sender, data);
            }else if(message.includes("ig_follower:")){
                const username = message.split(":")[1];
                const data = await getFollowersInstagram(username);
                endFonnte(sender, data);
            }else if(message.includes("ig_stories:")){
                const username = message.split(":")[1];
                const data = await getStroryInstagram(username);
                endFonnte(sender, data);
            }else if(message.includes("perintah:")){
                const perintah = message.split(":")[1];
                const reply = await kirimPerintah({sender, perintah});
                endFonnte('089653173605', reply);
            //  endFonnte(sender, "Sudah Bos, Sudah saya sampaikan ke Ivi!");
            }else if(message.includes("perintah_ke:")){ // contoh perintah_ke:083874809704:tolong tanyakan kabar
                const no_tujuan = message.split(":")[1];
                const perintah = message.split(":")[2];
                const reply = await kirimPerintah({sender, perintah});
                await sendMessage(no_tujuan, reply);
            }else if(message.includes("tampilkan info perencanaan dana @")){
                try{
                    let nama_anggota = message.split("@")[1];
                    let reply = await PerencanaanDanaController.getInfoPerencanaanDana(nama_anggota);
                    await sendMessage(sender, reply);
                    response(200, reply, "Berhasil mendapatkan info perencanaan dana", res, null);
                }catch(error){
                    response(500, null, "Gagal mendapatkan info perencanaan dana", res, error);
                }
            }else if(message.includes("tampilkan info tabungan @")){
                try{
                    let nama_anggota = message.split("@")[1];
                    let reply = await PerencanaanDanaController.getInfoTabungan(nama_anggota);
                    await sendMessage(sender, reply);
                    response(200, reply, "Berhasil mendapatkan info tabungan", res, null);
                }catch(error){
                    response(500, null, "Gagal mendapatkan info tabungan", res, error);
                }
            }else if(message.includes("tampilkan info estimasi biaya @")){
                try{
                    let nama_anggota = message.split("@")[1];
                    let reply = await PerencanaanDanaController.getInfoEstimasiBiaya(nama_anggota);
                    await sendMessage(sender, reply);
                    response(200, reply, "Berhasil mendapatkan info tabungan", res, null);
                }catch(error){
                    response(500, null, "Gagal mendapatkan info tabungan", res, error);
                }
            }else if(message.includes("tambahkan ke tabungan")){
                try{
                    let body = message.split("@")[1];
                    let data = body.split("-");
                    let nama_anggota = data[0];
                    let tahun = data[1];
                    let bulan = data[2];
                    let nominal_tabungan_masuk = data[3];
                    let formData = {nama_anggota, tahun, bulan, nominal_tabungan_masuk};

                    let reply = await PerencanaanDanaController.addTabungan(formData);
                    await sendMessage(sender, reply);
                    response(200, reply, reply, res, null);
                }catch(error){
                    response(500, null, "Gagal mendapatkan info tabungan", res, error);
                }
            }else if(message.includes("hapus tabungan")){
                try{
                    let body = message.split("@")[1];
                    let data = body.split("-");
                    let nama_anggota = data[0];
                    let tahun = data[1];
                    let bulan = data[2];
                    let formData = {nama_anggota, tahun, bulan};

                    let reply = await PerencanaanDanaController.deleteTabungan(formData);
                    await sendMessage(sender, reply);
                    response(200, reply, reply, res, null);
                }catch(error){
                    response(500, null, "Gagal mendapatkan info tabungan", res, error);
                }
            }else if(message.includes("daftar:")){
                try{
                    let body = message.split(":")[1];
                    let data = body.split("#");
                    let nama = data[0];
                    let nomor_wa = data[1];
                    let formData = {nama, nomor_wa};
                    const reply = WebhooModel.daftarAkses(formData);
                    response(200, formData, reply, res, null);
                }catch(error){
                    response(500, null, "Gagal mendapatkan info tabungan", res, error);
                }
            }else{
                const akses = await WebhooModel.getAkses(sender);
                let arr_akses = akses.map(item => item.no_wa);
                const reply = await checkMessage({sender, message, arr_akses});
                await sendMessage(sender, reply); // Kirim balasan ke pengirim pesan
            }
            
            // response(200, req.body, "Berhasil mendapatkan semua perencanaan dana", res, null);
            
        } catch (error) {
            response(500, req.body, "Gagal mendapatkan perencanaan dana", res, error);
        }
    }
}

module.exports = Controller;