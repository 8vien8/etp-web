import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap'
function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="header">
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default LogOut;
