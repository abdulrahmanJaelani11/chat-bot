let axios = require('axios');

class PerencanaanDataService {
    static async formatListAnggota(data) {
      let anggota = 'Berikut adalah daftar anggota:\n\n';
      data.forEach((item, index) => {
        anggota += `${index + 1}. ${item.nama_lengkap}\n`;
      });
      return anggota;
    }

    static async formaInfoPerencanaanDana(data, nama_anggota) {
      let anggota = `Berikut adalah perencanaan dana dari ${nama_anggota}:\n\n`;
      data.forEach((item, index) => {
        item.nominal_target_dana = parseInt(item.nominal_target_dana).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        item.nominal_estimasi = parseInt(item.nominal_estimasi).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        item.nominal_target_perbulan = parseInt(item.nominal_target_perbulan).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        item.total_tabungan = parseInt(item.total_tabungan).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        item.nominal_blm_tercapai = parseInt(item.nominal_blm_tercapai).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });

        
        anggota += `🎯Jenis Target : ${item.nama_target}\n🤵Nama : ${item.nama_lengkap}\n💸Target Dana : ${item.nominal_target_dana}\n💵Estimasi Biaya : ${item.nominal_estimasi}\n🗓️Durasi Menabung : ${item.durasi} bulan\n🪙Target Menabung : ${item.nominal_target_perbulan}\n💰Total Tabungan : ${item.total_tabungan}\n💷Total Belum Tercapai : ${item.nominal_blm_tercapai}\n\nTetap semangat ya, Menabung itu bukan soal besar-kecilnya angka, tapi soal konsistensi. Banyak orang berhenti bukan karena tidak mampu, tapi karena kehilangan arah dan motivasi di tengah jalan.`;
      });
      return anggota;
    }

    static async formatInfoTabungan(data, nama_anggota) {
      let anggota = `Berikut Adalah Info Tabungan Dari ${nama_anggota}:\n\n`;
      data.forEach((item, index) => {
        item.nominal_target_perbulan = parseInt(item.nominal_target_perbulan).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        item.nominal_tabungan_masuk = parseInt(item.nominal_tabungan_masuk).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        item.saldo_kumulatif = parseInt(item.saldo_kumulatif).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        
        anggota += `📅Tahun : ${item.tahun}\n📆Bulan : ${item.bulan}\n🎯Nominal Target Perbulan : ${item.nominal_target_perbulan}\n💸Nominal Tabungan Masuk : ${item.nominal_tabungan_masuk}\n💰Saldo Kumulatif : ${item.saldo_kumulatif}\n\n`;
      });
      return anggota;
    }

    static async formatInfoEstimasiBiaya(data, nama_anggota) {
      let anggota = `Berikut Adalah Info Estimasi Biaya Dari ${nama_anggota}:\n\n`;
      let total_estimasi = 0;
      data.forEach((item, index) => {
        total_estimasi += parseInt(item.nominal);
        item.nominal = parseInt(item.nominal).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        
        anggota += `📌Deskripsi : ${item.deskirpsi} - ${item.nominal}\n`;
      });
      
      total_estimasi = total_estimasi.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      anggota += `💰Total Estimasi Biaya : ${total_estimasi}\n\n`;

      return anggota;
    }
}

module.exports = PerencanaanDataService;