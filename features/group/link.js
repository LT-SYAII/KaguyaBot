//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
module.exports = {
  help: ["linkgc"], //nama fitur kamu
  usage: "", //deskripsi singkat
  command: ["linkgc"], //untuk eksekusi fitur nya
  category: ["group"], //fitur kamu termasuk kategori apa?
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
    m.reply(`┌─⭓「 *${await kgy.getName(m.chat)}* 」
│ *• Link :* https://chat.whatsapp.com/${await kgy.groupInviteCode(m.chat)}
└───────────────⭓`);
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: true, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: true, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
};
