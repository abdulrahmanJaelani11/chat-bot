const Hashids = require('hashids/cjs');

// Gunakan salt dari .env agar rahasia
const salt = process.env.HASHIDS_SALT || 'isi-kata-rahasia-bebas';
const hashids = new Hashids(salt, 8); // Angka 8 adalah panjang minimal karakter

module.exports = {
  encode: (id) => hashids.encode(id),
  decode: (hash) => {
    const decoded = hashids.decode(hash);
    return decoded.length > 0 ? decoded[0] : null;
  }
};