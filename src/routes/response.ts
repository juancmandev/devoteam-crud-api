import express from 'express';
import { getResponse, setResponse } from '../controllers/response';
import { uploadFileToCloudStorage } from '../controllers/fileCloudStorage';

const router = express.Router();

router.get('/response', getResponse);
router.post('/send-response', setResponse);

router.post('/upload-file', uploadFileToCloudStorage);

export = router;
