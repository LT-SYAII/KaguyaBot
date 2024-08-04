const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
module.exports = {
  event: async (m, { kgy, isAdmin, isBotAdmin }) => {
    if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true;
    let chat = db.data.chats[m.chat];
    let user = db.data.users[m.sender];
    let isGroupLink = linkRegex.exec(m.text);
    if (isGroupLink) {
      if (isAdmin) return;
      if (!isBotAdmin) return;
      if (user.warn >= 3) {
        await m.reply(`┌─⭓「 *ANTI - LINK* 」
│ *• Nama :* ${m.name}
q│ *• Tag :* @${m.sender.split("@")[0]}
│ *• Warn :* ${user.warn}/3
└───────────────⭓

Yah kamu sudah dikasih larangan kok di langgar sih 😥`);
        await kgy.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      } else {
        await m.reply(`┌─⭓「 *ANTI - LINK* 」
│ *• Nama :* ${m.name}
│ *• Tag :* @${m.sender.split("@")[0]}
│ *• Warn :* ${user.warn}/3
└───────────────⭓

Maaf kamu tidak diperbolehkan untuk mengirim link group disini !`);
        user.warn += 1;
        await kgy.sendMessage(m.chat, {
          delete: m.key,
        });
      }
    }
  },
};
