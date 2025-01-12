import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateReport } from "../redux/slices/crudSlices";
import { useAuth } from "../auth/AuthContext";

const EditReportModal = ({ isOpen, onClose, report, onSave }) => {
  const dispatch = useDispatch();

  const [updatedReport, setUpdatedReport] = useState({
    _id: "", // Menambahkan ID ke dalam state
    description: "",
    water_level: "",
    status: "",
    location: "",
    image: null, // Untuk menangani file gambar
  });

  const [imagePreview, setImagePreview] = useState(null); // Menambahkan state untuk preview gambar
  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    if (report) {
      setUpdatedReport({
        _id: report._id || "", // Pastikan ID sudah ada
        description: report.description || "",
        water_level: report.water_level || "",
        status: report.status || "",
        location: report.location ? JSON.stringify(report.location) : "",
        image: null,
      });
      setImagePreview(report.image_url || null); // Menampilkan preview gambar jika ada
    }
  }, [report]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Menyimpan lokasi dalam format teks yang user-friendly
          const locationData = {
            type: "Point",
            coordinates: [longitude, latitude], // [longitude, latitude]
          };
          setUpdatedReport((prev) => ({
            ...prev,
            location: JSON.stringify(locationData), // Menyimpan lokasi dalam format JSON
          }));
          setLocationText(`Latitude: ${latitude}, Longitude: ${longitude}`); // Menampilkan koordinat yang mudah dibaca
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
    setUpdatedReport((prev) => ({ ...prev, [name]: value }));

    // Pastikan lokasi diubah menjadi format JSON string
    if (name === "location") {
      try {
        const parsedLocation = JSON.parse(value);
        setUpdatedReport((prev) => ({
          ...prev,
          location: JSON.stringify(parsedLocation),
        }));
        setLocationText(
          `Latitude: ${parsedLocation.coordinates[1]}, Longitude: ${parsedLocation.coordinates[0]}`
        );
      } catch (err) {
        console.error("Invalid JSON format for location", err);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdatedReport((prev) => ({ ...prev, image: file }));

    // Menampilkan preview gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Menyimpan URL gambar untuk preview
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { token } = useAuth(); // Memastikan useAuth dipanggil dengan benar

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!updatedReport._id) {
      console.error("Report ID is missing!");
      return;
    }

    const formData = new FormData();
    formData.append("description", updatedReport.description);
    formData.append("water_level", updatedReport.water_level);
    formData.append("status", updatedReport.status);

    // Pastikan lokasi sudah diproses dengan benar sebelum dikirim
    if (updatedReport.location) {
      formData.append("location", updatedReport.location); // Pastikan ini dalam format string JSON
    }

    // Jika ada file gambar, pastikan itu juga ditambahkan
    if (updatedReport.image) {
      formData.append("image", updatedReport.image);
    }

    // Dispatching update action
    dispatch(updateReport({ reportId: updatedReport._id, formData, token }))
      .then(() => {
        onSave(updatedReport); // Callback jika berhasil
        onClose(); // Menutup modal setelah save
      })
      .catch((err) => {
        console.error("Failed to update report:", err);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="p-6 bg-white rounded-lg w-96">
        <h2 className="mb-4 text-xl font-bold">Edit Report</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={updatedReport.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Water Level</label>
            <select
              name="water_level"
              value={updatedReport.water_level}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="tinggi">Tinggi</option>
              <option value="sedang">Sedang</option>
              <option value="rendah">Rendah</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select
              name="status"
              value={updatedReport.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
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

          {/* Preview Image */}
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
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReportModal;
