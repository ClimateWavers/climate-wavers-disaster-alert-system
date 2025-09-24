import PropTypes from "prop-types";

export default function QuestionContainer({
  questionText = "What’s the current global average temperature?",
  imageSrc = "../../../tree.png",
  color = "bg-[#008080]",
  handleClick,
}) {
  return (
    <div
      className={` text-black cursor-pointer flex flex-col ${color} items-end w-[20%] max-sm:p-2 md:min-h-[25%] max-sm:min-h-[20vh] max-sm:w-[100%] md:gap-[62px] max-sm:gap-1 md:p-4 rounded-[24px]`}
      onClick={() => handleClick(questionText)}
    >
      <p className="md:mt-5 w-[98%] md:leading-8 text-white">{questionText}</p>
      <div className="grid rounded-[16px] px-1.5 place-content-end h-[100%]">
        <div>
          <img
            src={imageSrc}
            alt="Image"
            className="md:h-[52px] md:w-[98%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

QuestionContainer.propTypes = {
  questionText: PropTypes.string,
  imageSrc: PropTypes.string,
  color: PropTypes.string,
};
