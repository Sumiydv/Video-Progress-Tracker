import { useState, useEffect, useRef } from "react";
import { VideoProgressData, VideoInterval } from "../models/types";
import { 
  addInterval, 
  calculateProgressPercentage
} from "../utils/intervalUtils";
import { 
  saveVideoProgress, 
  getVideoProgress 
} from "../utils/storageUtils";

interface VideoProgressHookProps {
  videoId: string;
  duration: number;
}

interface VideoProgressHookResult {
  intervals: VideoInterval[];
  progressPercentage: number;
  lastPosition: number;
  updateProgress: (currentTime: number) => void;
  setLastPosition: (time: number) => void;
  resetProgress: () => void;
  recordInterval: (endTime: number) => void;
}

const DEFAULT_INTERVAL_LENGTH = 1; // Track progress in 1-second intervals

/**
 * Custom hook to manage video progress tracking
 */
export function useVideoProgress({
  videoId,
  duration,
}: VideoProgressHookProps): VideoProgressHookResult {
  const [intervals, setIntervals] = useState<VideoInterval[]>([]);
  const [lastPosition, setLastPosition] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const lastTrackedTimeRef = useRef<number | null>(null);
  
  // Load saved progress when component mounts
  useEffect(() => {
    const savedProgress = getVideoProgress(videoId);
    if (savedProgress) {
      setIntervals(savedProgress.intervals);
      setLastPosition(savedProgress.lastPosition);
      
      const percentage = calculateProgressPercentage(
        savedProgress.intervals,
        duration
      );
      setProgressPercentage(percentage);
      console.log('[useVideoProgress] Loaded saved progress:', savedProgress);
    }
  }, [videoId, duration]);
  
  // Save progress when intervals or last position change
  useEffect(() => {
    if (intervals.length > 0 || lastPosition > 0) {
      const progressData: VideoProgressData = {
        videoId,
        intervals,
        lastPosition,
        totalDuration: duration,
      };
      saveVideoProgress(progressData);
      
      const percentage = calculateProgressPercentage(intervals, duration);
      setProgressPercentage(percentage);
      console.log('[useVideoProgress] Intervals updated:', intervals);
      console.log('[useVideoProgress] Progress Percentage:', percentage);
    }
  }, [intervals, lastPosition, videoId, duration]);
  
  /**
   * Update progress when user watches video
   * Only counts unique segments that haven't been watched before
   */
  const updateProgress = (currentTime: number) => {
    console.log('[useVideoProgress] updateProgress called with:', currentTime);
    // Skip if at the end of video or invalid currentTime
    if (currentTime >= duration || currentTime < 0) {
      return;
    }
    
    if (lastTrackedTimeRef.current === null) {
      // First update, just store the current time
      lastTrackedTimeRef.current = currentTime;
      return;
    }
    
    const prevTime = lastTrackedTimeRef.current;
    
    // Check if user skipped (jumped forward more than our interval length)
    const isSkipping = currentTime - prevTime > 2 * DEFAULT_INTERVAL_LENGTH;
    
    if (!isSkipping) {
      // Only count continuous watching (not skipping)
      const newInterval: VideoInterval = {
        start: prevTime,
        end: currentTime,
      };
      
      setIntervals((prev) => {
        const updatedIntervals = addInterval(prev, newInterval);
        return updatedIntervals;
      });
    }
    
    // Update last tracked time
    lastTrackedTimeRef.current = currentTime;
    
    // Always update last position
    setLastPosition(currentTime);
  };
  
  const resetProgress = () => {
    setIntervals([]);
    setLastPosition(0);
    setProgressPercentage(0);
    lastTrackedTimeRef.current = null;
  };
  
  /**
   * Manually record an interval from lastTrackedTimeRef to a given end time
   */
  const recordInterval = (endTime: number) => {
    console.log('[useVideoProgress] recordInterval called with:', endTime, 'lastTrackedTimeRef:', lastTrackedTimeRef.current);
    if (
      lastTrackedTimeRef.current !== null &&
      endTime > lastTrackedTimeRef.current &&
      endTime <= duration
    ) {
      const newInterval: VideoInterval = {
        start: lastTrackedTimeRef.current,
        end: endTime,
      };
      setIntervals((prev) => addInterval(prev, newInterval));
    }
    lastTrackedTimeRef.current = null;
    setLastPosition(endTime);
  };
  
  return {
    intervals,
    progressPercentage,
    lastPosition,
    updateProgress,
    setLastPosition,
    resetProgress,
    recordInterval,
  };
}