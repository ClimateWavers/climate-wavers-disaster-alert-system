const postService = require("../services/post.service")
const aiService = require("../services/ai.service")
const aiConfig = require("../config/ai.config")
const { sendToQueue } = require("../lib/amqp")
const queues = require("../constants/queues")
const { getDefaultChannel } = require("../config/channels")


module.exports = async function () {
    const body = await aiService.generateEducativeQuote()
    const post = await postService.createTip({userId: aiConfig.id, username: aiConfig.username, body})
    const target = await postService.getTipById(post.id)
    console.log({target, post})
    sendToQueue(getDefaultChannel,queues.backend_post, {...target, waver_id: target.userId, content: target.body,})
}
