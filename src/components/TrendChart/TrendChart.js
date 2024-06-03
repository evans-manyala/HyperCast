import React, { useEffect, useRef, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import './TrendChart.css';

// Register the necessary Chart.js components and plugins
Chart.register(...registerables, zoomPlugin);

const TrendChart = ({ forecast }) => {
  const chartRef = useRef(null);

  const createChart = useCallback(() => {
    const ctx = chartRef.current.getContext('2d');
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: forecast.map(item => new Date(item.date)),
        datasets: [
          createDataset('Temperature (°C)', forecast.map(item => item.temp), 'rgba(220, 20, 60, 1)', 'rgba(220, 20, 60, 0.2)'),
          createDataset('Wind Speed (m/s)', forecast.map(item => item.windSpeed), 'rgba(0, 255, 0, 1)', 'rgba(0, 255, 0, 0.2)'),
          createDataset('Humidity (%)', forecast.map(item => item.humidity), 'rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0.2)'),
          createDataset('Pressure (hPa)', forecast.map(item => item.pressure), 'rgba(0, 0, 129, 1)', 'rgba(0, 0, 129, 0.2)'),
          createDataset('Cloud Cover (%)', forecast.map(item => item.cloudCover), 'rgba(0, 155, 175, 1)', 'rgba(0, 155, 175, 0.2)'),
        ],
      },
      options: getChartOptions(),
    });
  }, [forecast]);

  useEffect(() => {
    const chart = createChart();
    chartRef.current.chartInstance = chart;

    return () => {
      chart.destroy();
    };
  }, [createChart]);

  const handleZoom = useCallback((factor) => {
    if (chartRef.current?.chartInstance) {
      chartRef.current.chartInstance.zoom(factor);
    }
  }, []);

  return (
    <div className="trend-chart">
      <h3>Trend Charts</h3>
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
      <div className="zoom-buttons">
        <button onClick={() => handleZoom(1.1)}>+</button>
        <button onClick={() => handleZoom(0.9)}>-</button>
      </div>
    </div>
  );
};

const createDataset = (label, data, borderColor, backgroundColor) => ({
  label,
  data,
  borderColor,
  backgroundColor,
  fill: true,
  tension: 0.1,
});

const getChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
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
        color: 'inherit',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Value',
      },
      ticks: {
        color: 'inherit',
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
      labels: {
        color: 'inherit',
      },
    },
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },
      zoom: {
        wheel: {
          enabled: false,
        },
        pinch: {
          enabled: false,
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
});

export default TrendChart;
