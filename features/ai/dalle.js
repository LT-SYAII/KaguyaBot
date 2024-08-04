//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
module.exports = {
  help: ["dalle"], //nama fitur kamu
  usage: "*input prompt*", //deskripsi singkat
  command: ["dalle"], //untuk eksekusi fitur nya
  category: ["ai"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[prompt]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let data = await Func.fetchJson(
      "https://itzpire.com/ai/dalle?prompt=" + text,
    );
    kgy.sendMessage(
      m.chat,
      {
        image: {
          url: data.result,
        },
        caption: `*• Prompt :* ${text}`,
      },
      {
        quoted: m,
      },
    );
  },
  wait: false, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah ),
  description:
    "masukan prompt untuk membuat gambar dengan model DALL-E, cara penggunaan sudah tersedia diatas",
};
