const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const logEvents = async (message) => {
  const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const log = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLogs.txt"),
      log
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
