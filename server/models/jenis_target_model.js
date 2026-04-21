let db = require('../config/database');

class JenisTargetModel {
    static async getData() {
        try {
            let query = 'SELECT * FROM ref_jenis_target';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = JenisTargetModel;