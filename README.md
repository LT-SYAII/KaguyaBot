<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
</div>
<h4 align="center">🔴 WHITE SER <br>   create by White-team</h4>
<div align="center">
  <img height="200" src="https://files.catbox.moe/ed7ekj.jpg"  />
</div>
<br clear="both">

[![GROUP OFFICIAL](https://img.shields.io/badge/WhatsApp%20group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/CTQL9XFA0uk66xIYZWfKij) [![GROUP OFFICIAL](https://img.shields.io/badge/WhatsApp%20channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029ValCeztEwEjxwCeaEu1r)

![img](https://ik.imagekit.io/eypz/1723897893478_janJg_bWE.png)

### Step by step

```bash
$ pkg upgrade && pkg update
$ pkg install git -y
$ pkg install nodejs -y
$ pkg install ffmpeg -y
$ pkg install imagemagick -y
$ git clone https://github.com/W18T4 SE6/kaguyabot/
$ cd KaguyaBot
$ npm i
$ npm start
```

## Bagaimana cara menambah fitur?

Kamu dapat menambah fitur dengan simak contoh plugins dibawah

```Js
/* [ Info singkat ]
true = iya
false = tidak
 %cmd = prefix+command
*/
module.exports = {
    help: ["help"], //nama fitur kamu
    usage: "*Little description*", //deskripsi singkat
    command: ["command"], //untuk eksekusi fitur nya
    category: ["category"], //fitur kamu termasuk kategori apa?
    example: "Contoh : %cmd reply pessn bang", //Cara penggunaannya, kosongin jika fitur tersebut tidak perlu menggunakan Input apapun
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
     //masukan kode anda disini
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
    description: "Deskripsi kan fitur ini disini" //kosongkan jika tidak ingin di isi
}
```

Jika ingin membuat fitur yang dapat berjalan secara otomatis (seperti Antilink )
kamu bisa tiru kode dibawah ini

```js
module.exports = {
    event: async (m, {
        kgy,
        usedPrefix,
        command,
        text,
        isOwner,
        isPrems,
        isMods,
        isAdmin,
        isBotAdmin,
        chatUpdate
        args
      }) => {
     //masukan kode anda disini
    }
}
```

---
