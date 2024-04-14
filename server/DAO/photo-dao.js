const multer = require("multer");
const path = require("path");
const photoFolderPath = path.join(__dirname, "storage", "photoUploads");

const upload = multer({
  dest: photoFolderPath,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images."), false);
    }
  },
});

module.exports = upload;