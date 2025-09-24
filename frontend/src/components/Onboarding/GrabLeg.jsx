import { NavLink, Link } from "react-router-dom";

const GrabLeg = () => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <div className=" text-center text-2xl relative top-32 pt-20 px-2 " ></div>
      <div className="flex  absolute gap-x-2 text-xl right-0 p-4 pt-8">
        <Link to={"/onboarding/community"}>
          <img  alt="" src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>3/8</span>
        <span>Skip</span>
        <Link to={"/"}>
          <img  alt="" src={"/skip.png"} className="" />
        </Link>
      </div>
      <div className="flex relative  md:left-[30%] left-[20%] bottom-12 gap-4">
        <div className="flex flex-col  relative top-14">
          <img alt="" src={"/waverbot1.png"} className="w-[80%]" />
          <img alt="" src={"/Ellipse.png"} className="w-[80%] " />
        </div>
        <div className="flex flex-col  relative max-sm:bottom-4 text-xl leading-6 right-24 text-start text-xl leading-5 font-serif">
          <span className="bg-[#008080]  px-2 border-0 py-2 rounded-2xl shadow-md h-fit  md:w-[100%] max-sm:w-[60vw]">
          Give me a moment while I grab my legs 😅
          </span>
        
        </div>
      </div>
      <NavLink
        to={"/onboarding/botleg"}
        className="bg-linear  md:w-[15%] w-[50vw] h-16 relative md:left-[75%] left-[45%] self-start text-2xl text-center pt-4 rounded-[35px]"
      >
        Next
      </NavLink>
    </div>
  );
};

export default GrabLeg;
