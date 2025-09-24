import Onboarding from "./Onboarding";

const Campaign = () => {
  const content = [
    {
      title: "Welcome to the Campaign Hub!",
      message: `Here, you can initiate or join
            campaigns aimed at supporting climate action and disaster relief.
            Your involvement can make a significant impact—start a campaign
            today!`
    },
    {
      title: "Join Forces for Change!",
      message: `Explore ongoing campaigns or start your own
            to drive environmental initiatives. Together, we can mobilize
            support for meaningful climate solutions.`,
    },
   
    {
      title: "Empower Your Community!",
      message: `Use the Campaign Hub to rally support for
            the causes you care about. Create campaigns, set goals, and track
            progress as we work towards a sustainable future.`,
    },
    {
      title: "Welcome to the Campaign Hub!",
      message: `Start or join campaigns that support climate action and disaster relief. Empower your community, set goals, and track progress as we work together for a sustainable future.`,
      view: "mobile",
    },
  ];
  const current = 6;

  return (
    <div>
      <Onboarding
        content={content}
        current={current}
        next={"/onboarding/disasters"}
        prev={"/onboarding/wallet"}
        bot={"waverbotlegs"}
      />
    </div>
  );
};

export default Campaign;
