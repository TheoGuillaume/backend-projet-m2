const multer = require('multer');
const path = require('path');
require('dotenv').config();

const customFileFilter = (allowedExtensions) => (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    const error = new Error('Type de fichier non autorisé.');
    cb(error);
  }
};

const customStorage = (destination) => multer.diskStorage({
destination,
  filename: (req, file, cb) => {
    //nom_du_fichier-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, filename);
  },
});

const uploadWithCustomOptions = (allowedExtensions, destination, fieldName) => 
    multer({
    storage: customStorage(destination),
    fileFilter: customFileFilter(allowedExtensions),
    }).single(fieldName);

module.exports = (allowedExtensions, destination, fieldName) => uploadWithCustomOptions(allowedExtensions,  process.env.UPLOAD_PATH+destination, fieldName);
