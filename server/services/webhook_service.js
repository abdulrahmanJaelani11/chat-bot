let axios = require('axios');

let options = {
    method: 'GET',
    url: '',
    params: {
      username_or_id_or_url: ''
    },
    headers: {
      'x-rapidapi-key': 'c3a2e5848cmshcac1835d7465444p179415jsn8ca3f96bdb4a',
      'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
    }
};
const url_fonnte = "https://api.fonnte.com/send";
let body_fonnte = {
    target: "", // Nomor tujuan
    message: "", // Pesan yang akan dikirim
    countryCode: "62", // Opsional
    url: "https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/470671972_1726105764623310_1273606789225025196_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=ZmS1gFaZOqUQ7kNvgGIB336&_nc_gid=18c39513c11b4bdb8dcd483acfeaef4c&edm=AO4kU9EBAAAA&ccb=7-5&oh=00_AYA57MmpQpcuwuFz15R0vZrwDITyl4-ruizxwN7LksKfQw&oe=676A8A6A&_nc_sid=164c1d",
};
const headers_fonnte = {
    headers: {
        Authorization: "YQnJUtavytyJDvyyVjy1", // Ganti TOKEN dengan API Key Anda
        "Content-Type": "application/json",
    }
};
const options_ai = {
  method: 'POST',
  url: 'https://open-ai21.p.rapidapi.com/conversationllama',
  headers: {
    'x-rapidapi-key': 'a30f642922msh8d1d18a8a6bdd3dp1cb95fjsn4830addab684',
    'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
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

class WebhookService {
    static async sendMessage(sender, message) {
      body_fonnte.target = sender;
      body_fonnte.message = message;
      const response = await axios.post(url_fonnte, body_fonnte, headers_fonnte);
      return true;
    }
    
    static async getDataInstagram(username) {
        options.url = process.env.API_INSTAGRAM
        options.params.username_or_id_or_url = username;

        try {
            const response = await axios.request(options);
            const formattedData = await formatDataInstagram(response.data.data);
            return formattedData;
        } catch (error) {
            console.error(error);
            return "Maaf, layanan AI sedang mengalami gangguan dan sedang tidak bisa memberikan respon yang sesuai. Silakan coba lagi nanti ya. Terima kasih!";  
        }
    }
    
    static async formatDataInstagram(data) {
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
      Nomor HP Public: +${data.public_phone_country_code != undefined && data.public_phone_number != undefined ? data.public_phone_country_code + data.public_phone_number : ''}`;
      return formattedData;
    }

    static async checkMessage(data){
          const {sender, message} = data;
          let content = `Dalam konteks ini nama kamu Bobi AI. Respon aku selayaknya manusia berdialog!. "${message}"`;
          options_ai.data.messages[0].content = content;
          
          let reply = "";
          if(["6283874809702", "6289653173605"].includes(sender)){
            const response = await axios.request(options);
            reply = response.data.result;
          }else{
            // reply = random_reject_msg[Math.floor(Math.random() * random_reject_msg.length)];
            reply = "Hai, Saya Bobi AI, Asisten Virtual yang siap membantu kamu! Namun, untuk saat ini aku hanya bisa merespon pesan dari nomor yang sudah terdaftar. Jika kamu ingin mendapatkan akses penuh ke layanan AI ini, silakan daftar dengan cara mengirim pesan dengan format: 'daftar:Nama#No.WA' ke nomor ini.\n\nContoh :\ndaftar:Abdurahman#083176551803\n\nSetelah itu, aku akan segera memproses pendaftaranmu dan memberikan akses ke layanan AI yang seru ini. Terima kasih sudah menghubungi Bobi AI, aku tunggu pesan daftarmu ya!😊";
        
            // Mengirimkan informasi ke Developer ketika ada nomor yang tidak dikenal/diizinkan menghubungi
            let feedback_msg = `Bos, Ada nomor tidak dikenal berusaha menghubungi aku. "${message}", pesan tersebut berasal dari nomor ${sender}`;
            WebhookService.feedback(feedback_msg);
          }
          return reply;
    }

    static async feedback(feedback_msg) {
      this.sendMessage('6283874809704', feedback_msg);
    }
}

module.exports = WebhookService;