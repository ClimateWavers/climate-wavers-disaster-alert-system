/**
 * @swagger
 * /api/v1/chats:
 *   post:
 *     summary: Creates a chat with chatbot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 id:
 *                   type: string
 *   get:
 *     summary: Get all chats
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the user to get chats for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns all user chats
 * 
 * /api/v1/chats/{chatId}:
 *   post:
 *     summary: Post a message to a chat
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: ID of the chat you want to send a message to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message posted successfully
 *   get:
 *     summary: Get messages from a chat
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         description: ID of the chat to get messages from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns messages from the chat
 */


const { Router } = require("express")
const { postMessage, getMessages, getChats, createChat } = require("../controllers/chat.controller")

const router = Router()

router.post("/", createChat)
router.get("/", getChats)
router.post("/:id", postMessage)
router.get('/:id', getMessages)



module.exports = router