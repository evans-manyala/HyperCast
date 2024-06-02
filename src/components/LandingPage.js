import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../assets/logo.png';
import github from '../assets/github.png';
import Lightning from '../assets/Lightning.svg';
import SmilingSun from '../assets/SmilingSun.png';
import process from '../assets/process.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <img src={logo} alt="HyperCast Logo" className="landing-logo" />
      </header>
      <main className="landing-main">
        <h1>Welcome to HyperCast</h1>
        <p>
          HyperCast is your reliable source for accurate and detailed weather forecasts. Stay informed about the latest weather updates and plan your activities accordingly.
        </p>

        {/* Project Inspiration */}
        <section className="project-inspiration">
          <h2>The Inspiration Behind HyperCast</h2>
          <p>
            The idea for HyperCast was born out of my personal frustration with existing weather apps.
            Many were cluttered, inaccurate, or lacked the level of detail I needed to plan my day or trips effectively.
            I wanted to create a weather app that was not only visually appealing but also provided comprehensive and reliable forecasts.
          </p>
        </section>

        {/* Key Features */}
        <section className="landing-features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature">
              <img src={Lightning} alt="Feature 1" className="feature-icon" />
              <h3>Hyper-Accurate Forecasts</h3>
              <p>
                HyperCast leverages cutting-edge weather data sources to deliver precise forecasts for temperature,
                precipitation, wind, and more.
              </p>
            </div>
            <div className="feature">
              <img src={process} alt="Feature 2" className="feature-icon" />
              <h3>Intuitive Interface</h3>
              <p>
                The user-friendly design makes it easy to find the information you need at a glance, whether it's the
                current weather or a detailed 5-day forecast.
              </p>
            </div>
            <div className="feature">
              <img src={SmilingSun} alt="Feature 3" className="feature-icon" />
              <h3>Customizable Experience</h3>
              <p>
                Personalize your weather experience with customizable themes, units of measurement, and location
                preferences.
              </p>
            </div>
          </div>
        </section>

        {/* Developer Info */}
        <section className="developer-info">
          <h2>About the Developer</h2>
          <p>
            I'm Evans Manyala, a passionate Software and DevOps Engineer with a keen interest in weather and data
            visualization. I created HyperCast; an intuitive and useful web app that is a testament to my skills in frontend
            and backend development.
          </p>
        </section>

        {/* Call to Action */}
        <div className="landing-actions">
          <Link to="/app" className="cta-button">
            Get Started with HyperCast
          </Link>
          <a
            href="https://github.com/evans-manyala"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <img src={github} alt="GitHub" className="github-logo" /> View Code on GitHub
          </a>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
