//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+command
*/
module.exports = {
    help: ["bcgc"], //nama fitur kamu
    usage: "*Input text*", //deskripsi singkat
    command: ["bcgc"], //untuk eksekusi fitur nya
    category: ["owner"], //fitur kamu termasuk kategori apa?
    example: "*• Example :* %cmd *[text]*", //Cara penggunaannya, kosongin jika fitur tersebut tidak perlu menggunakan Input apapun
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
        let group = Object.keys(store.groupMetadata);
        let q = m.quoted ? m.quoted : m
        let mime = q.mimetype || ""
        for (let i of group) {
            if (mime) {
                await kgy.sendMessage(i, {
                    forward: q.fakeObj
                });
                await kgy.delay(2000);
            } else {
                await kgy.reply(i, text, null);
                await kgy.delay(2000);
            }
        }
        m.reply(`*[ ✅ ]* Berhasil mengirim pesan broadcast ke ${group.length} group chat`)
    },
    wait: true, //menampilkan pesan menunggu 
    owner: false, //Fitur ini Khusus owner
    group: false, //Fitur ini khusus didalam group
    private: false, //Fitur ini khusus di private chat
    botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
    premium: false, //Fitur ini khusus pengguna premium
    admin: false, //Fitur ini khusus admin group
    error: 0, //Menghitung total Error ( Jangan di ubah )
    update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
    description: "Mengirim pesan siaran ke group chat" //kosongkan jika tidak ingin di isi
}