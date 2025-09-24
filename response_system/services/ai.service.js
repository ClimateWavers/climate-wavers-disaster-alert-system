
const config = require("../config/config")
const postCategories = require("../constants/post_categories")
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} = require("@google/generative-ai");
const { cleanText } = require("../utils/cleanups");
const aiConfig = require("../config/ai.config");
const {formatConversation} = require("../utils/factory");
const { logBuilder } = require("../lib/log");


class AI{
    constructor(){
        const safetySettings = [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },{
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            }
          ];
        this.getSafetySettings = () =>({safetySettings})
        this.ai = new GoogleGenerativeAI(config.gemini.apiKey)
        this.promptCategories = postCategories

        this.usePrePrompt = (prompt, prevConversation, appLogs)=>{
            return `you are integrated as an AI chatbot named ${aiConfig.username} for a climate mitigation app "Climate wavers", generate a response for this prompt "${prompt}".${prevConversation && `generate your response based on previous conversation (if necessary) shown below: \n ${prevConversation}`}${appLogs && `. Also generate response from activities from the app using the logs below is applicable: ${appLogs}`}. respond with only the generated response, no label (e.g waver-x), and keep it brief and concise`
        }

        this.exec = async function(prompt, imageUrl = undefined) {
            const model = this.ai.getGenerativeModel({ model: "gemini-pro", ...this.getSafetySettings() });
            let image;
        
            if (imageUrl) {
                const response = await fetch(imageUrl);
                const buffer = await response.buffer();
                const mimeType = response.headers.get("content-type");
                image = {
                    inlineData: {
                        data: buffer.toString("base64"),
                        mimeType: mimeType,
                    },
                };
            }
            try{
                const result = await model.generateContent(!image ? prompt : [prompt, image]);
                const response = result.response;
                const text = cleanText(response.text());
                return text;
            }catch(err){
                console.log(`Generative AI Error: ${err.message} \n${err} `)
            }
        }
    }

    async checkChatCategory(message, image=undefined){
        const prompt = `consider this list ${this.promptCategories}, categorize this message "${message}" ${image && "with image attached "}and return the index of the category in the given list. respond strictly with only the index. e.g 0. No explanation is expected in your response`
        return this.exec(prompt)
    }

    async handleChatResponse(chatId, text, imageFile){
        const conversation = await formatConversation(chatId)
        const appLogs = await logBuilder.formatLogs()
        const prompt = this.usePrePrompt(text, conversation, appLogs)
        return this.exec(prompt, imageFile)
    }

    async getPossibleAffectedLocations(disaster, location){
        const prompt = `generate an array of locations that can be affected by a/an ${disaster} in ${location}. reponse should strictly look like this [LA, freetown, Lagos], no further explanation is expected in your response.`
        const aiRes = await this.exec(prompt)
        const startIndx = aiRes.indexOf("[")
        const endIndex = aiRes.indexOf("]")
        const statesArr = aiRes.slice(startIndx + 1, endIndex)
        return statesArr.split(",")
    }

    generateLiveDisasterResponse(location, disasterType){
        const prompt = `an individual claims there is a disaster (${disasterType}) ongoing in ${location} right now. respond strictly with an alert but calming message (informing them about the disaster, telling them precautions to take, and telling them to stay calm) for users in the environment.respond with the message only, no explanation is expected in your response`
        return this.exec(prompt)
    }

    generateEducativeQuote(){
        const topics = ["climate actions", "natural disasters", "carbon footprint", "global warming", "reforestation and deforestation", ]

        const prompt = `generate a tip/quote/message about ${topics[Math.floor(Math.random() * topics.length)]}. note: no prefix or title or suffix is expected, return only the message in your response`
        return this.exec(this.usePrePrompt(prompt))
    }

    getLocationFromPrompt(t){
        const prompt = `from this prompt (${t}) detect the location that is being referenced..respond with the location only, no explanation is expected in your response`
        return this.exec(prompt)
    }

    predictDisasterType(t, imageFile= undefined){
        const prompt = `from this prompt(${t})${imageFile && " and image attached"} detect the disaster type being reported referenced..respond with the disaster type only, no explanation is expected in your response`
        return this.exec(prompt, imageFile)
    }

    predictDisasterOccurence(disasterType, location){
        const prompt = `from this prompt(based on analysis of previous environmental data, Is it possible to experience a/an ${disasterType} by this time of the year in ${location})respond with a true or false..respond with true or false only, no explanation is expected in your response`
        return this.exec(prompt)
    }

    generateTitle(conversation){
        const prompt = `generate a short title for this conversation: "${conversation}".respond with the title only, no explanation is expected in your response`
        return this.exec(prompt)
    }

    getSafetyRecommendations(disasterType, magnitude=undefined, returnHtml=false ){
        const prompt = `generate safety recommendations ${returnHtml && "formatted (and styled properly) in HTML code "}for an occuring disaster (${disasterType}) ${magnitude && `with a severity of ${magnitude} out of 10 `}.${returnHtml && ` Your response must be in html (e.g <div styles="font-size:16px;" >recommendations here</div>)` }respond with the recommendations only, no explanation is expected in your response`
        return this.exec(prompt)
    }



}

const aiService = new AI()

module.exports = Object.freeze(aiService)