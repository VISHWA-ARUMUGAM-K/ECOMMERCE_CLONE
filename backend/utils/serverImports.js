const logger = require("../middlewares/logger.js");
const logEvents = require("../utils/logEvents.js");
const errorHandler = require("../middlewares/errorHandler.js");
const corsOptions = require("../config/corsOptions.js");
const connectDB = require("../config/dbConn.js");

module.exports = {
  logEvents,
  logger,
  errorHandler,
  corsOptions,
  connectDB,
};
