import Onboarding from "./Onboarding";

const WaverX = () => {
  const content = [
    {
      title: "Meet WaverX - Your AI Assistant!",
      message: `WaverX is your intelligent companion on Climate Wavers. Get personalized insights, ask questions about climate topics, and receive updates on environmental issues.`
    },
    {
      title: "Your Personal Climate Guide!",
      message: `WaverX helps you navigate the platform, provides climate education, and keeps you informed about the latest environmental developments. Always ready to assist you!`
    },
    {
      title: "Interactive & Informative!",
      message: `Engage with WaverX for instant answers about climate action, disaster preparedness, and environmental topics. Your AI companion is here to make your Climate Wavers experience seamless and educational.`
    },
    {
      title: "Meet WaverX - Your AI Assistant!",
      message: `Your intelligent companion for navigating Climate Wavers. Get personalized insights, ask questions about climate topics, and receive updates on environmental issues. WaverX makes your climate action journey interactive and informative.`,
      view: "mobile",
    },
  ];
  const current = 8;

  return (
    <div>
      <Onboarding
        content={content}
        current={current}
        prev={"/onboarding/notifications"}
        bot={"Waverbotfull"}
      />
    </div>
  );
};

export default WaverX;




