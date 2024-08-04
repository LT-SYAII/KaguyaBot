//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
 */
const moment = require("moment-timezone");
const PhoneNum = require("awesome-phonenumber");
let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

module.exports = {
  help: ["wastalk"], //nama fitur kamu
  usage: "*Input number*", //deskripsi singkat
  command: ["wastalk"], //untuk eksekusi fitur nya
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
    let num = m.quoted?.sender || m.mentionedJid?.[0] || text;
    if (!num) throw `*• Example :* ${usedPrefix + command} *[Number]*`;
    num = num.replace(/\D/g, "") + "@s.whatsapp.net";
    if (!(await kgy.onWhatsApp(num))[0]?.exists)
      throw "Nomor tidak terdaftar di aplikasi WhatsApp !";
    let img = (await kgy.profilePictureUrl(num, "image")) || false;
    let bio = await kgy.fetchStatus(num).catch((_) => {});
    let name = await kgy.getName(num);
    let business = await kgy.getBusinessProfile(num);
    let format = PhoneNum(`+${num.split("@")[0]}`);
    let country = regionNames.of(format.getRegionCode("international"));
    let wea = `*[ WhatsApp Stalk ]*\n\n*° Country :* ${country.toUpperCase()}\n*° Name :* ${name ? name : "-"}\n*° Format Number :* ${format.getNumber("international")}\n*° Url Api :* wa.me/${num.split("@")[0]}\n*° Mentions :* @${num.split("@")[0]}\n*° Status :* ${bio?.status || "-"}\n*° Date Status :* ${bio?.setAt ? moment(bio.setAt.toDateString()).locale("id").format("LL") : "-"}\n\n${business ? `*[ WhatsApp Business Stalk ]*\n\n*° BusinessId :* ${business.wid}\n*° Website :* ${business.website ? business.website : "-"}\n*° Email :* ${business.email ? business.email : "-"}\n*° Category :* ${business.category}\n*° Address :* ${business.address ? business.address : "-"}\n*° Timeone :* ${business.business_hours.timezone ? business.business_hours.timezone : "-"}\n*° Descripcion* : ${business.description ? business.description : "-"}` : "*Standard WhatsApp Account*"}`;
    img
      ? await kgy.sendMessage(
          m.chat,
          {
            image: {
              url: img,
            },
            caption: wea,
            mentions: [num],
          },
          {
            quoted: m,
          },
        )
      : m.reply(wea);
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Untuk mendapatkan informasi nomor WhatsApp ", //kosongkan jika tidak ingin di isi
};
