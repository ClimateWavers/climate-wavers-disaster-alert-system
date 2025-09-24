import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import bgReset from '../../assets/phonereset.svg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PhoneVerification = () => {
    const [countryCode, setCountryCode] = useState('');
    const navigate = useNavigate();

  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };


  return (
    <div className="lg:h-[100vh] md:h-[100vh] flex justify-between">
      <div
        className="w-[100%] lg:w-[50%] md:w-[50%] bg-cover bg-center hidden lg:flex md:flex"
        style={{ backgroundImage: `url(${bgReset})` }}
      ></div>
      <div className="w-[100%] lg:w-[30%] md:w-[50%] py-8 lg:px-16 md:px-16 px-6 m-auto text-center max-sm:pt-[200px]">
        <h1 className="lg:text-[40px] md:text-[40px] text-[24px] text-[#008080] font-bold font-serif  mb-4">
         Forgotten Password
        </h1>
        <p className="lg:text-[24px] md:text-[24px] text-[18px] mb-10">Input Phone Number</p>
        <div className="flex justify-between items-center">
        <FormControl sx={{ width: "20%"}}>
        <InputLabel id="demo-simple-select-label">Code</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={countryCode}
          label="Code"
          color="success"
          onChange={handleChange}
        >
          <MenuItem value={+234}>+234</MenuItem>
          <MenuItem value={+211}>+211</MenuItem>
          <MenuItem value={+901}>+901</MenuItem>
        </Select>
      </FormControl>
         <TextField
            id="outlined-basic"
            label="Number"
            sx={{ m: 1, width: "80%" }}
            variant="outlined"
            color="success"
          />
          </div>
        <button className="bg-[#008080] text-white py-4 w-[100%] rounded-md mt-4" onClick={() => navigate('/phonecode')}>Confirm</button>
        <div className="flex items-center justify-between my-6">
            <p className="border-b border-gray-400 w-[45%]"></p>
          <p>Or</p>
            <p className="border-b border-gray-400 w-[45%]"></p>
          </div>
      <NavLink to="/forgotpassword">Use Email instead?</NavLink>
      </div>
    </div>
  );
};

export default PhoneVerification;
