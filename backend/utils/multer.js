const multer = require("multer");

const storage = (storageLocation = "public/user") => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storageLocation);
    },
    filename: (req, file, cb) => {
      const splittedFile = file.originalname.split(".");
      const fileExt = splittedFile[splittedFile.length - 1];
      const fileName = splittedFile[0].concat("-", Date.now(), ".", fileExt);
      cb(null, fileName);
    },
  });
};

const upload = (storage, fileSize = 5000000) => {
  return multer({
    storage: storage,
    limits: {
      fileSize, //1MB
    },
  });
};

module.exports = { multer, storage, upload };