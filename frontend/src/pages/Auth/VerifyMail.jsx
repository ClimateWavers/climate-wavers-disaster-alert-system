import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const VerifyMail = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div className="bg-[#047857] h-[100vh] lg:w-[50%] md:w-[50%] hidden md:flex justify-center ">
        <div className="self-end">
          <img src="../../../HandsShow1.png" alt="" />
        </div>
      </div>
      <div className="w-[100%] lg:w-[30%] md:w-[40%] py-8 lg:px-16 md:px-16 px-6 mx-auto mt-16 text-center">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-[#008080] font-serif font-bold  mb-4">
          Verify Your Account
        </h1>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] mb-10 font-serif">
          Input Email to verify your account
        </p>
        <TextField
          id="outlined-basic"
          label="Email"
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          color="success"
        />
        <FormControl
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          color="success"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
        </FormControl>
        <a href="#" className="underline text-[#001F3F]">
          Resend in 60, sec
        </a>
        <button className="bg-[#047857] rounded-md text-white py-4 w-[100%] m-2 mt-24">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default VerifyMail;
