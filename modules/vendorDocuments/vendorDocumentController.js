const prisma = require("../../utils/prisma");

const createSingleDocument = async (req, res) => {
    try {
        const documentFrontBase64 = req?.files?.frontDocument ? Buffer.from(req?.files?.frontDocument[0].buffer).toString('base64') : null;
        const documentBackBase64 = req?.files?.backDocument ? Buffer.from(req.files.backDocument[0].buffer).toString('base64') : null;
        const reqDocumentTypeFront = req?.files?.frontDocument[0].originalname ? req?.files?.frontDocument[0].originalname.slice(req?.files?.frontDocument[0].originalname.lastIndexOf('.')) : req.body.frontDocumentType;
        const reqDocumentTypeBack = req?.files?.backDocument[0].originalname ? req?.files?.backDocument[0].originalname.slice(req?.files?.backDocument[0].originalname.lastIndexOf('.')) : req.body.backDocumentType;
        const data = {
            userId: (req.body.userId),
            frontDocument: documentFrontBase64,
            backDocument: documentBackBase64,
            frontDocumentType: reqDocumentTypeFront,
            backDocumentType: reqDocumentTypeBack,
            documentName: req.body.documentName,
            status: req.body.status === 'true',
            comments: req.body.comments || null,
            frontVerified: req.body.frontVerified === 'true',
            backVerified: req.body.backVerified === 'true',
        };
        const createdDocument = await prisma.document.create({ data });
        return res.status(201).json({ status: 201, message: "Document uploaded successfully", data: createdDocument });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createSingleDocument
}