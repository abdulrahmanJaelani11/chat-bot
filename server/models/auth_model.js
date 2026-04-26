let db = require('../config/database');
const bcrypt = require('bcrypt');

const AnggotaModel = require('./anggota_model');

class TahunModel {
    static async login(username) {
        try {
            let query = `SELECT * FROM sec_user WHERE username = $1`;
            let values = [username];
            let result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async register(data) {
        try {
            let {nama_depan, nama_belakang, email, username, password, id_anggota} = data;
            const nama_lengkap = `${nama_depan} ${nama_belakang}`;
            password = await bcrypt.hash(password, 10);
            
            let query = `INSERT INTO sec_user (nama_lengkap, email, username, password, id_anggota) VALUES ($1, $2, $3, $4, $5) RETURNING id, nama_lengkap, email, username, id_anggota`;
            let values = [nama_lengkap, email, username, password, id_anggota];
            let response = await db.query(query, values);
            response = response.rows[0];
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TahunModel;