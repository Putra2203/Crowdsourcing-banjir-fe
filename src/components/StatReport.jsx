import { useState } from "react";
import { useDispatch } from "react-redux";
import EditReportModal from "./EditReportModal";
import { updateReport, deleteReport } from "../redux/slices/crudSlices";
import { useAuth } from "../auth/AuthContext";

const StatReport = ({ reports }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  if (!reports || reports.length === 0) {
    return <p>Tidak ada laporan yang tersedia.</p>;
  }

  const openModal = (report) => {
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReport(null);
  };

  const { token } = useAuth();

  const handleEdit = (updatedReport) => {
    dispatch(
      updateReport({
        reportId: updatedReport._id,
        formData: updatedReport,
        token,
      })
    )
      .then(() => {
        console.log("Report updated:", updatedReport);
      })
      .catch((err) => {
        console.error("Error updating report:", err);
      });
    closeModal();
  };

  const handleDelete = (reportId) => {
    if (!reportId) {
      console.error("Report ID is missing");
      return;
    }

    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      dispatch(deleteReport({ reportId, token }))
        .then(() => {
          console.log("Report deleted:", reportId);
        })
        .catch((err) => {
          console.error("Error deleting report:", err);
        });
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <div key={report._id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{report.description}</h3>
              <span
                className={`text-sm px-2 py-1 rounded-md ${
                  report.water_level === "tinggi"
                    ? "bg-red-500 text-white"
                    : report.water_level === "sedang"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {report.water_level}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {new Date(report.timestamp).toLocaleString()}
            </p>
            <img
              src={report.image_url}
              alt="Gambar Laporan"
              className="object-cover w-full h-32 mt-2 rounded-md"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-4 py-2 bg-green-300 rounded-lg"
                onClick={() => openModal(report)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-300 rounded-lg"
                onClick={() => handleDelete(report._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <EditReportModal
        isOpen={isModalOpen}
        onClose={closeModal}
        report={currentReport}
        onSave={handleEdit}
      />
    </div>
  );
};

export default StatReport;
