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

  async function formatDataInstagram(data) {
    console.log(data);
    const formattedData = 
    "Username: " + data.username + "\n" +
    "Nama Lengkap: " + data.full_name + "\n" +
    "Bio: " + data.biography + "\n" +
    "Negara: " + (data.about != null ? data.about.country : '') + "\n" +
    "Tanggal Gabung: " + (data.about != null ? new Date(data.about.date_joined_as_timestamp * 1000) : '') + "\n" +
    "Badges: " + data.account_badges.join(", ") + "\n" +
    "Tipe Akun: " + data.account_type + "\n" +
    "Active Fundraisers: " + data.active_standalone_fundraisers.total_count + "\n" +
    "Link Bio: " + data.bio_links.map(link => link.url).join(", ") + "\n" +
    "Kontak No. HP: " + data.contact_phone_number + "\n" +
    "Total Pengikut: " + data.follower_count + "\n" +
    "Total Mengikuti: " + data.following_count + "\n" +
    "Is Verified: " + data.is_verified + "\n" +
    "Media Count: " + data.media_count + "\n" +
    "Link Foto Profil: " + data.hd_profile_pic_url_info.url + "\n" +
    "Link Foto Profil HD: " + data.profile_pic_url_hd + "\n" +
    "Nomor HP Public: +" + data.public_phone_country_code + data.public_phone_number + "\n" +
    "Total IGTV Videos: " + data.total_igtv_videos;

    return formattedData;
  }

  async function checkMessage(data) {
    const {sender, message} = data;
    const options = {
      method: 'POST',
      url: 'https://chatgpt-vision1.p.rapidapi.com/gpt4',
      headers: {
        'x-rapidapi-key': 'c3a2e5848cmshcac1835d7465444p179415jsn8ca3f96bdb4a',
        'x-rapidapi-host': 'chatgpt-vision1.p.rapidapi.com',
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
      if(message.includes("knp ga mau respon") || message.includes("kenapa ga mau respon") || message.includes("kenapa ga mau jawab") || message.includes("knp ga mau jawab") || message.includes("kenapa ga mau balas") || message.includes("knp ga mau balas") || message.includes("kenapa ga mau chat") || message.includes("knp ga mau chat") || message.includes("kenapa ga mau ngomong") || message.includes("knp ga mau ngomong") || message.includes("kenapa ga mau ngobrol") || message.includes("knp ga mau ngobrol") || message.includes("kenapa ga mau bicara") || message.includes("knp ga mau bicara") || message.includes("kenapa ga mau berbicara") || message.includes("knp ga mau berbicara")){
        reply = "Karena dia nyebelin, aku lebih baik berbicara denganmu saja Ivi!";
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
      await sendFonnte(sender, JSON.stringify(data));
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
