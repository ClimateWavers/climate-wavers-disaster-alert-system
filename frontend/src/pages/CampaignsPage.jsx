import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Campaign from "../components/Campaign";
import Topbar from "../components/Topbar";
import Pagination from "../components/Pagination";
import { getCampaigns } from "../utils/factory";
import Payment from "../components/Payment";
import Modal from "../components/Modal";
import Footer from "../components/FooterBar";
import { CampaignsPageSEO } from "../components/SEOComponents";
import { usePagination } from "../hooks/usePagination";

const CampaignsPage = () => {
  const allCampaigns = getCampaigns();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaign, setCampaign] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const itemsPerPage = 12;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("campaignId");
  
    if (campaignId) {
      // Find the campaign by ID and open the modal
      const selectedCampaign = allCampaigns.find(
        (campaign) => campaign.id === campaignId
      );
      if (selectedCampaign) {
        setCampaign(selectedCampaign);
        setIsModalOpen(true);
      }
    } else {
      setIsModalOpen(false); // Close modal if no campaignId in the query
    }
  }, [location.search, allCampaigns]); // Depend on location.search so it updates when the URL changes

  const handleGoBack = () => {
    navigate(-1);
  };

  const chooseCampaign = (campaign) => {
    navigate(`?campaignId=${campaign.id}`); // Update the query parameter
  };
  

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    paginatedData,
    goToPage,
  } = usePagination(allCampaigns, itemsPerPage);

  const filters = [
    "most popular",
    "africa",
    "asia",
    "europe",
    "south america",
    "north america",
    "antarctica",
  ];

  return (
    <>
      <CampaignsPageSEO />
      <div className="grid gap-y-3 w-[100%]">
      <Topbar />
      <div className="flex justify-center md:px-4 pt-28">
        <button onClick={handleGoBack}>
          <img
            alt="back-arrow"
            src="/arrow-left.png"
            className="absolute right-[95%] hidden md:flex h-12 py-2"
          />
        </button>
        <h1 className="text-center md:ml-0 ml-2 bg-gradient-to-b from-[#067d83] py-2  via-[#4F6F6F] to-[#055a5f] bg-clip-text text-transparent md:pt-4 md:text-4xl  text-2xl font-bold">
          Support Climate Action: Be the Change!
        </h1>
      </div>
      <h3 className="text-center md:text-xl text-lg font-serif md:p-2">
        Join our active campaigns and make a positive impact.
      </h3>
      <div className="flex text-xl hidden md:flex py-4 font-serif justify-center gap-x-4 ">
        <div className="font-bold  font-montserrat">Filter campaigns:</div>
        <div className="font-bold  text-[#067d83]">Newest</div>

        {filters.map((filter) => (
          <div key={filter} className="capitalize ">
            {filter}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-4 gap-2 pt-12 px-8 gap-x-4">
        {paginatedData.map((campaign, index) => (
          <div
            key={index}
            className={`w-[100%] p-1 ${
              index % 4 === 0 ? "translate-y-[-40px]" : ""
            } ${
              index % 4 === 3 ? "translate-y-[-40px]" : ""
            }  transform transition duration-500 ease-in-out z-10 relative`}
          >
            <div onClick={() => chooseCampaign(campaign)}>
              <Campaign campaign={campaign} />
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 px-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            className="justify-center"
          />
        </div>
      )}
      {isModalOpen && (
        <Modal closeFn={() => setIsModalOpen(false)}>
          <Payment
            campaignId={campaign.id}
            campaignTitle={campaign.title}
            targetAmount={parseInt(campaign.amount)}
          />
        </Modal>
      )}
      <div className="md:hidden h-24 sm:flex">
        <Footer />
      </div>
      </div>
    </>
  );
};

export default CampaignsPage;
