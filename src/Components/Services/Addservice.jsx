import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ServiceList.css"; // Import CSS for styling

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", description: "", icon: "🛠️" });
  const [editingService, setEditingService] = useState(null); // Edit Mode

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Add Service
  const handleAddService = async () => {
    try {
      await axios.post("http://localhost:4000/api/services/add", formData);
      setFormData({ name: "", price: "", description: "", icon: "🛠️" });
      fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  // Delete Service
  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/services/delete/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // Edit Service - Enter Edit Mode
  const handleEditService = (service) => {
    setEditingService({ ...service });
  };

  // Update Service
  const handleUpdateService = async () => {
    if (!editingService) return;
    
    try {
      await axios.put(`http://localhost:4000/api/services/update/${editingService._id}`, editingService);
      setEditingService(null); // Exit Edit Mode
      fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <div className="csc-admin-container">
      {/* Header */}
      <div className="csc-header">
        <h1 className="csc-title">🛠️ CSC Service Management</h1>
        <Link to="/admin/dashboard" className="csc-back-button">⬅ Back to Dashboard</Link>
      </div>

      {/* Service List */}
      <div className="csc-services-list">
        {services.map((service) => (
          <div key={service._id} className="csc-service-card">
            {editingService?._id === service._id ? (
              // Edit Mode
              <div className="csc-edit-form">
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  placeholder="Service Name"
                />
                <input
                  type="number"
                  value={editingService.price}
                  onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                  placeholder="Price"
                />
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Description"
                />
                <button className="csc-save-btn" onClick={handleUpdateService}>✅ Save</button>
                <button className="csc-cancel-btn" onClick={() => setEditingService(null)}>❌ Cancel</button>
              </div>
            ) : (
              // Normal Mode
              <div className="csc-service-content">
                <h3>{service.name}</h3>
                <p>💰 ₹{service.price}</p>
                <p>{service.description}</p>
                <div className="csc-action-buttons">
                  <button className="csc-delete-btn" onClick={() => handleDeleteService(service._id)}>❌ Delete</button>
                  <button className="csc-edit-btn" onClick={() => handleEditService(service)}>✏ Edit</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Service Form */}
      <div className="csc-add-service">
        <h2>Add New Service</h2>
        <input
          type="text"
          placeholder="Service Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button className="csc-add-btn" onClick={handleAddService}>➕ Add Service</button>
      </div>
    </div>
  );
};

export default AdminServices;
