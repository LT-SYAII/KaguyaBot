/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
module.exports = {
  help: ["kick"], //nama fitur kamu
  usage: "*tag user*", //deskripsi singkat
  command: ["kick"], //untuk eksekusi fitur nya
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
    if (m.quoted.sender === kgy.user.jid) return;
    let usr = m.quoted.sender;
    await kgy.groupParticipantsUpdate(m.chat, [usr], "remove");
    return;
    if (!m.mentionedJid[0])
      throw `*• Example:* .kick @users *[tag or reply users]*`;
    let users = m.mentionedJid.filter((u) => !u.includes(kgy.user.jid));
    for (let user of users)
      if (user.endsWith("@s.whatsapp.net"))
        await kgy.groupParticipantsUpdate(m.chat, [user], "remove");
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: true, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: true, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  admin: true, //Fitur ini khusus admin group
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "digunakan untuk menghapus/mengeluarkan member dari group chat", //kosongkan jika tidak ingin di isi
};
