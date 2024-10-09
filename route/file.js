const express = require("express");
const router = express.Router();

const FileController = require("../controller/FileController");

router.get('/list', FileController.fileGet);
router.post('/upload', FileController.fileUpload);
router.get('/download', FileController.fileDownload);

module.exports = router;