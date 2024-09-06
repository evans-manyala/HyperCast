import React from 'react'; // Import React to use JSX and component functionality
import { Link } from 'react-router-dom'; // Import Link component for navigation
import './LandingPage.css'; // Import the CSS file for styling
import logo from '../assets/logo.png'; // Import the logo image
import github from '../assets/github.png'; // Import the GitHub logo image
import Lightning from '../assets/Lightning.svg'; // Import the Lightning icon
import SmilingSun from '../assets/SmilingSun.png'; // Import the Smiling Sun icon
import process from '../assets/process.png'; // Import the process icon

// Header component to display the application header with a logo
const Header = () => (
  <header className="landing-header"> {/* Header container with a class for styling */}
    <img src={logo} alt="HyperCast Logo" className="landing-logo" /> {/* Logo image with alt text and class for styling */}
  </header>
);

// ProjectInspiration component to display the inspiration behind the project
const ProjectInspiration = () => (
  <section className="project-inspiration"> {/* Section container with a class for styling */}
    <h2>The Inspiration</h2> {/* Section title */}
    <p>
      The idea for HyperCast was born out of my personal frustration with existing weather apps.
      Many were cluttered, inaccurate, or lacked the level of detail I needed to plan my day or trips effectively.
      I wanted to create a weather app that was not only visually appealing but also provided comprehensive and reliable forecasts.
    </p> {/* Section content */}
  </section>
);

// Feature component to display a single feature with icon, title, and description
const Feature = ({ icon, title, description }) => (
  <div className="feature"> {/* Feature container with a class for styling */}
    <img src={icon} alt={title} className="feature-icon" /> {/* Feature icon with alt text and class for styling */}
    <h3>{title}</h3> {/* Feature title */}
    <p>{description}</p> {/* Feature description */}
  </div>
);

// LandingFeatures component to display key features of the application
const LandingFeatures = () => (
  <section className="landing-features"> {/* Section container with a class for styling */}
    <h2>Key Features</h2> {/* Section title */}
    <div className="features-grid"> {/* Grid container for features */}
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

// DeveloperInfo component to display information about the developer
const DeveloperInfo = () => (
  <section className="developer-info"> {/* Section container with a class for styling */}
    <h2>About the Developer</h2> {/* Section title */}
    <p>
      I'm Evans Manyala, a passionate Software and DevOps Engineer with a keen interest in weather and data visualization. 
      I created HyperCast; an intuitive and useful web app that is a testament to my skills in frontend and backend development.
    </p> {/* Section content */}
  </section>
);

// CallToAction component to display action buttons for the user
const CallToAction = () => (
  <div className="landing-actions"> {/* Actions container with a class for styling */}
    <Link to="/app" className="cta-button">
      Get Started {/* Button to navigate to the app */}
    </Link>
    <a
      href="https://github.com/evans-manyala"
      target="_blank"
      rel="noopener noreferrer"
      className="github-link"
    >
      <img src={github} alt="GitHub" className="github-logo" /> {/* GitHub link with icon */}
      Code {/* Button to navigate to the GitHub repository */}
    </a>
  </div>
);

// LandingPage component to display the main landing page content
const LandingPage = () => {
  return (
    <div className="landing-page"> {/* Main container with a class for styling */}
      <Header /> {/* Header component */}
      <main className="landing-main"> {/* Main content area with a class for styling */}
        <h1>Welcome</h1> {/* Main title */}
        <p>
          HyperCast is your reliable source for accurate and detailed weather forecasts. Stay informed about the latest weather updates and plan your activities accordingly.
        </p> {/* Main description */}
        <ProjectInspiration /> {/* ProjectInspiration component */}
        <LandingFeatures /> {/* LandingFeatures component */}
        <DeveloperInfo /> {/* DeveloperInfo component */}
        <CallToAction /> {/* CallToAction component */}
      </main>
    </div>
  );
};

export default LandingPage; 
