import Onboarding from "./Onboarding";

const Chatbot = () => {
  const content = [
    {
      title: "Meet Your AI Assistant!",
      message: `I'm
            WaverX and I'm here to help you navigate Climate Wavers. Ask
            questions, get updates, and learn more about climate and
            disaster-related topics with ease.`
    },
    {
      title: "Your Personal Guide!",
      message: `I'm
            ready to assist you. Whether you need information or just want to
            chat, I, your AI companion is here to help. Interactive &
            Informative! Engage with me for instant answers and updates on
            climate action, donating and anything about climate wavers.`,
    },
  
    {
      title: "Meet Your AI Assistant!",
      message: `I'm WaverX, your personal guide to navigating Climate Wavers. Ask questions, get updates, and learn more about climate, disaster-related topics and all about climate wavers .  With me here navigating around climate wavers will be a breeze. Always here to assist you anytime!`,
      view: "mobile",
    },
  ];
  const current = 4;

  return (
    <div>
      <Onboarding
        content={content}
        current={current}
        next={"/onboarding/wallet"}
        prev={"/onboarding/profile"}
        bot={"waverbotlegs"}
      />
    </div>
  );
};

export default Chatbot;
