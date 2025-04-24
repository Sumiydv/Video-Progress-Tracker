import React from "react";
import { VideoInterval } from "../models/types";
import { formatTime } from "../utils/intervalUtils";

interface VideoProgressStatsProps {
  intervals: VideoInterval[];
  duration: number;
  progressPercentage: number;
}

const VideoProgressStats: React.FC<VideoProgressStatsProps> = ({
  intervals,
  duration,
  progressPercentage,
}) => {
  const mergedIntervals = intervals.sort((a, b) => a.start - b.start);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Viewing Progress</h3>
        <div className="text-2xl font-bold text-blue-600">{progressPercentage}%</div>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Watched Segments:</h4>
        
        {mergedIntervals.length > 0 ? (
          <div className="max-h-48 overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-1 font-medium text-gray-700">Start</th>
                  <th className="text-left py-2 px-1 font-medium text-gray-700">End</th>
                  <th className="text-left py-2 px-1 font-medium text-gray-700">Duration</th>
                </tr>
              </thead>
              <tbody>
                {mergedIntervals.map((interval, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 px-1 text-gray-600">
                      {formatTime(interval.start)}
                    </td>
                    <td className="py-2 px-1 text-gray-600">
                      {formatTime(interval.end)}
                    </td>
                    <td className="py-2 px-1 text-gray-600">
                      {formatTime(interval.end - interval.start)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No segments watched yet</p>
        )}
      </div>
      
      <div className="pt-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Total video duration: {formatTime(duration)}</span>
          <span>
            Watched: {formatTime(intervals.reduce((sum, interval) => sum + (interval.end - interval.start), 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoProgressStats;