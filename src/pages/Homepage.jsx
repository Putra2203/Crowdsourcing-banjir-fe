import { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../redux/slices/crudSlices";
import CardReport from "../components/CardReport";
import Footer from "../components/Footer";

const Homepage = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  if (loading) return <p className="flex items-center justify-center w-full h-screen">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex items-center justify-center w-full bg-gradient-to-br from-[#AECDFE] to-[#D8ECFF] ">
      <div className="flex flex-col w-full max-w-screen-xl bg-gray-100 h-fit">
        <Header />
        <CardReport reports={reports} />
        <Footer/>
      </div>
    </div>
  );
};

export default Homepage;
