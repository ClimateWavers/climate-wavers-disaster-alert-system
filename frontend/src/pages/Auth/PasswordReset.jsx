import { useState } from "react";
import resetBg from "../../assets/finalreset.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { client } from "../../api";
import { endpoints } from "../../utils/endpoints";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { register, handleSubmit, reset } = useForm();

  const toastMsg = {
    info: "Resetting password...",
    success: "Password reset successful",
    error: "Reset failed, try again",
  };
  const uidb64 = Cookies.get("uid");
  const token = Cookies.get("reset_token");
  const onSubmit = async (data) => {
    try {
      setIsDisabled(true);
      await client.run(
        "patch",
        endpoints?.passwordreset,
        { ...data, uidb64, token },
        false,
        toastMsg,
        false,
        false
      );
      reset();
      setIsDisabled(false);
      navigate("/login");
    } catch (error) {
      setIsDisabled(false);
      console.log(error);
    }
  };
  return (
    <div className="h-[100vh] flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${resetBg})` }}
      ></div>
      <div className="w-[100%] lg:w-[30%] md:w-[40%] p-8 pt-1 m-auto text-center ">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-primary font-bold font-serif text-[#008080] text-center mb-8">
          Set New Password
        </h1>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] mb-10 font-serif">
          Enter and confirm your new password
        </p>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl
            sx={{ m: 1, width: "100%" }}
            variant="outlined"
            color="success"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Input Password
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
          <FormControl
            sx={{ m: 1, width: "100%" }}
            variant="outlined"
            color="success"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              {...register("confirm_password", {
                required: true,
                maxLength: 50,
              })}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "confirm password"}
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
            />
          </FormControl>
          <button
            onClick={handleSubmit(onSubmit)}
            className={
              isDisabled
                ? "blur-[1px] bg-[#008080] rounded-md text-white py-4"
                : "bg-[#008080] rounded-md text-white py-4"
            }
            disabled={isDisabled}
          >
            {isDisabled ? "Processing..." : "Confirm"}
          </button>
        </Box>
      </div>
    </div>
  );
};

export default PasswordReset;
