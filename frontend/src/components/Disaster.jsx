import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const status = {
  ongoing: "text-[#FF4D4D]", // Bright red for ongoing disasters (high urgency)
  alert: "text-[#FFA500]", // Orange for alerts (warning status)
  past: "text-[#434343]", // Gray for past disasters (resolved)
};

const Disasters = ({ disasters }) => {
  // Handle undefined or null disasters array
  if (!disasters || !Array.isArray(disasters)) {
    return (
      <div className="flex flex-col w-full">
        <div className="py-4">
          <p className="text-gray-500">No disaster data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {disasters.map((disaster) => {
        const date = new Date(disaster.startDate);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return <div key={disaster.id} className="py-4">
          <div >
            <Link to={`/disasters/${disaster.id}`} className="flex justify-between">
              {" "}
              <h2 className="capitalize font-bold text-[#2F4F4F] md:text-2xl text-xl">
                {disaster.region + ", " + disaster.country}: {disaster.disasterType} - {formattedDate}
              </h2>
            
            <button className="border-2 w-fit hidden md:flex rounded-md py-2 shadow-md text-center border-gray-400 px-2">View details</button>
            </Link>
          </div>
          <div className="md:flex w-[100vw] capitalize gap-x-4 max-sm:gap-x-2 text-xl md:px-2 font-serif">
            <p className={status[disaster.status]}>
              <span className="font-semibold text-[#434343] capitalize">Status: </span>
              {disaster.status? disaster.status: "undetermined"}
            </p>
            <p>
              <span className="font-semibold text-[#434343]">
                Disaster Type:{" "}
              </span>
              {disaster.disasterType}
            </p>
            <p>
              <span className="font-semibold text-[#434343]">
                Affected Country:{" "}
              </span>
              {disaster.country}
            </p>
          </div>
        </div>
      })}
    </div>
  );
};

Disasters.propTypes = {
  disasters: PropTypes.array,
};

export default Disasters;
