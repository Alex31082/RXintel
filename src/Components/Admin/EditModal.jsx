import React, { useState } from "react";
import "./Inventory.css";

const EditModal = ({ medicine, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: medicine.name,
    category: medicine.category,
    description: medicine.description,
    price: medicine.price,
    quantity: medicine.quantity,
    expiry_date: medicine.expiry_date,
    manufacturer: medicine.manufacturer,
    warnings: medicine.warnings,
    stock: medicine.stock,
    image_id: medicine.image_id || "",
  });

  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "quantity" || name === "stock"
        ? parseFloat(value) || 0 // Handle invalid float inputs
        : value,
    }));
  };

  const validateForm = () => {
    if (formData.price <= 0 || formData.quantity <= 0 || formData.stock < 0) {
      setError("Price, Quantity, and Stock must be positive numbers.");
      return false;
    }
    if (!formData.expiry_date || new Date(formData.expiry_date) < new Date()) {
      setError("Please enter a valid expiry date.");
      return false;
    }
    setError(""); // Clear any previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Validate form before submitting

    try {
      const response = await fetch(
        `http://localhost:8000/update/medeq/${medicine._id.$oid || medicine._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Update failed");
      setSuccess("Medicine updated successfully!");
      onUpdate(); // Refresh the parent data
      onClose();  // Close the modal
    } catch (err) {
      console.error("Error updating medicine:", err);
      setError("Failed to update medicine.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] md:w-[500px]">
        <h2 className="text-xl font-bold mb-4 text-red-600">Edit Medicine</h2>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <form onSubmit={handleSubmit} className="grid gap-3">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="capitalize font-medium text-sm text-gray-600">
                {key.replace("_", " ")}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="border p-2 rounded text-black"
                required
              />
            </div>
          ))}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
