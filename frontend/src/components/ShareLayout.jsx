import Topbar from "./Topbar";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import { Outlet } from "react-router-dom";
import Footer from "./FooterBar";

const SharedLayout = () => {
  return (
    <div className="bg-gray-50 text-[#111111] min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <Topbar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar - Sticky and Scrollable */}
        <div className="w-[20%] hidden md:block bg-white border-r border-gray-200 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
          <Leftsidebar />
        </div>
        
        {/* Main Content - Scrollable with sidebar offset */}
        <div className="flex-1 overflow-y-auto bg-gray-50 md:ml-[20%] lg:mr-[20%]">
          <div className="max-w-4xl mx-auto px-4 pt-20 pb-6 min-h-screen">
            <Outlet />
          </div>
        </div>
        
        {/* Right Sidebar - Sticky and Scrollable */}
        <div className="w-[20%] hidden lg:block bg-white border-l border-gray-200 fixed right-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
          <Rightsidebar />
        </div>
      </div>
      
      {/* Mobile Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <Footer />
      </div>
    </div>
  );
};

export default SharedLayout;
