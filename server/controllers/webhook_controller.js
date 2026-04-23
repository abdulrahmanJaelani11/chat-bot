let express = require("express");
let response = require("../response");

const PerencanaanDanaController = require("./perencanaan_dana_controller");
let WebhookModel = require("../models/webhook_model");
let WebhookService = require("../services/webhook_service");
let {dialogAi, sendMessage, getDataInstagram, getFollowersInstagram, getStroryInstagram, cekAkses, formatDaftarAkses, formatWhatsAppNumber, kirimPerintah, formatAkun} = WebhookService;


class Controller {
    static async ChatAI(req, res) {
        // try {
            let {sender, message} = req.body;
            let akses = await cekAkses(sender);
            if(message.includes("daftar:")){
                try{
                    let body = message.split(":")[1];
                    let data = body.split("#");
                    let nama = data[0];
                    let nomor_wa = formatWhatsAppNumber(data[1]);
                    let formData = {nama, nomor_wa};
                    let reply = await WebhookModel.daftarAkses(formData);
                    await sendMessage(sender, reply);
                    response(200, formData, reply, res, null);
                }catch(error){
                    response(500, null, "Gagal mendapatkan info tabungan", res, error);
                }
            } else if(akses){
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
                }else if(message.includes("perintah_ke:")){
                    // contoh perintah_ke:083874809704:tolong tanyakan kabar
                    const no_tujuan = message.split(":")[1];
                    const perintah = message.split(":")[2];
                    const reply = await kirimPerintah({sender, perintah});
                    await sendMessage(no_tujuan, reply);
                    let feedback_msg = `Bos, Perintah untuk nomor ${no_tujuan} dengan isi perintah "${perintah}". Sudah saya sampaikan ya!😊`;
                    await sendMessage(sender, feedback_msg);
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
                }else if(message.includes("hapus_akses:")){
                    try{
                        let nomor_wa = message.split(":")[1];
                        let formData = {nomor_wa};
                        let reply = await WebhookModel.hapusAkses(formData);
                        response(200, formData, reply, res, null);
                    }catch(error){
                        response(500, null, "Gagal mendapatkan info tabungan", res, error);
                    }
                }else if(message.includes("get_akses")){
                    try{
                        let data = await WebhookModel.getAkses();
                        data = await formatDaftarAkses(data);
                        await sendMessage(sender, data);
                        response(200, data, 'Berhasil mendapatkan data akses', res, null);
                    }catch(error){
                        response(500, null, "Gagal mendapatkan data akses", res, error);
                    }
                }else if(message.includes("tambahkan akun:")){
                    try{
                        let body = message.split(":");
                        let nama_app = body[1];
                        let username = body[2];
                        let password = body[3];
                        let link = body[4];
                        let formData = {nama_app, username, password, link};
                        let reply = await WebhookModel.insertAkun(formData);
                        await sendMessage(sender, reply);
                        response(200, formData, reply, res, null);
                    }catch(error){
                        response(500, null, "Gagal mendapatkan menambahkan akun", res, error);
                    }
                }else if(message.includes("tampilkan akun")){
                    try{
                        let data = await WebhookModel.getAkun();
                        let response_akun = await formatAkun(data);
                        await sendMessage(sender, response_akun);
                        response(200, response_akun, 'Berhasil mendapatkan data akun', res, null);
                    }catch(error){
                        response(500, null, "Gagal mendapatkan data akun", res, error);
                    }
                }else{
                    const reply = await dialogAi({sender, message});
                    await sendMessage(sender, reply);
                    response(200, reply, "Berhasil mendapatkan respon AI", res, null);
                }
            } else{
                let reply = "Hai, Saya Bobi AI, Asisten Virtual yang siap membantu kamu! Namun, untuk saat ini aku hanya bisa merespon pesan dari nomor yang sudah terdaftar saja.😊";
    
                let feedback_msg = `Bos, Ada nomor tidak dikenal berusaha menghubungi aku. "${message}", pesan tersebut berasal dari nomor ${sender}`;
                await sendMessage(sender, reply);
                await sendMessage('6283874809704', feedback_msg);
                response(200, req.body, "Berhasil mengirimkan response", res, null);
            }
            
        // } catch (error) {
        //     response(500, req.body, "Gagal mendapatkan perencanaan dana", res, error);
        // }
    }
}

module.exports = Controller;