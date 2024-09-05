const express = require('express');
const { receiveMessage } = require('../controllers/webhookController');
const router = express.Router();

router.post('/', receiveMessage);

module.exports = router;