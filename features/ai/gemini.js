//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const uploader = require(process.cwd() + "/lib/uploader.js");

module.exports = {
  help: ["gemini"], //nama fitur kamu
  usage: "*Input query*", //deskripsi singkat
  command: ["gemini"], //untuk eksekusi fitur nya
  category: ["ai"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[query]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype;
    if (/image/.test(mime)) {
      let url = await uploader(await q.download());
      let data = await Func.fetchJson(
        `https://api.yanzbotz.my.id/api/ai/gemini-image?url=${url}&query=${text}&apiKey=${api.yanz}`,
      );
      m.reply(`*[ GEMINI ]*\n${data.result}`);
    } else if (/video/.test(mime)) {
      let url = await uploader(await q.download());
      let data = await Func.fetchJson(
        `https://api.yanzbotz.my.id/api/ai/gemini-video?url=${url}&query=${text}&apiKey=${api.yanz}`,
      );
      m.reply(`*[ GEMINI ]*\n${data.result}`);
    } else {
      let data = await Func.fetchJson(
        `https://api.yanzbotz.my.id/api/ai/gemini?query=${text}&apiKey=${api.yanz}`,
      );
      m.reply(`*[ GEMINI ]*\n${data.result}`);
    }
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description:
    "Dapatkan hasil jawaban lebih akurat dengan Google Ai, dapat menjawab pertanyaan mulai dari berupa text, gambar dan video !",
};
