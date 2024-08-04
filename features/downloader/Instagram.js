//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  help: ["igdl", "ig", "Instagram"], //nama fitur kamu
  usage: "*Input url*", //deskripsi singkat
  command: ["ig", "Instagram", "igdl"], //untuk eksekusi fitur nya
  category: ["downloader"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[url]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    const response = await axios.post(
      "https://saveig.app/api/ajaxSearch",
      new URLSearchParams({
        q: text,
        t: "media",
        lang: "id",
      }),
    );
    const html = response.data.data;
    const $ = cheerio.load(html);
    const medias = $("ul.download-box li")
      .map((index, element) => {
        const $thumb = $(element).find(".download-items__thumb img");
        const $btn = $(element).find(".download-items__btn a");
        const $options = $(element).find(".photo-option select option");
        const type = $btn.attr("onclick")?.includes("click_download_video")
          ? "video"
          : "image";
        return {
          type: type,
          thumb: $thumb.attr("src") || "",
          url: $btn.attr("href")?.replace("&dl=1", "") || "",
          quality: $options.filter(":selected").text() || "",
          options: $options
            .map((i, opt) => ({
              type: type,
              url: $(opt).val() || "",
              quality: $(opt).text() || "",
            }))
            .get(),
        };
      })
      .get();
    for (let i of medias) {
      m.reply(
        `┌─⭓「 *INSTAGRAM DOWNLOADER*」
│ *• Type :* ${i.type}
└───────────────⭓`,
        i.url,
      );
    }
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Untuk mendownload media dari Instagram",
};
