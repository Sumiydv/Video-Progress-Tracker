import { VideoInterval } from "../models/types";

/**
 * Merges an array of potentially overlapping intervals into a set of non-overlapping intervals
 * This is key to calculating unique watched time
 */
export function mergeIntervals(intervals: VideoInterval[]): VideoInterval[] {
  if (intervals.length <= 1) return intervals;
  
  // Sort intervals by start time
  const sortedIntervals = [...intervals].sort((a, b) => a.start - b.start);
  
  const result: VideoInterval[] = [];
  let current = sortedIntervals[0];
  
  for (let i = 1; i < sortedIntervals.length; i++) {
    const next = sortedIntervals[i];
    
    // If current interval overlaps with the next one, merge them
    if (current.end >= next.start) {
      current.end = Math.max(current.end, next.end);
    } else {
      // No overlap, add the current interval to result and move to next
      result.push(current);
      current = next;
    }
  }
  
  // Add the last interval
  result.push(current);
  return result;
}

/**
 * Calculates the total time covered by all intervals
 */
export function calculateTotalWatchedTime(intervals: VideoInterval[]): number {
  return mergeIntervals(intervals).reduce((sum, interval) => {
    return sum + (interval.end - interval.start);
  }, 0);
}

/**
 * Adds a new interval to the existing intervals, merging if necessary
 */
export function addInterval(
  intervals: VideoInterval[], 
  newInterval: VideoInterval
): VideoInterval[] {
  if (newInterval.end <= newInterval.start) return intervals;
  return mergeIntervals([...intervals, newInterval]);
}

/**
 * Calculates the percentage of video watched based on unique intervals
 */
export function calculateProgressPercentage(
  intervals: VideoInterval[],
  totalDuration: number
): number {
  if (totalDuration <= 0) return 0;
  const watchedTime = calculateTotalWatchedTime(intervals);
  return Math.min(Math.round((watchedTime / totalDuration) * 100), 100);
}

/**
 * Formats seconds into MM:SS format
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}