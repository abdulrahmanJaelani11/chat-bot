let db = require('../config/database');

class TahunModel {
    static async getData() {
        try {
            let query = 'SELECT * FROM ref_tahun';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TahunModel;