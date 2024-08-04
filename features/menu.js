//© Create by L E X I C -  T E A M

const { nama, version } = require(process.cwd() + "/package.json");
const moment = require("moment-timezone");

module.exports = {
  help: ["menu"],
  usage: "",
  command: ["menu"],
  category: ["info"],
  run: async (m, { kgy, usedPrefix, command, text }) => {
    const tagCount = {};
    const tagHelpMapping = {};
    const commandMapping = {};

    Object.keys(features)
      .filter((plugin) => !features[plugin].disabled)
      .forEach((plugin) => {
        const feature = features[plugin];
        const tagsArray = Array.isArray(feature.category)
          ? feature.category.filter((tag) => tag)
          : [];
        const helpArray = Array.isArray(feature.help)
          ? feature.help.filter((help) => help)
          : [feature.help].filter((help) => help);

        if (tagsArray.length > 0) {
          helpArray.forEach((helpItem) => {
            tagsArray.forEach((tag) => {
              if (tag) {
                if (tagCount[tag]) {
                  tagCount[tag]++;
                  tagHelpMapping[tag].push(helpItem);
                } else {
                  tagCount[tag] = 1;
                  tagHelpMapping[tag] = [helpItem];
                }
              }
            });
          });
        }

        if (feature.command) {
          helpArray.forEach((helpItem) => {
            commandMapping[helpItem] = {
              help: feature.help,
              usage: feature.usage,
              example: feature.example,
              tags: feature.category,
              premium: feature.premium,
              error: feature.error,
              update: feature.update,
              wait: feature.wait,
              description: feature.description,
            };
            commandMapping[helpItem] = Object.fromEntries(
              Object.entries(commandMapping[helpItem]).filter(
                ([_, value]) => value,
              ),
            );
          });
        }
      });

    let help = Object.values(features)
      .filter((plugin) => !plugin.disabled)
      .map((plugin) => {
        const result = {
          help: Array.isArray(plugin.help)
            ? plugin.help.filter((help) => help)
            : [plugin.help].filter((help) => help),
          tags: Array.isArray(plugin.category)
            ? plugin.category.filter((tag) => tag)
            : [plugin.category].filter((tag) => tag),
          premium: plugin.premium,
          error: plugin.error,
          update: plugin.update,
          wait: plugin.wait,
          usage: plugin.usage,
          example: plugin.example,
          description: plugin.description,
        };
        return Object.fromEntries(
          Object.entries(result).filter(([_, value]) => value),
        );
      })
      .filter((item) => Object.keys(item).length > 0);

    const allTagsAndHelp = Object.keys(tagCount)
      .map((tag) => {
        const daftarHelp = tagHelpMapping[tag]
          .map((helpItem, index) => {
            const commandInfo = commandMapping[helpItem];
            const usage = commandInfo.usage ? `${commandInfo.usage}` : "";
            const premiumIcon = commandInfo.premium ? "*[ premium ]*" : "";
            return ` *${index + 1}.* ${helpItem} /${usage} ${premiumIcon}`;
          })
          .join("\n│");
        return `┌─⭓「 *MENU ${tag.toUpperCase()}* *[ ${tagHelpMapping[tag].length} ]* 」
│${daftarHelp} 
└───────────────⭓`;
      })
      .join("\n");

    const cap =
      Func.Styles(`Hai`) +
      ` @${m.sender.split("@")[0]} ` +
      Func.Styles(`Perkenalkan nama saya Kaguya, saya adalah asisten pintar yang siap membantu Anda dengan fitur-fitur yang saya punya ^^

*• NameBot :* ${nama || kgy.user.name}
*• Version :* V${version}
*• Total User :* ${Object.keys(db.data.users).length}
*• Total Chat :* ${Object.keys(db.data.chats).length}
*• Runtime :* ${Func.toTime(process.uptime() * 1000)}
*• Total Fitur :* ${
        Object.values(features)
          .filter((v) => v.help)
          .map((v) => v.help)
          .flat(1).length
      }
*• Author :* L E X I C - T E A M

Ketik ${usedPrefix + command} *nama command* untuk mendapatkan informasi dari fitur bot ini

${allTagsAndHelp}`);

    if (text && Object.keys(commandMapping).includes(text)) {
      let data = commandMapping[text];
      let hasil =
        Func.Styles(`┌─⭓「 *${text.split("").join(" ").toUpperCase()}* 」
│ *• Kategori :* ${data.tags.join(", ")}
│ *• Status :* ${data.error >= 5 ? "Tidak aktif\n│ *• Reason :* Karena Error/Bug" : "Aktif"}
│ *• Diperbarui pada :* ${moment(data.update).tz("Asia/Jakarta").format("YY/MM/DD HH:mm")}
└───────────────⭓\n*[ ${data.premium ? "✓" : "x"} ]* Premium Only\n\n${data.example ? `「 *Penggunaan* 」\n${data.example.replace("%cmd", usedPrefix + text)}` : ""}\n\n${data.description ? data.description : "Tidak ada deskripsi"}`);
      m.reply(hasil);
    } else {
      kgy.sendMessage(m.chat, {
        text: cap,
        contextInfo: {
          mentionedJid: kgy.parseMention(cap),
          externalAdReply: {
            title: nama,
            body: settings.footer,
            thumbnailUrl: settings.cover,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      });
    }
  },
  wait: false,
  owner: false,
  group: false,
  private: false,
  botadmin: false,
  premium: false,
  error: 0,
  update: Date.now(),
  description: "Menampilkan semua fitur Kaguya",
};
