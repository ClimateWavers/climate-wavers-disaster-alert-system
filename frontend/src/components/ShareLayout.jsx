import Topbar from "./Topbar";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import { Outlet } from "react-router-dom";
import Footer from "./FooterBar";

const SharedLayout = () => {
  return (
    //bg-gradient-to-r from-slate-900 to-slate-700
    <div className=" bg-white text-[#111111] min-h-screen">
      <div className="md:pb-20 pb-10 block ">
        <Topbar />
      </div>
      <div className="flex  justify-between min-h-screen">
        <div className="w-[20%] hidden md:flex ">
        <Leftsidebar />
        </div>
        {/* <Mainfeed/> */}
        <div className="w-full h-full overflow-y-auto md:w-[60%] px-2 2xl:px-8 items-center">
          <Outlet />
        </div>
        <div className="w-[20%] hidden md:flex">
        <Rightsidebar />
        </div>
        
      </div>
      <div className="md:hidden h-24 sm:flex">
        <Footer />
        </div>
    </div>
  );
};

export default SharedLayout;
