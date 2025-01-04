import React, { useState } from "react";
import { Chart } from "react-google-charts";
import { countriesData } from "../data/countriesData";
import { PieChart } from "@mui/x-charts";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaHome, FaTree } from "react-icons/fa";

const AudienceAnalytics = () => {
  const [highlightedCountry, setHighlightedCountry] = useState("IN");

  const generateData = () => {
    const countries = [["Country", "Majority Percentage"]];
    countriesData.forEach(({ name, code }) => {
      if (code === highlightedCountry) {
        countries.push([name, Math.floor(Math.random() * 5) + 80]);
      } else {
        countries.push([name, 0 + Math.floor(Math.random() * 10)]);
      }
    });
    return countries;
  };

  const baseData = generateData();

  const chartOptions = {
    colorAxis: {
      colors: ["#22252D", "#FFA500"],
    },
    backgroundColor: "#22252D",
    datalessRegionColor: "#1E1E1E",
    defaultColor: "#1E1E1E",
    region: highlightedCountry,
    resolution: "countries",
  };

  const genderData = [
    { id: 0, value: 62.4, label: "Male" },
    { id: 1, value: 37.6, label: "Female" },
  ];

  const ageGroups = [
    { label: "18-24 years", percentage: 35, icon: <FaGraduationCap size={24} /> },
    { label: "25-34 years", percentage: 45, icon: <FaBriefcase size={24} /> },
    { label: "35-44 years", percentage: 15, icon: <FaHome size={24} /> },
    { label: "45+ years", percentage: 5, icon: <FaTree size={24} /> },
  ];

  const highestGender = genderData.reduce((prev, current) => (prev.value > current.value) ? prev : current).label;
  const highestCountry = baseData.reduce((prev, current) => (prev[1] > current[1]) ? prev : current)[0];

  return (
    <div id="audience" className="mx-12 mb-[90px] inter-regular">
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-[#ebebeb] relative pb-1">
          Audience Analytics
          <span className="absolute bottom-[-4px] left-0 w-full h-[4px] bg-orange-500 rounded-full glow-bar"></span>
        </h2>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center mt-4 h-[400px]">

          {/* Audience Age */}
          <div className="bg-[#22252D] p-4 rounded-lg shadow-lg w-[32.5%] h-full relative flex flex-col">
            <div className="relative w-full h-[24%]">
              <h3 className="text-md text-[#ebebeb] mb-1">Audience Age</h3>
              <p className="text-sm text-[#c5c5c5] mb-4">The distribution graph shows the percentage of your audience in different age groups.</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 h-[76%] w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8 w-[90%]"
              >
                <div className="space-y-5 w-full">
                  {ageGroups.map((group) => (
                    <div key={group.label} className="space-y-1 w-full">
                      <div className="flex justify-between text-sm text-white items-center">
                        <span className="flex items-center gap-2">
                          {group.icon} {group.label}
                        </span>
                        <span>{group.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-600 rounded-full overflow-hidden w-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${group.percentage}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-orange-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Audience Gender */}
          <div className="bg-[#22252D] p-4 rounded-lg shadow-lg w-[32.5%] h-full relative">
            <div className="relative w-full h-[17%]">
              <h3 className="text-md text-[#ebebeb] mb-1">Audience Gender</h3>
              <p className="text-sm text-[#c5c5c5] mb-4">Mostly your post is viewed by {highestGender}.</p>
            </div>
            <div className="relative w-full h-[83%]">
              <PieChart
                series={[
                  {
                    data: genderData,
                    innerRadius: "30%",
                    outerRadius: "70%",
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "white" },
                    arcLabel: (item) => `${item.label}: ${item.value}%`,
                    arcLabelMinAngle: 30,
                    arcLabelRadius: "60%",
                    legend: false,
                  },
                ]}
                sx={{
                  "& text": { fill: "white" },
                  "& path": { stroke: "gray" },
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          </div>

          {/* Audience Location */}
          <div className="bg-[#22252D] p-4 rounded-lg shadow-lg w-[32.5%] h-full">
            <div className="relative w-full h-[17%]">
              <h3 className="text-md text-[#ebebeb] mb-1">Audience Location</h3>
              <p className="text-sm text-[#c5c5c5] mb-4">Your audience is mostly located in {highestCountry}.</p>
            </div>
            <div className="relative w-full h-[83%]">
            <Chart
              chartType="GeoChart"
              width="100%"
              height="100%"
              data={baseData}
              options={chartOptions}
            />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AudienceAnalytics;
