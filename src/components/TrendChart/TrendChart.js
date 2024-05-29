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
              fill: false,
              tension: 0.1,
              animation: {
                duration: 1000,
                easing: 'easeInOutQuart',
              },
            },
            {
              label: 'Wind Speed (m/s)',
              data: forecast.map(item => item.windSpeed),
              borderColor: 'rgba(0, 255, 0, 1)',
              fill: false,
              tension: 0.1,
              animation: {
                duration: 1000,
                easing: 'easeInOutQuart',
              },
            },
            {
              label: 'Humidity (%)',
              data: forecast.map(item => item.humidity),
              borderColor: 'rgba(0, 255, 255, 1)',
              fill: false,
              tension: 0.1,
              animation: {
                duration: 1000,
                easing: 'easeInOutQuart',
              },
            },
            {
              label: 'Pressure (hPa)',
              data: forecast.map(item => item.pressure),
              borderColor: 'rgba(0, 0, 129, 1)',
              fill: false,
              tension: 0.1,
              animation: {
                duration: 1000,
                easing: 'easeInOutQuart',
              },
            },
            {
              label: 'Cloud Cover (%)',
              data: forecast.map(item => item.cloudCover),
              borderColor: 'rgba(255, 100, 175, 1)',
              fill: false,
              tension: 0.1,
              animation: {
                duration: 1000,
                easing: 'easeInOutQuart',
              },
            },
          ]
        },
        options: {
          responsive: true,
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
            },
            y: {
              title: {
                display: true,
                text: 'Value',
              },
            },
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            legend: {
              position: 'top',
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
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
