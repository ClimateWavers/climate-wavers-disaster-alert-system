const config = require("./config")
const ampq =require('amqplib')

let connection;

let CHAT_CHANNEL
let POST_CHANNEL
let LOG_CHANNEL
let DEFAULT_CHANNEL

exports.getChatChannel = async()=>{
    if(!connection){
        connection = await ampq.connect(config.amqp.url)
    }
    if(!CHAT_CHANNEL){
        CHAT_CHANNEL = connection.createChannel()
    }
    return CHAT_CHANNEL
}

exports.getPostChannel = async()=>{
    if(!connection){
        connection = await ampq.connect(config.amqp.url)
    }
    if(!POST_CHANNEL){
        POST_CHANNEL = connection.createChannel()
    }
    return POST_CHANNEL
}

exports.getLogsChannel = async()=>{
    if(!connection){
        connection = await ampq.connect(config.amqp.url)
    }
    if(!LOG_CHANNEL){
        LOG_CHANNEL = connection.createChannel()
    }
    return LOG_CHANNEL
}

exports.getDefaultChannel = async()=>{
    if(!connection){
        connection = await ampq.connect(config.amqp.url)
    }
    if(!DEFAULT_CHANNEL){
        DEFAULT_CHANNEL = connection.createChannel()
    }
    return DEFAULT_CHANNEL
}