const { logEvents } = require("../utils/logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name} : ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.txt");
  console.error(err.stack);
  const status = req.statusCode ? res.statusCode : 500;
  res.status(status);

  res.json({ message: err.message });
};

module.exports = errorHandler;
