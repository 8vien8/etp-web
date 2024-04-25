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
import Login from "./components/loginForm/LoginForm";
import RegisterForm from "./components/registerForm/RegisterForm";
import Terms from "./components/terms/Terms";
import AdminLandingPage from "./pages/admin/AdminLandingPage";
import GuestLandingPage from "./pages/guest/GuestLandingPage";
import GuestDashBoard from "./components/guest/dashboard/GuestDashBoard";
import ManagerHome from "./components/manager/home/ManagerHome";
import Directors from "./components/manager/directors/Directors";
import Courses from "./components/manager/courses/Courses";
import Classes from "./components/manager/classes/Classes";
import MaClassDetail from "./components/manager/classes/MaClassDetail";
import AdminCrud from "./components/admin/crud/AdminCrud";
import CoordinatorHome from "./components/coordinator/home/CoordinatorHome";
import CoClasses from "./components/coordinator/classes/CoClasses";
import CoClassDetail from "./components/coordinator/classes/CoClassDetail";
import StudentHome from "./components/user/home/StudentHome";
import StudentClasses from "./components/user/classes/StudentClasses";
import StudentClassDetail from "./components/user/classes/StudentClassDetail";
import UserProfile from "./components/profile/Profile";

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
          path="/student/:id"
          element={
            isAuthenticated("student") ? (
              <LandingPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<StudentHome />} />
          <Route path="classes" element={<StudentClasses />} />
          <Route path="classes/:classId" element={<StudentClassDetail />} />
          <Route path="profile" element={<UserProfile />} />

        </Route>

        {/* Coordinator */}
        <Route
          path="/coordinator/:id"
          element={
            isAuthenticated("coordinator") ? (
              <CoordinatorLandingPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<CoordinatorHome />} />
          <Route path="classes" element={<CoClasses />} />
          <Route path="classes/:classId" element={<CoClassDetail />} />
          <Route path="profile" element={<UserProfile />} />

        </Route>

        {/*Manager */}
        <Route
          path="/manager/:id"
          element={
            isAuthenticated("manager") ? (
              <ManagerLandingPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<ManagerHome />} />
          <Route path="director" element={<Directors />} />
          <Route path="courses" element={<Courses />} />
          <Route path="classes" element={<Classes />} />
          <Route path="classes/:classId" element={<MaClassDetail />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin/:id"
          element={
            isAuthenticated("admin") ? (
              <AdminLandingPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<ManagerHome />} />
          <Route path="director" element={<Directors />} />
          <Route path="courses" element={<Courses />} />
          <Route path="classes" element={<Classes />} />
          <Route path="classes/:classId" element={<MaClassDetail />} />
          <Route path="users" element={<AdminCrud />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Guest */}
        <Route
          path="/guest/:id"
          element={
            isAuthenticated("guest") ? (
              <GuestLandingPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<GuestDashBoard />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
