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
    <div id="insights" className="mx-12 mb-[90px] inter-regular">
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-[#ebebeb] relative pb-1">
          Audience Insights
          <span className="absolute bottom-[-4px] left-0 w-full h-[4px] bg-orange-500 rounded-full glow-bar"></span>
        </h2>
      </div>
      <div className="mt-6 w-full">
        <div className="bg-[#22252D] py-4 px-12 rounded-lg shadow-lg w-full">
          <div className="w-full h-[500px]">
            <Bar data={data} options={options} />
          </div>
          <div className="w-full pl-28 pr-8 h-[20px] px-4 flex justify-between items-center translate-y-[-15px]">
            <div className="w-[40%] h-full text-center text-gray-200 border-t-2">
              <p>Weekdays</p>
            </div>
            <div className="w-[40%] h-full text-center text-gray-200 border-t-2">
              <p>Weekends</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-6">
          <div className="bg-[#22252D] py-4 px-12 rounded-lg shadow-lg w-[49%] h-[300px]">
            <div className="relative w-full h-[24%]">
              <h3 className="text-md text-[#ebebeb] mb-1">Reach vs. Engagement</h3>
              <p className="text-sm text-[#c5c5c5] mb-4">See the level of engagement (likes, comments, shares) in relation to the total reach of your posts.</p>
            </div>
            <div className="relative w-full h-[76%]">
              <ArcProgress totalReach={1000} engagement={862} />
            </div>
          </div>
          <ConversionRatioCard reachCount={786} impressionCount={1843} />

        </div>
      </div>
    </div>
  );
}

export default DashboardInsights;


const ArcProgress = ({ totalReach, engagement }) => {
  const engagementPercentage = totalReach > 0 ? (engagement / totalReach) * 100 : 0;
  const [progress, setProgress] = useState(0);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const step = 3;
    const percentageEnd = engagementPercentage;
    const arcEnd = (engagementPercentage / 100) * 251.2;
    let progressStart = 0;
    let percentageStart = 0;
    const startTime = performance.now();
    const animation = (time) => {
      const elapsedTime = time - startTime;
      const progressIncrement = Math.min((elapsedTime / duration) * arcEnd, arcEnd);
      const percentageIncrement = Math.min((elapsedTime / duration) * percentageEnd, percentageEnd);
      setProgress(progressIncrement);
      setDisplayedPercentage(percentageIncrement.toFixed(1));
      if (elapsedTime < duration) {
        requestAnimationFrame(animation);
      } else {
        setProgress(arcEnd);
        setDisplayedPercentage(percentageEnd.toFixed(1));
      }
    };
    requestAnimationFrame(animation);
  }, [engagementPercentage]);

  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <svg width="50%" height="100%" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        {/* Background Arc */}
        <path
          d="M 10,90 A 80,80 0 0,1 190,90"
          stroke="rgba(46, 49, 57, 0.9)"
          strokeWidth="20"
          strokeLinecap="round"
          fill="none"
        />
        {/* Foreground Arc */}
        <path
          d="M 10,90 A 80,80 0 0,1 190,90"
          stroke="#FFA500"
          strokeWidth="20"
          strokeDasharray={`${progress} 251.2`}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute text-white text-xl font-semibold">
        {displayedPercentage}%
      </div>
    </div>
  );
};


const ConversionRatioCard = ({ reachCount, impressionCount }) => {
  const [progress, setProgress] = useState(0);

  const calculateConversionRatio = () => {
    if (impressionCount === 0) return 0;
    return Math.min((reachCount / impressionCount) * 100, 100);
  };

  useEffect(() => {
    const end = calculateConversionRatio();
    let start = 0;
    const duration = 2000;
    const steps = 100;
    const animateProgress = () => {
      const stepInterval = duration / steps;
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progressValue = Math.min((end * currentStep) / steps, end);
        setProgress(progressValue);

        if (currentStep === steps) {
          clearInterval(interval);
        }
      }, stepInterval);
    };
    animateProgress(); 
  }, [reachCount, impressionCount]);

  return (
    <div className="bg-[#22252D] py-6 px-8 rounded-lg shadow-xl w-[49%] h-[300px]">
      <div className="relative w-full mb-4">
        <h3 className="text-lg text-[#ebebeb] font-bold mb-2">Conversion Ratio</h3>
        <p className="text-sm text-[#c5c5c5] mb-6">
          Compares reach (views) to impressions, showing how many engaged vs. how many saw the content.
        </p>
      </div>

      <div className="w-[90%] mx-auto">
        {/* Animated Progress Bar Section */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="w-full h-2 bg-[#404B58] rounded-full mb-3">
            <div
              className="h-full bg-[#FFA500] rounded-full"
              style={{
                width: `${progress}%`,
                transition: 'width 0.2s ease-out',
              }}
            ></div>
          </div>
          <div className="text-xl text-white font-semibold animate__animated animate__fadeIn">
            {Math.round(progress)}% Converted
          </div>
        </div>

        {/* Data for Total Reach and Total Engagement */}
        <div className="flex justify-evenly text-sm text-[#c5c5c5] mt-6">
          <div className="hover:text-[#FFA500] transition-all duration-300 ease-in-out text-center">
            <div className="font-semibold text-white text-3xl flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FFA500"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 11l2-2l4 4l-2 2l-4-4z"
                />
              </svg>
              {reachCount}
            </div>
            <div>Total Reach</div>
          </div>
          <div className="hover:text-[#FFA500] transition-all duration-300 ease-in-out text-center">
            <div className="font-semibold text-white text-3xl flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FFA500"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-10h-2v6h2zm0-8h2v2h-2V4z"
                />
              </svg>
              {impressionCount}
            </div>
            <div>Total Engagement</div>
          </div>
        </div>
      </div>
    </div>
  );
};
