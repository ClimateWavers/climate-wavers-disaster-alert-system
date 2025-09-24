import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import bgReset from "../../assets/password.svg";
import { useState } from "react";
import { client } from "../../api";
import { endpoints } from "../../utils/endpoints";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const toastMsg = {
    info: "Sending code...",
    success: "Succesful 👌 Check your mail inbox for reset link",
    error: "An error occured 🤯, try again later",
  };

  const handleSubmit = async () => {
    try {
      setIsDisabled(true);
      await client.run(
        "post",
        endpoints?.forgotpassword,
        { email },
        false,
        toastMsg,
        false,
        false
      );
      setIsDisabled(false);
    } catch (error) {
      setIsDisabled(false);
      console.log(error);
    }
  };

  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${bgReset})` }}
      ></div>
      <div className="w-[100%] lg:w-[30%] md:w-[40%] py-8 lg:px-16 md:px-16 px-6 m-auto text-center max-sm:pt-[200px]">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-[#047857] font-serif font-[500]  mb-4">
          Forgotten Password
        </h1>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] font-serif mb-10">
          Input Email to receive password reset link
        </p>
        <TextField
          id="outlined-basic"
          label="Email"
          value={email}
          onChange={handleChange}
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          color="success"
        />
        <button
          className={
            isDisabled
              ? "blur-[1px] bg-[#047857]  rounded-md text-white py-4 w-[100%] m-2 mt-4"
              : "bg-[#047857]  rounded-md text-white py-4 w-[100%] m-2 mt-4"
          }
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          {isDisabled ? "Processing..." : "Confirm"}
        </button>
        <div className="flex items-center justify-between my-6">
          <p className="border-b border-gray-400 w-[45%]"></p>
          <p>Or</p>
          <p className="border-b border-gray-400 w-[45%]"></p>
        </div>
        <NavLink to="/verifyphone">Use Phone instead?</NavLink>
      </div>
    </div>
  );
};

export default ForgotPassword;
