import { useState } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { client } from "../../api";
import { endpoints } from "../../utils/endpoints";
import { validateSignupForm, showSuccessMessage } from "../../utils/validation";
import "../styles/signup-page.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SignupPageSEO } from "../../components/SEOComponents";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  
  // Get redirect URL from query params
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTo = urlParams.get('redirect') || '/app';

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, control, handleSubmit, reset } = useForm();

  const toastMsg = {
    info: "Signing Up",
    success: "Account created succesfully 👌 ",
    error: "Account Exists 🤯. Try another details",
  };

  const onSubmit = async (data) => {
    // Client-side validation
    if (!validateSignupForm(data)) {
      return;
    }

    try {
      setIsDisabled(true);
      await client.run(
        "post",
        endpoints?.signup,
        data,
        false,
        toastMsg,
        false,
        true
      );
      reset();
      setIsDisabled(false);
      
      // Show success message with SweetAlert
      showSuccessMessage(
        "Account Created Successfully! 🎉",
        "Please check your email for verification code.",
        () => navigate("/emailcode")
      );
    } catch (error) {
      setIsDisabled(false);
      console.log("Signup failed:", error);
      // Error handling is now done in the API client with SweetAlert
    }
  };

  return (
    <>
      <SignupPageSEO />
      <div className="h-[100vh] signup flex">
      <div className="bg-[#067d83] hidden md:flex md:min-h-screen md:overflow-hidden lg:w-[50%] md:w-[50%] flex justify-center banner ">
        <div className="self-center">
          <div className="writeup">
            <h2>Join Climate Wavers</h2>
            <p>
              Connect on our AI-driven social network for effective climate
              disaster responses, donate to relief efforts, and together we
              protect the world. Be part of the solution — Sign up Now!
            </p>
          </div>
          <img src="/logo.jpg" alt="" />
        </div>
      </div>
      <div className="w-[100%] lg:w-[50%] md:w-[50%] flex justify-center  ">
        <div className="lg:w-[75%] self-center mb-12 md:w-[100%] w-full  px-12 ">
          <div className="flex items-center mb-4">
            <NavLink to="/" className="flex items-center text-[#067d83] hover:text-[#055a5f] transition-colors">
              <ArrowBackIcon className="mr-2" />
              <span className="text-sm font-medium">Back to Home</span>
            </NavLink>
          </div>
          <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-bold font-serif text-[#067d83] text-center mb-8">
            Sign Up
          </h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            className="py-1"
            autoComplete="off"
          >
            <div className="flex justify-between w-[100%]">
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                color="success"
                sx={{ mr: 1, width: "50%" }}
                {...register("first_name", { required: true, maxLength: 50 })}
              />
              <TextField
                id="outlined-lasts"
                label="Last Name"
                sx={{ ml: 1, width: "50%" }}
                variant="outlined"
                color="success"
                {...register("last_name", { required: true, maxLength: 50 })}
              />
            </div>
            <TextField
              id="outlined-username"
              label="Username"
              sx={{ m: 1, width: "100%" }}
              variant="outlined"
              color="success"
              {...register("username", { required: true, maxLength: 50 })}
            />
            <div className="w-[100%] gap-x-2 flex justify-between">
              <Controller
                name="gender"
                control={control}
                defaultValue="Male"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-gender"
                    select
                    label="Gender"
                    sx={{ width: "50%" }}
                    color="success"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                )}
              />
              <TextField
                id="outlined-profession"
                label="Profession"
                variant="outlined"
                sx={{ mr: 1, width: "50%" }}
                name={"profession"}
                color="success"
                {...register("profession", { required: true, maxLength: 50 })}
              />
            </div>
            <TextField
              id="outlined-email"
              label="Email"
              sx={{ width: "100%" }}
              variant="outlined"
              color="success"
              {...register("email", { required: true, maxLength: 50 })}
            />
            <div className="flex justify-between w-[100%]">
              <TextField
                id="outlined-country"
                label="Country"
                variant="outlined"
                sx={{ mr: 1, width: "50%" }}
                name={"country"}
                color="success"
                {...register("country", { required: true, maxLength: 50 })}
              />
              <TextField
                id="outlined-state"
                label="State"
                sx={{ ml: 1, width: "50%" }}
                variant="outlined"
                color="success"
                {...register("state", { required: true, maxLength: 50 })}
              />
            </div>
            <FormControl
              sx={{ m: 1, width: "100%" }}
              variant="outlined"
              color="success"
              name={"password"}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                {...register("password", { 
                  required: true, 
                  minLength: 6,
                  maxLength: 50 
                })}
                id="outlined-password"
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
                helperText="Password must be at least 6 characters"
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "100%" }}
              variant="outlined"
              color="success"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                {...register("password2", { 
                  required: true, 
                  minLength: 6,
                  maxLength: 50 
                })}
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
                label="Confirm Password"
                helperText="Must match the password above"
              />
            </FormControl>
            <button
              onClick={handleSubmit(onSubmit)}
              className={
                isDisabled
                  ? "blur-[1px] bg-[#067d83] rounded-md text-white py-4"
                  : "bg-[#067d83] rounded-md text-white py-4"
              }
              disabled={isDisabled}
            >
              {isDisabled ? "Processing..." : "Sign Up"}
            </button>
            <div className="flex justify-center items-center flex-col text-center">
              <NavLink to="/login">
                Already have an account?{" "}
                <span className="text-[#067d83] font-[700] font-serif text-xl px-2 font-[500]">
                  Sign In
                </span>{" "}
              </NavLink>
            </div>
          </Box>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
