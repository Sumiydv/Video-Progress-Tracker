import { VideoProgressData, UserSettings, UserProgress } from "../models/types";

const STORAGE_KEY_PREFIX = "video_progress_";
const SETTINGS_KEY = "user_settings";
const PROGRESS_KEY = "user_progress";

export function saveVideoProgress(progressData: VideoProgressData): void {
  const key = `${STORAGE_KEY_PREFIX}${progressData.videoId}`;
  localStorage.setItem(key, JSON.stringify(progressData));
}

export function getVideoProgress(videoId: string): VideoProgressData | null {
  const key = `${STORAGE_KEY_PREFIX}${videoId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function clearVideoProgress(videoId: string): void {
  const key = `${STORAGE_KEY_PREFIX}${videoId}`;
  localStorage.removeItem(key);
}

export function saveUserSettings(settings: UserSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getUserSettings(): UserSettings {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : {
    theme: 'light',
    autoplay: true,
    playbackSpeed: 1,
    notifications: true,
    subtitle: 'en',
  };
}

export function saveUserProgress(progress: UserProgress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function getUserProgress(): UserProgress {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : {
    totalWatchTime: 0,
    completedVideos: 0,
    averageProgress: 0,
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
  };
}