//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const fs = require("fs");

module.exports = {
  help: ["sticker", "s", "stiker"], //nama fitur kamu
  usage: "*Input media*", //deskripsi singkat
  command: ["sticker", "s", "stiker"], //untuk eksekusi fitur nya
  category: ["sticker"], //fitur kamu termasuk kategori apa?
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let q = m.quoted || m;
    let mime = (q.msg || q).mimetype || "";
    let [kiri, kanan] = text.split("|");
    if (/image/.test(mime)) {
      let media = await kgy.downloadAndSaveMediaMessage(q, new Date() * 1);
      kgy.sendImageAsSticker(m.chat, media, m, {
        packname: kiri || settings.packname,
        author: kanan || settings.version,
      });
      await fs.unlinkSync(media);
    } else if (/video/.test(mime)) {
      if (q.seconds > 11) return m.reply("*[ ⚠️ ]* Maksimal 10 detik saja");
      let media = await kgy.downloadAndSaveMediaMessage(q, new Date() * 1);
      kgy.sendVideoAsSticker(m.chat, media, m, {
        packname: kiri || settings.packname,
        author: kanan || settings.version,
      });
      await fs.unlinkSync(media);
    } else {
      m.reply(`*• Example :* ${usedPrefix + command} *[reply/send media]*`);
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
  description: "Untuk mengubah video/poto menjadi sticker",
};
