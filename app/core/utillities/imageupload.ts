const multer = require("multer");
// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("gggggggg")
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});


export { storage};



