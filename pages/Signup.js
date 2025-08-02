// pages/superads-signup.js
import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Signup = () => {
  const [name, SetName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    let errors = {};


    if (companyName.trim().length < 2) {
      errors.companyName = 'Company name must be at least 2 characters';
    }

    if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'; 
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      errors.password = 'Password must be at least 8 characters, contain an uppercase letter and a special character';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
        name,
        companyName,
        email,
        password,
      });
      localStorage.setItem('userData', JSON.stringify(response.data));
      setError('');
      setLoading(false);
      console.log('Signup successful:', response.data);
      router.push('/campaigns/getCampaigns');
      
      // router.push(response.data.redirect);
    } catch (error) {
      setError('Signup failed. Try again.');
      setLoading(false);
      console.error('Signup error:', error);
      if (error.response && error.response.data) {
        setValidationErrors(error.response.data.errors || {});
      }
    }
  };

  return (
      <div className="login-wrapper">
        <div className="left-section d-flex flex-column justify-content-center">
          <div className="logo mb-4">Superads</div>
          <h3 className="fw-semibold mb-4">
            Start your journey in paid social with Superads!
          </h3>
          <div className="testimonial d-flex align-items-start gap-3">
            <img src="https://placehold.co/48x48" alt="User Image" />
            <div>
              <p className="mb-1">
                “Superads gave our team an unfair advantage.{' '}
                <strong>Incredible tool and support!</strong>”
              </p>
              <small className="text-muted">
                Sam Carter, Growth Strategist at{' '}
                <span className="fst-italic">BrandLabs</span>
              </small>
            </div>
          </div>
        </div>

        <div className="right-section d-flex flex-column justify-content-center">
          <h4 className="fw-semibold mb-4 text-center">Create your account</h4>

          <form onSubmit={handleSubmit}>

<div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => SetName(e.target.value)}
              />
              {validationErrors.name && <div className="text-danger mt-1 small">{validationErrors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              {validationErrors.companyName && <div className="text-danger mt-1 small">{validationErrors.companyName}</div>}
            </div>

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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {validationErrors.password && <div className="text-danger mt-1 small">{validationErrors.password}</div>}
            </div>
            {error && <div className="text-danger text-center mb-2 small">{error}</div>}
            
            <div className="d-grid">
              <button type="submit" className="btn btn-dark-green btn-lg">
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
            <div className="text-center mt-3">
              <span className="text-muted">Already have an account?</span> <a href="/Signin">Log in</a>
            </div>
          </form>
        </div>
      </div>

  );
};

export default Signup;

