const config = require("../config/config")


const Replicate = require("replicate")
const replicate = new Replicate({auth: config.llm.apiKey})



class LLM{
    constructor(){
        // this.llmModel = new Replicate({
        //     model: llmConfig.model,
        //     auth: llmConfig.apiKey,
        //     apiKey: llmConfig.apiKey,
        // })
    }

    async invoke(chatId, inputObj){
        const output = await replicate.run(
            config.llm.model,
            {
              input: {
                prompt: "An astronaut riding a rainbow unicorn, cinematic, dramatic",
              },
            }
          );

        console.log(output)
    }
}

const llm = new LLM();

(async()=>{
    try{
    const res = await llm.invoke("1234", {text: "what is a noun", })
    console.log({res})

    }catch(err){
        console.log({err})
    }
})()

module.exports = llm