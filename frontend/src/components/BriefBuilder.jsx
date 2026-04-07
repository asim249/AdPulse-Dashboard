import React, { useState, useRef } from 'react';
         import ReactMarkdown from 'react-markdown';

import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Download, 
  CheckCircle2,
  Globe,
  Briefcase,
  Users,
  Palette,
  Megaphone
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function BriefBuilder() {
  const [step, setStep] = useState(1);
  const [aiData, setAiData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    competitors: '',
    objective: 'Awareness',
    targetAudience: '',
    budget: '',
    tone: 'Professional',
    imageryStyle: '',
    colorDirection: '',
    dosAndDonts: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef(null);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
      e.preventDefault();
  setIsGenerating(true);

  try {
    const response = await fetch('http://localhost:2000/api/ai/generateBrief', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // send all steps at once
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const data = await response.json();
    console.log('Server response:', data);
    setAiData(data);
    // After successful submission, show result
    setIsGenerating(false);
    setShowResult(true);

  } catch (error) {
    console.error(error);
    setIsGenerating(false);
    alert('Submission failed. Please try again.');
  }
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  const exportPDF = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Creative_Brief_${formData.name}.pdf`);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="animate-in slide-in-from-right duration-300">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Globe className="text-info" /> Client Fundamentals
            </h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-muted small fw-bold">CLIENT NAME</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                  placeholder="e.g. Lumina Fashion"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small fw-bold">INDUSTRY</label>
                <input 
                  type="text" 
                  name="industry"
                  className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                  placeholder="e.g. Luxury Retail"
                  value={formData.industry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label text-muted small fw-bold">WEBSITE URL</label>
                <input 
                  type="url" 
                  name="website"
                  className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label text-muted small fw-bold">KEY COMPETITORS</label>
                <textarea 
                  name="competitors"
                  className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                  rows="3" 
                  placeholder="List top 3 competitors..."
                  value={formData.competitors}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in slide-in-from-right duration-300">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Briefcase className="text-info" /> Campaign Strategy
            </h4>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label text-muted small fw-bold">PRIMARY OBJECTIVE</label>
                <select 
                  name="objective"
                  className="form-select bg-dark border-secondary border-opacity-25 py-2"
                  value={formData.objective}
                  onChange={handleInputChange}
                >
                  <option>Awareness</option>
                  <option>Consideration</option>
                  <option>Conversion</option>
                  <option>Retention</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label text-muted small fw-bold">TARGET AUDIENCE</label>
                <textarea 
                  name="targetAudience"
                  className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                  rows="3" 
                  placeholder="Describe demographics, interests, and pain points..."
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small fw-bold">ESTIMATED BUDGET</label>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary border-opacity-25 text-muted">$</span>
                  <input 
                    type="number" 
                    name="budget"
                    className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                    placeholder="50000"
                    value={formData.budget}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in slide-in-from-right duration-300">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Palette className="text-info" /> Creative Direction
            </h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-muted small fw-bold">TONE OF VOICE</label>
                <select 
                  name="tone"
                  className="form-select bg-dark border-secondary border-opacity-25 py-2"
                  value={formData.tone}
                  onChange={handleInputChange}
                >
                  <option>Professional</option>
                  <option>Playful</option>
                  <option>Minimalist</option>
                  <option>Bold & Energetic</option>
                  <option>Luxury & Sophisticated</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small fw-bold">COLOR DIRECTION</label>
                <input 
                  type="text" 
                  name="colorDirection"
                  className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                  placeholder="e.g. Deep Blues, Gold Accents"
                  value={formData.colorDirection}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label text-muted small fw-bold">IMAGERY STYLE</label>
                <input 
                  type="text" 
                  name="imageryStyle"
                  className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                  placeholder="e.g. Lifestyle photography, High-contrast"
                  value={formData.imageryStyle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label text-muted small fw-bold">DO'S & DON'TS</label>
                <textarea 
                  name="dosAndDonts"
                  className="form-control bg-dark border-secondary border-opacity-25 py-2" 
                  rows="3" 
                  placeholder="Specific brand guidelines or restrictions..."
                  value={formData.dosAndDonts}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in slide-in-from-right duration-300">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <CheckCircle2 className="text-info" /> Review & Submit
            </h4>
            <div className="bg-dark bg-opacity-50 p-4 rounded border border-secondary border-opacity-10">
              <div className="row g-4">
                <div className="col-md-6">
                  <p className="small text-muted mb-1 fw-bold">CLIENT</p>
                  <p className="mb-0">{formData.name || 'Not specified'}</p>
                </div>
                <div className="col-md-6">
                  <p className="small text-muted mb-1 fw-bold">OBJECTIVE</p>
                  <p className="mb-0">{formData.objective}</p>
                </div>
                <div className="col-md-6">
                  <p className="small text-muted mb-1 fw-bold">BUDGET</p>
                  <p className="mb-0">${Number(formData.budget).toLocaleString()}</p>
                </div>
                <div className="col-md-6">
                  <p className="small text-muted mb-1 fw-bold">TONE</p>
                  <p className="mb-0">{formData.tone}</p>
                </div>
                <div className="col-12">
                  <p className="small text-muted mb-1 fw-bold">TARGET AUDIENCE</p>
                  <p className="mb-0">{formData.targetAudience || 'Not specified'}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-info bg-opacity-10 rounded border border-info border-opacity-25">
              <p className="small mb-0 text-info d-flex align-items-center gap-2">
                <Sparkles size={16} /> Our AI will generate headlines, channels, and a full creative guide based on this data.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-5">
        <h2 className="fw-bold mb-1">AI Brief Builder</h2>
        <p className="text-muted">Transform your client requirements into a high-converting creative brief in seconds.</p>
      </div>

      {!showResult ? (
        <div className="card border-0 bg-transparent">
          <div className="step-indicator">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`step-dot ${step === s ? 'active' : step > s ? 'completed' : ''}`}>
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="kpi-card">
            {renderStep()}

            <div className="d-flex justify-content-between mt-5 pt-4 border-top border-secondary border-opacity-10">
              <button 
                type="button" 
                className="btn btn-outline-secondary px-4 d-flex align-items-center gap-2"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft size={18} /> Back
              </button>
              
              {step < 4 ? (
                <button 
                  type="button" 
                  className="btn btn-info text-white px-4 d-flex align-items-center gap-2"
                  onClick={nextStep}
                >
                  Next <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-info text-white px-5 d-flex align-items-center gap-2"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Brief <Sparkles size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="animate-in zoom-in duration-500">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
              <Sparkles className="text-info" /> AI Generated Strategy
            </h4>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={() => setShowResult(false)}>Edit Brief</button>
              <button className="btn btn-info text-white d-flex align-items-center gap-2" onClick={exportPDF}>
                <Download size={18} /> Export PDF
              </button>
            </div>
          </div>

            {/* <div ref={resultRef} className="ai-output shadow-lg">
              <div className="row g-5">
                <div className="col-md-8">
                  <h1 className="fw-bold text-info mb-4">{formData.name}: The {formData.objective} Initiative</h1>
                  
                  <section className="mb-5">
                    <h5 className="fw-bold border-bottom border-secondary border-opacity-25 pb-2 mb-3">Core Headlines</h5>
                    <ul className="list-unstyled d-flex flex-column gap-3">
                      <li className="p-3 bg-dark bg-opacity-50 rounded border-start border-info border-4">
                        <span className="text-muted small d-block mb-1">HEADLINE 01</span>
                        <h5 className="mb-0">Redefining {formData.industry} for the Modern Era.</h5>
                      </li>
                      <li className="p-3 bg-dark bg-opacity-50 rounded border-start border-info border-4">
                        <span className="text-muted small d-block mb-1">HEADLINE 02</span>
                        <h5 className="mb-0">Your Journey to Excellence Starts with {formData.name}.</h5>
                      </li>
                      <li className="p-3 bg-dark bg-opacity-50 rounded border-start border-info border-4">
                        <span className="text-muted small d-block mb-1">HEADLINE 03</span>
                        <h5 className="mb-0">Experience the Future of {formData.tone} Design.</h5>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h5 className="fw-bold border-bottom border-secondary border-opacity-25 pb-2 mb-3">Tone Guide</h5>
                    <p className="text-muted">
                      The campaign should maintain a <strong>{formData.tone}</strong> voice throughout. 
                      Avoid overly aggressive sales language; instead, focus on the value proposition and 
                      the unique {formData.imageryStyle} aesthetic requested.
                    </p>
                  </section>
                </div>

                <div className="col-md-4">
                  <div className="p-4 bg-dark bg-opacity-50 rounded h-100">
                    <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                      <Megaphone size={20} className="text-info" /> Recommended Channels
                    </h5>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="p-2 rounded bg-info bg-opacity-10 text-info">
                          <Users size={20} />
                        </div>
                        <div>
                          <p className="mb-0 fw-bold">Instagram Ads</p>
                          <p className="small text-muted mb-0">Visual Storytelling</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div className="p-2 rounded bg-info bg-opacity-10 text-info">
                          <Globe size={20} />
                        </div>
                        <div>
                          <p className="mb-0 fw-bold">Google Search</p>
                          <p className="small text-muted mb-0">High Intent Capture</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div className="p-2 rounded bg-info bg-opacity-10 text-info">
                          <Palette size={20} />
                        </div>
                        <div>
                          <p className="mb-0 fw-bold">LinkedIn</p>
                          <p className="small text-muted mb-0">B2B Professional Reach</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-top border-secondary border-opacity-25">
                      <h6 className="fw-bold mb-2">Budget Allocation</h6>
                      <div className="progress bg-dark" style={{ height: 8 }}>
                        <div className="progress-bar bg-info" style={{ width: '45%' }}></div>
                        <div className="progress-bar bg-primary" style={{ width: '35%' }}></div>
                        <div className="progress-bar bg-warning" style={{ width: '20%' }}></div>
                      </div>
                      <div className="d-flex justify-content-between mt-2 small text-muted">
                        <span>Social (45%)</span>
                        <span>Search (35%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

<div ref={resultRef} className="ai-output shadow-lg">
  <div className="row g-5">
    
    {/* LEFT SIDE */}
    <div className="col-md-8">
      
      {/* TITLE */}
      <h1 className="fw-bold text-info mb-4">
        {aiData?.title || `${formData.name}: ${formData.objective}`}
      </h1>

      {/* STRATEGY */}
      <section className="mb-5">
        <h5 className="fw-bold border-bottom border-secondary border-opacity-25 pb-2 mb-3">
          Strategic Approach
        </h5>
        <p className="text-muted">
          {aiData?.strategy}
        </p>
      </section>

      {/* HEADLINES */}
      <section className="mb-5">
        <h5 className="fw-bold border-bottom border-secondary border-opacity-25 pb-2 mb-3">
          Core Headlines
        </h5>

        <ul className="list-unstyled d-flex flex-column gap-3">
          {aiData?.headlines?.map((headline, index) => (
            <li
              key={index}
              className="p-3 bg-dark bg-opacity-50 rounded border-start border-info border-4"
            >
              <span className="text-muted small d-block mb-1">
                HEADLINE {String(index + 1).padStart(2, "0")}
              </span>
              <h5 className="mb-0">{headline}</h5>
            </li>
          ))}
        </ul>
      </section>

      {/* TONE */}
      <section>
        <h5 className="fw-bold border-bottom border-secondary border-opacity-25 pb-2 mb-3">
          Tone Guide
        </h5>
        <p className="text-muted">
          {aiData?.tone}
        </p>
      </section>
    </div>

    {/* RIGHT SIDE */}
    <div className="col-md-4">
      <div className="p-4 bg-dark bg-opacity-50 rounded h-100">

        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
          <Megaphone size={20} className="text-info" /> Recommended Channels
        </h5>

        <div className="d-flex flex-column gap-3">
          {aiData?.channels?.map((channel, index) => (
            <div key={index} className="d-flex align-items-center gap-3">
              
              <div className="p-2 rounded bg-info bg-opacity-10 text-info">
                {channel.toLowerCase().includes("instagram") && <Users size={20} />}
                {channel.toLowerCase().includes("facebook") && <Globe size={20} />}
                {channel.toLowerCase().includes("pinterest") && <Palette size={20} />}
              </div>

              <div>
                <p className="mb-0 fw-bold">{channel}</p>
                <p className="small text-muted mb-0">
                  {channel === "Instagram" && "Visual Storytelling"}
                  {channel === "Facebook" && "Community Engagement"}
                  {channel === "Pinterest" && "Inspiration Discovery"}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Budget (optional static ya dynamic bana sakte ho) */}
        <div className="mt-5 pt-4 border-top border-secondary border-opacity-25">
          <h6 className="fw-bold mb-2">Budget Allocation</h6>

          <div className="progress bg-dark" style={{ height: 8 }}>
            <div className="progress-bar bg-info" style={{ width: "45%" }}></div>
            <div className="progress-bar bg-primary" style={{ width: "35%" }}></div>
            <div className="progress-bar bg-warning" style={{ width: "20%" }}></div>
          </div>

          <div className="d-flex justify-content-between mt-2 small text-muted">
            <span>Social (45%)</span>
            <span>Search (35%)</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
        </div>
      )}
    </div>
  );
}
