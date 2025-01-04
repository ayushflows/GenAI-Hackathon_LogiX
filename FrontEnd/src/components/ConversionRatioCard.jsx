import { useEffect, useState } from "react";

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
    <div className="bg-[#22252D] p-3 sm:p-6 lg:py-6 lg:px-8 rounded-lg shadow-xl w-full h-[250px] sm:h-[350px] md:w-[49%] lg:h-[300px]">
      <div className="relative w-full mb-4">
        <h3 className="text-lg text-[#ebebeb] font-bold mb-2">Conversion Ratio</h3>
        <p className="text-[12px] sm:text-sm text-[#c5c5c5] mb-6">
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
        <div className="flex justify-between md:justify-evenly text-sm text-[#c5c5c5] mt-6">
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

export default ConversionRatioCard;
