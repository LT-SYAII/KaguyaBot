//© Create by L E X I C -  T E A M

module.exports = {
  help: ["owner"], //nama fitur kamu
  usage: "*my owner*", //deskripsi singkat
  command: ["owner"], //untuk eksekusi fitur nya
  category: ["info"], //fitur kamu termasuk kategori apa?
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let data = owner.map((a) => [a + "@s.whatsapp.net", "My Owner"]);
    kgy.sendContact(m.chat, data, m);
  },
  wait: false,
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
};
