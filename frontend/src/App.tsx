import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App