let db = require('../config/database');

class AnggotaModel {
    static async getData(email = null) {
        try {
            let filter = '';
            if(email != null) {
                filter = `WHERE email = '${email}'`;
            }
            
            let query = `SELECT * FROM ref_anggota ${filter}`;
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async insertAnggota(data) {
        try {
            const {nama_depan, nama_belakang, email} = data;
            const nama_lengkap = `${nama_depan} ${nama_belakang}`;
            let query = `INSERT INTO ref_anggota (nama_lengkap, email) VALUES ($1, $2) RETURNING id, nama_lengkap, email`;
            let values = [nama_lengkap, email];
            let response = await db.query(query, values);
            response = response.rows[0];
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AnggotaModel;