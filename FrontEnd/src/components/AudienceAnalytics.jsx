import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const AudienceAnalytics = () => {
  const [highlightedCountry, setHighlightedCountry] = useState("IN"); // Highlight India

  // ISO 3166-1 alpha-2 country codes
  const countryCodes = [
    "US", "BR", "DE", "FR", "RU", "IN", "CN", "JP", "GB", "AU", "CA", "IT", "ES",
    "MX", "KR", "ID", "TR", "SA", "NG", "AR", "NL", "ZA", "CH", "SE", "PL", "BE",
    "TH", "EG", "PK", "MY", "PH", "SG", "VN", "DK", "FI", "NO", "NZ", "UA", "IL",
    "IE", "AT", "CL", "CZ", "PT", "HU", "RO", "GR", "HK", "AE", "CO", "BG", "RS",
    "SK", "HR", "LT", "SI", "LV", "EE", "IS", "LU", "MT", "CY"
  ];

  // Generate random data for all countries
  const generateData = () => {
    const countries = [["Country", "Majority Percentage"]];
    countryCodes.forEach((code) => {
      if (code === highlightedCountry) {
        countries.push([code, Math.floor(Math.random() * 100) + 800]); // Highlighted country
      } else {
        countries.push([code, Math.floor(Math.random() * 50) + 100]); // Other countries
      }
    });
    return countries;
  };

  const baseData = generateData();

  const chartOptions = {
    colorAxis: {
      colors: ["#22252D", "#FFA500"], // Neutral to highlight color
    },
    backgroundColor: "#22252D",
    datalessRegionColor: "#1E1E1E",
    defaultColor: "#1E1E1E",
    region: highlightedCountry, // Focus on the highlighted country
    resolution: "countries",
  };

  return (
    <div id="Audience" className="mx-12 mt-8 inter-regular mb-8">
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
            <h3 className="text-md text-gray-300 mb-4">Audience Location</h3>
            <Chart
              chartType="GeoChart"
              width="100%"
              height="95%"
              data={baseData}
              options={chartOptions}
            />
          </div>

          {/* Audience Gender */}
          <div className="bg-[#22252D] p-4 rounded-lg shadow-lg w-[48%] h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AudienceAnalytics;
