import { useEffect, useState } from "react";

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

export default ArcProgress;