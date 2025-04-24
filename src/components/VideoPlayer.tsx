import React, { useRef, useState, useEffect } from "react";
import { useVideoProgress } from "../hooks/useVideoProgress";
import ProgressBar from "./ProgressBar";
import VideoControls from "./VideoControls";
import { VideoData } from "../models/types";

interface VideoPlayerProps {
  video: VideoData;
  onProgressUpdate?: (progress: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onProgressUpdate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const progressUpdateIntervalRef = useRef<number | null>(null);
  
  const {
    intervals,
    progressPercentage,
    lastPosition,
    updateProgress,
    setLastPosition,
    recordInterval,
  } = useVideoProgress({
    videoId: video.id,
    duration: video.duration,
  });
  
  // Auto-resume from last position when loaded
  useEffect(() => {
    if (videoRef.current && lastPosition > 0) {
      videoRef.current.currentTime = lastPosition;
    }
  }, [lastPosition]);
  
  // Update parent component with progress
  useEffect(() => {
    if (onProgressUpdate) {
      onProgressUpdate(progressPercentage);
    }
  }, [progressPercentage, onProgressUpdate]);
  
  // Set up progress tracking interval when playing
  useEffect(() => {
    if (isPlaying) {
      // Update progress every second while playing
      progressUpdateIntervalRef.current = setInterval(() => {
        if (videoRef.current) {
          const time = videoRef.current.currentTime;
          setCurrentTime(time);
          updateProgress(time);
        }
      }, 1000);
    } else if (progressUpdateIntervalRef.current) {
      clearInterval(progressUpdateIntervalRef.current);
    }
    
    return () => {
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
      }
    };
  }, [isPlaying, updateProgress]);
  
  // Event handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
      setLastPosition(time);
    }
  };
  
  const handleFullScreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };
  
  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  
  const handleVideoPlay = () => {
    setIsPlaying(true);
  };
  
  const handleVideoPause = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      recordInterval(videoRef.current.currentTime);
    }
  };
  
  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      recordInterval(video.duration);
    }
  };
  
  const handleSeeking = () => {
    if (videoRef.current) {
      recordInterval(videoRef.current.currentTime);
    }
  };
  
  const handleProgressBarClick = (time: number) => {
    handleSeek(time);
  };
  
  return (
    <div className="flex flex-col space-y-4 w-full max-w-4xl">
      <div 
        ref={containerRef} 
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group shadow-lg"
      >
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-contain"
          poster={video.thumbnail}
          onTimeUpdate={handleTimeUpdate}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onEnded={handleVideoEnded}
          onSeeking={handleSeeking}
          onClick={handlePlayPause}
        />
        
        <VideoControls
          playing={isPlaying}
          muted={isMuted}
          currentTime={currentTime}
          duration={video.duration}
          onPlayPause={handlePlayPause}
          onMute={handleMute}
          onSeek={handleSeek}
          onFullScreen={handleFullScreen}
        />
      </div>
      
      <div className="w-full">
        <ProgressBar
          progress={progressPercentage}
          intervals={intervals}
          duration={video.duration}
          onClick={handleProgressBarClick}
        />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{video.title}</h2>
        <p className="text-gray-600">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;