import axios from "axios"

// import { Cloudinary} from "@cloudinary/url-gen"

// const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
// const apiKey = import.meta.env.VITE_APP_CLOUDINARY_API_KEY
// const apiSecret = import.meta.env.VITE_APP_CLOUDINARY_API_SECRET

const CLOUDINARY_PRESET = "thyh7ivb"
// const CLOUDINARY_URL=`cloudinary://${apiKey}:${apiSecret}@lahri`
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/lahri/image/upload"

export const uploadFiles = async (fileList) => {
    if (!Array.isArray(fileList)) {
        fileList = [fileList];
    }

    const promises = fileList.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_PRESET);

        return axios.post(CLOUDINARY_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    });

    try {
        const responses = await Promise.all(promises);
         return responses.map((response) => response.data.url);
    } catch (error) {
        console.error("Error uploading files:", error);
        throw error;
    }
};