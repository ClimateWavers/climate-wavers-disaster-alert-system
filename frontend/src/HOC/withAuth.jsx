import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const navigate = useNavigate();
    const token = Cookies.get("accessToken");
    const raw = Cookies.get("user");

    useEffect(() => {
      if (!raw && token) {
        client
          .run("get", endpoints?.user, {}, true)
          .then((user) => {
            Cookies.set("user", JSON.stringify(user));
          })
          .catch(() => {
            navigate("/login"); // Redirect to login on error
          });
      } else if (!token) {
        navigate("/login"); // Redirect to login if no token
      }
    }, [raw, token, navigate]);

    if (!raw && !token) return null; // Avoid rendering if the user is not authenticated

    return <WrappedComponent {...props} />;
  };

  // Set the displayName for easier debugging
  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
};

// Helper function to get the display name of the wrapped component
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default withAuth;
