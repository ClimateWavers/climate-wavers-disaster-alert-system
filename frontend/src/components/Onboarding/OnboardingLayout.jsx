import Topbar from "./Topbar";
import Leftsidebar from "./Leftsidebar";
import { Outlet } from "react-router-dom";
import Footer from "./FooterBar";

const OnboardingLayout = () => {
  return (
    //bg-gradient-to-r from-slate-900 to-slate-700
    <div className=" bg-white overflow-hidden text-[#111111] h-screen">
      <div className="md:pb-20 max-sm:pb-10 block ">
        <Topbar />
      </div>
      <div className="flex  justify-between min-h-screen">
        <div className="w-[25%] hidden md:flex ">
          <Leftsidebar />
        </div>
        <div className="md:w-[75%] overflow-hidden items-center">
          <Outlet />
        </div>
        
      </div>
      <div className="md:hidden w-full h-24 sm:flex">
        <Footer />
        </div>
    </div>
  );
};

export default OnboardingLayout;
