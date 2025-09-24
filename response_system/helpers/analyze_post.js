const aiConfig = require("../config/ai.config")
const { getDefaultChannel } = require("../config/channels")
const queues = require("../constants/queues")
const { sendToQueue } = require("../lib/amqp")
const aiService = require("../services/ai.service")
const postService = require("../services/post.service")
const { getPredictions } = require("./get_prediction")

async function analyzePost(obj){
    try{
    const {id: postId} = obj
    const post = await postService.getById(postId)
    const catIndex = await aiService.checkChatCategory(post.body, post.image)
    const location = post.location
    if(catIndex == "0"){
        const body = `hello @${post.username} we noticed you flagged this post as a disaster report post, kindly refrain from this action to prevent raising false alarm to the public`
        await postService.create({userId: aiConfig.id, username: aiConfig.username, body, replyTo: post.id})
        return
    }else{
        const body = `hello @${post.username} thank you for providing this information, we are currently analyzing your post, we will make a post to address the public as soon as possible. We also advice making a report containing a precise location if you haven't.`
        await postService.create({userId:aiConfig.id, username: aiConfig.username, body, replyTo: post.id, isAlert: false})
        const aiPrediction  = await aiService.predictDisasterType(post.body)
        const aiMessage = await aiService.generateLiveDisasterResponse(location, aiPrediction)
        let reportMessage = ""
        
        //create a report here
        const reportBody = {userId:aiConfig.id, username: aiConfig.username, body: aiMessage, isAlert: true}
        if(body.image){
            reportBody.image = body.image
            //get image inference
        }
        await postService.create(reportBody)
        //send queue event to notifications service
        sendToQueue(getDefaultChannel, queues.disaster_alert,{data: {city: location, disasterType: aiPrediction}})
        return 
    }


    }catch(err){
        console.log(err)
    }
}

module.exports = analyzePost