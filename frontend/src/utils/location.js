import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const getLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract latitude and longitude from the position object
        const { latitude, longitude } = position.coords;
        Cookies.set("location", JSON.stringify({ latitude, longitude }));
      },
      (error) => {
        toast(error, {
          autoClose: 300,
        });
      }
    );
  } else {
    toast("Geolocation is not supported by your browser", {
      autoClose: 500,
    });
  }
};
