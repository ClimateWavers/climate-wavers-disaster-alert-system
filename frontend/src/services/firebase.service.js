import {onSnapshot, collection, doc} from "firebase/firestore"
import { getFirestoreDB } from "../config/firebase.config"

export const watchCollection = async(path, cb)=>{
    const db = await getFirestoreDB()
    const ref = collection(db, path)
    onSnapshot(ref, cb)
}

export const watchDocument = async(path, cb)=>{
    const db = await getFirestoreDB()
    const ref = doc(db, path)
    onSnapshot(ref, cb)
}