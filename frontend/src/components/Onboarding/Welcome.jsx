import { NavLink } from "react-router-dom"

const Welcome = () => {
    return <div className="grid  h-[100vh] w-[100%] px-2 text-white">
        <NavLink to={"/login"} className="border-2 bg-gray-300 md:w-[15%] w-24 h-12 text-center text-2xl pt-2 ml-2  md:mt-4 mt-8 rounded-xl capitalize">cancel</NavLink>
        <div className="flex place-content-center gap-x-1">
            <div className="flex flex-col pt-8 relative left-12">
            <img src={"/waverbot1.png"} className="w-[80%]"/>
            <img src={"/Ellipse.png"} className="w-[80%] " />
            </div>
            <div className="flex flex-col gap-8 text-start">
                <span className="bg-[#008080] content-center px-2 border-2 rounded-2xl shadow-md min-h-20 max-w-[100%]">Hello there welcome to Climate Wavers</span>
                <span className="bg-[#008080]  content-center px-2 border-2 rounded-2xl shadow-md min-h-20  max-w-[100%]">My name is WaverX.<br/> Your Real time AI assistant here in Climate Waver</span>
                <span className="bg-[#008080]  content-center px-2 border-2 rounded-2xl shadow-md min-h-20 w-[70%]  max-w-[100%]">Lets get you started</span>
            </div>
        </div>
        <NavLink to={"/onboarding/home"} className="bg-linear border-2 w-[30%] max-sm:w-44 md:h-20 h-12 relative left-[53%] bottom-20 text-2xl text-center md:pt-4 pt-2 md:rounded-[35px] rounded-md">Let&apos;s Go</NavLink>
    </div>
}

export default Welcome