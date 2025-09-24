import Postcomponent from "./Postcomponent";
import Feed from "./Feed";
const Community = () => {

  const feeds = [
    "Trending",
    "Climate Action",
    "Alerts",
    "Disasters"
  ];

  return (
    <div className="text-2xl  pt-1 md:pt-5 ">
      <div className=" text-lg md:text-xl hidden md:grid border-gray-200  hidden md:flex rounded-md h-[50px] pb-2 border-2 font-bold  ">
      <Feed feeds={feeds} feedData={{}}/>
        </div>
      {/* <div className='pb-1 md:pb-3 text-lg md:text-xl border-b-2 font-semibold'/> */}
      <Postcomponent type={"post"}  />
    </div>
  );
};

export default Community;
