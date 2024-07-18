// routes/documentRoutes.js

const express = require('express');
const router = express.Router();
const documentController = require('../vendorDocuments/vendorDocumentController');
const { upload, multipleUpload } = require('../../middleware/upload');

router.post('/upload', upload, documentController.createSingleDocument);

module.exports = router;
