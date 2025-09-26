const { getLogsChannel } = require("../config/channels")
const queues = require("../constants/queues")
const logService = require("../services/log.service")
const { formatLog, getLogAction } = require("../utils/factory")
const { sendToQueue } = require("./amqp")

class LogBuilder{

    listen(namespace){
        if(!namespace)throw Error("Log namespace is required")

        const meths = ["POST", "PUT", "PATCH"]
        return (req, res, next)=>{
            if(!meths.includes(req.method))return next()
            res.on("finish",async()=>{
                if(res.statusCode.toString().startsWith("2")){
                    
                    const logObj = {
                        action: getLogAction(namespace, req.method, req.body.username),
                        data: req.body
                    }
                    if(!logObj.action){
                        logObj.action = `${req.method} request to ${req.path}.`
                    }
                    sendToQueue(getLogsChannel,queues.build_log, logObj)
                    return next()
                }
            })
            next()
        }
    }

    async formatLogs(start=Date.now() - (7 * 24 * 60 * 60 * 1000)){
        const logs = await logService.getLogs(start)
        return logs.join("\n\n")
    }
}

exports.logBuilder = new LogBuilder()