(async () => {
  require("./settings");
  const {
    default: makeWASocket,
    useMultiFileAuthState,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    DisconnectReason,
    fetchLatestBaileysVersion,
    PHONENUMBER_MCC,
    Browsers,
    proto,
    jidNormalizedUser,
  } = require("baileys");
  const WebSocket = require("ws");
  const path = require("path");
  const p = require("pino");
  const pino = require("pino");
  const Pino = require("pino");
  const { Boom } = require("@hapi/boom");
  const fs = require("fs");
  const chokidar = require("chokidar");
  const readline = require("readline");
  const NodeCache = require("node-cache");
  const yargs = require("yargs/yargs");
  const cp = require("child_process");
  const { promisify, format } = require("util");
  const exec = promisify(cp.exec).bind(cp);
  const _ = require("lodash");
  const syntaxerror = require("syntax-error");
  const os = require("os");
  const simple = require("./lib/simple.js");
  const { randomBytes } = require("crypto");
  const moment = require("moment-timezone");
  const chalk = require("chalk");
  const readdir = promisify(fs.readdir);
  const stat = promisify(fs.stat);

  var low;
  try {
    low = require("lowdb");
  } catch (e) {
    low = require("./lib/lowdb");
  }
  const { Low, JSONFile } = low;
  const randomID = (length) =>
    randomBytes(Math.ceil(length * 0.5))
      .toString("hex")
      .slice(0, length);
  const PORT = process.env.PORT || 3000;

  global.opts = new Object(
    yargs(process.argv.slice(2)).exitProcess(false).parse(),
  );
  global.prefix = new RegExp(
    "^[" +
      (
        opts["prefix"] ||
        "â€ŽxzXZ/i!#$%+Â£Â¢â‚¬Â¥^Â°=Â¶âˆ†Ã—Ã·Ï€âˆšâœ“Â©Â®:;?&.\\-"
      ).replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") +
      "]",
  );
  db = new Low(
    /https?:\/\//.test(opts["db"] || "")
      ? new cloudDBAdapter(opts["db"])
      : new JSONFile(`${opts._[0] ? opts._[0] + "_" : ""}${settings.dataname}`),
  );

  DATABASE = db;
  loadDatabase = async function loadDatabase() {
    if (!db.READ) {
      setInterval(async () => {
        await db.write(db.data || {});
      }, 2000);
    }
    if (db.data !== null) return;
    db.READ = true;
    await db.read();
    db.READ = false;
    db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
      settings: {},
      respon: {},
      ...(db.data || {}),
    };
    db.chain = _.chain(db.data);
  };
  loadDatabase();
  global.authFolder = settings.sessions;

  const logger = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`,
  }).child({
    class: "kgy",
  });
  logger.level = "fatal";

  global.store = makeInMemoryStore({
    logger,
  });

  function createTmpFolder() {
    const folderName = "tmp";
    const folderPath = path.join(__dirname, folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(
        chalk.green.bold(`[ Success ] Folder '${folderName}' berhasil dibuat.`),
      );
    }
  }
  createTmpFolder();
  const { state, saveState, saveCreds } =
    await useMultiFileAuthState(authFolder);
  const msgRetryCounterMap = (MessageRetryMap) => {};
  const msgRetryCounterCache = new NodeCache();
  const { version } = await fetchLatestBaileysVersion();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (texto) =>
    new Promise((resolver) => rl.question(texto, resolver));

  store.readFromFile(process.cwd() + `/${global.authFolder}/store.json`);

  const connectionOptions = {
    logger: pino({
      level: "silent",
    }),
    printQRInTerminal: !settings.use_pairing,
    browser: Browsers.ubuntu("Edge"),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg?.message || undefined;
      }

      return proto.Message.fromObject({});
    },
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  };
  global.kgy = simple.makeWASocket(connectionOptions, store);
  store?.bind(kgy?.ev);

  if (settings.use_pairing && !kgy.authState.creds.registered) {
    console.log(
      chalk.blue.bold(
        "[ Question ] Masukkan nomor WhatsApp Anda, contoh: 628****",
      ),
    );
    const phoneNumber = await question(chalk.green.bold(chalk.blue.bold("> ")));
    const code = await kgy.requestPairingCode(phoneNumber);
    console.log(
      chalk.green.bold(
        "[ Success ] Kode Pairing Anda : " +
          code?.match(/.{1,4}/g)?.join("-") || code,
      ),
    );
  }
  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin } = update;
    global.stopped = connection;
    if (isNewLogin) kgy.isInit = true;
    if (update.qr != 0 && update.qr != undefined) {
    }
    if (connection == "open") {
      console.log(
        chalk.yellow.bold(
          `[ Success ] Sukses terhubung ke : ${JSON.stringify(kgy.user, null, 2)}`,
        ),
      );
    }
    let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
    if (connection === "close") {
      if (reason === DisconnectReason.badSession) {
        kgy.logger.error(
          `Sesi Buruk!, hapus ${global.authFolder} dan sambungkan kembali`,
        );
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.connectionClosed) {
        kgy.logger.warn(`Koneksi ditutup, menyambungkan kembali...`);
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.connectionLost) {
        kgy.logger.warn(`Koneksi terputus `);
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.connectionReplaced) {
        kgy.logger.error(`Koneksi terganti, harap untuk menunggu...`);
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.loggedOut) {
        kgy.logger.error(`Koneksi Logout, silakan hapus & buat sesi baru Anda`);
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.restartRequired) {
        kgy.logger.info(`Perlu dimulai ulang, harap tunggu...`);
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.timedOut) {
        kgy.logger.warn(`Waktu koneksi habis`);
        console.log(reloadHandler(true));
      } else {
        kgy.logger.warn(`Koneksi ditutup ${reason || ""}: ${connection || ""}`);
        console.log(reloadHandler(true));
      }
    }
  }
  process.on("uncaughtException", console.error);
  let isInit = true,
    handler = require("./handler");
  reloadHandler = function (restatConn) {
    let Handler = require("./handler");
    if (Object.keys(Handler || {}).length) handler = Handler;
    if (restatConn) {
      try {
        kgy.ws.close();
      } catch {}
      kgy = {
        ...kgy,
        ...simple.makeWASocket(connectionOptions),
      };
    }
    if (!isInit) {
      kgy.ev.off("messages.upsert", kgy.handler);
      kgy.ev.off("group-participants.update", kgy.onParticipantsUpdate);
      kgy.ev.off("connection.update", kgy.connectionUpdate);
      kgy.ev.off("creds.update", kgy.credsUpdate);
    }
    kgy.handler = handler.handler.bind(kgy);
    kgy.onParticipantsUpdate = handler.participantsUpdate.bind(kgy);
    kgy.connectionUpdate = connectionUpdate.bind(kgy);
    kgy.credsUpdate = saveCreds.bind(kgy);
    kgy.ev.on("messages.upsert", kgy.handler);
    kgy.ev.on("group-participants.update", kgy.onParticipantsUpdate);
    kgy.ev.on("connection.update", kgy.connectionUpdate);
    kgy.ev.on("creds.update", kgy.credsUpdate);
    kgy.ev.on("contacts.update", (update) => {
      for (let contact of update) {
        let id = jidNormalizedUser(contact.id);
        if (store && store.contacts)
          store.contacts[id] = {
            ...(store.contacts?.[id] || {}),
            ...(contact || {}),
          };
      }
    });
    kgy.ev.on("contacts.upsert", (update) => {
      for (let contact of update) {
        let id = jidNormalizedUser(contact.id);
        if (store && store.contacts)
          store.contacts[id] = {
            ...(contact || {}),
            isContact: true,
          };
      }
    });
    kgy.ev.on("groups.update", (updates) => {
      for (const update of updates) {
        const id = update.id;
        if (store.groupMetadata[id]) {
          store.groupMetadata[id] = {
            ...(store.groupMetadata[id] || {}),
            ...(update || {}),
          };
        }
      }
    });
    isInit = false;
    return true;
  };
  console.log(chalk.blue.bold("[ Process ] Muat File di plugin Direktori"));
  global.features = {};
  let Scandir = async (dir) => {
    let subdirs = await readdir(dir);
    let files = await Promise.all(
      subdirs.map(async (subdir) => {
        let res = path.resolve(dir, subdir);
        return (await stat(res)).isDirectory() ? Scandir(res) : res;
      }),
    );
    return files.reduce((a, f) => a.concat(f), []);
  };

  try {
    let files = await Scandir("./features");
    let features = {};
    for (let filename of files.map((a) => a.replace(process.cwd(), ""))) {
      try {
        features[filename] = require(path.join(process.cwd(), filename));
      } catch (e) {
        console.log(chalk.red.bold(e));
        delete features[filename];
      }
    }
    const watcher = chokidar.watch(path.resolve("./features"), {
      persistent: true,
      ignoreInitial: true,
    });
    watcher
      .on("add", async (filename) => {
        console.log(
          chalk.green.bold(
            "[ New ] Plugin Baru Terdeteksi : " +
              filename.replace(process.cwd(), ""),
          ),
        );
        features[filename.replace(process.cwd(), "")] = require(filename);
      })
      .on("change", async (filename) => {
        if (
          require.cache[filename] &&
          require.cache[filename].id === filename
        ) {
          features[filename.replace(process.cwd(), "")] =
            require.cache[filename].exports;
          console.log(
            chalk.blue.bold(
              "[ Change ] Perubahan kode pada Files : " +
                filename.replace(process.cwd(), ""),
            ),
          );
          delete require.cache[filename];
        }
        let err = syntaxerror(
          fs.readFileSync(filename),
          filename.replace(process.cwd(), ""),
        );
        if (err)
          kgy.logger.error(`syntax error while loading '${filename}'\n${err}`);
        features[filename.replace(process.cwd(), "")] = require(filename);
      })
      .on("unlink", (filename) => {
        console.log(
          chalk.yellow.bold(
            "[ Delete ] Sukses Hapus : " + filename.replace(process.cwd(), ""),
          ),
        );
        delete features[filename.replace(process.cwd(), "")];
      });
    features = Object.fromEntries(
      Object.entries(features).sort(([a], [b]) => a.localeCompare(b)),
    );
    global.features = features;
    console.log(
      chalk.green.bold(
        `[ Success ] Berhasil Memuat ${Object.keys(features).length} features`,
      ),
    );
  } catch (e) {
    console.error(e);
  }
  setInterval(async () => {
    if (store.groupMetadata)
      fs.writeFileSync(
        process.cwd() + `/${global.authFolder}/store-group.json`,
        JSON.stringify(store.groupMetadata),
      );
    if (store.contacts)
      fs.writeFileSync(
        process.cwd() + `/${global.authFolder}/store-contacts.json`,
        JSON.stringify(store.contacts),
      );
    store.writeToFile(process.cwd() + `/${global.authFolder}/store.json`);
  }, 10 * 1000);

  reloadHandler();
})();

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
