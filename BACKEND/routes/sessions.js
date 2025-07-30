const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middleware/auth');

router.get('/', sessionController.getPublicSessions);
router.get('/my-sessions', authMiddleware, sessionController.getMySessions);
router.get('/my-sessions/:id', authMiddleware, sessionController.getSessionById);
router.post('/my-sessions/save-draft', authMiddleware, sessionController.saveDraft);
router.post('/my-sessions/publish', authMiddleware, sessionController.publishSession);

module.exports = router;