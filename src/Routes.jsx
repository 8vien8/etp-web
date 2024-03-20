// Routings
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Login from './components/loginForm/LoginForm';
import RegisterForm from './components/registerForm/RegisterForm';
import Terms from './components/terms/Terms';
import LandingPage from './pages/user/LandingPage';
import Submissions from './components/user/submissions/Submissions';
import Messages from './components/user/message/Messages';
import Profile from './components/user/profile/Profile';
import Settings from './components/user/settingg/Settings';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Home />} >
              <Route path="login" element={<Login />} />
              <Route path="register" element={<RegisterForm />} />
            </Route>  
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/user" element={<LandingPage />} >
              <Route path="submissions" element={<Submissions />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;