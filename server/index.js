const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const db = require("./config/database");
const cors = require("cors");

const Route = require('./routes/webhook_route');
const PerencanaanDanaRoute = require('./routes/perencanaan_dana_route');
// randikaangga9044@gmail.com - CHATGPT 4

const random_reject_msg = [
  "Maaf, saya tidak bisa membantu dengan itu.",
  "Mohon maaf, saya tidak memiliki informasi yang Anda cari.",
  "Maaf, saya tidak dapat menjawab pertanyaan itu.",
  "Maaf, saya tidak mengerti apa yang Anda maksud.",
  "Maaf, saya tidak memiliki wawasan tentang topik tersebut.",
  "Mohon maaf, saya tidak bisa memberikan jawaban yang Anda inginkan.",
  "Maaf, saya tidak memiliki pengetahuan tentang hal itu.",
  "Maaf, saya tidak bisa memberikan saran dalam hal itu.",
  "Mohon maaf, saya tidak bisa membantu dengan pertanyaan tersebut.",
  "Maaf, saya tidak memiliki informasi yang relevan.",
  "Maaf, saya tidak bisa memberikan tanggapan yang tepat.",
  "Mohon maaf, saya tidak bisa memberikan solusi untuk masalah tersebut.",
  "Maaf, saya tidak bisa memberikan jawaban yang memuaskan.",
  "Maaf, saya tidak bisa memberikan informasi yang Anda butuhkan.",
  "Mohon maaf, saya tidak bisa memberikan saran yang berguna dalam hal itu.",
  "Maaf, saya tidak bisa memberikan panduan yang Anda cari.",
  "Maaf, saya tidak bisa memberikan penjelasan yang memadai.",
  "Mohon maaf, saya tidak bisa memberikan bantuan dalam hal itu.",
  "Maaf, saya tidak bisa memberikan informasi yang relevan dengan pertanyaan Anda.",
  "Maaf, saya tidak bisa memberikan solusi yang Anda cari.",
  "Mohon maaf, saya tidak bisa memberikan jawaban yang memuaskan.",
  "Maaf, saya tidak bisa memberikan saran yang berguna dalam hal itu.",
  "Maaf, saya tidak bisa memberikan panduan yang Anda cari.",
  "Mohon maaf, saya tidak bisa memberikan penjelasan yang memadai.",
  "Maaf, saya tidak bisa memberikan bantuan dalam hal itu.",
  "Maaf, saya tidak bisa memberikan informasi yang relevan dengan pertanyaan Anda.",
  "Maaf, saya tidak bisa memberikan solusi yang Anda cari.",
  "Mohon maaf, saya tidak bisa memberikan jawaban yang memuaskan.",
  "Maaf, saya tidak bisa memberikan saran yang berguna dalam hal itu.",
  "Maaf, saya tidak bisa memberikan panduan yang Anda cari.",
  "Mohon maaf, saya tidak bisa memberikan penjelasan yang memadai.",
  "Maaf, saya tidak bisa memberikan bantuan dalam hal itu.",
  "Maaf, saya tidak bisa memberikan informasi yang relevan dengan pertanyaan Anda.",
  "Maaf, saya tidak bisa memberikan solusi yang Anda cari.",
  "Mohon maaf, saya tidak bisa memberikan jawaban yang memuaskan.",
  "Maaf, saya tidak bisa memberikan saran yang berguna dalam hal itu.",
  "Maaf, saya tidak bisa memberikan panduan yang Anda cari.",
  "Mohon maaf, saya tidak bisa memberikan penjelasan yang memadai.",
  "Maaf, saya tidak bisa memberikan bantuan dalam hal itu.",
  "Maaf, saya tidak bisa memberikan informasi yang relevan dengan pertanyaan Anda.",
  "Maaf, saya tidak bisa memberikan solusi yang Anda cari.",
  "Mohon maaf, saya tidak bisa memberikan jawaban yang memuaskan.",
  "Maaf, saya tidak bisa memberikan saran yang berguna dalam hal itu.",
  "Maaf, saya tidak bisa memberikan panduan yang Anda cari.",
  "Mohon maaf, saya tidak bisa memberikan penjelasan yang memadai.",
  "Maaf, saya tidak bisa memberikan bantuan dalam hal itu.",
  "Maaf, saya tidak bisa memberikan informasi yang relevan dengan pertanyaan Anda.",
  "Maaf, saya tidak bisa memberikan solusi yang Anda cari."
];

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function getDataInstagram(username) {
  

  try {
    const formattedData = await formatDataInstagram(response.data.data);
    return formattedData;
  } catch (error) {
    console.error(error);
  }
}

async function getFollowersInstagram(username) {
  console.log(username);
  const options = {
    method: 'GET',
    url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/followers',
    params: {
      username_or_id_or_url: `${username}`,
      amount: '500'
    },
    headers: {
      'x-rapidapi-key': 'c3a2e5848cmshcac1835d7465444p179415jsn8ca3f96bdb4a',
      'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
    }
  };
  

  try {
    const response = await axios.request(options);
    let data = response.data.data;
    let msg = `Total Pengikut ${username}: ${data.count} Orang\n\n`;
    msg += response.data.data.items.map((follower, index) => `${index + 1}. ${follower.username} - ${follower.full_name} \n`);
    return msg;
  } catch (error) {
    console.error(error);
    return random_reject_msg[Math.floor(Math.random() * random_reject_msg.length)];  
  }
}

async function getStroryInstagram(username) {
  const options = {
    method: 'GET',
    url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/stories',
    params: {
      username_or_id_or_url: username
    },
    headers: {
      'x-rapidapi-key': 'c3a2e5848cmshcac1835d7465444p179415jsn8ca3f96bdb4a',
      'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    let data = response.data.data;
    let msg = `Total Stories ${username}: ${data.count} Stories\n\n`;
    msg += response.data.data.items.map((story, index) => `${story.video_url}\n`);
    return msg;
  }catch (error) {
    console.error(error);
    return random_reject_msg[Math.floor(Math.random() * random_reject_msg.length)];
  }
}

async function kirimPerintah(data) {
  const {sender, perintah} = data;
  const content = `Dalam konteks ini nama aku Ivi. "${perintah}", Hanya berikan kata katanya!`;
  options.data.messages[0].content = content;
  
  const response = await axios.request(options);
  let reply = response.data.result;

  return reply;
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/webhook", (req, res) => {
  res.send("Hello Fonnte!");
});
// Endpoint untuk menerima pesan dari WhatsApp API
app.use("/api", Route);
app.use("/api", PerencanaanDanaRoute);

// Jalankan server
app.listen(3000, () => console.log("Server running on port 3000"));