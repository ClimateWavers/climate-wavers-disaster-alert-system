import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

const Onboarding = ({ content, current, next, prev, bot }) => {
  return (
    <div className="grid  bg-[#264653] h-[100vh] w-[100%] text-white">
      <div className="flex max-sm:mt-4 absolute gap-x-2 text-xl right-0 p-4">
        <Link to={prev}>
          <img alt="" src={"/arrow-right.png"} />
        </Link>
        <span>Prev</span>
        <span>{current}/8</span>
        <span>Skip</span>
        <Link to={"/login"}>
          <img alt="" src={"/skip.png"} className="" />
        </Link>
      </div>
      <div className="flex relative md:left-[30%] md:top-24 max-sm:items-center bottom-12 gap-4">
        <div className="flex flex-col  relative max-sm:top-[35%] top-20 right">
          <img alt="" src={`/${bot}.png`} className="w-[100%]" />
          <img alt="" src={"/Ellipse.png"} className="w-[80%] ml-[10%]" />
        </div>
        <div className="flex flex-col max-sm:w-full relative max-sm:top-24 max-sm:pr-4 gap-y-4  text-start text-xl leading-6 font-serif">
          {content.map((msg) => (
            <div
              key={msg?.title}
              className={msg?.view ? "bg-[#008080] md:hidden px-2 border-0 py-4 rounded-2xl shadow-md  md:max-w-[40%]  max-sm:w-[70vw]" : "bg-[#008080] px-2 hidden md:grid border-0 py-4 rounded-2xl shadow-md  md:max-w-[40%] "}
            >
              <span className="font-bold w-full">{msg?.title}</span>
              <br/>{msg.message}
            </div>
          ))}
        </div>
      </div>
      <NavLink
        to={next || "/login"}
        className="bg-linear  md:w-[20%] w-[60vw] h-16 relative self-end md:left-[63%] left-[36%] md:bottom-24 bottom-32 text-2xl text-center pt-4 rounded-[35px]"
      >
        {next ? "Next" : "Get started"}
      </NavLink>
    </div>
  );
};

Onboarding.propTypes = {
  content: PropTypes.array.isRequired,
  next: PropTypes.string,
  prev: PropTypes.string,
  bot: PropTypes.string,
  current: PropTypes.number,
};

export default Onboarding;
