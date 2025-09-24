const Campaign = ({ campaign, id }) => {
  return (
    <div className=" w-[100%] border-8 border-[#DFDFDF]  shadow-xl ">
      <div
        className="bg-cover h-[40vh] w-[100%] flex px-2 flex-col justify-end"
        style={{ backgroundImage: `url(${campaign.image})` }}
      >
        <h1 className="text-white text-start leading-5 font-bold text-lg">
          {campaign.title}
        </h1>
        <p className="text-white leading-4  text-start text-sm">
          {campaign.details}
        </p>
        <h3 className="text-[#10FFE2] text-start py-2 font-bold">
          ${campaign.raised}/${campaign.amount}
        </h3>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="border-4 border-[#2A9D8F] "></div>
        <div className="border-4 border-white"></div>
      </div>
    </div>
  );
};

export default Campaign;
