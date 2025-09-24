const logService = require("../services/log.service")
const { formatLog } = require("../utils/factory")


module.exports = async function (logObject) {
    const details = formatLog(logObject)
    if(!details)return 
    await logService.createLog({createdAt: Date.now(), details})
}