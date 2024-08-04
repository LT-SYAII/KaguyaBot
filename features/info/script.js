//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
*/
module.exports = {
  help: ["sc", "script"], //nama fitur kamu
  usage: "*free script*", //deskripsi singkat
  command: ["sc", "script"], //untuk eksekusi fitur nya
  category: ["info"], //fitur kamu termasuk kategori apa?
  run: async (
    m,
    {
      kgy,
      usedPrefix,
      command,
      text,
      isOwner,
      isPrems,
      isMods,
      isAdmin,
      isBotAdmin,
      chatUpdate,
      args,
    },
  ) => {
    let moment = require("moment-timezone");
    let a = await Func.fetchJson(
      "https://api.github.com/repos/LT-SYAII/KaguyaBot",
    );

    m.reply(`┌─⭓「 *SCRIPT BOT* 」
│ *• Nama :* ${a.name}
│ *• Sumber :* ${a.html_url}
│ *• Dibuat sejak :* ${moment(a.created_at).tz("Asia/Jakarta").format("DD/MM/YYYY  HH:mm:ss")}
│ *• Terakhir update :* ${moment(a.updated_at).tz("Asia/Jakarta").format("DD/MM/YYYY  HH:mm:ss")}
│ *• Total Fork :* ${a.forks}
│ *• Total star :* ${a.stargazers_count}
└───────────────⭓

Script bot ini gratis !
jika ingin recode/jual tolong Jangan hilangkan credit

*• Official Group :*
https://chat.whatsapp.com/CTQL9XFA0uk66xIYZWfKij

*• Changelog Bot :*
https://whatsapp.com/channel/0029VaOhfUIAjPXTORInZf0d`);
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  admin: false, //Fitur ini khusus admin group
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Dapatkan source code bot ini secara gratis!", //kosongkan jika tidak ingin di isi
};
