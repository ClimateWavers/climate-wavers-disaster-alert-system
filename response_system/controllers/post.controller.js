const queues = require("../constants/queues")

const validator = require("../services/validator.service") 

const catchAsyncErrors = require("../lib/catchAsync")

const postService = require("../services/post.service")

const { sendToQueue } = require('../lib/amqp')
const { getLocation } = require("../utils/factory")
const { getPostChannel } = require("../config/channels")

const createPost = catchAsyncErrors(async(req, res)=>{
    const body = {...req.body}
    const validationRes = validator.validatePost(body)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    if(body.replyTo){
        const target = await postService.getById(body.replyTo)
        if(!target)return res.status(404).json({message: "post not found"})
    }   
    if(body.location){
        body.coordinate = body.location
    }
    !body.replyTo && (body.location = (await getLocation(req.socket.remoteAddress))?.city)
    const post = await postService.create({...body})
    if(!post)return res.status(400).json("failed to create post.")
    !body.replyTo && sendToQueue(getPostChannel, queues.analyze_post, post)
    sendToQueue(getPostChannel,queues.backend_post, {...body, waver_id: body.userId, content: body.body, })
    return res.status(201).json(post)
    
})

const getPosts = catchAsyncErrors(async(req, res)=>{
    const posts = await postService.getAll()
    return res.status(200).json(posts)
})

const getPost = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const post = await postService.getById(req.params.id)
    return res.status(200).json(post)
})

const getPostsByUserId = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const posts = await postService.getAll({userId: req.params.id})
    return res.status(200).json(posts || [])
})

const getPostReplies = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    const posts = await postService.getAll({replyTo: req.params.id})
    return res.status(200).json(posts || [])
})

const likePost = catchAsyncErrors(async(req, res)=>{
    const validationRes = validator.validateGetByIdObj(req.params)
    if(validationRes.error)return res.status(400).json({message: validationRes.error.message})
    if(!req.body.userId)return res.status(400).json({message: "userId is required."})
    await postService.like(req.params.id, req.body.userId)
    const post = await postService.getById(req.params.id)
    return res.status(200).json(post)
})

module.exports = {createPost, getPosts, getPost, getPostReplies, getPostsByUserId, likePost}