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

            let checkQuery = `SELECT * FROM ref_akses WHERE no_wa = $1`;
            let checkValues = [nomor_wa];
            let checkResult = await db.query(checkQuery, checkValues);
            if (checkResult.rows.length > 0) {
                return "Nomor WhatsApp sudah terdaftar😊.\nSilakan tunggu konfirmasi dari admin untuk mendapatkan akses penuh yaa😊.";
            }
            let query = `INSERT INTO ref_akses (nama, no_wa, status) VALUES ($1, $2, true)`;
            let values = [nama, nomor_wa];
            await db.query(query, values);
            return `Berhasil mendaftarkan :\n\nNama : ${nama}\nNo. WA : ${nomor_wa}.`;
        } catch (error) {
            throw error;
        }
    }

    static async hapusAkses(data) {
        try {
            const {nomor_wa} = data;

            let query = `DELETE FROM ref_akses WHERE no_wa = $1`;
            let values = [nomor_wa];
            await db.query(query, values);
            return "Berhasil menghapus akses.";
        } catch (error) {
            throw error;
        }
    }

    static async getAkses(data) {
        try {
            let query = `SELECT * FROM ref_akses WHERE status = true`;
            let response = await db.query(query);
            response = response.rows;
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = WebhookModel;