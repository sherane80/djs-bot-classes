const { blue, red, cyan, yellow } = require("chalk");

class Logger {
  static log(type = "LOG", text) {
    switch (type.toLowerCase()) {
      case "log": {
        console.log(blue(`[LOG]   › ${text}`));
        break;
      }
      case "err": {
        console.log(red(`[ERR]   › ${text}`));
        break;
      }
      case "cmd": {
        console.log(cyan(`[CMD]   › ${text}`));
        break;
      }
      case "event": {
        console.log(yellow(`[EVENT] › ${text}`));
        break;
      }
    }
  }
}

module.exports = Logger;
