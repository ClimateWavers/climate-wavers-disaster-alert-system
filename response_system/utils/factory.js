const config = require("../config/config")
const firebaseService = require("../services/firebase.service")
const aiConfig = require('../config/ai.config')
const axios = require("axios")
const validatorService = require("../services/validator.service")


exports.getLocation  = async function(ip){
    try{
        const response = await axios.get(`${config.ipInfo.url}/${ip}/?token=${config.ipInfo.token}`)
            return response.data 
    }catch(err){
        console.log("failed to get location")
        return {city: "Not Found"}
    }
}

exports.formatConversation = async function(chatId, limit=6){
    if(!chatId)return 
    const path = `ChatMessages/${chatId}/messages`
    let conversation = ""
    const {docs: messageDocs} = await firebaseService.getAll(path, {chatId})
    const messages = messageDocs.map(d=>({...d.data(), remoteId: d.id, id: d.id})).sort((a,b)=>a.postedAt-b.postedAt)
    if(!messages?.length)return
    for(let i = messages.length >= limit? messages.length - limit: 0; i < messages.length; i++){
        const messageObj = messages[i]
        conversation += `${messageObj.postedBy == aiConfig.id? aiConfig.username: "User"}: ${messageObj.body} \n`
    }   
    return conversation
}

exports.isEndpointOk = async function (testUrl) {
    try{
        const res = await axios.get(testUrl)
        if(res.status.toString().startsWith("2"))return true
        return false
    }catch(err){
        return false
    }
}

exports.formatLog = function (logObj){
    const {error} = validatorService.validateLogObject(logObj)
    if(error)return
    let res = ""
    logObj.timestamp && (res += `\n timestamp: ${logObj.timestamp}`)
    res += `\n action: ${logObj.action}`
    res += `\n data: `
    let reqData = ""
    for(let key in logObj.data){
        reqData += `\n    ${key}: ${logObj.data[key]}`
    }
    res += reqData

    return res
}

exports.getLogAction = (ns, method, username)=>{
    const logActions = {
        post: {
            "POST": username? (username + " created post"):"post created",
            "PUT": username? (username + " updated post"):"post updated",
        }
    }
    return logActions[ns]? logActions[ns][method]: ""
}