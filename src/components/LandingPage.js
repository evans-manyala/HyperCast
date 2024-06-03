import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../assets/logo.png';
import github from '../assets/github.png';
import Lightning from '../assets/Lightning.svg';
import SmilingSun from '../assets/SmilingSun.png';
import process from '../assets/process.png';

const Header = () => (
  <header className="landing-header">
    <img src={logo} alt="HyperCast Logo" className="landing-logo" />
  </header>
);

const ProjectInspiration = () => (
  <section className="project-inspiration">
    <h2>The Inspiration</h2>
    <p>
      The idea for HyperCast was born out of my personal frustration with existing weather apps.
      Many were cluttered, inaccurate, or lacked the level of detail I needed to plan my day or trips effectively.
      I wanted to create a weather app that was not only visually appealing but also provided comprehensive and reliable forecasts.
    </p>
  </section>
);

const Feature = ({ icon, title, description }) => (
  <div className="feature">
    <img src={icon} alt={title} className="feature-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const LandingFeatures = () => (
  <section className="landing-features">
    <h2>Key Features</h2>
    <div className="features-grid">
      <Feature
        icon={Lightning}
        title="Hyper-Accurate Forecasts"
        description="HyperCast leverages cutting-edge weather data sources to deliver precise forecasts for temperature, precipitation, wind, and more."
      />
      <Feature
        icon={process}
        title="Intuitive Interface"
        description="The user-friendly design makes it easy to find the information you need at a glance, whether it's the current weather or a detailed 5-day forecast."
      />
      <Feature
        icon={SmilingSun}
        title="Customizable Experience"
        description="Personalize your weather experience with customizable themes, units of measurement, and location preferences."
      />
    </div>
  </section>
);

const DeveloperInfo = () => (
  <section className="developer-info">
    <h2>About the Developer</h2>
    <p>
      I'm Evans Manyala, a passionate Software and DevOps Engineer with a keen interest in weather and data visualization. 
      I created HyperCast; an intuitive and useful web app that is a testament to my skills in frontend and backend development.
    </p>
  </section>
);

const CallToAction = () => (
  <div className="landing-actions">
    <Link to="/app" className="cta-button">
      Get Started
    </Link>
    <a
      href="https://github.com/evans-manyala"
      target="_blank"
      rel="noopener noreferrer"
      className="github-link"
    >
      <img src={github} alt="GitHub" className="github-logo" /> Code
    </a>
  </div>
);

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main className="landing-main">
        <h1>Welcome</h1>
        <p>
          HyperCast is your reliable source for accurate and detailed weather forecasts. Stay informed about the latest weather updates and plan your activities accordingly.
        </p>
        <ProjectInspiration />
        <LandingFeatures />
        <DeveloperInfo />
        <CallToAction />
      </main>
    </div>
  );
};

export default LandingPage;
