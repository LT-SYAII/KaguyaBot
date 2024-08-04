/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
 */

module.exports = {
  help: ["toimg"], //nama fitur kamu
  usage: "*reply sticker*", //deskripsi singkat
  command: ["toimg"], //untuk eksekusi fitur nya
  category: ["tools"], //fitur kamu termasuk kategori apa?
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
    if (!m.quoted)
      throw `*• Example :* ${usedPrefix + command} *[reply sticker]*`;
    let mime = m.quoted.mimetype || "";
    if (!/webp/.test(mime))
      throw `*• Example :* ${usedPrefix + command} *[reply sticker]*`;
    let media = await m.quoted.download();
    await kgy.sendMessage(
      m.chat,
      {
        image: media,
      },
      {
        quoted: m,
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
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Mengubah sticker menjadi gambar", //kosongkan jika tidak ingin di isi
};
