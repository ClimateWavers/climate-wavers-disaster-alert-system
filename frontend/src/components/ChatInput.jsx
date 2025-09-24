import { IoSend } from "react-icons/io5";

const ChatInput = ({ body, handleClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick(body.current?.value);
      body.current.value = ""; // Clear the input after sending
    }
  };

  return (
    <div className="bg-gray-100 p-1 max-h-[120px] h-[120px] max-sm:h-[100px] md:border-0 border-t-2 border-gray-200 gap-x-8 max-sm:gap-x-1 max-sm:px-2 rounded-md max-sm:rounded-sm max-sm:w-[100vw]  max-sm:relative max-sm:right-4 max-sm:top-8 flex flex-row items-center shadow-2xl shadow-neutral-500/50">
      <img
        src="../../img_user_rectangle_5.svg"
        alt="User"
        className="h-[24px] ml-2 w-[24px]"
      />
      <img
        src="../../img_thumbs_up_rectangle_5.svg"
        alt="Thumbsup"
        className="hidden md:flex h-[24px] w-[24px]"
      />
      <img
        src="../../img_emoji_normal.svg"
        alt="Emojinormal"
        className=" hidden md:flex h-[24px] w-[24px]"
      />
      <img
        src="../../img_linkedin.svg"
        alt="Linkedin"
        className="hidden md:flex h-[24px] w-[24px]"
      />
      <input
        className="justify-self-end w-[65%]  max-sm:w-[100%] h-[65%] focus:outline-0 md:ml-4 ml-2 md:pl-4  focus:bg-white rounded-full p-2 text-black "
        type="text"
        placeholder="Ask WaverX a question about climate"
        ref={body}
        onKeyDown={handleKeyDown}
      />{" "}
      <IoSend
        size={34}
        onClick={() => {
          handleClick(body.current?.value);
          body.current.value = "";
        }}
        className="items-end p-.5 ml-1 cursor-pointer "
        color="#008080"
        type="submit"
      />
    </div>
  );
};

export default ChatInput;
