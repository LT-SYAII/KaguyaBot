/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const yts = require("yt-search");
const Youtube = require("ytdl-core");
const yt = new Youtube();

module.exports = {
  help: ["ytmp4", "ytv"], //nama fitur kamu
  usage: "*Input url*", //deskripsi singkat
  command: ["ytmp4", "ytv"], //untuk eksekusi fitur nya
  category: ["downloader"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[url]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let search = await yts(text.split("?si")[0]);
    let hasil = await Func.random(search.videos);
    let cap = `┌─⭓「 *YOUTUBE MP4*」
│ *• Durasi:* ${hasil.timestamp}
│ *• Channel :* ${hasil.author.name}
│ *• Penonton :* ${hasil.views}
└───────────────⭓
*• Title :* ${hasil.title}

${hasil.description}`;
    let q = await kgy.sendMessage(
      m.chat,
      {
        image: {
          url: hasil.image,
        },
        caption: cap,
      },
      {
        quoted: m,
      },
    );
    let download = await yt.download(hasil.url);
    kgy.sendMessage(
      m.chat,
      {
        video: {
          url: download.mp4DownloadLink,
        },
      },
      {
        quoted: q,
      },
    );
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah ),
  description: "Mendownload video YouTube melalui link bagikan",
};
