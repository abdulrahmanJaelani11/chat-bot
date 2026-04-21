let db = require('../config/database');

class TabunganModel {
    static async getData(params) {
        try {
            let filters_text = "";
            let filters_text_join = "";
            let filters = [];
            if(params.id_perencanaan != null) {
                filters_text_join += "AND b.id_perencanaan = $1";
                filters.push(params.id_perencanaan);
            }
            if(params.id != null) {
                filters_text += "AND b.id = $1";
                filters.push(params.id);
            }
            
            let query = `SELECT c.tahun, a.bulan, b.nominal_tabungan_masuk, b.saldo_kumulatif, d.nominal_target_perbulan FROM ref_bulan AS a LEFT JOIN tabungan AS b ON a.id = b.id_bulan ${filters_text_join} LEFT JOIN ref_tahun AS c ON b.id_tahun = c.id LEFT JOIN perencanaan_dana AS d ON b.id_perencanaan = d.id LEFT JOIN ref_anggota AS e ON d.id_anggota = e.id WHERE 1=1 ${filters_text} ORDER BY a.id ASC`;
            let result = await db.query(query, filters);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TabunganModel;