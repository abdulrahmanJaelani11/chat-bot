const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
// randikaangga9044@gmail.com - CHATGPT 4
const options = {
  method: 'POST',
  url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
  headers: {
    'x-rapidapi-key': 'a30f642922msh8d1d18a8a6bdd3dp1cb95fjsn4830addab684',
    'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    messages: [
      {
        role: 'user',
        content: 'hi'
      }
    ],
    web_access: false
  }
};
let pesan_global = {
  "Ivi": "",
  "Bobi": ""
};
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

async function sendFonnte(sender, message) {
  const response = await axios.post(
      "https://api.fonnte.com/send",
      {
          target: sender, // Nomor tujuan
          message: message, // Pesan yang akan dikirim
          countryCode: "62", // Opsional
          url: "https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/470671972_1726105764623310_1273606789225025196_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=ZmS1gFaZOqUQ7kNvgGIB336&_nc_gid=18c39513c11b4bdb8dcd483acfeaef4c&edm=AO4kU9EBAAAA&ccb=7-5&oh=00_AYA57MmpQpcuwuFz15R0vZrwDITyl4-ruizxwN7LksKfQw&oe=676A8A6A&_nc_sid=164c1d",
      },
      {
          headers: {
          Authorization: "YQnJUtavytyJDvyyVjy1", // Ganti TOKEN dengan API Key Anda
          "Content-Type": "application/json",
          },
      }
  );
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
  let content = `Dalam konteks ini nama kamu Bobi. Respon aku selaknya manusia berdialog!. "${message}"`;
  options.data.messages[0].content = content;
  
  let reply = "";
  if(sender === "6285952403737" || sender === "6283874809704" || sender === "62895801174434"){
    const response = await axios.request(options);
    reply = response.data.result;
  }else if(sender === "6283852913242"){
    reply = "Maaf Fia, Ivi tidak mengijinkanku merespon kamu.";
  }else{
    reply = random_reject_msg[Math.floor(Math.random() * random_reject_msg.length)];

    // Mengirimkan informasi ke Developer ketika ada nomor yang tidak dikenal/diizinkan menghubungi
    let feedback_msg = `Bos, Ada nomor tidak dikenal berusaha menghubungi aku. "${message}", pesan tersebut berasal dari nomor ${sender}`;
    feedback(feedback_msg);
  }
  return reply;
}

async function kirimPerintah(data) {
  const {sender, perintah} = data;
  const content = `Dalam konteks ini nama aku Ivi. "${perintah}", Hanya berikan kata katanya!`;
  options.data.messages[0].content = content;
  
  const response = await axios.request(options);
  let reply = response.data.result;

  return reply;
}

async function feedback(feedback_msg) {
  sendFonnte('6283874809704', feedback_msg);
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
    }else if(message.includes("ig_stories:")){
      const username = message.split(":")[1];
      const data = await getStroryInstagram(username);
      await sendFonnte(sender, data);
    }else if(message.includes("perintah:")){
      const perintah = message.split(":")[1];
      const reply = await kirimPerintah({sender, perintah});
      await sendFonnte('085952403737', reply); //'085952403737'
      // await sendFonnte(sender, "Sudah Bos, Sudah saya sampaikan ke Ivi!");
    }else if(message.includes("perintah_ke:")){ // contoh perintah_ke:083874809704:tolong tanyakan kabar
      const no_tujuan = message.split(":")[1];
      const perintah = message.split(":")[2];
      const reply = await kirimPerintah({sender, perintah});
      await sendFonnte(no_tujuan, reply); //'085952403737'
    }else{
      const reply = await checkMessage({sender, message});
      await sendFonnte(sender, reply); // Kirim balasan ke pengirim pesan
    }
  } catch (error) {
    let feedback_msg = `Bos, Ada kesalahan dalam membalas pesan. "${message}", pesan tersebut berasal dari nomor ${sender}, munkin tokenku sudah habis. Cek segera!`;
    feedback(feedback_msg);
    await sendFonnte(sender, random_reject_msg[Math.floor(Math.random() * random_reject_msg.length)]); // Kirim pesan kesalahan
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
