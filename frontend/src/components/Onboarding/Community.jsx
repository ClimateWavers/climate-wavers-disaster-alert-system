import Onboarding from "./Onboarding";

const Community = () => {
  const content = [
    {
      title: "Join the Conversation!",
      message:
        `Connect with like-minded individuals in the Climate Wavers
            community. Share ideas, discuss topics, and collaborate on climate
            action.`
    },
    {
      title: "Engage & Collaborate!",
      message: ` Community page is where you can interact with others who are
            passionate about the environment. Your voice matters—let’s make it
            heard!`
        
    },
    {
      title: "Build Connections!",
      message: `Whether
            you're looking to discuss climate issues or collaborate on
            projects, the Community page is your space to engage and make a
            difference.`
    },
    {
      title: "Join the Conversation!",
      message: `Connect
            with like-minded individuals, share ideas, discuss climate topics,
            and collaborate on projects. Your voice matters—let’s engage and
            make a meaningful impact together.`,
      view: "mobile"
    },
  ];
  const current = 2

  return (
    <div>
     <Onboarding content={content} current={current} next={"/onboarding/profile"} prev={"/onboarding/home"} bot={"waverbot1"}/>
    </div>
  );
};

export default Community;
