const useQueue = async function(getChannel, queueName, callback){
    try{
        const channel = await getChannel()
        channel.assertQueue(queueName, {durable: false})
        .then(res=>{ console.log(`info: channel- ${queueName} asserted.`)})
        channel.consume(queueName, async(msg)=>{
            if(msg !== null){
                const parsed = JSON.parse(msg.content)
                try{
                    await callback(parsed)
                }catch(ex){
                    console.log(`useQueue callback function failed - ${ex}`)
                }
                channel.ack(msg)
            }
        })
        }catch(err){
            console.log("amqp error: ", err)
        }
}

const sendToQueue = async function(getChannel, queueName, data){
    try{
        const channel = await getChannel()
        channel.assertQueue(queueName, {durable: false})
        const str = JSON.stringify(data)
        channel.sendToQueue(queueName, Buffer.from(str))
    }catch(err){
        console.log('failed to send to queue...')
        console.log({err})
    }
}

module.exports = { useQueue, sendToQueue }