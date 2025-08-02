// pages/superads-login.js
import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    let errors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      errors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, and one special character';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, {
        email,
        password,
      });
      localStorage.setItem('userData', JSON.stringify(response.data));
      setError('');
      setLoading(false);
      console.log('Login successful:', response.data);
      router.push('/campaigns/getCampaigns');
    } catch (error) {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (


      <div className="login-wrapper">
        <div className="left-section d-flex flex-column justify-content-center">
          <div className="logo mb-4">Superads</div>
          <h3 className="fw-semibold mb-4">
            Log in and keep winning in paid social with Superads!
          </h3>
          <div className="testimonial d-flex align-items-start gap-3">
            <img src="https://placehold.co/48x48" alt="User Image" />
            <div>
              <p className="mb-1">
                “Superads is my secret weapon for paid social ad optimization.{' '}
                <strong>It provides so much value!</strong>”
              </p>
              <small className="text-muted">
                Joe Machen, Digital Marketing Manager at{' '}
                <span className="fst-italic">mabel’s labels</span>
              </small>
            </div>
          </div>
        </div>

        <div className="right-section d-flex flex-column justify-content-center">
          <h4 className="fw-semibold mb-4 text-center">Log in to your account</h4>

          {/* <div className="d-grid gap-2 mb-3">
            <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2" type="button">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                width="20"
              />
              Continue with Google
            </button>
            <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2" type="button">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                width="20"
              />
              Continue with Facebook
            </button>
          </div> */}

          {/* <div className="form-divider text-muted">or</div> */}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validationErrors.email && <div className="text-danger mt-1 small">{validationErrors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {validationErrors.password && <div className="text-danger mt-1 small">{validationErrors.password}</div>}
            </div>
            {error && <div className="text-danger text-center mb-2 small">{error}</div>}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div></div>
              <a href="#" className="text-link">Forgot password?</a>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-dark-green btn-lg">
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
            <div className="text-center mt-3">
              <span className="text-muted">No account?</span> <a href="/Signup">Create one</a>
            </div>
            <p className="text-center text-muted mt-3 small">
              By continuing, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
  );
};

export default Signin;
