import React, { useState } from "react";
import Inventory from "./Inventory";
import Orders from "./Orders";
import Transactions from "./Transactions";
import Reports from "./Reports";
import "./VendorDashboard.css";


const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div className="vendor-dashboard">
      <div className="vendor-container">
        <h1 className="vendor-title">Vendor Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="vendor-tabs">
          {["inventory", "orders", "transactions", "reports"].map((tab) => (
            <button
              key={tab}
              className={`vendor-tab-button ${activeTab === tab ? "active-tab" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="vendor-content">
          {activeTab === "inventory" && <Inventory />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "transactions" && <Transactions />}
          {activeTab === "reports" && <Reports />}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
