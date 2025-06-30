/** @format */

import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import GlobalContextProvider from "./GlobalContext.jsx";
import Login from "./Page/Login/index.jsx";
import Home from "./Page/Home/index.jsx";
import Dashboard from "./Page/Home/Deshboard/index.jsx";
import Userlist from "./Page/Home/UserManagement/Userlist/index.jsx";
import UserDetails from "./Page/Home/UserManagement/UserDetails/Userdeatisl.jsx";
import Hastag from "./Page/Home/Hastag/index.jsx";
import Grouplist from "./Page/Home/PostManagement/PostList/index.jsx";
import Playlist from "./Page/Home/PostManagement/PlayList/index.jsx";
import ReportedPost from "./Page/Home/PostManagement/ReportedPost/index.jsx";
import Privacypolicys from "./Page/Home/Privacy/index.jsx";
import TermsConditions from "./Page/Home/Trems/index.jsx";
import {
  AddHanstagModel,
  BanuserModel,
  BlueTickApprovedModel,
  BlueTickRejectModel,
  ChangepasswordModel,
  DeleteCommnetsModel,
  DeleteHanstagModel,
  DeleteuserModel,
  EditHanstagModel,
  ForgotPasswordModel,
  LogoutModel,
  PostDetailsModel,
  UnBanModel,
} from "./Common/Model/index.jsx";
import Profile from "./Page/Home/Profile/index.jsx";
import BlueTickVerification from "./Page/Home/UserManagement/BlueTickVerification/Index.jsx";
import BanUsers from "./Page/Home/UserManagement/BanUsers/Index.jsx";
import FakeBotAccount from "./Page/Home/UserManagement/FakeBotAccount/Index.jsx";
import Authentication from "./Page/Home/UserManagement/Authentication/Index.jsx";
import SendNotification from "./Page/Home/Notifications/SendNotification/SendNotification.jsx";
import Notification from "./Page/Home/Notifications/GetNotificationlist/Notification.jsx";
import Mail from "./Page/Home/Mail/Mail.jsx";
import Analytics from "./Page/Home/Analytics/Analytics.jsx";
import PostwiseDetails from "./Page/Home/PostManagement/PostWiseDetails/PostWiseDetails.jsx";
import Adscontroller from "./Page/Adscontroller/Adscontroller.jsx";
function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        {/* // "homepage": "http://44.244.158.85/DevelopmentAdmin/", */}
        <ForgotPasswordModel />
        <ChangepasswordModel />
        <LogoutModel />
        <PostDetailsModel />
        <AddHanstagModel />
        <EditHanstagModel />
        <DeleteHanstagModel />
        <DeleteuserModel />
        <BanuserModel />
        <BlueTickApprovedModel />
        <BlueTickRejectModel />
        <UnBanModel />
        <DeleteCommnetsModel />
        <Routes>
          <Route path="/" element={<Navigate replace to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Adscontroller" element={<Adscontroller />} />
          <Route path="/Home" element={<Home />}>
            <Route
              path="/Home/"
              element={<Navigate replace to="/Home/Dashboard" />}
            />
            <Route path="/Home/Dashboard" element={<Dashboard />} />
            <Route path="/Home/Userlist" element={<Userlist />} />
            <Route path="/Home/UserDetails" element={<UserDetails />} />
            <Route path="/Home/Hastag" element={<Hastag />} />
            <Route path="/Home/Postlist" element={<Grouplist />} />
            <Route path="/Home/Playlist" element={<Playlist />} />
            <Route path="/Home/PostwiseDetails" element={<PostwiseDetails />} />
            <Route path="/Home/ReportedPost" element={<ReportedPost />} />
            <Route path="/Home/Trems&Condition" element={<TermsConditions />} />
            <Route path="/Home/PrivacyPolicy" element={<Privacypolicys />} />
            <Route path="/Home/Profile" element={<Profile />} />
            <Route
              path="/Home/Blue-Tick-Verification"
              element={<BlueTickVerification />}
            />
            <Route path="/Home/BanUsers" element={<BanUsers />} />
            <Route path="/Home/FakeBotAccount" element={<FakeBotAccount />} />
            <Route
              path="/Home/UserAuthentication"
              element={<Authentication />}
            />
            {/* ? Notification  path */}

            <Route
              path="/Home/SendNotification"
              element={<SendNotification />}
            />
            <Route path="/Home/Notification" element={<Notification />} />
            <Route path="/Home/Mail" element={<Mail />} />
            <Route path="/Home/Analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
