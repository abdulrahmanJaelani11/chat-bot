let {Pool} = require('pg');
require('dotenv').config();

let pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
});

pool.connect((err) => {
    if (err) {
      console.error('Koneksi gagal:', err.stack);
    } else {
      console.log('Terhubung ke Supabase (Postgres)');
    }
});
  
module.exports = pool;
  