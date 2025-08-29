import express from 'express';
import { getLogs, exportLogs } from '../controllers/logController.js';

const router = express.Router();

router.get('/', getLogs);
router.get('/export', exportLogs);

export default router;