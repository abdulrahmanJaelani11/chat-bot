const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

async function sendFonnte(sender, message) {
   const response = await axios.post(
        "https://api.fonnte.com/send",
        {
            target: sender, // Nomor tujuan
            message: message, // Pesan yang akan dikirim
            countryCode: "62", // Opsional
        },
        {
            headers: {
            Authorization: "YQnJUtavytyJDvyyVjy1", // Ganti TOKEN dengan API Key Anda
            "Content-Type": "application/json",
            },
        }
    );
    console.log(response.data);
  }

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/webhook", (req, res) => {
  res.send("Hello Fonnte!");
});
// Endpoint untuk menerima pesan dari WhatsApp API
app.post("/webhook", async (req, res) => {
  const { message, sender } = req.body; // Data dari WhatsApp API
  
  const options = {
  method: 'POST',
  url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
  headers: {
    'x-rapidapi-key': 'c3a2e5848cmshcac1835d7465444p179415jsn8ca3f96bdb4a',
    'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    messages: [
      {
        role: 'user',
        content: `Respon aku selaknya manusia berdialog!. ${message}`
      }
    ],
    web_access: false
  }
};
  
  try {
    // Kirim pesan ke OpenAI API
    const response = await axios.request(options);  
    const reply = response.data.result;
    // console.log(reply);

    await sendFonnte(sender, reply); // Kirim balasan ke pengirim pesan
  } catch (error) {
    await sendFonnte(sender, "Maaf, Sepertinya Server nya ada masalah, silahkan coba lagi!"); // Kirim pesan kesalahan
    res.status(500).send({
        status: "ERROR",
        message: "Gagal membalas pesan",
    });
  }
  res.status(200).send({
    status: "OK",
    message: "Berhasil membalas pesan",
});
});

// Jalankan server
app.listen(3000, () => console.log("Server running on port 3000"));
