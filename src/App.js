import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from "./Components/User/User";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import VendorDashboard from "./Components/Vendor/VendorDashboard";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} /> 
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/vendor" element={<VendorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
