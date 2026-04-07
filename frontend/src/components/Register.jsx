import { useEffect, useState } from 'react';
import './Register.css';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:2000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    console.log(result);
    if(res.ok) {
      alert('Registration successful! Please log in.');
      navigate('/login');
    }
  };



  return (
    <>
     <div className="signup-container">
  <div className="signup-card">
    <div className="card-body-custom p-4 p-md-5">
      <div className="text-center mb-4">
        <div className="brand-icon">
          <UserPlus size={40} color="white" />
        </div>
        <h1 className="brand-title">Join Aetherspace</h1>
        <p className="brand-sub">Start your secure journey · modern cloud workspace</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label for="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" 
                 placeholder="e.g., alex.chen or creative_mind" autocomplete="username" onChange={handleChange}/>
        </div>

        <div className="mb-4">
          <label for="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" 
                 placeholder="hello@aetherspace.com" onChange={handleChange} autocomplete="email"/>
        </div>

        <div className="mb-4">
          <label for="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" 
                 placeholder="Create a strong password" autocomplete="new-password" onChange={handleChange}/>
        </div>

        <button type="submit" className="btn btn-signup mt-2">
          <i className="bi bi-person-plus-fill"></i> Create account
        </button>
      </form>
      <div className="text-center">
        <p className="login-prompt-text">Already have an account?</p>
        <button onClick={() => navigate('/login')} type="button" className="btn-login-outline">
          <i className="bi bi-box-arrow-in-right"></i> Sign in to existing account
        </button>
        
        <div className="terms-note">
          <i className="bi bi-shield-check"></i> By signing up, you agree to our 
          <a href="#">Terms</a> and <a href="#">Privacy</a>
        </div>
      </div>
    </div>
  </div>
</div> 
    </>
  )
}

export default Register
