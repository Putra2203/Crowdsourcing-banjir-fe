import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReport } from "../redux/slices/crudSlices";
import { useAuth } from "../auth/AuthContext";

const AddReportModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { token, userId } = useAuth();

  const [newReport, setNewReport] = useState({
    description: "",
    water_level: "",
    status: "",
    location: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [locationText, setLocationText] = useState("");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = {
            type: "Point",
            coordinates: [longitude, latitude],
          };
          setNewReport((prev) => ({
            ...prev,
            location: JSON.stringify(locationData),
          }));
          setLocationText(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewReport((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("description", newReport.description);
    formData.append("water_level", newReport.water_level);
    formData.append("status", newReport.status);
    if (newReport.location) {
      formData.append("location", newReport.location);
    }
    if (newReport.image) {
      formData.append("image", newReport.image);
    }

    try {
      await dispatch(addReport({ formData, token })).unwrap();
      alert("Report added successfully!");
      onClose();
    } catch (err) {
      console.error("Failed to add report:", err);
      alert("Failed to add report. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="p-6 bg-white rounded-lg w-96">
        <h2 className="mb-4 text-xl font-bold">Tambah Laporan</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={newReport.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label>Water Level</label>
            <select
              name="water_level"
              value={newReport.water_level}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Water Level</option>
              <option value="tinggi">Tinggi</option>
              <option value="sedang">Sedang</option>
              <option value="rendah">Rendah</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select
              name="status"
              value={newReport.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Status</option>
              <option value="verified">verified</option>
              <option value="unverified">unverified</option>
            </select>
          </div>
          <div>
            <label>Location</label>
            <div className="w-full p-2 bg-gray-100 border rounded">
              <p>{locationText || "Location not set"}</p>
              <button
                type="button"
                onClick={getCurrentLocation}
                className="px-2 py-1 mt-2 text-white bg-blue-500 rounded"
              >
                Get Current Location
              </button>
            </div>
          </div>
          <div>
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-full h-32 rounded-md"
              />
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-red-500 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReportModal;
