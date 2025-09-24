import firebaseService from "./firebase.js"

const collectionName = "Subscriptions"

class Subscription{
    constructor(email, city){
        this.email = email 
        this.city = city
    }

    async exec(){
        const existing = await firebaseService.getAll(collectionName, {email: this.email})
        if(existing?.length)return
        return firebaseService.createOne({email: this.email, city: this.city})
    }
    static async find(obj={}){
        const docs = await firebaseService.getAll(collectionName, obj)
        return docs.docs.map(d=>({...d.data(), remoteId: d.id}))
    }
}

export default Subscription