import { useState } from "react";
import signinBg from "../../assets/signin.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavLink, useNavigate } from "react-router-dom";
import { client } from "../../api";
import { useForm } from "react-hook-form";
import { endpoints } from "../../utils/endpoints";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from "js-cookie";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const toastMsg = {
    info: "Signing In",
    error: "Login failed. Please make sure the email and password are correct.",
  };

  const onSubmit = async (data) => {
    try {
      setIsDisabled(true);
      await client.run(
        "post",
        endpoints?.signin,
        data,
        false,
        toastMsg,
        true,
        false
      );
      reset();
      setIsDisabled(false);
      navigate("/app");
    } catch (error) {
      setIsDisabled(false);
      console.log("Login failed:", error);
    }
  };
  return (
    <div className="lg:h-[100vh] md:h-[100vh] md:flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover border-r-1 shadow-xl bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${signinBg})` }}
      ></div>
      <div className="w-[100%] lg:w-[30%] md:w-[40%] p-8 m-auto md:pt-1 pt-[200px]">
        <div className="md:hidden absolute top-0 py-8">
          <img alt="logo" src="/Vector.png"></img>
        </div>
        <div className="flex items-center mb-4">
          <NavLink to="/" className="flex items-center text-[#2F4F4F] hover:text-[#1a3a3a] transition-colors">
            <ArrowBackIcon className="mr-2" />
            <span className="text-sm font-medium">Back to Home</span>
          </NavLink>
        </div>
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-[#2F4F4F] font-bold font-serif text-center mb-8">
          Sign In
        </h1>
        <div className="md:px-1 px-4">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            placeholder="mercia@gmail.com"
            color="success"
            {...register("email", { required: true, maxLength: 50 })}
          />
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            color="success"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              {...register("password", { required: true, maxLength: 50 })}
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
          <NavLink to="/forgotpassword" className="text-gray-400 text-[14px]">
            Forgot Password?
          </NavLink>
          <button
            onClick={handleSubmit(onSubmit)}
            className={
              isDisabled
                ? "blur-[1px] bg-[#2F4F4F] text-white py-4 rounded-md font-serif"
                : "bg-[#2F4F4F] text-white py-4 rounded-md font-serif"
            }
            disabled={isDisabled}
          >
            {isDisabled ? "Processing..." : "Sign In"}
          </button>
          <div className="flex justify-center items-center flex-col text-center">
            <NavLink to="/signup">
              Don&apos;t have an account?{" "}
              <span className="text-xl px-2 font-[700] font-serif text-[#2F4F4F]">
                Sign Up
              </span>{" "}
            </NavLink>
          </div>
        </Box>
        </div>

      </div>
    </div>
  );
};

export default Signin;
