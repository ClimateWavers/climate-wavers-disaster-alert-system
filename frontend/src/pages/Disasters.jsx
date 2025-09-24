import Disasters from "../components/Disaster";
import DisasterImage from "../components/DisastersImages";
import Topbar from "../components/Topbar";
import Menu from "../components/Menu";
import Footer from "../components/FooterBar";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_CHATBOT_URL + "/api/v1/disasters";

const DisasterPage = () => {
  const [disasters, setDisasters] = useState([]);
  const [total, setTotal] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(null);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    axios.get(apiUrl).then((res) => {
      const { data } = res;
      setDisasters(data?.data);
      setTotal(data?.total);
      setPage(data?.page);
      setPageSize(data?.pageSize);
      if (page > 1) {
        setCurrent(current + pageSize);
      }
    });
  }, []);
  return (
    <div className="w-full overflow-hidden">
      <div className="md:pb-20 pb-12">
        <Topbar />
      </div>

      <div className="flex w-full md:pb-0 pb-8">
        <div className="w-[20%] border-r-2 hidden md:flex ">
          <Menu />
        </div>
        {/* <Mainfeed/> */}
        <div className="md:w-[80vw] w-full px-2  md:items-center">
          <div className="2xl:h-[50vh] md:h-[48vh] h-[45vh] md:mb-28 mb-4 py-2">
            <DisasterImage disasters={disasters} />
          </div>
          <div className=" flex">
            <input
              className="bg-graylight-300 h-[60px] placeholder:italic placeholder:text-slate-400 placeholder:px-4 px-2  md:w-[100%] w-[75%] outline-[2px]  border  focus:border-2  focus:outline-2 focus:outline-gray-300 border-gray-200 rounded-lg text-graydark "
              type="text"
              placeholder="🔍 Search disaster keywords"
            />
            <button className="bg-[#047857]  text-white font-serif border relative md:w-[20%] w-[25%] rounded-lg">
              Search
            </button>
          </div>
          <div>
            <h2 className="font-bold md:mt-8 mt-2 py-4 border-b-2 self-end text-2xl  text-[#434343] leading-4 border-gray-300">
              Showing {current} - {pageSize * page} of {total} results{" "}
            </h2>
          </div>
          <Disasters disasters={disasters} />
        </div>
      </div>
      <div className="md:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default DisasterPage;
