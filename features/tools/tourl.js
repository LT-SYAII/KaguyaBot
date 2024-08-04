//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
**/
const uploader = require(process.cwd() + "/lib/uploader.js");

module.exports = {
  help: ["tourl"], //nama fitur kamu
  usage: "*Input media*", //deskripsi singkat
  command: ["tourl"], //untuk eksekusi fitur nya
  category: ["tools"], //fitur kamu termasuk kategori apa?
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let q = m.quoted ? m.quoted : m;
    if (!q.download)
      return m.reply(
        `*• Example :* ${usedPrefix + command} *[reply/send media]*`,
      );
    let url = await uploader(await q.download());
    m.reply(url);
  },
  wait: false, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "mengubah semua media menjadi url",
};
