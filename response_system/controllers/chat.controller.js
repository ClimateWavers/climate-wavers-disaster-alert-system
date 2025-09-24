const validator = require("../services/validator.service") 

const catchAsyncErrors = require("../lib/catchAsync")

const chatService = require('../services/chat.service')
const { sendToQueue } = require("../lib/amqp")
const queues = require("../constants/queues")
const { getChatChannel } = require("../config/channels")

const postMessage = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const objValidation = validator.validateChatBody({...req.body})
    if(objValidation.error)return res.status(400).json({message: objValidation.error.message})
    const chat = await chatService.getChat(req.params.id)
    if(!chat?.id)return res.status(404).json({message: "chat not found"})
    const responseObj = await chatService.generateResponse(req.body.userId, req.params.id, req.body.body)
    const messages = await chatService.getMessages(chat.id)
    // if(messages.length == 2 || messages.length % 6 == 0){
        sendToQueue(getChatChannel,queues.generate_chat_title, {chatId: chat.id})
    // }
    return res.status(201).json(responseObj)
})

const getMessages = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const chat = await chatService.getChat(req.params.id)
if(!chat?.id)return res.status(404).json({message: "chat not found."})
    const messages = await chatService.getMessages(req.params.id)
    return res.status(200).json(messages)
})

const createChat = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateCreateChatPayLoad(req.body)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const newChat = await chatService.createChat(req.body.userId)
    return res.status(201).json(newChat)
})

const getChats = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateCreateChatPayLoad(req.query)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const chats = await chatService.getChats(req.query.userId)
    return res.status(200).json(chats)
})



module.exports ={ postMessage, getMessages, createChat, getChats}