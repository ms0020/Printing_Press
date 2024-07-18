
const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'), false);
    }
};

const limits = {
    fileSize: 1024 * 1024 * 5
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
}).fields([
    { name: 'frontDocument', maxCount: 1 },
    { name: 'backDocument', maxCount: 1 }
]);

const multipleUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { ...limits, files: 5 }
}).array('files', 5);

module.exports = { upload, multipleUpload };
