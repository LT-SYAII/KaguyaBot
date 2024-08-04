//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const axios = require("axios");

module.exports = {
  help: ["ai"], //nama fitur kamu
  usage: "*question*", //deskripsi singkat
  command: ["ai"], //untuk eksekusi fitur nya
  category: ["ai"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[question]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let { data } = await require("axios").get(
      "https://widipe.com/openai?text=" + text,
    );
    m.reply("*[ KAGUYA AI ]*\n" + data.result);
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah ),

  description: "Jawab semua pertanyaan mu dengan GPT-4 !",
};
