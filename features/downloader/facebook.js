//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
*/
const fetch = require("node-fetch");

module.exports = {
    help: ["fb", "facebook"], //nama fitur kamu
    usage: "*Input url*", //deskripsi singkat
    command: ["fb", "facebook"], //untuk eksekusi fitur nya
    category: ["downloader"], //fitur kamu termasuk kategori apa?
    example: "*• Example :* %cmd *[url]*", //Cara penggunaannya, kosongin jika fitur tersebut tidak perlu menggunakan Input apapun
    run: async (m, {
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
        args
    }) => {
        let data = await FbDownload(text);
        let cap = `┌─⭓「  *FACEBOOK DOWNLOADER* 」
│ *• Judul :* ${data.title}
└───────────────⭓`
        m.reply(cap, data.links["Download Low Quality"])
    },
    wait: true, //menampilkan pesan menunggu 
    owner: false, //Fitur ini Khusus owner
    group: false, //Fitur ini khusus didalam group
    private: false, //Fitur ini khusus di private chat
    botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
    premium: false, //Fitur ini khusus pengguna premium
    admin: false, //Fitur ini khusus admin group
    error: 0, //Menghitung total Error ( Jangan di ubah )
    update: Date.now(), //kapan terakhir fitur ini diperbarui? ( Jangan di ubah )
    description: "untuk Mendownload video dari Facebook " //kosongkan jika tidak ingin di isi
}

/*=====[ FUNCTION ]=====*/
async function FbDownload(vid_url) {
    try {
        const data = {
            url: vid_url
        };
        const searchParams = new URLSearchParams();
        searchParams.append("url", data.url);
        const response = await fetch("https://facebook-video-downloader.fly.dev/app/main.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: searchParams.toString()
        });
        return await response.json();
    } catch (e) {
        return null;
    }
}