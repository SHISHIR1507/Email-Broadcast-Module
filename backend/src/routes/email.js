import express from 'express';
import { sendBroadcast, testEmailConnection } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send', sendBroadcast);
router.get('/test-connection', testEmailConnection);

export default router;