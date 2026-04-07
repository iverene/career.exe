import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diagnostic from "./pages/Diagnostic";
import Dashboard from "./pages/Dashboard";
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;