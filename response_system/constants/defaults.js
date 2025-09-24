const config = require("../config/config")

exports.defaultChatTitle = "no title yet."
exports.defaultJobTimeUnit = config.cronJob.unit
exports.defaultJobTimeValue = config.cronJob.value