const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  status: { type: String, required: true, default: null },
  budget: { type: Number, required: true, default: null },
  spend: { type: Number, required: true, default: null },
  impressions: { type: Number, required: true, default: null },
  clicks: { type: Number, required: true, default: null },
  conversions: { type: Number, required: true, default: null },
  deleted_at: { type: Date, default: null },
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;  