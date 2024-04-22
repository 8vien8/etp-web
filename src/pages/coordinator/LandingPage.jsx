import NavBar from "../../components/coordinator/navbar/NavBar"
import { Outlet } from 'react-router-dom'
import '../style/LandingStyle.css'
function LandingPage() {
  return (
    <div className="landing-page-container">
        <div className="navbar">
          <NavBar/>
        </div>
        <div className="content">
          <Outlet />
        </div>
    </div>
  )
}

export default LandingPage