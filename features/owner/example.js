module.exports = {
  help: ["example"],
  usage: "*example code*",
  command: ["example"],
  category: ["owner"],
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let example = `
/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
*/
module.exports = {
    help: ["help"], //nama fitur kamu
    usage: "*Little description*", //deskripsi singkat
    command: ["command"], //untuk eksekusi fitur nya
    category: ["category"], //fitur kamu termasuk kategori apa?
    example: "Contoh : %cmd reply pessn bang", //Cara penggunaannya, kosongin jika fitur tersebut tidak perlu menggunakan Input apapun
    run: async (m, {
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
        args
      }) => {
     //masukan kode anda disini 
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
    description: "Deskripsi kan fitur ini disini" //kosongkan jika tidak ingin di isi
}`;
    m.reply(example);
  },
  wait: true,
  owner: true,
  group: false,
  private: false,
  botadmin: false,
  premium: false,
  error: 0,
  update: Date.now(),
  description: `Memnampilkan contoh jika anda ingin menambahkan fitur pada bot ini`,
};
