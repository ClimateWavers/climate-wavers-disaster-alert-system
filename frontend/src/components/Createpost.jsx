import { useForm } from "react-hook-form";
import { useState } from "react";
import PropTypes from "prop-types";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";
import { getUser } from "../utils/factory";
import { uploadFiles } from "../services/upload.service";
import { IoSend } from "react-icons/io5";

export default function Createpost({ type, postId, parentId, closeModal }) {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const user = getUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const toastMsg = {
    success: "Post Successful 👌",
    error: "An Error occured 🤯",
  };

  const onSubmit = async (data) => {
    setIsDisabled(true);
    let imageUrl;
    if (data.image[0]) {
      imageUrl = await uploadFiles(data.image[0]);
    }
    if (imageUrl) {
      if (imageUrl.length == 1) {
        data.image = imageUrl[0];
      } else {
        data.image = imageUrl;
      }
    }
    if (postId) data.post = postId;
    if (parentId) data.parent_comment = parentId;
    const endpoint = endpoints[type];

    try {
      await client.run("post", endpoint, data, true, toastMsg, false, false);
      reset();
      setIsDisabled(false);
      closeModal();
    } catch (error) {
      setIsDisabled(false);
      console.log(error);
    }
  };

  const buttonMsg = type === "post" ? type : "Reply";

  return (
    <div
      onSubmit={handleSubmit(onSubmit)}
      className=" md:w-[40vw] md:h-[45vh] md:max-h-fit h-full p-3 md:p-6 bg-white rounded-md flex w-[90vw] flex-col gap-y-2"
    >
      <div className=" flex justify-start gap-4 ">
        <img
          src={user?.profile_picture}
          alt=""
          className="w-12 h-12 rounded-full h-10"
        />
        <select
          className=" rounded-full px-2  mb-3 border-2 border-[#008080] text-xl font-bold text-[#008080] focus:border-green focus:outline-none"
          {...register("visibility", { required: true })}
        >
          <option value="Everyone">Everyone</option>
          <option value="Friends">Friends</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <textarea
        type="text"
        placeholder="What's on your mind"
        className=" p-8 w-full border-b-2 h-full max-sm:placeholder:text-[20px] text-black text-3xl overflow-y-auto focus:border-b-2 focus:outline-none focus:border-[#008080]"
        {...register("content", { required: true })}
      />
      {imagePreview && (
        <div className="mb-3 max-h-[60%] overflow-y-auto">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-auto rounded"
          />
        </div>
      )}
      <div className="flex justify-between items-center w-[100%]">
        <div className="flex justify-start gap-8 pt-4 h-14">
          <label htmlFor="image">
            <img
              src="../../img_user_rectangle_5.svg"
              alt="User"
              className="h-[28px] ml-2 w-[28px]"
            />
          </label>

          <img
            src="../../img_thumbs_up_rectangle_5.svg"
            alt="Thumbsup"
            className="h-[28px] w-[28px]"
          />
          <img
            src="../../img_emoji_normal.svg"
            alt="Emojinormal"
            className="h-[28px] w-[28px]"
          />
          <img
            src="../../img_linkedin.svg"
            alt="Linkedin"
            className="h-[28px] w-[28px]"
          />
          <input
            id="image"
            type="file"
            accept="image/*"
            className="p-0 mb-1 hidden border rounded focus:border-green focus:outline-none"
            {...register("image", {
              required: false,
              onChange: handleImageChange,
            })}
          />
        </div>
        <button
          className={
            isDisabled
              ? "blur-[1px] text-center w-fit px-12 h-[60px] max-sm:hidden capitalize bg-[#008080] text-white text-lg rounded-full cursor-pointer z-10"
              : " px-12 h-[60px] max-sm:hidden capitalize bg-[#008080] text-white text-lg rounded-full cursor-pointer z-10 "
          }
          onClick={handleSubmit(onSubmit)}
          disabled={isDisabled}
        >
          { buttonMsg}
        </button>
        <IoSend
          size={34}
          className="md:hidden absolute right-4 pt-1 cursor-pointer "
          color="#008080"
          onClick={handleSubmit(onSubmit)}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}

Createpost.propTypes = {
  closeModal: PropTypes.func,
  postId: PropTypes.string,
  type: PropTypes.string,
  parentId: PropTypes.string,
};
