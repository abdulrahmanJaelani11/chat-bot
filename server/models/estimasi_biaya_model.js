let db = require('../config/database');

class EstimasiBiayaModel {
    static async getData(params) {
        try {
            let query = `SELECT a.deskirpsi as deskripsi, a.keterangan, a.nominal, (SELECT SUM(x.nominal) FROM estimasi_biaya AS x WHERE x.id_perencanaan = $2) as total  FROM estimasi_biaya AS a JOIN perencanaan_dana AS b ON a.id_perencanaan = b.id JOIN ref_anggota AS c ON c.id = b.id_anggota WHERE a.id_perencanaan = $1 ORDER BY a.id ASC`;
            let result = await db.query(query, [params.id_perencanaan, params.id_perencanaan]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EstimasiBiayaModel;