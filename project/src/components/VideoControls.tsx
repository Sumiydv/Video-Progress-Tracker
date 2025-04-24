import React from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { formatTime } from "../utils/intervalUtils";

interface VideoControlsProps {
  playing: boolean;
  muted: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onMute: () => void;
  onSeek: (time: number) => void;
  onFullScreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  playing,
  muted,
  currentTime,
  duration,
  onPlayPause,
  onMute,
  onSeek,
  onFullScreen,
}) => {
  const handleSkipBack = () => {
    onSeek(Math.max(0, currentTime - 10));
  };

  const handleSkipForward = () => {
    onSeek(Math.min(duration, currentTime + 10));
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {/* Time display */}
      <div className="flex justify-between text-white text-sm">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleSkipBack}
            className="text-white hover:text-blue-400 transition-colors"
            aria-label="Skip back 10 seconds"
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={onPlayPause}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" />
            )}
          </button>
          
          <button 
            onClick={handleSkipForward}
            className="text-white hover:text-blue-400 transition-colors"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMute}
            className="text-white hover:text-blue-400 transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>
          
          <button 
            onClick={onFullScreen}
            className="text-white hover:text-blue-400 transition-colors"
            aria-label="Full screen"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;