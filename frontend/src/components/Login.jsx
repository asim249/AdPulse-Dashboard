import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Diamond } from 'lucide-react';
import { useNavigate } from "react-router-dom";


function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:2000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        console.log(result);
        if(res.ok) {
            alert('Login successful!');
            navigate('/');
        }
    };
  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <div className={`${styles["card-body-custom"]} p-4 p-md-5`}>
          
          <div className="text-center mb-4">
            <div className={styles["logo-badge"]}>
              <Diamond size={40} color="white" />
            </div>

            <h1 className={styles["brand-title"]}>Aetherspace</h1>
            <p className={styles["brand-sub"]}>
              Enterprise-grade access · secure portal
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="form-label">
                Username
              </label>

              <div className={styles["input-group-icon"]}>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="email@company.com"
                  autoComplete="email"
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <div className={styles["input-group-icon"]}>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="··········"
                  autoComplete="current-password"
                   onChange={handleChange}
                />
              </div>

              <div className="text-end mt-1">
                <a href="#" className={styles["forgot-link"]}>
                  Forgot password?
                </a>
              </div>
            </div>

            <button type="submit" className={`btn mt-2 ${styles["btn-login"]}`}>
              <i className="bi bi-arrow-right-circle-fill"></i>{" "}
              Sign in to dashboard
            </button>
          </form>

          {/* Divider (optional) */}
          {/* 
          <div className={styles["divider-custom"]}>
            <hr />
          </div> 
          */}

          <div className="text-center">
            <p className={styles["signup-text"]}>
              Account not created yet?
            </p>

            <button
              type="button"
              className={styles["btn-signup-outline"]}
              onClick={() => navigate('/register')}
            >
              <i className="bi bi-person-plus-fill"></i> Create free account
            </button>

            <p
              className="small text-muted mt-3 mb-0"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2px" }}
            >
              <i className="bi bi-shield-check"></i> Secure & compliant · SOC2 ready
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;