import React, { useState } from "react";
import"./Inventory.css"
const Inventory = () => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", stock: 50, price: 10 },
  ]);
  const [newMedicine, setNewMedicine] = useState({ name: "", stock: 0, price: 0 });

  const addMedicine = () => {
    if (newMedicine.name) {
      setMedicines([...medicines, { id: Date.now(), ...newMedicine }]);
      setNewMedicine({ name: "", stock: 0, price: 0 });
    }
  };

  const updateStock = (id, stock) => {
    setMedicines(medicines.map((med) => (med.id === id ? { ...med, stock } : med)));
  };

  const deleteMedicine = (id) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  const totalInventoryPrice = medicines.reduce((total, med) => total + med.stock * med.price, 0);

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">Manage Inventory</h2>

      <div className="inventory-form">
        <input
          type="text"
          placeholder="Medicine Name"
          className="inventory-input"
          value={newMedicine.name}
          onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="inventory-input"
          value={newMedicine.stock}
          onChange={(e) => setNewMedicine({ ...newMedicine, stock: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="inventory-input"
          value={newMedicine.price}
          onChange={(e) => setNewMedicine({ ...newMedicine, price: +e.target.value })}
        />
        <button onClick={addMedicine} className="inventory-button">Add</button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Stock</th>
            <th>Price (₹)</th>
            <th>Total Price (₹)</th>
            <th>Update Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id}>
              <td>{med.name}</td>
              <td>{med.stock}</td>
              <td>₹{med.price}</td>
              <td>₹{med.stock * med.price}</td>
              <td>
                <input
                  type="number"
                  value={med.stock}
                  onChange={(e) => updateStock(med.id, +e.target.value)}
                  className="inventory-stock-input"
                />
              </td>
              <td>
                <button onClick={() => deleteMedicine(med.id)} className="inventory-delete">❌</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total-label">Total Inventory Price:</td>
            <td colSpan="3" className="total-price">₹{totalInventoryPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Inventory;
