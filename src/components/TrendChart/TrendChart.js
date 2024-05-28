import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import './TrendChart.css';

// Register the necessary Chart.js components
Chart.register(...registerables);

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
            },
            {
              label: 'Wind Speed (m/s)',
              data: forecast.map(item => item.windSpeed),
              borderColor: 'rgba(0, 255, 0, 1)',
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Humidity (%)',
              data: forecast.map(item => item.humidity),
              borderColor: 'rgba(0, 255, 255, 1)',
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Pressure (hPa)',
              data: forecast.map(item => item.pressure),
              borderColor: 'rgba(0, 0, 129, 1)',
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Cloud Cover (%)',
              data: forecast.map(item => item.cloudCover),
              borderColor: 'rgba(0, 155, 175, 1)',
              fill: false,
              tension: 0.1,
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

    return () => {
      chart.destroy();
    };
  }, [forecast]);

  return (
    <div className="trend-chart">
      <h3>Trend Charts</h3>
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default TrendChart;
