import React, { useState } from "react";
import "./Orders.css"
const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "prince", medicine: "Paracetamol", status: "Pending" },
  ]);

  const updateStatus = (id, status) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Medicine</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.medicine}</td>
              <td>{order.status}</td>
              <td>
                <select
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="order-status-select"
                  value={order.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
