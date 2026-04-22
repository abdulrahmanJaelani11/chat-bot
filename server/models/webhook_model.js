let db = require('../config/database');

class WebhookModel {
    
    static async getAllPerencanaanDana() {
        try {
            let query = 'SELECT * FROM perencanaan_dana';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async getAkses() {
        try {
            let query = 'SELECT * FROM ref_akses WHERE status = true';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async daftarAkses(data) {
        try {
            const {nama, nomor_wa} = data;
            let date = new Date();

            let query = `INSERT INTO ref_akses (nama, no_wa, status) VALUES ($1, $2, true)`;
            let values = [nama, nomor_wa];
            await db.query(query, values);
            return "Berhasil mendaftar akses. Silakan tunggu konfirmasi dari admin untuk mendapatkan akses penuh.";
        } catch (error) {
            throw error;
        }
    }
}

module.exports = WebhookModel;