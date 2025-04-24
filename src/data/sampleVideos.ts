import { VideoData } from "../models/types";

export const sampleVideos: VideoData[] = [
  {
    id: "video-1",
    title: "Introduction to Modern Web Development",
    description: "Learn the fundamentals of modern web development, including React, TypeScript, and responsive design principles.",
    src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    thumbnail: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
    duration: 174,
    category: "Web Development",
    instructor: "Sarah Chen",
    lastWatched: new Date("2024-03-15T10:30:00"),
  },
  {
    id: "video-2",
    title: "Advanced State Management in React",
    description: "Deep dive into modern state management techniques in React applications.",
    src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    thumbnail: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
    duration: 245,
    category: "React",
    instructor: "Marcus Johnson",
    lastWatched: new Date("2024-03-14T15:20:00"),
  },
  {
    id: "video-3",
    title: "Building Scalable APIs",
    description: "Learn how to design and implement scalable backend APIs using modern technologies.",
    src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    thumbnail: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    duration: 198,
    category: "Backend",
    instructor: "Elena Rodriguez",
    lastWatched: new Date("2024-03-13T09:15:00"),
  },
];

export const categories = [
  "All",
  "Web Development",
  "React",
  "Backend",
  "DevOps",
  "Mobile Development",
];