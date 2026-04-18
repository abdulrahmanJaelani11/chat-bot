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
}

module.exports = WebhookModel;