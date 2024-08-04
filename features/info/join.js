//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
module.exports = {
  help: ["join"], //nama fitur kamu
  usage: "*Input url*", //deskripsi singkat
  command: ["join"], //untuk eksekusi fitur nya
  category: ["info"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[url]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let data = new URL(text);
    let hasil = await kgy.groupAcceptInvite(data.pathname.split("/")[1]);
    m.reply(
      `*[ ✅ ]* Berhasil menambahkan bot kedalam Group : *[ ${(await kgy.getName(hasil)) || ""} ]*`,
    );
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: true, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "fitur untuk memasukan bot kedalam group WhatsApp",
};
