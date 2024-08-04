//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const os = require("os");

module.exports = {
  help: ["ping"], //nama fitur kamu
  usage: "*pong !*", //deskripsi singkat
  command: ["ping"], //untuk eksekusi fitur nya
  category: ["info"], //fitur kamu termasuk kategori apa?
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let caption = `┌─⭓「  *Informasi Server* 」`;
    const hostName = os.hostname();
    const totalMemory = `${Func.formatSize(os.totalmem())}`;
    const platform = os.platform();
    const cpu = os.cpus();
    const cpuCount = cpu.length;
    const cpuModel = cpu[0].model;
    const cpuSpeed = `${cpu[0].speed} MHz`;
    const uptime = os.uptime();
    caption += `\n│ *Nama Host:* ${hostName}`;
    caption += `\n│ *Total Memori:* ${totalMemory}`;
    caption += `\n│ *Platform:* ${platform}`;
    caption += `\n│ *Jumlah CPU:* ${cpuCount}`;
    caption += `\n│ *Model CPU:* ${cpuModel}`;
    caption += `\n│ *Kecepatan CPU:* ${cpuSpeed}`;
    caption += `\n│ *Waktu Aktif:* ${uptime} detik\n└───────────────⭓`;
    kgy.reply(m.chat, caption, m);
  },
  wait: false, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Menampilkan Informasi server yang digunakan oleh bot ini",
};
