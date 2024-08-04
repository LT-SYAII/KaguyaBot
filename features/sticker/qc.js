//© Create by L E X I C -  T E A M

//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const uploader = require(process.cwd() + "/lib/uploader.js");
const axios = require("axios");

module.exports = {
    help: ["qc"], //nama fitur kamu
    usage: "*Input text*", //deskripsi singkat
    command: ["qc"], //untuk eksekusi fitur nya
    category: ["sticker"], //fitur kamu termasuk kategori apa?
    example: "*• Example :* %cmd *[input text]*", //
    run: async (m, {
        kgy,
        usedPrefix,
        command,
        text
    }) => {
        const pp = await kgy
            .profilePictureUrl(m.sender, "image")
            .catch((_) => "https://telegra.ph/file/320b066dc81928b782c7b.png");
        const obj = {
            type: "quote",
            format: "png",
            backgroundColor: "#161616",
            width: 512,
            height: 768,
            scale: 2,
            messages: [{
                entities: [],
                avatar: true,
                from: {
                    id: m.chat.split("@")[0],
                    name: m.name,
                    photo: {
                        url: pp,
                    },
                },
                text: text || "",
                replyMessage: {},
            }, ],
        };
        const json = await axios.post(
            "https://quotly.netorare.codes/generate",
            obj, {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const buffer = Buffer.from(json.data.result.image, "base64");
        kgy.sendImageAsSticker(m.chat, buffer, m, {
            packname: settings.packname,
            author: settings.version,
        });
    },
    wait: true, //menampilkan pesan menunggu
    owner: false, //Fitur ini Khusus owner
    group: false, //Fitur ini khusus didalam group
    private: false, //Fitur ini khusus di private chat
    botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
    premium: false, //Fitur ini khusus pengguna premium
    error: 0, //Menghitung total Error ( Jangan di ubah )
    update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
    description: "Mengubah text menjadi bubbles Chat",
};