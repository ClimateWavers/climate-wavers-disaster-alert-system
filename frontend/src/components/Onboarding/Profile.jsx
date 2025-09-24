import Onboarding from "./Onboarding";

const Profile = () => {
  const content = [
    {
      title: "Your Climate Journey!",
      message: `The Profile
            page is where you can manage your personal information, track your
            activity, and see your contributions to climate action.`,
    },
    {
      title: "Personalize Your Experience!",
      message: `Update your profile to reflect your climate interests and
            activities. Your journey towards sustainability starts here`,
    },
    {
      title: "Track Your Impact!",
      message: `Use the
            Profile page to monitor your engagement and contributions on Climate
            Wavers. Celebrate your progress in the fight against climate change.`,
    },
    {
      title: "Your Climate Journey!",
      message: `CManage your profile, track your activities, and monitor your contributions to climate action. Personalize your experience and celebrate your impact on Climate Wavers.`,
      view: "mobile",
    },
  ];
  const current = 3;

  return (
    <div>
      <Onboarding
        content={content}
        current={current}
        next={"/onboarding/grableg"}
        prev={"/onboarding/community"}
        bot={"waverbot1"}
      />
    </div>
  );
};

export default Profile;
