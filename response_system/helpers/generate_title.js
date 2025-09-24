const aiConfig = require("../config/ai.config")
const aiService = require("../services/ai.service")
const chatService = require("../services/chat.service")
const {formatConversation} = require("../utils/factory")

const generateTitle = async(obj) => {
    const {chatId} = obj
    if(!chatId)return 
    let conversation = await formatConversation(chatId)
    const title = await aiService.generateTitle(conversation)
    await chatService.updateChatTitle(chatId, title)
}

module.exports = {generateTitle}