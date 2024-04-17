import Navbar from "../../components/admin/navbar/Navbar"
import { Outlet } from "react-router-dom"
function AdminLandingPage() {
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

export default AdminLandingPage