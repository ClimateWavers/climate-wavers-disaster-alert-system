import { getUser } from "../utils/factory";
import QuestionContainer from "./QuestionContainer";

const data = [
  {
    questionText: "What’s the current global average temperature?",
    imageSrc: "../../globe.png",
    color: "bg-[#008080]",
  },
  {
    questionText: "How can I reduce my carbon footprint?",
    imageSrc: "../../foot.png",
    color: "bg-[#004040]",
  },
  {
    questionText:
      "Tell me about the impact of deforestation on climate change.",
    imageSrc: "../../tree.png",
    color: "bg-[#126180]",
  },
  {
    questionText:
      "What are the most common natural disasters and their causes?",
    imageSrc: "../../leaf.png",
    color: "bg-[#0093AF]",
  },
];

export default function NewChat({handleClick}) {
  return (
    <div className="md:h-[80vh] h-[76vh] max-sm:w-[100%] md:px-8 max-sm:px-1 grid gap-y-4 place-content-end">
      <div className="flex flex-row">
        <img
          src="/Group.png"
          alt="WaverX"
          className="h-[80px] object-cover"
        />
        <h1 className="text-[#047857] ml-2 font-serif font-[300px] max-sm:self-center  md:text-[65px] max-sm:text-4xl">
          Waver
        </h1>
        <div>
          <img
            src="../../img_immutable_x.png"
            alt="Immutablex"
            className="h-[98px] w-[60%] max-sm:w-[40%] object-contain"
          />
        </div>
      </div>
      <div>
        <p className="relative mt-[-20px] md:text-[22px] ">
          Hello {getUser().firstName && getUser().firstName}, How can I help you
          today
        </p>
      </div>
      <div className="flex flex-row max-sm:grid max-sm:grid-cols-2 md:self-center max-sm:items-center gap-[30px]">
        {data.map((d, index) => (
          <QuestionContainer {...d} key={"waverxchat" + index} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}
