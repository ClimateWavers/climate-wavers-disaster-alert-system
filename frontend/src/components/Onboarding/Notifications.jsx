import Onboarding from "./Onboarding";

const Notifications = () => {
  const content = [
    {
      title: "Stay Updated!",
      message: `Notification page keeps you informed about important updates,
            alerts, and activities within the Climate Wavers community. Don’t
            miss a beat!`
    },
    {
      title: "Real-Time Alerts!",
      message: `Get notified about new campaigns, disaster alerts, WaverX posts and
            community activities. Your notifications keep you in the loop and
            ready to act.`,
    },
   {
      title: "Stay Updated!",
      message: `Get real-time alerts on new campaigns, disaster warnings, WaverX posts, and community activities. The Notification page keeps you informed and ready to act.`,
      view: "mobile",
    },
  ];
  const current = 8;

  return (
    <div>
      <Onboarding
        content={content}
        current={current}
        prev={"/onboarding/disasters"}
        bot={"Waverbotfull"}
      />
    </div>
  );
};

export default Notifications;
