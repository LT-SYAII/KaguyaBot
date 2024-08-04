/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
*/
module.exports = {
  help: ["setbio"], //nama fitur kamu
  usage: "*Input text*", //deskripsi singkat
  command: ["setbio"], //untuk eksekusi fitur nya
  category: ["owner"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[new bio]*", //Cara penggunaannya, kosongin jika fitur tersebut tidak perlu menggunakan Input apapun
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
    await kgy.updateProfileStatus(text);
    m.reply("Berhasil mengubah bio bot !");
  },
  wait: true, //menampilkan pesan menunggu
  owner: true, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Deskripsi kan fitur ini disini", //kosongkan jika tidak ingin di isi
};
