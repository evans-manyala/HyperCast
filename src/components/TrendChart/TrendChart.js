import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import './TrendChart.css';

// Register the necessary Chart.js components and plugins
Chart.register(...registerables, zoomPlugin);

const TrendChart = ({ forecast }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const createChart = () => {
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: forecast.map(item => new Date(item.date)),
          datasets: [
            {
              label: 'Temperature (°C)',
              data: forecast.map(item => item.temp),
              borderColor: 'rgba(220, 20, 60, 1)',
              backgroundColor: 'rgba(220, 20, 60, 0.2)',
              fill: true,
              tension: 0.1,
            },
            {
              label: 'Wind Speed (m/s)',
              data: forecast.map(item => item.windSpeed),
              borderColor: 'rgba(0, 255, 0, 1)',
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              fill: true,
              tension: 0.1,
            },
            {
              label: 'Humidity (%)',
              data: forecast.map(item => item.humidity),
              borderColor: 'rgba(0, 255, 255, 1)',
              backgroundColor: 'rgba(0, 255, 255, 0.2)',
              fill: true,
              tension: 0.1,
            },
            {
              label: 'Pressure (hPa)',
              data: forecast.map(item => item.pressure),
              borderColor: 'rgba(0, 0, 129, 1)',
              backgroundColor: 'rgba(0, 0, 129, 0.2)',
              fill: true,
              tension: 0.1,
            },
            {
              label: 'Cloud Cover (%)',
              data: forecast.map(item => item.cloudCover),
              borderColor: 'rgba(0, 155, 175, 1)',
              backgroundColor: 'rgba(0, 155, 175, 0.2)',
              fill: true,
              tension: 0.1,
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Ensure the chart uses the full width of the container
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
                tooltipFormat: 'MMM dd, yyyy, h:mm a',
              },
              title: {
                display: true,
                text: 'Time',
              },
              ticks: {
                color: 'inherit' // Ensure ticks are visible in both light and dark modes
              }
            },
            y: {
              title: {
                display: true,
                text: 'Value',
              },
              ticks: {
                color: 'inherit' // Ensure ticks are visible in both light and dark modes
              }
            },
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            legend: {
              position: 'top',
              labels: {
                color: 'inherit' // Ensure legend text is visible in both light and dark modes
              }
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                wheel: {
                  enabled: false, // Disable zooming with mouse wheel
                },
                pinch: {
                  enabled: false, // Disable zooming with pinch gesture
                },
                mode: 'x',
              },
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
          },
        }
      });
    };

    const chart = createChart();
    chartRef.current.chartInstance = chart;

    return () => {
      chart.destroy();
    };
  }, [forecast]);

  const handleZoomIn = () => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.zoom(1.1);
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.zoom(0.9);
    }
  };

  return (
    <div className="trend-chart">
      <h3>Trend Charts</h3>
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
      <div className="zoom-buttons">
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
      </div>
    </div>
  );
};

export default TrendChart;
