import React, { useEffect, useState } from "react";
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
import ArcProgress from "./ArcProgress";
import ConversionRatioCard from "./ConversionRatioCard";
import { FaStar } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardInsights({ analyzedData }) {
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
        data: [
          analyzedData.reach_time_stamp_graph.weekday.morning,
          analyzedData.reach_time_stamp_graph.weekday.afternoon,
          analyzedData.reach_time_stamp_graph.weekday.evening,
          analyzedData.reach_time_stamp_graph.weekday.night,
          null,
          analyzedData.reach_time_stamp_graph.weekend.morning,
          analyzedData.reach_time_stamp_graph.weekend.afternoon,
          analyzedData.reach_time_stamp_graph.weekend.evening,
          analyzedData.reach_time_stamp_graph.weekend.night,
        ],
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

  return (
    <div id="insights" className="mx-2 lg:mx-6 xl:mx-12 mb-[60px] md:mb-[90px] inter-regular">
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-[#ebebeb] relative pb-1">
          Audience Insights
          <span className="absolute bottom-[-4px] left-0 w-full h-[4px] bg-orange-500 rounded-full glow-bar"></span>
        </h2>
      </div>
      <div className="mt-6 w-full">
        <div className="bg-[#22252D] p-2 md:py-4 md:px-12 rounded-lg shadow-lg w-full">
          <div className="w-full h-[500px]">
            <Bar data={data} options={options} />
          </div>
          <div className="w-full lg:pl-28 lg:pr-8 h-[20px] px-4 flex justify-end gap-[10vw] sm:gap-[12vw] md:justify-between items-center translate-y-[-15px]">
            <div className="w-[35%] sm:w-[40%] h-full text-center text-gray-200 border-t-2">
              <p>Weekdays</p>
            </div>
            <div className="w-[35%] sm:w-[40%] h-full text-center text-gray-200 border-t-2">
              <p>Weekends</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 md:flex-row justify-between items-center mt-6">
          <div className="bg-[#22252D] p-3 sm:p-6 lg:py-4 lg:px-12 rounded-lg shadow-lg w-full h-[250px] md:w-[49%] sm:h-[350px] lg:h-[300px]">
            <div className="relative w-full h-[24%]">
              <h3 className="text-md text-[#ebebeb] mb-1">Reach vs. Engagement</h3>
              <p className="text-[12px] sm:text-sm text-[#c5c5c5] mb-4">See the level of engagement (likes, comments, shares) in relation to the total reach of your posts.</p>
            </div>
            <div className="relative w-full h-[76%]">
              <ArcProgress sentimentalPercentage={analyzedData.sentimental_analysis} />
            </div>
          </div>
          <ConversionRatioCard reachCount={analyzedData.reach} conversionPercentage={analyzedData.conversion_rate} />
        </div>
        <div className="bg-[#22252D] p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full mt-6">
          <h3 className="text-md text-[#ebebeb] mb-4">Other Insights</h3>
          <ul className="list-none space-y-3">
            {analyzedData.insights.map((insight, index) => (
              <li key={index} className="flex items-start text-[#c5c5c5]">
                <FaStar className="text-orange-500 mr-2 mt-1" />
                <p>{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardInsights;


