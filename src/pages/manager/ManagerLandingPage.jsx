import NavBar from "../../components/manager/navbar/NavBar"
import { Outlet } from 'react-router-dom'
import '../style/LandingStyle.css'
function ManagerLandingPage() {
    return (
        <div className="landing-page-container">
            <div className="navbar">
                <NavBar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default ManagerLandingPage