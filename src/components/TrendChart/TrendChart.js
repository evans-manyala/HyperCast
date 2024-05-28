import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import './TrendChart.css';

// Register the necessary Chart.js components
Chart.register(...registerables);

const TrendChart = ({ forecast }) => {
  const tempChartRef = useRef(null);
  const windChartRef = useRef(null);
  const humidityChartRef = useRef(null);
  const pressureChartRef = useRef(null);
  const cloudChartRef = useRef(null);

  useEffect(() => {
    const ctxTemp = tempChartRef.current.getContext('2d');
    const ctxWind = windChartRef.current.getContext('2d');
    const ctxHumidity = humidityChartRef.current.getContext('2d');
    const ctxPressure = pressureChartRef.current.getContext('2d');
    const ctxCloud = cloudChartRef.current.getContext('2d');

    const createChart = (ctx, label, data, borderColor) => {
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: forecast.map(item => new Date(item.date)),
          datasets: [{
            label,
            data: forecast.map(item => item[data]),
            fill: false,
            borderColor,
            tension: 0.1,
          }]
        },
        options: {
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
                text: label,
              },
            },
          },
        }
      });
    };

    const tempChart = createChart(ctxTemp, 'Temperature (°C)', 'temp', 'rgba(75, 192, 192, 1)');
    const windChart = createChart(ctxWind, 'Wind Speed (m/s)', 'windSpeed', 'rgba(153, 102, 255, 1)');
    const humidityChart = createChart(ctxHumidity, 'Humidity (%)', 'humidity', 'rgba(255, 159, 64, 1)');
    const pressureChart = createChart(ctxPressure, 'Pressure (hPa)', 'pressure', 'rgba(54, 162, 235, 1)');
    const cloudChart = createChart(ctxCloud, 'Cloud Cover (%)', 'cloudCover', 'rgba(255, 206, 86, 1)');

    return () => {
      tempChart.destroy();
      windChart.destroy();
      humidityChart.destroy();
      pressureChart.destroy();
      cloudChart.destroy();
    };
  }, [forecast]);

  return (
    <div className="trend-chart">
      <h3>Trend Charts</h3>
      <div className="chart-container">
        <canvas ref={tempChartRef} />
      </div>
      <div className="chart-container">
        <canvas ref={windChartRef} />
      </div>
      <div className="chart-container">
        <canvas ref={humidityChartRef} />
      </div>
      <div className="chart-container">
        <canvas ref={pressureChartRef} />
      </div>
      <div className="chart-container">
        <canvas ref={cloudChartRef} />
      </div>
    </div>
  );
};

export default TrendChart;
