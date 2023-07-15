"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.storage = storage;
//# sourceMappingURL=imageupload.js.map