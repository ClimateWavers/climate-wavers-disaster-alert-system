import Mainfeed from "../../components/Mainfeed";
import Community from "../../components/Community";
import Profile from "../../components/Profile";
import Comment from "../Comment";
import WaverxChatPage from "../WaverX";
import withAuth from "../../HOC/withAuth";
import SharedLayout from "../../components/ShareLayout";
import CampaignsPage from "../CampaignsPage";
import WaverXPosts from "../../components/WaverXPosts";
import Notification from "../../components/Notification";
import Disasters from "../Disasters";
import DisasterPage from "../DisasterPage";
import UploadCover from "../UploadCover";
import UploadPhoto from "../UploadPhoto";

const AuthSharedLayout = withAuth(SharedLayout);
const AuthCommunity = withAuth(Community);
const AuthMainfeed = withAuth(Mainfeed);
const AuthProfile = withAuth(Profile);
const AuthComment = withAuth(Comment);
const AuthWaverX = withAuth(WaverxChatPage);
const AuthCampaigns = withAuth(CampaignsPage);
const AuthWaverXPosts = withAuth(WaverXPosts);
const AuthNotification = withAuth(Notification);
const AuthDisasters = withAuth(Disasters)
// const AuthDisasters = Disasters
const AuthDisasterPage = withAuth(DisasterPage)
// const AuthDisasterPage = DisasterPage
const AuthUploadCover = withAuth(UploadCover)
const AuthUploadPhoto = withAuth(UploadPhoto)

export {
  AuthSharedLayout,
  AuthWaverXPosts,
  AuthCampaigns,
  AuthComment,
  AuthCommunity,
  AuthMainfeed,
  AuthWaverX,
  AuthProfile,
  AuthNotification,
  AuthDisasterPage,
  AuthDisasters,
  AuthUploadCover,
  AuthUploadPhoto
};
