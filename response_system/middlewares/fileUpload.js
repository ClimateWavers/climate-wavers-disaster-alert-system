const multer = require('multer')

const upload = multer({dest: "uploads/"})

const useSingleUpload =()=> upload.single("image")

module.exports = {useSingleUpload}