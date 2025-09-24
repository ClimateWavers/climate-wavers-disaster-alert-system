import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signuppage from "./pages/Signuppage";
// import Loginpage from "./pages/LoginPage";
// import Forgotpasswordpage from "./pages/Forgotpasswordpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EmailCode,
  ForgotPassword,
  PasswordReset,
  PhoneCode,
  PhoneVerification,
  Signin,
  Signup,
  VerifyMail,
  VerifyResetRequest,
} from "./pages/Auth";

import LandingPage from "./pages/LandingPage";
import {
  OnboardingLayout,
  Welcome,
  Home,
  Campaign as OnboardingCampaign,
  Notifications as  OnboardingNotification,
  Profile as OnboardingProfile,
  Community as OnboardingCommunity,
  Disasters as OnboardingDisasters,
  Chatbot as OnboardingChatbot,
  BotLeg,
  GrabLeg,
} from "./components/Onboarding";


import {
  AuthComment,
  AuthCommunity,
  AuthMainfeed,
  AuthProfile,
  AuthSharedLayout,
  AuthWaverX,
  AuthCampaigns,
  AuthWaverXPosts,
  AuthNotification,
  AuthDisasters,
  AuthDisasterPage,
  AuthUploadCover,
  AuthUploadPhoto 
} from "./pages/AuthenticatedPages";
import Donations from "./components/Donations";


function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/bot" element={<AuthWaverX />} />
          <Route path="/campaigns" element={<AuthCampaigns />} />
          <Route path="/disasters/:disasterId" element={<AuthDisasterPage/>} />
          <Route path="/disasters" element={<AuthDisasters/>} />
          {/* Landing page as the default route */}
          <Route path="/" element={<LandingPage/>} />
          <Route path="/landing" element={<LandingPage/>} />

          {/* Authenticated routes */}
          <Route path="/app" element={<AuthSharedLayout />}>
            <Route index element={<AuthMainfeed />} />
            <Route path="/app/community" element={<AuthCommunity />} />
            <Route path="/app/notifications" element={<AuthNotification />} />
            <Route path="/app/waverx" element={<AuthWaverXPosts />} />
            {/* <Route path="/happeningnow" element={<Happeningnow />} /> */}
            <Route path="/app/donations" element={<Donations />} />
            <Route path="/app/:userId/profile" element={<AuthProfile />} />
            <Route
              path="/app/:postId/comments"
              element={<AuthComment type={"post"} />}
            />
            <Route
              path="/app/:postId/:commentId/comments"
              element={<AuthComment type={"comments"} />}
            />
          </Route>
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route index element={<Welcome />} />
            <Route path="/onboarding/bot" element={<OnboardingChatbot />} />
            <Route path="/onboarding/campaigns" element={<OnboardingCampaign />} />
            <Route path="/onboarding/home" element={<Home />} />
            <Route path="/onboarding/community" element={<OnboardingCommunity/>} />
            <Route
              path="/onboarding/notifications"
              element={<OnboardingNotification />}
            />
            <Route path="/onboarding/disasters" element={< OnboardingDisasters/>} />
            {/* <Route path="/happeningnow" element={<Happeningnow />} /> */}
            <Route path="/onboarding/profile" element={<OnboardingProfile />} />
            <Route path="/onboarding/grableg" element={<GrabLeg />} />
            <Route path="/onboarding/botleg" element={<BotLeg/>} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />

          <Route
            path="/verifypasswordreset/:uid/:token"
            element={<VerifyResetRequest />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/emailcode" element={<EmailCode />} />
          <Route path="/resetpassword" element={<PasswordReset />} />
          <Route path="/phonecode" element={<PhoneCode />} />
          <Route path="/verifyphone" element={<PhoneVerification />} />
          <Route path="/verifymail" element={<VerifyMail />} />
          <Route path="/uploadphoto" element={<AuthUploadPhoto />} />
          <Route path="/uploadcover" element={<AuthUploadCover />} />


          {/* <Route path="/wallet"  element={<Web3 />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
