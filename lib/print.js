const fs = require("fs");
const chalk = require("chalk");

module.exports = async (m, conn = {}, chatUpdate) => {
  let type = m.isGroup ? "( GROUP CHAT )" : "( PRIVATE CHAT )";
  let user = global.db.data.users[m.sender];
  let from = await conn.getName(m.chat);
  let number = m.sender + ` [ ${m.name} ]`;
  let isBot = m.isBaileys ? "YA" : "NO";
  let plugin = m.plugin;
  let txt = "";
  if (m.text.length >= 30) {
    txt = m.text.slice(0, 29) + "...";
  } else {
    txt = m.text;
  }
  let cap = `${m.isCmd ? chalk.yellow.bold("[CMD]") : chalk.red.bold("[MSG]")} ${chalk.magenta.bold(user.name)} ${chalk.yellow.bold(type)} : ${chalk.white.bold(txt)}`;
  console.log(cap);
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update : ") + chalk.yellow.bold(file));
  delete require.cache[file];
  if (global.reloadHandler) console.log(global.reloadHandler());
});
