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

  async function getDataInstagram(username) {
    const options = {
      method: 'GET',
      url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/info',
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
      console.log(response.data);
      let data = response.data.data;
      let msg = `Total Pengikut ${username}: ${data.count} Orang\n\n`;
      msg += response.data.data.items.map((follower, index) => `${index + 1}. ${follower.username} - ${follower.full_name} \n`);
      return msg;
    } catch (error) {
      console.error(error);
      return "Maaf, Sepertinya Server nya ada masalah, silahkan coba lagi!";
    }
  }
  
  async function formatDataInstagram(data) {
    const formattedData = `
    Username: ${data.username}
    Nama Lengkap: ${data.full_name}
    Bio: ${data.biography}
    Link Bio: ${data.bio_links.map(link => link.url).join(", ")}
    Kontak No. HP: ${data.contact_phone_number}
    Total Pengikut: ${data.follower_count}
    Total Mengikuti: ${data.following_count}
    Is Verified: ${data.is_verified ? "Ya" : "Tidak"}
    Media Count: ${data.media_count}
    Link Foto Profil: ${data.hd_profile_pic_url_info.url}
    Link Foto Profil HD: ${data.profile_pic_url_hd}
    Nomor HP Public: +${data.public_phone_country_code != undefined && data.public_phone_number != undefined ? data.public_phone_country_code + data.public_phone_number : ''}
    `;

    return formattedData;
  }

  async function checkMessage(data) {
    const {sender, message} = data;
    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
      headers: {
        'x-rapidapi-key': 'e7cf862121mshd1fc3bdc41e9099p1be713jsn5363ff6ff8b8',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: `Dalam konteks ini nama kamu Bobi, nama aku Ivi dan Abdurahman bos kamu. Respon aku selaknya manusia berdialog!. "${message}"`
          }
        ],
        web_access: false
      }
    };
    
    
    let reply = "";
    if(sender === "6285952403737" || sender === "6283874809704"){
      if(message.toLowerCase() == "bobi"){
        reply = "Hai Ivi, gimana kabar kamu hari ini?, semoga baik baik saja ya!. Oh iya Ivi kemarin malam ada seseorang dengan no wa yang tidak aku kenal chat aku, dia bilang dia adalah pacarmu, apakah itu benar?";
      }else{
        const response = await axios.request(options);
        reply = response.data.result;
      }
    }else{
      reply = "Maaf, aku hanya mau berbicara dengan teman baruku saja, namanya Silvi";
    }

    return reply;
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
  try {
    if(message.includes("ig:")){
      const username = message.split(":")[1];
      const data = await getDataInstagram(username);
      await sendFonnte(sender, data);
    }else if(message.includes("ig_follower:")){
      const username = message.split(":")[1];
      const data = await getFollowersInstagram(username);
      await sendFonnte(sender, data);
    }else{
      const reply = await checkMessage({sender, message});
      await sendFonnte(sender, reply); // Kirim balasan ke pengirim pesan
    }
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
