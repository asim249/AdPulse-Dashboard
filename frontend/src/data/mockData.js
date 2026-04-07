export const CAMPAIGN_DATA = [
  {
    id: 1,
    name: "Summer Solstice Sale",
    client: "Lumina Fashion",
    status: "Active",
    budget: 50000,
    spend: 12500,
    impressions: 450000,
    clicks: 12500,
    conversions: 850
  },
  {
    id: 2,
    name: "TechNova Launch",
    client: "Nova Systems",
    status: "Active",
    budget: 100000,
    spend: 45000,
    impressions: 890000,
    clicks: 32000,
    conversions: 1200
  },
  {
    id: 3,
    name: "Eco-Friendly Drive",
    client: "GreenLife",
    status: "Paused",
    budget: 25000,
    spend: 5000,
    impressions: 120000,
    clicks: 4500,
    conversions: 210
  },
  {
    id: 4,
    name: "Winter Collection",
    client: "Lumina Fashion",
    status: "Completed",
    budget: 75000,
    spend: 75000,
    impressions: 1200000,
    clicks: 55000,
    conversions: 3400
  },
  {
    id: 5,
    name: "App Install Blitz",
    client: "SwiftPay",
    status: "Active",
    budget: 30000,
    spend: 18000,
    impressions: 600000,
    clicks: 42000,
    conversions: 5600
  }
];

export const CHART_DATA = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  impressions: Math.floor(Math.random() * 50000) + 20000,
  clicks: Math.floor(Math.random() * 5000) + 1000,
}));
