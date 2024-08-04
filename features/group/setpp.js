/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
 */
const jimp_1 = require("jimp");

module.exports = {
  help: ["setppgc"], //nama fitur kamu
  usage: "*Input media*", //deskripsi singkat
  command: ["setppgc"], //untuk eksekusi fitur nya
  category: ["group"], //fitur kamu termasuk kategori apa?
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
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";
    if (!mime)
      throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
      let media = await q.download();
      let { img } = await pepe(media);
      await kgy.query({
        tag: "iq",
        attrs: {
          to: m.chat,
          type: "set",
          xmlns: "w:profile:picture",
        },
        content: [
          {
            tag: "picture",
            attrs: { type: "image" },
            content: img,
          },
        ],
      });
      m.reply(`Berhasil mengubah poto profile group ✓`);
    }
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: true, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: true, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium,
  admin: true, //Fitur ini khusus admin group
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Untuk mengubah poto profile group", //kosongkan jika tidak ingin di isi
};

/*=======[ FUNCTION ]======*/
async function pepe(media) {
  const jimp = await jimp_1.read(media);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG),
  };
}
