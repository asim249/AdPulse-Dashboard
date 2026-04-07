import React, { useState } from 'react';
import { 
  TrendingUp, 
  MousePointer2, 
  Eye, 
  Target, 
  DollarSign, 
  BarChart3,
  Calendar,
  ChevronDown,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { CAMPAIGN_DATA, CHART_DATA } from '../data/mockData';

const KPICard = ({ title, value, change, icon: Icon, color }) => (
  <div className="col-md-4 col-xl-2 mb-4">
    <div className="kpi-card h-100">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className={`p-2 rounded bg-${color} bg-opacity-10`}>
          <Icon className={`text-${color}`} size={20} />
        </div>
        <span className={`badge bg-${change >= 0 ? 'success' : 'danger'} bg-opacity-10 text-${change >= 0 ? 'success' : 'danger'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      <h6 className="text-muted mb-1 fs-7 fw-medium">{title}</h6>
      <h4 className="fw-bold mb-0">{value}</h4>
    </div>
  </div>
);

export default function Dashboard() {
  const [filter, setFilter] = useState('All');
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const filteredCampaigns = filter === 'All' 
    ? CAMPAIGN_DATA 
    : CAMPAIGN_DATA.filter(c => c.status === filter);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
        <div>
          <h2 className="fw-bold mb-1">Campaign Dashboard</h2>
          <p className="text-muted mb-0">Real-time performance overview across all active channels.</p>
        </div>
        
        <div className="d-flex gap-2">
          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown">
              <Calendar size={18} />
              {dateRange}
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
              <li><button className="dropdown-item" onClick={() => setDateRange('Last 7 Days')}>Last 7 Days</button></li>
              <li><button className="dropdown-item" onClick={() => setDateRange('Last 30 Days')}>Last 30 Days</button></li>
              <li><button className="dropdown-item" onClick={() => setDateRange('Last 90 Days')}>Last 90 Days</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item">Custom Range</button></li>
            </ul>
          </div>
          <button className="btn btn-info text-white px-4">Download Report</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="row">
        <KPICard title="Impressions" value="3.2M" change={12.5} icon={Eye} color="primary" />
        <KPICard title="Clicks" value="124.5K" change={8.2} icon={MousePointer2} color="info" />
        <KPICard title="CTR" value="3.89%" change={-2.4} icon={Target} color="warning" />
        <KPICard title="Conversions" value="12,450" change={15.3} icon={TrendingUp} color="success" />
        <KPICard title="Spend" value="$45,200" change={5.1} icon={DollarSign} color="danger" />
        <KPICard title="ROAS" value="4.2x" change={10.8} icon={BarChart3} color="purple" />
      </div>

      {/* Chart Section */}
      <div className="chart-container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Performance Trend</h5>
          <div className="d-flex gap-3">
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-info" style={{ width: 10, height: 10 }}></div>
              <span className="text-muted small">Impressions</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-primary" style={{ width: 10, height: 10 }}></div>
              <span className="text-muted small">Clicks</span>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <AreaChart data={CHART_DATA}>
              <defs>
                <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0dcaf0" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0dcaf0" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0d6efd" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="impressions" stroke="#0dcaf0" fillOpacity={1} fill="url(#colorImp)" strokeWidth={2} />
              <Area type="monotone" dataKey="clicks" stroke="#0d6efd" fillOpacity={1} fill="url(#colorClicks)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="card border-0 shadow-sm bg-transparent">
        <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-3">
          <h5 className="fw-bold mb-0">Active Campaigns</h5>
          <div className="d-flex gap-2">
            <div className="btn-group">
              <button className={`btn btn-sm ${filter === 'All' ? 'btn-info text-white' : 'btn-outline-secondary'}`} onClick={() => setFilter('All')}>All</button>
              <button className={`btn btn-sm ${filter === 'Active' ? 'btn-info text-white' : 'btn-outline-secondary'}`} onClick={() => setFilter('Active')}>Active</button>
              <button className={`btn btn-sm ${filter === 'Paused' ? 'btn-info text-white' : 'btn-outline-secondary'}`} onClick={() => setFilter('Paused')}>Paused</button>
            </div>
            <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2">
              <Filter size={14} />
              More Filters
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table custom-table">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Client</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Spend</th>
                <th>Impressions</th>
                <th>Conversions</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="fw-medium">{campaign.name}</td>
                  <td className="text-muted">{campaign.client}</td>
                  <td>
                    <span className={`badge rounded-pill bg-${
                      campaign.status === 'Active' ? 'success' : 
                      campaign.status === 'Paused' ? 'warning' : 'secondary'
                    } bg-opacity-10 text-${
                      campaign.status === 'Active' ? 'success' : 
                      campaign.status === 'Paused' ? 'warning' : 'secondary'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td>${campaign.budget.toLocaleString()}</td>
                  <td>${campaign.spend.toLocaleString()}</td>
                  <td>{(campaign.impressions / 1000).toFixed(1)}K</td>
                  <td>{campaign.conversions.toLocaleString()}</td>
                  <td className="text-end">
                    <button className="btn btn-link text-info p-0 mx-2"><TrendingUp size={18} /></button>
                    <button className="btn btn-link text-secondary p-0"><ChevronDown size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
