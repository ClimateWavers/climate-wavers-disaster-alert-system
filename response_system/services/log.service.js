const firebaseService = require("./firebase.service");

class Log{

    constructor(){
        this.collection = "Logs"
    }

    async createLog(obj){
        const result = await firebaseService.createOne(this.collection, {...obj})
        return {id: result.id}
    }

    async getLogs(from){
        const result = await firebaseService.queryCollection(this.collection, "createdAt", ">=", from)
        return result.docs.map(d=>`\ndate: ${new Date(d.data().createdAt)}\n${d.data().details}`)
    }
}

module.exports = Object.freeze(new Log())