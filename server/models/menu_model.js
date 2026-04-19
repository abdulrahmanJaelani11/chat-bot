let db = require('../config/database');

class MenuModel {
    static async getDataMenu() {
        try {
            let query = 'SELECT * FROM sec_menu';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MenuModel;