//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = {
  help: ["mediafire"], //nama fitur kamu
  usage: "*Input url*", //deskripsi singkat
  command: ["mediafire"], //untuk eksekusi fitur nya
  category: ["downloader"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd reply *[url]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    var _a, _b;
    const data = await (await fetch(text)).text(),
      $ = cheerio.load(data),
      Url = ($("#downloadButton").attr("href") || "").trim(),
      url2 = ($("#download_link > a.retry").attr("href") || "").trim(),
      $intro = $("div.dl-info > div.intro"),
      filename = $intro.find("div.filename").text().trim(),
      filetype = $intro.find("div.filetype > span").eq(0).text().trim(),
      ext =
        (null ===
          (_b =
            null ===
              (_a = /\(\.(.*?)\)/.exec(
                $intro.find("div.filetype > span").eq(1).text(),
              )) || void 0 === _a
              ? void 0
              : _a[1]) || void 0 === _b
          ? void 0
          : _b.trim()) || "bin",
      $li = $("div.dl-info > ul.details > li"),
      upload = $li.eq(1).find("span").text().trim(),
      filesizeH = $li.eq(0).find("span").text().trim();
    kgy.sendMessage(
      m.chat,
      {
        document: {
          url: Url,
        },
        fileName: filename,
        mimetype: "application/" + ext.toLowerCase(),
        caption: `┌─⭓「 *MEDIAFIRE DOWNLOADER*」
│ *• Nama :* ${filename}
│ *• Tipe :* ${filetype}
│ *• Ukuran :* ${filesizeH}
│ *• Diunggah pada :* ${upload}
└───────────────⭓`,
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
  description: "Untuk mendownload file dari MediaFire",
};
