import { useState } from "react";
import ImageModal from "./ImageModal";

const CardReport = ({ reports }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const closeModal = () => setSelectedImage(null);

  if (!reports || reports.length === 0) {
    return (
      <p className="p-4 text-lg text-center text-gray-600">
        Tidak ada laporan yang tersedia.
      </p>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="grid w-full grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {reports.map((report) => (
          <div
            key={report._id}
            className="relative p-4 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
          >
            <div className="flex justify-end">
              <div
                className={` px-3 py-1 text-xs font-bold uppercase rounded-full w-28 text-center ${
                  report.status === "verified"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {report.status}
              </div>
            </div>
            {/* Deskripsi */}
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {report.description}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Level Air:</span>{" "}
              {report.water_level}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Status:</span>{" "}
              {report.status}
            </p>

            {/* Gambar */}
            <img
              src={report.image_url}
              alt="Gambar Laporan"
              className="object-cover w-full h-40 mt-4 transition-opacity rounded-lg cursor-pointer hover:opacity-90"
              onClick={() => setSelectedImage(report.image_url)}
            />

            {/* Tombol View Location */}
            <button
              className="w-full px-4 py-2 mt-4 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() => {
                const lat = report.location.coordinates[1];
                const lng = report.location.coordinates[0];
                const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(googleMapsUrl, "_blank"); // Buka di tab baru
              }}
            >
              View Location
            </button>

            {/* Tanggal */}
            <p className="mt-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-700">Tanggal:</span>{" "}
              {new Date(report.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Image */}
      <ImageModal imageUrl={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default CardReport;
