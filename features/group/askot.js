//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
module.exports = {
  help: ["askot"], //nama fitur kamu
  usage: "*list region*", //deskripsi singkat
  command: ["askot"], //untuk eksekusi fitur nya
  category: ["group"], //fitur kamu termasuk kategori apa?
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let PhoneNum = require("awesome-phonenumber");
    let regionNames = new Intl.DisplayNames(["en"], {
      type: "region",
    });
    let data = store.groupMetadata[m.chat];
    let arr = [];
    for (let i of data.participants) {
      arr.push({
        number: i.id,
        code: regionNames.of(
          PhoneNum("+" + i.id.split("@")[0]).getRegionCode("internasional"),
        ),
      });
    }
    let json = {};
    for (let contact of arr) {
      let country = contact.code;
      json[country] = (json[country] || 0) + 1;
    }
    let countryCounts = Object.keys(json).map((country) => ({
      name: country,
      total: json[country],
    }));
    let totalSum = countryCounts.reduce(
      (acc, country) => acc + country.total,
      0,
    );
    let totalRegion = [...new Set(arr.map((a) => a.code))];
    let hasil = countryCounts.map(({ name, total }) => ({
      name,
      total,
      percentage: ((total / totalSum) * 100).toFixed(2) + "%",
    }));
    let cap = `┌─⭓「 *TOTAL MEMBER* 」
│ *• Name :* ${data.subject}
│ *• Total :* ${data.participants.length}
│ *• Total Region :* ${totalRegion.length}
└───────────────⭓

┌─⭓「 *REGION MEMBER* 」
${hasil
  .sort((b, a) => a.total - b.total)
  .map(
    (a) => `│ *• Region :* ${a.name} *[ ${a.percentage} ]*
│ *• Total :* ${a.total} Member`,
  )
  .join("\n")}
└───────────────⭓`;
    kgy.reply(m.chat, cap, m);
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: true, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Fitur ini untuk melihat total member dari berbagai negara",
};
