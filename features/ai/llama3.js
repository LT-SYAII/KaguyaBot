//© Create by L E X I C -  T E A M

/*  [ Info singkat ]
 true = iya
 false = tidak
 %cmd = prefix+commsnd
*/
const axios = require("axios");

module.exports = {
  help: ["llama3"], //nama fitur kamu
  usage: "*Input question*", //deskripsi singkat
  command: ["llama3"], //untuk eksekusi fitur nya
  category: ["ai"], //fitur kamu termasuk kategori apa?
  example: "*• Example :* %cmd *[question]*", //Cara penggunaannya
  run: async (m, { kgy, usedPrefix, command, text }) => {
    let json = {
      model: "meta-llama/Meta-Llama-3.1-405B-Instruct",
      messages: [
        {
          role: "system",
          content: "Be a helpful assistant",
        },
        {
          role: "user",
          content: text,
        },
      ],
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
      top_k: 100,
    };
    let { data } = await axios.post(
      "https://imphnen-ai.vercel.app/api/llm/llama",
      json,
    );
    m.reply(
      `*[ LLAMA 3 ]*\n*• Model :* ${data.data.model}\n` +
        data.data.choices[0].message.content,
    );
  },
  wait: true, //menampilkan pesan menunggu
  owner: false, //Fitur ini Khusus owner
  group: false, //Fitur ini khusus didalam group
  private: false, //Fitur ini khusus di private chat
  botadmin: false, //Fitur ini khusus ketikan bot menjadi admin
  premium: false, //Fitur ini khusus pengguna premium
  error: 0, //Menghitung total Error ( Jangan di ubah )
  update: Date.now(), //kapan terakhir fitur ini di perbarui? ( Jangan di ubah )
  description: "Jawab Semua pertanyaan mu LLAMA Ai",
};
