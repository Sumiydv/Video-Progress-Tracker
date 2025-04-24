import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LectureView from './pages/LectureView';
import ProgressView from './pages/ProgressView';
import SettingsView from './pages/SettingsView';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lectures/:videoId" element={<LectureView />} />
          <Route path="/progress" element={<ProgressView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;