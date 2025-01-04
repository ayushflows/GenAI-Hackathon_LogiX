import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: [
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
    "",
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
  ],
  datasets: [
    {
      label: "Reach",
      data: [150, 200, 250, 300, null, 180, 220, 270, 420],
      backgroundColor: (context) => {
        const reachValue = context.raw;
        const maxReach = Math.max(...context.chart.data.datasets[0].data.filter((v) => v !== null));
        const minReach = Math.min(...context.chart.data.datasets[0].data.filter((v) => v !== null));

        if (reachValue === null) return "rgba(0, 0, 0, 0)";
        const lightness = 75 - ((reachValue - minReach) / (maxReach - minReach)) * 25;
        return `hsl(30, 100%, ${lightness}%)`;
      },
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#ebebeb",
        font: {
          size: 16,
        },
      },
    },
    title: {
      display: true,
      text: "Reach vs Timestamp Graph",
      color: "#ebebeb",
      font: {
        size: 18,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        color: "#ebebeb",
        font: {
          size: 16,
        },
      },
      ticks: {
        color: "#ebebeb",
        font: {
          size: 14,
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
    y: {
      title: {
        display: true,
        text: "Reach",
        color: "#ebebeb",
        font: {
          size: 16,
        },
      },
      ticks: {
        color: "#ebebeb",
        font: {
          size: 14,
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
  },
  elements: {
    bar: {
      borderWidth: 1,
      borderRadius: 4,
      barThickness: 20,
      maxBarThickness: 20,
      minBarLength: 2,
    },
  },
  barPercentage: 0.5,
};

function DashboardInsights() {
  return (
    <div id="insights" className="mx-12 mb-[60px] inter-regular">
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-[#ebebeb] relative pb-1">
          Audience Insights
          <span className="absolute bottom-[-4px] left-0 w-full h-[4px] bg-orange-500 rounded-full glow-bar"></span>
        </h2>
      </div>
      <div className="mt-6 w-full">
        <div className="bg-[#22252D] py-4 px-12 rounded-lg shadow-lg ">
          <div className="w-full h-[500px]">
            <Bar data={data} options={options} />
          </div>
          <div className="w-full pl-28 pr-8 h-[50px] py-2 px-4 flex justify-between items-center translate-y-[-20px]">
            <div className="w-[40%] h-full text-center text-gray-200 border-t-2">
              <p>Weekdays</p>
            </div>
            <div className="w-[40%] h-full text-center text-gray-200 border-t-2">
              <p>Weekends</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInsights;
