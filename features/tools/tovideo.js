/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
 */
const fetch = require("node-fetch");
const FormData = require("form-data");
const { JSDOM } = require("jsdom");

module.exports = {
  help: ["tovideo", "togif"], //nama fitur kamu
  usage: "*Input sticker*", //deskripsi singkat
  command: ["tovideo", "togif"], //untuk eksekusi fitur nya
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
    let out = Buffer.alloc(0);
    if (/webp/.test(mime)) {
      out = await webp2mp4(media);
    }
    await kgy.sendMessage(
      m.chat,
      {
        video: out,
        gifPlayback: command === "togif" ? true : false,
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
  description: "Mengubah sticker menjadi video/gif", //kosongkan jika tidak ingin di isi
};

/*======[ FUNCTION ]==========*/
async function webp2mp4(source) {
  let form = new FormData();
  let isUrl = typeof source === "string" && /https?:\/\//.test(source);
  form.append("new-image-url", isUrl ? source : "");
  form.append("new-image", isUrl ? "" : source, "image.webp");
  let res = await fetch("https://ezgif.com/webp-to-mp4", {
    method: "POST",
    body: form,
  });
  let html = await res.text();
  let { document } = new JSDOM(html).window;
  let form2 = new FormData();
  let obj = {};
  for (let input of document.querySelectorAll("form input[name]")) {
    obj[input.name] = input.value;
    form2.append(input.name, input.value);
  }
  let res2 = await fetch("https://ezgif.com/webp-to-mp4/" + obj.file, {
    method: "POST",
    body: form2,
  });
  let html2 = await res2.text();
  let { document: document2 } = new JSDOM(html2).window;
  return new URL(
    document2.querySelector("div#output > p.outfile > video > source").src,
    res2.url,
  ).toString();
}
