const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

async function sendFonnte(data) {
    const url = "https://api.fonnte.com/send";

    const customHeaders = {
      "Content-Type": "application/json",
      Authorization: "-DTs_1pV#oB!-oL2BHJZ" ,
    };
  
    const response = await fetch(url, {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(data),
    });
  }

// Endpoint untuk menerima pesan dari WhatsApp API
app.post("/webhook", async (req, res) => {
  const { message, sender } = req.body; // Data dari WhatsApp API
  
  const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
      headers: {
        'x-rapidapi-key': 'a30f642922msh8d1d18a8a6bdd3dp1cb95fjsn4830addab684',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false
      }
  };
  
  try {
    // Kirim pesan ke OpenAI API
    const response = await axios.request(options);
    const reply = response.data.result;

    const data = {
        target: sender,
        message: reply,
    };
    sendFonnte(data);
  } catch (error) {
    console.error(error);
  }
  res.end();
});

// Jalankan server
app.listen(3000, () => console.log("Server running on port 3000"));
