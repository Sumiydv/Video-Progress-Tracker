import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import VideoProgressStats from '../components/VideoProgressStats';
import { sampleVideos } from '../data/sampleVideos';
import { useVideoProgress } from '../hooks/useVideoProgress';

const LectureView: React.FC = () => {
  const { videoId } = useParams();
  const video = sampleVideos.find(v => v.id === videoId);

  if (!video) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Lecture not found</h2>
        <p className="text-gray-600 mt-2">The requested lecture could not be found.</p>
      </div>
    );
  }

  const {
    intervals,
    progressPercentage,
  } = useVideoProgress({
    videoId: video.id,
    duration: video.duration,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{video.title}</h1>
        <p className="text-gray-600">
          Track your learning progress. This system monitors exactly which parts of the video 
          you've watched and only counts unique viewing time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VideoPlayer 
            video={video} 
            onProgressUpdate={(progress) => {
              console.log("Progress updated:", progress);
            }}
          />
        </div>
        
        <div>
          <VideoProgressStats 
            intervals={intervals}
            duration={video.duration}
            progressPercentage={progressPercentage}
          />
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">How Progress Works</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-xs mr-3 mt-0.5">1</span>
                <span>Only unique parts of the video count toward your progress</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-xs mr-3 mt-0.5">2</span>
                <span>Rewatching the same section doesn't increase your progress</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-xs mr-3 mt-0.5">3</span>
                <span>Skipping or fast-forwarding doesn't count as watched time</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-xs mr-3 mt-0.5">4</span>
                <span>Your progress is saved automatically and resumed when you return</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureView;