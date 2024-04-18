import Fireworks from "../../utils/homepage/FireWorks"
import "./homeStyle.css"
function ManagerHome() {
    return (
        <div className="landing-page">
            <div className="heading">
                <h1> Welcome to University of GreenWich Viet Nam</h1>
            </div>
            <div className="fireworks">
                <Fireworks />
            </div>

        </div>
    )
}

export default ManagerHome