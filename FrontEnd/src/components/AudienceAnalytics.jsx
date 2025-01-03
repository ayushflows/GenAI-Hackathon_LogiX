import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { countriesData } from "../data/countriesData";
import { PieChart } from "@mui/x-charts";

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

  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const genderData = [
    { id: 0, value: 62.4, label: "Male" },
    { id: 1, value: 37.6, label: "Female" },
  ];

  const handleMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  const handleMouseLeave = () => {
    setHighlightedIndex(null);
  };

  const ageGroups = [
    { range: "0-14 years", label: "Children", icon: "👶" },
    { range: "15-24 years", label: "Young Adults", icon: "🧑" },
    { range: "25-34 years", label: "Adults", icon: "👨" },
    { range: "35-44 years", label: "Mid Adults", icon: "👩" },
    { range: "45-54 years", label: "Older Adults", icon: "🧓" },
    { range: "55-64 years", label: "Seniors", icon: "👴" },
    { range: "65+ years", label: "Elders", icon: "👵" },
  ];

  const ageRange = "15-24 years";
  const ageGroup = ageGroups.find(group => group.range === ageRange);

  return (
    <div id="audience" className="mx-12 mt-[60px] inter-regular mb-8">
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-[#ebebeb] relative pb-1">
          Audience Analytics
          <span className="absolute bottom-[-4px] left-0 w-full h-[4px] bg-orange-500 rounded-full glow-bar"></span>
        </h2>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center mt-4 h-[400px]">
          {/* Audience Location */}
          <div className="bg-[#22252D] p-4 rounded-lg shadow-lg w-[48%] h-full">
            <h3 className="text-md text-[#ebebeb] mb-4">Audience Location</h3>
            <Chart
              chartType="GeoChart"
              width="100%"
              height="95%"
              data={baseData}
              options={chartOptions}
            />
          </div>

          {/* Audience Gender */}
          <div className="bg-[#22252D] p-4 rounded-lg shadow-lg w-[48%] h-full relative">
            <h3 className="text-md text-[#ebebeb] mb-4">Audience Gender</h3>
            <div style={{ width: '100%', height: '90%' }}>
              <PieChart
                series={[
                  {
                    data: genderData,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'white' },
                    arcLabel: (item) => `${item.label}: ${item.value}%`,
                    arcLabelMinAngle: 30,
                    arcLabelRadius: '110%',
                    legend: false,
                  },
                ]}
                sx={{
                  '& text': { fill: 'white' },
                  '& path': { stroke: 'gray' },
                }}
                width={500}
                height={300}
                highlightedIndex={highlightedIndex}
                onMouseEnter={(event, index) => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 h-[400px]">
          {/* Audience Gender (Pie Chart) */}
          <div className="bg-[#22252D] p-4 rounded-lg shadow-lg w-[48%] h-full relative">
            <h3 className="text-md text-[#ebebeb] mb-4">Audience Gender</h3>
            <div style={{ width: '100%', height: '90%' }}>
              <Chart
                chartType="PieChart"
                width="100%"
                height="95%"
                data={[
                  ["Gender", "Percentage"],
                  ["Male", 60],
                  ["Female", 40],
                ]}
                options={{
                  slices: {
                    0: { offset: 0.1, textStyle: { color: "#fff" }, color: "#36B4FF" },
                    1: { offset: 0.1, textStyle: { color: "#fff" }, color: "#06B2AF" },
                  },
                  backgroundColor: "#22252D",
                  legend: {
                    textStyle: { color: "#ebebeb" },
                    alignment: "center",
                    position: "labeled",
                  },
                  animation: {
                    startup: true,
                    duration: 1000,
                    easing: "out",
                  },
                  pieSliceText: 'percentage',
                  is3D: true,
                  chartArea: {
                    width: "90%",
                    height: "90%",
                  },
                }}
              />
            </div>
          </div>

          {/* Audience Age */}
          <div className="bg-[#22252D] p-4 rounded-lg shadow-lg w-[48%] h-full relative flex flex-col">
            <h3 className="text-md text-[#ebebeb] mb-4 h-[10%]">Audience Age</h3>
            <div className="flex flex-col justify-center items-center gap-2 h-[90%]">
              <span className="text-8xl mb-8">{ageGroup.icon}</span>
              <p className="text-3xl text-white">{ageGroup.range}</p>
              <p className="text-2xl text-gray-400">({ageGroup.label})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudienceAnalytics;

