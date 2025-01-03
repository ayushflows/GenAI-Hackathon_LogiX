import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: '8 AM - 12 PM',
      data: [120, 150, 180, 220, 170, 200, 350],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: '12 PM - 4 PM',
      data: [100, 130, 160, 210, 160, 190, 240],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    },
    {
      label: '4 PM - 8 PM',
      data: [90, 120, 150, 200, 150, 180, 230],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
    },
    {
      label: '8 PM - 12 AM',
      data: [80, 110, 140, 190, 140, 170, 220],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ebebeb',
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: 'Reach v/s Day and Time Graph',
        color: '#ebebeb',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timestamp',
          color: '#ebebeb',
          font: {
            size: 16,
          },
        },
        ticks: {
          color: '#ebebeb',
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Reach',
          color: '#ebebeb',
          font: {
            size: 16,
          },
        },
        ticks: {
          color: '#ebebeb',
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    elements: {
      bar: {
        backgroundColor: (context) => {
          const datasetIndex = context.datasetIndex;
          const dataIndex = context.dataIndex;
          const value = context.dataset.data[dataIndex];
  
          const allData = context.chart.data.datasets.flatMap(dataset => dataset.data);
          const maxValue = Math.max(...allData);
  
          return value === maxValue ? 'rgba(255, 215, 0, 0.8)' : context.dataset.backgroundColor;
        },
      },
    },
  };
  

function DashboardInsights() {
  return (
    <div id="insights" className="mx-12 mt-[60px] inter-regular mb-8">
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-[#ebebeb] relative pb-1">
          Audience Insights
          <span className="absolute bottom-[-4px] left-0 w-full h-[4px] bg-orange-500 rounded-full glow-bar"></span>
        </h2>
      </div>
      <div className="mt-6">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default DashboardInsights;
