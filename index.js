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
    url: 'https://chatgpt-vision1.p.rapidapi.com/gpt4',
    headers: {
      'x-rapidapi-key': 'a30f642922msh8d1d18a8a6bdd3dp1cb95fjsn4830addab684',
      'x-rapidapi-host': 'chatgpt-vision1.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: `${message}, jelaskan dalam bahasa indonesia!`
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
    console.error(error);
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
