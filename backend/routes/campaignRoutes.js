const express = require('express');
const router = express.Router()

const {
    getAllCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign
} = require('../controllers/campaignController')

router.get('/getAll', getAllCampaigns)
router.post('/create', createCampaign)
router.put('/update/:id', updateCampaign)
router.delete('/delete/:id', deleteCampaign)

















module.exports = router