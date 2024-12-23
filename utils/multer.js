const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"public/user");
    },
    filename : (req,file,cb) =>{
        const splittedFile = file.originalname.split(".");
        const fileExt = splittedFile[splittedFile.length-1];
        const fileName = splittedFile[0].concat("-",Date.now(),".",fileExt);
        cb(null,fileName);
    }
})

const upload = multer({
    storage:storage,
    limits :{
        fileSize:1000000,
    },
})

module.exports ={multer,storage,upload}