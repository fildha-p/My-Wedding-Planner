
import Home from "./Components/Project/Home";
import {Routes,Route, Navigate} from "react-router-dom"
import { useSelector } from "react-redux";
import Login from "./Components/Project/Login";
import Navbar from "./Components/Project/Navbar";
import Dashboard from "./Components/Project/Dashboard";
import WeddingForm from "./Components/Project/WeddingForm";
import ProtectedRoute from "./Components/Project/ProtectedRoute";
import Timeline from "./Components/Project/Timeline";


function App() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return(
     <>
      {isAuthenticated && <Navbar />}

      <Routes>
  <Route
    path="/"
    element={
      isAuthenticated ? <Navigate to="/dashboard" /> : <Home />
    }
  />

  <Route
    path="/login"
    element={
      isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
    }
  />

  {/* Protected Routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/wedding-form"
    element={
      <ProtectedRoute>
        <WeddingForm />
      </ProtectedRoute>
    }
  />

  <Route path="*" element={<Navigate to="/" />} />
  <Route
  path="/timeline"
  element={
    <ProtectedRoute>
      <Timeline />
    </ProtectedRoute>
  }
/>
</Routes>
    </>
  );
}

export default App

