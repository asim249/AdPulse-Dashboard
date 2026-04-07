const express = require('express');
const router = express.Router()

const {
    generateBrief,
    generateCopy
} = require('../controllers/aiController')

router.post('/generateBrief', generateBrief)
router.post('/generateCopy', generateCopy)











module.exports = router