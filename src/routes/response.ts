import express from 'express';
import { getResponse } from '../controllers/response';
const router = express.Router();

router.get('/response', getResponse);

export = router;
