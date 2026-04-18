let db = require('../config/database');

class PerencanaanDanaModel {
    static async getDataInfoPerencanaanDana(nama_anggota) {
        try {
            let query = `
                SELECT 
                    a.*, 
                    b.nama_lengkap, 
                    c.nama_target 
                FROM 
                    perencanaan_dana AS a 
                JOIN 
                    ref_anggota AS b 
                ON 
                    a.id_anggota = b.id 
                JOIN 
                    ref_jenis_target AS c 
                ON 
                    a.id_jenis = c.id 
                WHERE 
                    b.nama_lengkap = $1
            `;
            let result = await db.query(query, [nama_anggota]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async getDataInfoTabungan(nama_anggota) {
        try {
            let query = `SELECT c.tahun, a.bulan, b.nominal_tabungan_masuk, b.saldo_kumulatif, d.nominal_target_perbulan FROM ref_bulan AS a JOIN tabungan AS b ON a.id = b.id_bulan JOIN ref_tahun AS c ON b.id_tahun = c.id JOIN perencanaan_dana AS d ON b.id_perencanaan = d.id JOIN ref_anggota AS e ON d.id_anggota = e.id WHERE e.nama_lengkap = $1 ORDER BY a.id ASC`;
            let result = await db.query(query, [nama_anggota]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async getDataInfoEstimasiBiaya(nama_anggota) {
        try {
            let query = `SELECT a.deskirpsi, a.nominal  FROM estimasi_biaya AS a JOIN perencanaan_dana AS b ON a.id_perencanaan = b.id JOIN ref_anggota AS c ON c.id = b.id_anggota WHERE c.nama_lengkap = $1`;
            let result = await db.query(query, [nama_anggota]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async insertTabungan(data) {
        try {
            let query_get_total_tabungan = `SELECT a.total_tabungan, a.nominal_blm_tercapai FROM perencanaan_dana AS a JOIN ref_anggota AS b ON a.id_anggota = b.id WHERE b.nama_lengkap = $1`;
            
            let result_total_tabungan = await db.query(query_get_total_tabungan, [data.nama_anggota]);
            let {total_tabungan, nominal_blm_tercapai} = result_total_tabungan.rows[0];
            total_tabungan = parseInt(total_tabungan) + parseInt(data.nominal_tabungan_masuk);
            nominal_blm_tercapai = parseInt(nominal_blm_tercapai) - parseInt(data.nominal_tabungan_masuk);
            
            let query_get_saldo_kumulatif = `SELECT COALESCE(MAX(saldo_kumulatif), 0) as saldo_kumulatif FROM tabungan AS a JOIN perencanaan_dana AS b ON a.id_perencanaan = b.id JOIN ref_anggota AS c ON b.id_anggota = c.id WHERE c.nama_lengkap = $1`;
            let result_saldo_kumulatif = await db.query(query_get_saldo_kumulatif, [data.nama_anggota]);
            let saldo_kumulatif = result_saldo_kumulatif.rows[0].saldo_kumulatif;
            saldo_kumulatif = parseInt(saldo_kumulatif) + parseInt(data.nominal_tabungan_masuk);
            
            let query = `INSERT INTO tabungan (id_perencanaan, id_tahun, id_bulan, nominal_tabungan_masuk, saldo_kumulatif) VALUES ((SELECT id FROM perencanaan_dana WHERE id_anggota = (SELECT id FROM ref_anggota WHERE nama_lengkap = $1)), (SELECT id FROM ref_tahun WHERE tahun = $2), (SELECT id FROM ref_bulan WHERE bulan = $3), $4, $5)`;
            let result = await db.query(query, [data.nama_anggota, data.tahun, data.bulan, parseFloat(data.nominal_tabungan_masuk), parseFloat(saldo_kumulatif)]);
            
            let query_update_perencanaan = `UPDATE perencanaan_dana SET total_tabungan = $1, nominal_blm_tercapai = $2 WHERE id_anggota = (SELECT id FROM ref_anggota WHERE nama_lengkap = $3)`;
            let result_update_perencanaan = await db.query(query_update_perencanaan, [parseInt(total_tabungan), parseInt(nominal_blm_tercapai), data.nama_anggota]);
            
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async deleteTabungan(data) {
        try {
            let query_get_tabungan = `SELECT nominal_tabungan_masuk FROM tabungan AS a JOIN perencanaan_dana AS b ON a.id_perencanaan = b.id JOIN ref_anggota AS c ON b.id_anggota = c.id JOIN ref_tahun d ON a.id_tahun = d.id JOIN ref_bulan e ON a.id_bulan = e.id WHERE c.nama_lengkap = $1 AND d.tahun = $2 AND e.bulan = $3`
            let result_get_tabungan = await db.query(query_get_tabungan, [data.nama_anggota, data.tahun, data.bulan]);
            let nominal_tabungan_masuk = result_get_tabungan.rows[0].nominal_tabungan_masuk;
            
            let query_get_total_tabungan = `SELECT a.total_tabungan, a.nominal_blm_tercapai FROM perencanaan_dana AS a JOIN ref_anggota AS b ON a.id_anggota = b.id WHERE b.nama_lengkap = $1`;
            
            let result_total_tabungan = await db.query(query_get_total_tabungan, [data.nama_anggota]);
            let {total_tabungan, nominal_blm_tercapai} = result_total_tabungan.rows[0];
            total_tabungan = parseInt(total_tabungan) - parseInt(nominal_tabungan_masuk);
            nominal_blm_tercapai = parseInt(nominal_blm_tercapai) + parseInt(nominal_tabungan_masuk);
            
            let query = `DELETE FROM tabungan WHERE id_perencanaan = (SELECT id FROM perencanaan_dana WHERE id_anggota = (SELECT id FROM ref_anggota WHERE nama_lengkap = $1)) AND id_tahun = (SELECT id FROM ref_tahun WHERE tahun = $2) AND id_bulan = (SELECT id FROM ref_bulan WHERE bulan = $3)`;
            let result = await db.query(query, [data.nama_anggota, data.tahun, data.bulan]);

            let query_update_perencanaan = `UPDATE perencanaan_dana SET total_tabungan = $1, nominal_blm_tercapai = $2 WHERE id_anggota = (SELECT id FROM ref_anggota WHERE nama_lengkap = $3)`;
            let result_update_perencanaan = await db.query(query_update_perencanaan, [parseInt(total_tabungan), parseInt(nominal_blm_tercapai), data.nama_anggota]);
            
            return true;
        } catch (error) {
            throw error;
        }
    }
    
    static async getAllPerencanaanDana() {
        try {
            let query = 'SELECT * FROM perencanaan_dana';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    
    static async getListAnggota() {
        try {
            let query = 'SELECT * FROM ref_anggota';
            let result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PerencanaanDanaModel;