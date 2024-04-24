import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap'
function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{ textAlign: "center" }} className="header">
            <Button color='danger' onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default LogOut;
