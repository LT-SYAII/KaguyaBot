//© Create by L E X I C -  T E A M

const util = require("util");
const { exec } = require("child_process");

module.exports = {
  event: async (m, { kgy, isOwner }) => {
    if (m.text.startsWith("=>")) {
      if (!isOwner) return;
      let { key } = await kgy.sendMessage(
        m.chat,
        {
          text: "evaling...",
        },
        {
          quoted: m,
        },
      );
      try {
        const result = await eval(
          `(async () => { return ${m.text.slice(3)} })()`,
        );
        await kgy.sendMessage(m.chat, {
          text: util.format(result),
          edit: key,
        });
      } catch (e) {
        await kgy.sendMessage(m.chat, {
          text: util.format(e),
          edit: key,
        });
      }
      return;
    }

    if (m.text.startsWith(">")) {
      if (!isOwner) return;
      let { key } = await kgy.sendMessage(
        m.chat,
        {
          text: "evaling...",
        },
        {
          quoted: m,
        },
      );
      try {
        const result = await eval(`(async() => { 
${m.text.slice(2)}
})()`);
        await kgy.sendMessage(m.chat, {
          text: util.inspect(result),
          edit: key,
        });
      } catch (e) {
        await kgy.sendMessage(m.chat, {
          text: util.format(e),
          edit: key,
        });
      }
      return;
    }

    if (m.text.startsWith("$")) {
      if (!isOwner) return;
      let { key } = await kgy.sendMessage(
        m.chat,
        {
          text: "executed...",
        },
        {
          quoted: m,
        },
      );
      exec(m.text.slice(2), async (err, stdout) => {
        if (err)
          return await kgy.sendMessage(m.chat, {
            text: util.format(err),
            edit: key,
          });
        if (stdout)
          return await kgy.sendMessage(m.chat, {
            text: stdout,
            edit: key,
          });
      });
      return;
    }
  },
};
