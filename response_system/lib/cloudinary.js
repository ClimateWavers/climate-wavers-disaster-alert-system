const cloudinary = require("cloudinary").v2
const config = require('../config/config')
const path = require("path")

cloudinary.config(config.cloudinaryConfig)

const uploadOne = async(filename) =>{
    try{
    const fs = require('fs')
    const dest = path.resolve(__dirname, "../uploads")
    const exist = await fs.existsSync(dest, (err)=>{ if (err) { throw err }})
    if(!exist){
        fs.mkdir(dest, (err)=>{
            if(err){ throw err }
        })
    }

    const filePath = dest + "/" + filename

    const res = await cloudinary.uploader.upload(filePath, {folder: "disaxta"})
    fs.rm(filePath, (err)=>{ if (err){ throw err }})
    return res.secure_url
    }catch(ex){
        console.log(`error uloading file: ${ex}`, ex)
    }
}

module.exports = {uploadOne}