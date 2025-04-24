import { VideoProgressData, UserSettings, UserProgress } from "../models/types";
import { sampleVideos } from "../data/sampleVideos";
import { calculateTotalWatchedTime, calculateProgressPercentage } from "./intervalUtils";

const STORAGE_KEY_PREFIX = "video_progress_";
const SETTINGS_KEY = "user_settings";
const PROGRESS_KEY = "user_progress";

export function saveVideoProgress(progressData: VideoProgressData): void {
  const key = `${STORAGE_KEY_PREFIX}${progressData.videoId}`;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(progressData));
      console.log('[storageUtils] Saved video progress:', key, progressData);
    } catch (e) {
      console.warn("[storageUtils] Could not save progress:", e);
    }
  }
}

export function getVideoProgress(videoId: string): VideoProgressData | null {
  const key = `${STORAGE_KEY_PREFIX}${videoId}`;
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem(key);
      console.log('[storageUtils] Loaded video progress:', key, data);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn("[storageUtils] Could not load progress:", e);
      return null;
    }
  }
  return null;
}

export function clearVideoProgress(videoId: string): void {
  const key = `${STORAGE_KEY_PREFIX}${videoId}`;
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
      console.log('[storageUtils] Cleared video progress:', key);
    } catch (e) {
      console.warn("[storageUtils] Could not clear progress:", e);
    }
  }
}

export function saveUserSettings(settings: UserSettings): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      console.log('[storageUtils] Saved user settings:', settings);
    } catch (e) {
      console.warn("[storageUtils] Could not save user settings:", e);
    }
  }
}

export function getUserSettings(): UserSettings {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      console.log('[storageUtils] Loaded user settings:', data);
      return data ? JSON.parse(data) : {
        theme: 'light',
        autoplay: true,
        playbackSpeed: 1,
        notifications: true,
        subtitle: 'en',
      };
    } catch (e) {
      console.warn("[storageUtils] Could not load user settings:", e);
      return {
        theme: 'light',
        autoplay: true,
        playbackSpeed: 1,
        notifications: true,
        subtitle: 'en',
      };
    }
  }
  return {
    theme: 'light',
    autoplay: true,
    playbackSpeed: 1,
    notifications: true,
    subtitle: 'en',
  };
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      console.log('[storageUtils] Saved user progress:', progress);
    } catch (e) {
      console.warn("[storageUtils] Could not save user progress:", e);
    }
  }
}

export function getUserProgress(): UserProgress {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      console.log('[storageUtils] Loaded user progress:', data);
      return data ? JSON.parse(data) : {
        totalWatchTime: 0,
        completedVideos: 0,
        averageProgress: 0,
        weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
      };
    } catch (e) {
      console.warn("[storageUtils] Could not load user progress:", e);
      return {
        totalWatchTime: 0,
        completedVideos: 0,
        averageProgress: 0,
        weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
      };
    }
  }
  return {
    totalWatchTime: 0,
    completedVideos: 0,
    averageProgress: 0,
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
  };
}

export function updateUserProgressFromAllVideos() {
  if (typeof window === "undefined") return;

  let totalWatchTime = 0;
  let completedVideos = 0;
  let sumProgress = 0;
  let videoCount = 0;

  for (const video of sampleVideos) {
    const progress = getVideoProgress(video.id);
    if (progress) {
      const watched = calculateTotalWatchedTime(progress.intervals);
      totalWatchTime += watched;
      const percent = calculateProgressPercentage(progress.intervals, video.duration);
      sumProgress += percent;
      if (percent === 100) completedVideos++;
      videoCount++;
    }
  }

  const averageProgress = videoCount > 0 ? Math.round(sumProgress / videoCount) : 0;

  // Weekly progress: update today's value
  const userProgress = getUserProgress();
  const today = new Date().getDay(); // 0=Sunday, 1=Monday, ...
  const weeklyProgress = Array.isArray(userProgress.weeklyProgress) ? [...userProgress.weeklyProgress] : [0,0,0,0,0,0,0];
  weeklyProgress[today] = totalWatchTime / 60; // store minutes watched today

  const newUserProgress = {
    totalWatchTime,
    completedVideos,
    averageProgress,
    weeklyProgress,
  };
  saveUserProgress(newUserProgress);
  console.log('[storageUtils] Updated user progress:', newUserProgress);
}