//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const fetch = require("node-fetch");
const util = require("util");

module.exports = {
  help: ["get"], //nama fitur kamu
  usage: "*Input url*", //deskripsi singkat
  command: ["get"], //untuk eksekusi fitur nya
  category: ["tools"], //fitur kamu termasuk kategori apa?
  example: "*• Example  :* %cmd *[url]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    try {
      let data = await fetch(text);
      let res = data.headers.get("content-type");
      if (!/text|json/.test(res)) {
        kgy.sendFile(m.chat, text, null, null, m);
      } else {
        let txt;
        try {
          txt = await data.json();
        } catch (e) {
          txt = await data.text();
        }
        kgy.reply(m.chat, util.format(txt), m);
      }
    } catch (e) {
      return kgy.reply(m.chat, "*[ ⚠️ ]* Url Yang kamu berikan Tidak valid", m);
    }
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir kali fitur ini di perbarui? ( Jangan di ubah )
  description: "Mengambil data dari URL",
};
