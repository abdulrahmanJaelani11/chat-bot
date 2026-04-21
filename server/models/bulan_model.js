let db = require('../config/database');

class BulanModel {
    static async getData() {
        try {
            let query = 'SELECT * FROM ref_bulan';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BulanModel;