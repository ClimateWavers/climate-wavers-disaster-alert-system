import Onboarding from "./Onboarding";

const Donate = () => {
  const content = [
    {
      title: "Make a Difference!",
      message: `The Donate page allows you to contribute to climate action and disaster relief efforts. Your donations help fund critical environmental initiatives and support communities in need.`
    },
    {
      title: "Support Climate Action!",
      message: `Choose from various donation options to support climate campaigns, disaster relief, and environmental projects. Every contribution makes a meaningful impact.`
    },
    {
      title: "Empower Change!",
      message: `Your donations directly support climate action initiatives and disaster relief efforts. Help fund critical environmental projects and make a real difference in the fight against climate change.`
    },
    {
      title: "Make a Difference!",
      message: `Contribute to climate action and disaster relief through our donation platform. Support environmental initiatives, fund critical projects, and help communities affected by climate disasters. Every donation makes a meaningful impact.`,
      view: "mobile",
    },
  ];
  const current = 4;

  return (
    <div>
      <Onboarding
        content={content}
        current={current}
        next={"/onboarding/campaigns"}
        prev={"/onboarding/profile"}
        bot={"waverbot1"}
      />
    </div>
  );
};

export default Donate;




