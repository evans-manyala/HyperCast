import React, { useEffect, useRef, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import './TrendChart.css';

// Register the necessary Chart.js components and plugins
Chart.register(...registerables, zoomPlugin);

// Component to display trend charts for weather data
const TrendChart = ({ forecast }) => {
  const chartRef = useRef(null); // Reference to the chart canvas element

  // Function to create the chart using Chart.js
  const createChart = useCallback(() => {
    const ctx = chartRef.current.getContext('2d'); // Get the context of the canvas element
    return new Chart(ctx, {
      type: 'line', // Line chart type
      data: {
        labels: forecast.map(item => new Date(item.date)), // Map forecast dates to chart labels
        datasets: [
          // Create datasets for different weather parameters
          createDataset('Temperature (°C)', forecast.map(item => item.temp), 'rgba(220, 20, 60, 1)', 'rgba(220, 20, 60, 0.2)'),
          createDataset('Wind Speed (m/s)', forecast.map(item => item.windSpeed), 'rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 0.2)'),
          createDataset('Humidity (%)', forecast.map(item => item.humidity), 'rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0.2)'),
          createDataset('Pressure (hPa)', forecast.map(item => item.pressure), 'rgba(0, 0, 129, 1)', 'rgba(0, 0, 129, 0.2)'),
          createDataset('Cloud Cover (%)', forecast.map(item => item.cloudCover), 'rgba(0, 155, 175, 1)', 'rgba(0, 155, 175, 0.2)'),
        ],
      },
      options: getChartOptions(), // Chart options
    });
  }, [forecast]);

  // useEffect to create and destroy the chart on component mount and unmount
  useEffect(() => {
    const chart = createChart();
    chartRef.current.chartInstance = chart;

    // Clean up by destroying the chart instance
    return () => {
      chart.destroy();
    };
  }, [createChart]);

  // Function to handle zooming the chart & by the given factor
  const handleZoom = useCallback((factor) => {
    if (chartRef.current?.chartInstance) {
      chartRef.current.chartInstance.zoom(factor);
    }
  }, []);

  // Render the TrendChart component
  return (
    <div className="trend-chart">
      <h3>Trend Charts</h3>
      <div className="chart-container">
        <canvas ref={chartRef} /> {/* Canvas element for the chart */}
      </div>
      <div className="zoom-buttons">
        <button onClick={() => handleZoom(1.1)}>+</button> {/* Zoom in button */}
        <button onClick={() => handleZoom(0.9)}>-</button> {/* Zoom out button */}
      </div>
    </div>
  );
};

// Function to create a dataset for the chart
const createDataset = (label, data, borderColor, backgroundColor) => ({
  label,
  data,
  borderColor,
  backgroundColor,
  fill: true,
  tension: 0.1, // Smoothness of the line
});

// Function to get the chart options
const getChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time', // X-axis represents time
      time: {
        unit: 'hour', // Time unit for the x-axis
        tooltipFormat: 'MMM dd, yyyy, h:mm a', // Format for the tooltip
      },
      title: {
        display: true,
        text: 'Time', // X-axis title
      },
      ticks: {
        color: 'inherit', // Inherit color from the theme
      },
    },
    y: {
      title: {
        display: true,
        text: 'Value', // Y-axis title
      },
      ticks: {
        color: 'inherit', // Inherit color from the theme
      },
    },
  },
  plugins: {
    tooltip: {
      mode: 'index', // Show tooltip for all items at the same index
      intersect: false, // Tooltip shows even if not intersecting with the point
    },
    legend: {
      position: 'top', // Position of the legend
      labels: {
        color: 'inherit', // Inherit color from the theme
      },
    },
    zoom: {
      pan: {
        enabled: true, // Enable panning
        mode: 'x', // Pan only in the x direction
      },
      zoom: {
        wheel: {
          enabled: false, // Disable zooming by the mouse wheel
        },
        pinch: {
          enabled: false, // Disable zooming by pinching
        },
        mode: 'x', // Zoom only in the x direction
      },
    },
  },
  interaction: {
    mode: 'nearest', // Interaction mode to find the nearest item
    axis: 'x', // Interaction on the x-axis
    intersect: false, // Interaction without intersection
  },
});

export default TrendChart;
