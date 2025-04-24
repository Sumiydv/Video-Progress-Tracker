import React from "react";
import { VideoInterval } from "../models/types";

interface ProgressBarProps {
  progress: number;
  intervals: VideoInterval[];
  duration: number;
  onClick?: (position: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  intervals, 
  duration, 
  onClick 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const time = position * duration;
    onClick(time);
  };
  
  return (
    <div className="flex flex-col space-y-1 w-full">
      <div 
        className="relative h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {/* Progress bar */}
        <div 
          className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        
        {/* Watched segments visualization */}
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
          {intervals.map((interval, index) => {
            const startPercent = (interval.start / duration) * 100;
            const widthPercent = ((interval.end - interval.start) / duration) * 100;
            
            return (
              <div
                key={index}
                className="absolute h-full bg-blue-300 opacity-40"
                style={{
                  left: `${startPercent}%`,
                  width: `${widthPercent}%`,
                }}
              />
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{progress}% completed</span>
      </div>
    </div>
  );
};

export default ProgressBar;