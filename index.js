process.on("uncaughtException", console.error);
const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const CFonts = require("cfonts");
const chalk = require("chalk");
const unhandledRejections = new Map();
process.on("unhandledRejection", (reason, promise) => {
  unhandledRejections.set(promise, reason);
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("rejectionHandled", (promise) => {
  unhandledRejections.delete(promise);
});
process.on("Something went wrong", function (err) {
  console.log("Caught exception: ", err);
});

function start() {
  let args = [path.join(__dirname, "kaguya.js"), ...process.argv.slice(2)];
  let p = spawn(process.argv[0], args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  })
    .on("message", (data) => {
      if (data === "reset") {
        console.log("Restarting...");
        p.kill();
        delete p;
      }
    })
    .on("exit", (code) => {
      console.error("Exited with code:", code);
      start();
    });
}

console.log(
  chalk.red.bold(`' .---------------------------------------------------.
' |.██.▄█▀▄▄▄........▄████..█....██▓██...██▓.▄▄▄......|
' |.██▄█▒▒████▄.....██▒.▀█▒.██..▓██▒▒██..██▒▒████▄....|
' |▓███▄░▒██..▀█▄..▒██░▄▄▄░▓██..▒██░.▒██.██░▒██..▀█▄..|
' |▓██.█▄░██▄▄▄▄██.░▓█..██▓▓▓█..░██░.░.▐██▓░░██▄▄▄▄██.|
' |▒██▒.█▄▓█...▓██▒░▒▓███▀▒▒▒█████▓..░.██▒▓░.▓█...▓██▒|
' |▒.▒▒.▓▒▒▒...▓▒█░.░▒...▒.░▒▓▒.▒.▒...██▒▒▒..▒▒...▓▒█░|
' |░.░▒.▒░.▒...▒▒.░..░...░.░░▒░.░.░.▓██.░▒░...▒...▒▒.░|
' |░.░░.░..░...▒...░.░...░..░░░.░.░.▒.▒.░░....░...▒...|
' |░..░........░..░......░....░.....░.░...........░..░|
' |.................................░.░...............|
' '---------------------------------------------------'`),
);

console.log(
  chalk.red.bold(`Operating System Information:
- Platform: ${chalk.yellow.bold(os.platform())}
- Release: ${chalk.yellow.bold(os.release())}
- Architecture: ${chalk.yellow.bold(os.arch())}
- Hostname: ${chalk.yellow.bold(os.hostname())}
- Total Memory: ${chalk.yellow.bold(`${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)}
- Free Memory: ${chalk.yellow.bold(`${(os.freemem() / 1024 / 1024).toFixed(2)} MB`)}`),
);
console.log(
  chalk.yellow.bold("[===============================================]"),
);
console.log(chalk.magenta.bold("L   O    A   D   I    N    G    .   . "));
start();
