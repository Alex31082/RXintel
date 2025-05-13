import React, { useState, useEffect } from "react";
import EditModal from "./EditModal"; // Assuming you already have this component
import "./Inventory.css"; // Custom styles for table

function Inventory() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Fetch medicines from the backend when component mounts
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:8000/api/medeq/");
        const data = await res.json();

        // Debugging: Check if data is in the correct format
        console.log("Fetched medicines:", data);

        if (Array.isArray(data)) {
          setMedicines(data);
        } else {
          throw new Error("Data is not in array format.");
        }
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setError("Failed to fetch medicines.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Handle edit button click (open the modal to edit)
  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (vendor_id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/medeq/${vendor_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete the medicine.");
      }

      // Remove the deleted item from the state
      setMedicines(medicines.filter((medicine) => medicine.vendor_id !== vendor_id));
    } catch (err) {
      console.error("Error deleting medicine:", err);
      alert("Error deleting medicine.");
    }
  };

  // Handle update (called from the EditModal)
  const handleUpdate = async (updatedMedicine) => {
    try {
      const res = await fetch(`http://localhost:8000/api/medeq/${updatedMedicine.vendor_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMedicine),
      });

      if (!res.ok) {
        throw new Error("Failed to update the medicine.");
      }

      // Update the medicine in the state with the updated data
      const updatedData = await res.json();
      setMedicines(
        medicines.map((medicine) =>
          medicine.vendor_id === updatedData.vendor_id ? updatedData : medicine
        )
      );

      setShowModal(false); // Close the modal after update
    } catch (err) {
      console.error("Error updating medicine:", err);
      alert("Error updating medicine.");
    }
  };

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Vendor ID</th>
            <th>Expiry Date</th>
            <th>Manufacturer</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.vendor_id}>
              <td>{medicine.name}</td>
              <td>{medicine.category}</td>
              <td>{medicine.price}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.vendor_id}</td>
              <td>{medicine.expiry_date}</td>
              <td>{medicine.manufacturer}</td>
              <td>{medicine.stock}</td>
              <td>
                {/* Edit Button */}
                <button onClick={() => handleEdit(medicine)}>Edit</button>

                {/* Delete Button */}
                <button onClick={() => handleDelete(medicine.vendor_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && selectedMedicine && (
        <EditModal
          medicine={selectedMedicine}
          onClose={() => setShowModal(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default Inventory;
