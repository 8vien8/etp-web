// Routings
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import App from './App';
import Home from './pages/homepage/Home';
import About from './pages/homepage/About';
import NotFound from './pages/homepage/NotFound';
import Contact from './pages/homepage/Contact';
import Login from './components/loginForm/LoginForm';
import RegisterForm from './components/registerForm/RegisterForm';
import Terms from './components/terms/Terms';
import LandingPage from './pages/user/LandingPage';
import Submissions from './components/user/submissions/Submissions';
import Messages from './components/user/message/Messages';
import Profile from './components/user/profile/Profile';
import UserDashboard from './components/user/dashboard/UserDashboard';
import CoordinatorLandingPage from './pages/coordinator/LandingPage';
import Dashboard from './components/coordinator/dashboard/Dashboard';
import Articles from './components/coordinator/artiicle/Articles';
import CreateNewSubmissions from './components/user/create/CreateNewSubmisson';
import CreateNewUser from './components/coordinator/createUser/CreateNewUser';
import Message from './components/coordinator/message/Messages';
import CoProfile from './components/coordinator/profile/CoProfile';
import ManagerDashBoard from './components/manager/dashboard/ManagerDashBoard';
import ManagerLandingPage from './pages/manager/ManagerLandingPage';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="terms" element={<Terms />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user" element={<LandingPage />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="create" element={<CreateNewSubmissions />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/coordinator" element={<CoordinatorLandingPage />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='articles' element={<Articles />} />
          <Route path='create-user' element={<CreateNewUser />} />
          <Route path='messages' element={<Message />} />
          <Route path='profile' element={<CoProfile />} />
          <Route path='settings' element={<Articles />} />
        </Route>

        <Route path="/manager" element={<ManagerLandingPage />}>
          <Route path='dashboard' element={<ManagerDashBoard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;