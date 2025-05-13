import { useState } from "react";
import "./AddMed.css";

function AddMed() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    vendor_id: "",
    expiry_date: "",
    manufacturer: "",
    warnings: "",
    image: null,
    stock: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles form data changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setFormData({ ...formData, image: file });

        // Create image preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file");
        setFormData({ ...formData, image: null });
        setImagePreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append all form fields except image
      Object.keys(formData).forEach((key) => {
        if (key !== "image") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append image last
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const res = await fetch("http://localhost:8000/api/medeq/", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to add medicine");
      }

      await res.json();
      alert("Medicine added successfully!");

      // Reset form
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        vendor_id: "",
        expiry_date: "",
        manufacturer: "",
        warnings: "",
        image: null,
        stock: "",
      });
      setImagePreview(null);
    } catch (err) {
      console.error("Error:", err);
      alert(err.message || "Failed to add medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-med-form"
      encType="multipart/form-data"
    >
      {/* Medicine Name */}
      <div>
        <label htmlFor="name">Medicine Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter medicine name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Medicine Category */}
      <div>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          type="text"
          placeholder="Enter medicine category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      {/* Medicine Description */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter medicine description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Medicine Price */}
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Enter medicine price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* Medicine Quantity */}
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          placeholder="Enter quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      {/* Medicine Vendor ID */}
      <div>
        <label>Vendor ID</label>
        <input
          type="text"
          name="vendor_id"
          value={formData.vendor_id}
          onChange={handleChange}
          required
        />
      </div>

      {/* Medicine Expiry Date */}
      <div>
        <label htmlFor="expiry_date">Expiry Date</label>
        <input
          id="expiry_date"
          name="expiry_date"
          type="date"
          value={formData.expiry_date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Medicine Manufacturer */}
      <div>
        <label htmlFor="manufacturer">Manufacturer</label>
        <input
          id="manufacturer"
          name="manufacturer"
          type="text"
          placeholder="Enter manufacturer name"
          value={formData.manufacturer}
          onChange={handleChange}
          required
        />
      </div>

      {/* Medicine Warnings */}
      <div>
        <label htmlFor="warnings">Warnings</label>
        <textarea
          id="warnings"
          name="warnings"
          placeholder="Enter medicine warnings"
          value={formData.warnings}
          onChange={handleChange}
        />
      </div>

      {/* Medicine Image */}
      <div className="image-upload-section">
        <label htmlFor="image">Upload Medicine Image</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
        />
        {imagePreview && (
          <div className="image-preview">
            <img
              src={imagePreview}
              alt="Medicine preview"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}
      </div>

      {/* Medicine Stock */}
      <div>
        <label htmlFor="stock">Stock Quantity</label>
        <input
          id="stock"
          name="stock"
          type="number"
          placeholder="Enter stock quantity"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding Medicine..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default AddMed;
