const multer = require("multer");

//Storage
const Storage = multer.diskStorage({
  destination: `./client/build/uploads`,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single(`pictures`);

module.exports = upload;
