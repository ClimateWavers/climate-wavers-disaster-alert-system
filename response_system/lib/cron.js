const cron = require("node-cron")
const postService = require("../services/post.service")
const aiService = require("../services/ai.service")
const aiConfig = require("../config/ai.config")


const scheduleObj= {sec: "*", min: "*", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*"}

function useCron(fn, schObj = {...scheduleObj}){
    const obj = { ...scheduleObj}
    for(let key in schObj){
        schObj[key] && (obj[key] = schObj[key].toString())
    }
    const scheduleStr = Object.values(obj).join(" ")
    console.log("scheduled string " + scheduleStr + "active...")
    cron.schedule(scheduleStr, async function(){
        fn()
    })
}

module.exports = useCron