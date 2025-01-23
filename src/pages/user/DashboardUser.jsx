import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportsByUser } from "../../redux/slices/crudSlices";
import { useAuth } from "../../auth/AuthContext";
import StatReport from "../../components/StatReport";
import AddReportModal from "../../components/AddReportModal";

const DashboardUser = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reports, loading, error } = useSelector((state) => state.reports);
  const { userId, token, userName } = useAuth();

  useEffect(() => {
    if (userId && token) {
      dispatch(fetchReportsByUser({ userId, token }));
    }
  }, [dispatch, userId, token]);

  if (loading) return <p className="w-full h-screen">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col w-full h-fit">
      <div className="flex flex-col w-full p-4 rounded-lg bg-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-base font-bold lg:text-2xl">Dashboard User <span className="font-normal">| Haiii {userName}</span></h1>
          <button
            className="px-4 py-2 bg-blue-400 rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="mr-2 text-base font-bold text-white lg:text-xl">
              +
            </span>
            Tambah Laporan
          </button>
        </div>

        {reports.length === 0 ? (
          <div className="py-8 text-center">
            <p className="mb-4 text-gray-600">
              Anda belum memiliki laporan. Mulai tambahkan laporan pertama Anda!
            </p>
          </div>
        ) : (
          <StatReport reports={reports} />
        )}
      </div>
      <AddReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DashboardUser;
