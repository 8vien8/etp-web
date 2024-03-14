// Routings
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<App />} > */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;