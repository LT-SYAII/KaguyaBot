//© Create by L E X I C -  T E A M

const fs = require("fs");
const { js } = require("js-beautify");

module.exports = {
  help: ["df"],
  usage: "*delete file*",
  command: ["df"],
  category: ["owner"],
  example: "*• Example :* %cmd *[name file]*",
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let path = `features/${text}.js`;
    let key = await kgy.sendMessage(
      m.chat,
      {
        text: "*[ DELETE FILE... ]*",
      },
      {
        quoted: m,
      },
    );
    if (!fs.existsSync(path))
      return kgy.sendMessage(
        m.chat,
        {
          text: `*[ FILE NOT FOUND ]*`,
          edit: key.key,
        },
        {
          quored: m,
        },
      );
    fs.unlinkSync(path);
    await kgy.sendMessage(
      m.chat,
      {
        text: `*[ SUCCESS DELETE FILE ]*`,
        edit: key.key,
      },
      {
        quored: m,
      },
    );
  },
  wait: true,
  owner: true,
  group: false,
  private: false,
  botadmin: false,
  premium: false,
  error: 0,
  update: Date.now(),
  description: `Fitur ini dibuat untuk menghapus fitur dari Folder`,
};
