const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      //console.log(req.user)
      cb(null, req.user.key+".mp4");
    }
  });

const upload = multer({ storage: storage });

module.exports = { upload }