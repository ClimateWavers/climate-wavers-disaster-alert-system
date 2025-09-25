import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getAuthToken } from "../utils/factory";
import { dummyUser, dummyPost } from "../utils/dummies";
import Swal from "sweetalert2";

class Client {
  constructor(baseURL, domain) {
    this.baseUrl = baseURL;
    this.domain = domain;
  }

  // Method to handle validation errors with SweetAlert
  handleValidationErrors(error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      let errorMessages = [];

      // Handle different types of validation errors
      if (typeof errorData === 'object') {
        Object.keys(errorData).forEach(field => {
          const fieldErrors = errorData[field];
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach(errorMsg => {
              errorMessages.push(`${this.formatFieldName(field)}: ${errorMsg}`);
            });
          } else if (typeof fieldErrors === 'string') {
            errorMessages.push(`${this.formatFieldName(field)}: ${fieldErrors}`);
          }
        });
      }

      // Show SweetAlert with validation errors
      if (errorMessages.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          html: errorMessages.join('<br>'),
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#2F4F4F'
        });
        return true;
      }
    }
    return false;
  }

  // Format field names for better readability
  formatFieldName(field) {
    const fieldMap = {
      'password': 'Password',
      'password2': 'Confirm Password',
      'email': 'Email',
      'username': 'Username',
      'first_name': 'First Name',
      'last_name': 'Last Name',
      'country': 'Country',
      'state': 'State',
      'profession': 'Profession',
      'gender': 'Gender'
    };
    return fieldMap[field] || field.charAt(0).toUpperCase() + field.slice(1);
  }

  // Method to show success message with SweetAlert
  showSuccessMessage(title, message, callback = null) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'Continue',
      confirmButtonColor: '#2F4F4F'
    }).then((result) => {
      if (result.isConfirmed && callback) {
        callback();
      }
    });
  }

  async run(
    method,
    endpoint,
    data,
    authheaders,
    toastMsg = false,
    authCookies = false,
    mail = false
  ) {
    const client = axios.create({
      baseURL: this.baseUrl,
    });

    const token = getAuthToken();

    const config = {
      withCredentials: authheaders,
      data: data,
    };

    if (authheaders) {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-CSRFToken": `${Cookies.get("csrftoken")}`,
      };
    }
    if (toastMsg) {
      toast.success(toastMsg.info, {
        autoClose: 1500,
      });
    }

    try {
      let response;
      const backendStatus = import.meta.env.VITE_APP_BACKEND_STATUS === "true";
      if (!backendStatus && endpoint.endsWith("login/")) {
        if (
          data.email === dummyUser.email &&
          data.password === dummyUser.password
        ) {
          response = { data: dummyUser };
        }
      } else if (
        !backendStatus &&
        (endpoint.endsWith("post/") || endpoint.endsWith("comments/"))
      ) {
        response = { data: dummyPost };
      } else response = await client({...config, method, url: endpoint});
      if (authCookies) {
        // Set cookies without domain restriction for development
        Cookies.set("accessToken", response.data.access_token);
        if (response?.data?.user){
          Cookies.set("user", JSON.stringify(response.data.user));
        }
        else {
          Cookies.set("user", JSON.stringify(response.data));
        }
      }

      if (mail) {
        Cookies.set("email", data.email);
      }
      if (toastMsg) {
        toast.dismiss();
        toast.success(toastMsg.success, {
          autoClose: 200,
        });
      }
      return response.data;
    } catch (error) {
      console.log(error);
      
      // Handle validation errors with SweetAlert
      if (this.handleValidationErrors(error)) {
        // Validation errors are handled by SweetAlert, don't show toast
        throw error;
      }
      
      // Handle other errors with toast
      if (toastMsg) {
        toast.dismiss();
        toast.error(toastMsg.error);
      }
      throw error;
    }
  }
}

// Use relative URLs in development to leverage Vite proxy
const isDevelopment = import.meta.env.DEV;
const baseURL = isDevelopment ? "" : (import.meta.env.VITE_APP_BACKEND_URL || "http://127.0.0.1:8000");

const client = new Client(
  baseURL,
  import.meta.env.VITE_DOMAIN || "localhost"
);

export default client;
