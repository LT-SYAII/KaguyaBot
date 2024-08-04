//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const FormData = require("form-data");
const Jimp = require("jimp");

module.exports = {
  help: ["unblur", "enchaner", "enhance", "hdr", "colorize", "hd", "remini"], //nama fitur kamu
  usage: "*Input media*", //deskripsi singkat
  command: ["unblur", "enchaner", "enhance", "hdr", "colorize", "hd", "remini"], //untuk eksekusi fitur nya
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
    switch (command) {
      case "enhancer":
      case "unblur":
      case "enhance":
        {
          let q = m.quoted ? m.quoted : m;
          let mime = (q.msg || q).mimetype || q.mediaType || "";
          if (!mime)
            throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`;
          let img = await q.download?.();
          let error;
          try {
            const This = await processing(img, "enhance");
            m.reply(`「 *${command.toUpperCase()} IMAGE* 」`, This);
          } catch (er) {
            error = true;
          } finally {
            if (error) {
              m.reply(eror);
            }
          }
        }
        break;
      case "colorize":
      case "colorizer":
        {
          let q = m.quoted ? m.quoted : m;
          let mime = (q.msg || q).mimetype || q.mediaType || "";
          if (!mime)
            throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`;
          let img = await q.download?.();
          let error;
          try {
            const This = await processing(img, "enhance");
            m.reply(`「 *${command.toUpperCase()} IMAGE* 」`, This);
          } catch (er) {
            error = true;
          } finally {
            if (error) {
              m.reply(eror);
            }
          }
        }
        break;
      case "hd":
      case "hdr":
      case "remini":
        {
          let q = m.quoted ? m.quoted : m;
          let mime = (q.msg || q).mimetype || q.mediaType || "";
          if (!mime)
            throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`;
          let img = await q.download?.();
          let error;
          try {
            const This = await processing(img, "enhance");
            m.reply(`「 *${command.toUpperCase()} IMAGE* 」`, This);
          } catch (er) {
            error = true;
          } finally {
            if (error) {
              m.reply(eror);
            }
          }
        }
        break;
    }
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Untuk meningkatkan resolusi gambar anda", //kosongkan jika tidak ingin di isi
};

/*====[ FUNCTION ]======*/
async function processing(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance", "recolor", "dehaze"];
    Methods.includes(method) ? (method = method) : (method = Methods[0]);
    let buffer,
      Form = new FormData(),
      scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        let data = [];
        res
          .on("data", function (chunk, resp) {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data));
          });
        res.on("error", (e) => {
          reject();
        });
      },
    );
  });
}
