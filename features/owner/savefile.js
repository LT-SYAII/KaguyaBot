const fs = require("fs");
const { js } = require("js-beautify");

module.exports = {
  help: ["sf"],
  usage: "*save file*",
  command: ["sf"],
  category: ["owner"],
  example: "*• Example :* %cmd *[name file]*",
  run: async (m, { kgy, usedPrefix, command, text }) => {
    if (!m.quoted) throw `*[ ! ] Reply Your Progress Code*`;
    let path = `features/${text}.js`;
    await fs.writeFileSync(
      path,
      await js("//© Create by L E X I C -  T E A M\n\n" + m.quoted.text),
    );
    let key = await kgy.sendMessage(
      m.chat,
      {
        text: "*[ SAVING CODE... ]*",
      },
      {
        quoted: m,
      },
    );
    await kgy.sendMessage(
      m.chat,
      {
        text: `*[ SUCCES SAVING CODE ]*\n\n\`\`\`${m.quoted.text}\`\`\``,
        edit: key.key,
      },
      {
        quored: m,
      },
    );
  },
  wait: false,
  owner: true,
  group: false,
  private: false,
  botadmin: false,
  premium: false,
  error: 0,
  update: Date.now(),
  description: `Fitur ini dibuat untuk menyimpan fitur pada Folder`,
};
