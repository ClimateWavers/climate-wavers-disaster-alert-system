import Onboarding from "./Onboarding";

const Home = () => {
  const content = [
    {
      title: "Welcome to Climate Wavers!",
      message:
        "Your journey begins here. Explore climate-related content, engage with the community, and contribute to global sustainability efforts.",
    },
    {
      title: "Your Central Hub!",
      message:
        "Access all the latest updates, insights, and community activities on the Home page. Stay connected with what’s happening in the world of climate action.",
    },
    {
      title: "Discover, Learn, Engage!",
      message:
        "Home page is your starting point for all things Climate Wavers. Dive into the latest posts, join discussions, and stay informed on climate issues.",
    },
    {
      title: "Welcome to Climate Wavers!",
      message: `Start
            your journey by exploring climate-related content, engaging with the
            community, and staying informed. Access the latest updates,
            insights, and activities on the Home page, and contribute to global
            sustainability efforts.`,
      view: "mobile"
    },
  ];
  const current = 1

  return (
    <div>
     <Onboarding content={content} current={current} next={"/onboarding/community"} prev={"/onboarding"} bot={"waverbot1"}/>
    </div>
  );
};

export default Home;
