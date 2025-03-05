import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import AdminDashboard from "./Components/Admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
