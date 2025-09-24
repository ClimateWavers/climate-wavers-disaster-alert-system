import Onboarding from "./Onboarding";

const Disasters = () => {
  const content = [
    {
      title: "Stay Alert, Stay Safe!",
      message: ` The
            Disaster page keeps you informed about ongoing and potential
            climate-related disasters. Get real-time updates and take action to
            protect your community.`
    },
    {
      title: "Monitor & Respond!",
      message: `Keep track of
            disaster alerts and reports in real-time. Your awareness and quick
            response can help minimize the impact on your community.`,
    },
   
    {
      title: "Be Prepared!",
      message: `Access vital
            information on climate disasters in your area. Stay informed and
            take proactive measures to safeguard against environmental hazards.`,
    },
    {
      title: "Stay Alert, Stay Safe!",
      message: `Get real-time updates on climate-related disasters. Monitor alerts, stay informed, and take proactive measures to protect your community from environmental hazards.`,
      view: "mobile",
    },
  ];
  const current = 7;

  return (
    <div>
      <Onboarding
        content={content}
        current={current}
        next={"/onboarding/notifications"}
        prev={"/onboarding/campaigns"}
        bot={"waverbotlegs"}
      />
    </div>
  );
};

export default Disasters;
