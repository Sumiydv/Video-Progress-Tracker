# Video Tracking Device  (http://localhost:3000/dashboard)
![image](https://github.com/user-attachments/assets/bfd7fbc8-dedd-45cd-95b8-0df7be38a749)
![image](https://github.com/user-attachments/assets/d1f100a3-2562-4959-b46a-534fd11dc1d9)

A professional video progress tracking application built with React, TypeScript, and Vite. This application accurately tracks user viewing progress across multiple videos, ensuring only unique watched segments are counted toward completion.

## 🚀 Features

### Core Functionality
- **Accurate Progress Tracking**: Records unique watched intervals, preventing double-counting of rewatched segments
- **Smart Interval Merging**: Automatically merges overlapping or adjacent watched segments
- **Real-time Progress Updates**: Live progress calculation and display during video playback
- **Persistent Storage**: Saves progress locally and resumes from the last watched position
- **Cross-session Persistence**: Progress is maintained across browser sessions and page reloads

### User Interface
- **Modern, Responsive Design**: Built with Tailwind CSS for a clean, professional appearance
- **Interactive Progress Bar**: Visual representation of watched segments on the video timeline
- **Progress Dashboard**: Comprehensive overview of learning statistics including:
  - Total watch time across all videos
  - Number of completed videos
  - Average progress percentage
  - Weekly learning progress chart
- **Video Controls**: Standard playback controls with custom progress tracking
- **Mobile-Friendly**: Responsive design that works on all device sizes

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **React Hooks**: Custom hooks for video progress management
- **Chart.js Integration**: Beautiful data visualization for progress analytics
- **Error Handling**: Robust error handling for storage and video operations
- **Production Ready**: Optimized for deployment on platforms like Vercel

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **State Management**: React Hooks + localStorage
- **Code Quality**: ESLint, Prettier

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd video-tracking-device
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Watching Videos
1. Navigate to any video in the application
2. Start playing the video - progress is automatically tracked
3. Pause, seek, or finish the video - all interactions are recorded
4. Your progress is saved automatically and will resume from where you left off

### Progress Dashboard
1. Visit the Progress page to see your learning statistics
2. View total watch time, completed videos, and average progress
3. Check the weekly progress chart to track your learning patterns

### How Progress Tracking Works
- **Unique Segments Only**: Only counts time for segments you haven't watched before
- **Smart Merging**: Overlapping or adjacent watched segments are automatically merged
- **No Double Counting**: Rewatching the same section doesn't increase your progress
- **Skip Detection**: Fast-forwarding or jumping ahead doesn't count as watched time

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically - Vercel will detect the Vite configuration

### Manual Build
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── VideoPlayer.tsx  # Main video player with progress tracking
│   ├── ProgressBar.tsx  # Interactive progress bar
│   ├── VideoControls.tsx # Video playback controls
│   └── VideoProgressStats.tsx # Progress statistics display
├── hooks/               # Custom React hooks
│   └── useVideoProgress.ts # Video progress tracking logic
├── pages/               # Page components
│   ├── LectureView.tsx  # Individual video view
│   └── ProgressView.tsx # Progress dashboard
├── utils/               # Utility functions
│   ├── intervalUtils.ts # Interval merging and calculation
│   └── storageUtils.ts  # Local storage management
├── models/              # TypeScript type definitions
│   └── types.ts         # Interface definitions
└── data/                # Sample data
    └── sampleVideos.ts  # Video data for testing
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Adding New Videos
1. Add video data to `src/data/sampleVideos.ts`
2. Include required fields: `id`, `title`, `description`, `src`, `thumbnail`, `duration`, `category`, `instructor`
3. The progress tracking will automatically work for new videos

## 🧪 Testing

The application includes comprehensive progress tracking logic that has been tested for:
- Accurate interval recording and merging
- Progress persistence across sessions
- Edge cases like seeking, pausing, and re-watching
- Cross-browser compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure your browser supports localStorage
3. Try clearing browser cache and localStorage
4. Open an issue on GitHub with detailed information

## 🔮 Future Enhancements

- [ ] Backend integration for cross-device sync
- [ ] User authentication and profiles
- [ ] Advanced analytics and insights
- [ ] Video chapters and bookmarks
- [ ] Export progress data
- [ ] Mobile app version
- [ ] Offline support with service workers

---

**Built with ❤️ using React, TypeScript, and Vite** 
