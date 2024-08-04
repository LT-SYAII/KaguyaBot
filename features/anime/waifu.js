module.exports = {
  help: ["waifu"],
  usage: "*random image*",
  command: ["waifu"],
  category: ["anime"],
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let data = await Func.fetchJson("https://api.waifu.pics/sfw/waifu");
    await kgy.sendMessage(
      m.chat,
      {
        image: {
          url: data.url,
        },
        caption: `*[ RANDOM ${command.toUpperCase()} ]*`,
      },
      {
        quoted: m,
      },
    );
  },
  wait: true,
  owner: false,
  group: false,
  private: false,
  botadmin: false,
  premium: true,
  error: 0,
  update: Date.now(),
  description: "Menampilkan gambar anime random",
};
