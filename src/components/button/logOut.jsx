import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="header">
            <h1>App Header</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Header;
