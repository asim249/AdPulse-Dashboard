const Campaign = require('../models/campaign.model');


const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({deleted_at: null});
        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const createCampaign = async (req, res) => {
    try {
        const { name, client, status, budget, spend, impressions, clicks, conversions } = req.body;
        if(!name || !client || !status || budget === undefined || spend === undefined || impressions === undefined || clicks === undefined || conversions === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const campaign = new Campaign({ name, client, status, budget, spend, impressions, clicks, conversions });
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const updateCampaign = async (req, res) => {
    try {
        const compaign = await Campaign.findById(req.params.id);
        if (!compaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        const updateCompaign = await Campaign.findByIdAndUpdate(req.params.id, req.body,  { returnDocument: 'after' });
        res.status(200).json(updateCompaign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCampaign = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({ message: 'Please provide campaign ID' });
        }
        const softDeletedCampaign = await Campaign.findByIdAndUpdate(id, { deleted_at: new Date() }, { returnDocument: 'after' });
        if (!softDeletedCampaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}















module.exports = {
    getAllCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign
}