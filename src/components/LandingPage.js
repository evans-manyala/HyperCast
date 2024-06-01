import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../assets/logo.png'; 
import github from '../assets/github.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <img src={logo} alt="HyperCast Logo" className="landing-logo" />
      </header>
      <main className="landing-main">
        <h1>Welcome to HyperCast</h1>
        <p>
          HyperCast is your reliable source for accurate and detailed weather forecasts.
          Stay informed about the latest weather updates and plan your activities accordingly. 
        </p>

        {/* Developer Info */}
        <section className="developer-info">
          <h2>About the Developer</h2>
          <p>
            I'm Evans Manyala, a passionate Software and DevOps Engineer with a keen interest in weather and data visualization. 
            I created HyperCast; an intuitive and useful web app that is a testament to my skills in frontend and backend development.
          </p>
        </section>

        {/* Call to Action */}
        <div className="landing-actions">
          <Link to="/app" className="cta-button">Get Started with HyperCast</Link>
          <a href="https://github.com/evans-manyala" target="_blank" rel="noopener noreferrer" className="github-link">
            <img src={github} alt="GitHub" className="github-logo" /> View Code on GitHub
          </a>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
