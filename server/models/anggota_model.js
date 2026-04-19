let db = require('../config/database');

class AnggotaModel {
    static async getData() {
        try {
            let query = 'SELECT * FROM ref_anggota';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AnggotaModel;