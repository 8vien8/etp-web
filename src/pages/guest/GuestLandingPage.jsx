
import { Outlet } from 'react-router-dom'
import '../style/LandingStyle.css'
import Navbar from '../../components/guest/navbar/Navbar'
function GuestLandingPage() {
    return (
        <div className="landing-page-container">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default GuestLandingPage