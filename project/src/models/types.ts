export interface VideoInterval {
  start: number;
  end: number;
}

export interface VideoProgressData {
  videoId: string;
  intervals: VideoInterval[];
  lastPosition: number;
  totalDuration: number;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  duration: number;
  category: string;
  instructor: string;
  lastWatched?: Date;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  autoplay: boolean;
  playbackSpeed: number;
  notifications: boolean;
  subtitle: string;
}

export interface UserProgress {
  totalWatchTime: number;
  completedVideos: number;
  averageProgress: number;
  weeklyProgress: number[];
}