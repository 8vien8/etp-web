import NavBar from "../../components/user/navbar/NavBar"
import { Outlet } from 'react-router-dom'
import './LandingStyle.css'
function LandingPage() {
  return (
    <div className="user-landing-page-container">
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