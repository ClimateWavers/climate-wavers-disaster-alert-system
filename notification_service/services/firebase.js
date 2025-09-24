import {initializeApp} from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, query, where, getDoc, deleteDoc, doc, updateDoc, } from "firebase/firestore"
import config from "../config/config.js"
import { cleanUndefined } from "../lib/factory.js"


class FB{

    constructor(){
        const app = initializeApp(config.firebaseConfig)
        this.db = getFirestore(app)
    }
/**
 * 
 * @param {string } collectionName 
 * @param { object } data 
 * @returns { any }
 */
    async createOne(collectionName, data){
        let cleaned = cleanUndefined(data)
        return addDoc(collection(this.db, collectionName), cleaned)
    }

    /**
     * 
     * @param {*} collectionName 
     * @returns { any }
     */

    async getAll(collectionName, condition ={}){
        const cond = Object.entries(condition)[0]
        const meta = cond? where(cond[0], "==", cond[1]): undefined
        const q = query(collection(this.db, collectionName), meta)
        return getDocs(q)
    }

    /**
     * 
     * @param {string} collectionName 
     * @param {string} id 
     * @returns 
     */

    getById(collectionName, id){
        return getDoc(doc(this.db,`${collectionName}/${id}`))
    }

    /**
     * 
     * @param {string} collectionName 
     * @param { string } id 
     * @param { (object)=>Promise<any>} func 
     */
    async updateOne(collectionName, id, func){
        const target = await this.getById(collectionName, id)
        if(!target)return;
        const docRef = doc(this.db, `/${collectionName}/${id}`)
        const update = await func({...target.data(), id: target.id})
        return updateDoc(docRef, update)
    }

    deleteOne(collectionName, id){
        return deleteDoc(collection(this.db,`${collectionName}/${id}`))
    }

}

const fb = new FB()

export default Object.freeze(fb)