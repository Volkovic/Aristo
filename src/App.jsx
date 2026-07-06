import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import CoursePath from './pages/CoursePath';
import DayView from './pages/DayView';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path=":courseId" element={<CoursePath />} />
            <Route path=":courseId/day/:dayId" element={<DayView />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
