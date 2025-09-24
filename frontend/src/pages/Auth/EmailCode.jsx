import { useState } from "react";
// import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import bgReset from "../../assets/nextReset.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { client } from "../../api";
import { endpoints } from "../../utils/endpoints";
import Cookies from "js-cookie";

const EmailCode = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    setToken(event.target.value);
  };
  const toastMsg = {
    info: "Confirming email...",
    success: "Succesful 👌 Welcome to the Climate family",
    error: "Confirmation failed 🤯. Invalid or Expired code",
  };

  const handleSubmit = async () => {
    try {
      setIsDisabled(true);
      const email = Cookies.get("email");
      const data = {
        email: email,
        otp: token,
      };
      await client.run(
        "post",
        endpoints?.emailcode,
        data,
        false,
        toastMsg,
        false,
        false
      );
      setIsDisabled(false);
      navigate("/onboarding");
    } catch (error) {
      setIsDisabled(false);
      console.log("Confirmation failed");
    }
  };

  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${bgReset})` }}
      ></div>
      <div className="w-[100%] lg:w-[35%] md:w-[50%] py-8 lg:px-16 md:px-16 px-6 m-auto text-center max-sm:pt-[200px]">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-[#008080] font-serif font-bold  mb-4">
          Email Verification
        </h1>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] font-serif mb-10">
          Check your Email inbox for verification code
        </p>
        <FormControl
          sx={{ m: 1, width: "70%", my: 3 }}
          variant="outlined"
          color="success"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Input Code
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={token}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <NavLink
            to="/verifymail"
            className="text-gray-400 text-[14px] self-start pt-2"
          >
            Didn&apos;t get it?
          </NavLink>
        </FormControl>

        <button
          onClick={handleSubmit}
          className={
            isDisabled
              ? "blur-[1px] bg-[#008080] text-white rounded-md py-4 w-[70%] m-2 mt-4"
              : "bg-[#008080] text-white rounded-md py-4 w-[70%] m-2 mt-4"
          }
          disabled={isDisabled}
        >
          {isDisabled ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default EmailCode;
