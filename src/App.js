import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from "./Components/User/User";
import Login from "./Components/LoginRegister/Login";
import Register from './Components/LoginRegister/Register';
import AdminDashboard from "./Components/Admin/AdminDashboard";
import VendorDashboard from "./Components/Vendor/VendorDashboard";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} /> 
        <Route path="/User" element={<User />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
