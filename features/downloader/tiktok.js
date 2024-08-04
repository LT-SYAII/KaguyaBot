//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
module.exports = {
  help: ["tiktok", "tt"], //nama fitur kamu
  usage: "*Input url*", //deskripsi singkat
  command: ["tiktok", "tt"], //untuk eksekusi fitur nya
  category: ["downloader"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[url]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let data = await Func.fetchJson(
      `https://api.tiklydown.eu.org/api/download?url=${text}`,
    );
    if (data.video) {
      let cap = `┌─⭓「 *TIKTOK DOWNLOADER* 」
│ *• Id :* ${data.id}
│ *• Dibuat pada :* ${data.created_at}
│ *• Disukai :* ${await Func.h2k(data.stats.likeCount)} kali
│ *• Dikomentar :* ${await Func.h2k(data.stats.commentCount)} kali
│ *• Dibagikan :* ${await Func.h2k(data.stats.shareCount)} kali
│ *• Diputar :* ${await Func.h2k(data.stats.playCount)} kali
│ *• Disimpan  :* ${await Func.h2k(data.stats.saveCount)} kali
└───────────────⭓

${data.title}
`;
      let q = await kgy.sendMessage(
        m.chat,
        {
          video: {
            url: data.video.noWatermark,
          },
          caption: cap,
        },
        {
          quoted: m,
        },
      );
      await kgy.sendMessage(
        m.chat,
        {
          audio: {
            url: data.music.play_url,
          },
          mimetype: "audio/mpeg",
          contextInfo: {
            externalAdReply: {
              title: data.music.title,
              body: data.music.author,
              mediaType: 1,
              thumbnailUrl: data.music.cover_thumb,
            },
          },
        },
        {
          quoted: q,
        },
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
  description: "Download Video/Music/Slide dari Aplikasi Tiktok",
};
