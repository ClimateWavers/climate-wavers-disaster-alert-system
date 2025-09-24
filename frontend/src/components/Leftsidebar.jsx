import Menu from "./Menu";

const Leftsidebar = () => {

  return (
    <div className=" md:fixed  w-[20%] border-r-[1px] border-gray-200 hidden md:block w-[100%] h-[100vh] py-6">

      <Menu />
      
    </div>
  );
};

export default Leftsidebar;
