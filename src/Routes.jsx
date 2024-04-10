import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/homepage/Home";
import About from "./pages/homepage/About";
import Contact from "./pages/homepage/Contact";
import NotFound from "./pages/homepage/NotFound";
import LandingPage from "./pages/user/LandingPage";
import CoordinatorLandingPage from "./pages/coordinator/LandingPage";
import ManagerLandingPage from "./pages/manager/ManagerLandingPage";
import Login from "./components/loginForm/LoginForm"; // Import component Login
import RegisterForm from "./components/registerForm/RegisterForm";
import Terms from "./components/terms/Terms";
import UserDashboard from "./components/user/dashboard/UserDashboard";
import Submissions from "./components/user/submissions/Submissions";
import Messages from "./components/user/message/Messages";
import Profile from "./components/user/profile/Profile";
import Dashboard from "./components/coordinator/dashboard/Dashboard";
import Articles from "./components/coordinator/artiicle/Articles";
import CreateNewSubmissions from "./components/user/create/CreateNewSubmisson";
import CreateNewUser from "./components/coordinator/createUser/CreateNewUser";
import Message from "./components/coordinator/message/Messages";
import CoProfile from "./components/coordinator/profile/CoProfile";
import ManagerDashBoard from "./components/manager/dashboard/ManagerDashBoard";
import Setting from "./components/setting/Setting";

const isAuthenticated = (role) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  return loggedInUser && loggedInUser.role === role;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
        {/* Student */}
        <Route
          path="/user"
          element={
            isAuthenticated("student") ? (
              <LandingPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="create" element={<CreateNewSubmissions />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* Coordinator */}
        <Route
          path="/coordinator"
          element={
            isAuthenticated("coordinator") ? (
              <CoordinatorLandingPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="articles" element={<Articles />} />
          <Route path="create-user" element={<CreateNewUser />} />
          <Route path="messages" element={<Message />} />
          <Route path="profile" element={<CoProfile />} />
          <Route path="settings" element={<Articles />} />
        </Route>

        {/*Manager */}
        <Route
          path="/manager"
          element={
            isAuthenticated("manager") ? (
              <ManagerLandingPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="dashboard" element={<ManagerDashBoard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
