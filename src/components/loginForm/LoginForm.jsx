import { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './styleLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../registerForm/RegisterForm';

function Login() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:3001/users'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleRegister = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('Login successful!');
      console.log(user.role);
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "coordinator":
          navigate("/coordinator");
          break;
        case "student":
          navigate("/user");
          break;
        case "guest":
          navigate("/guest");
          break;
        default:
          break;
      }
      localStorage.setItem('user', JSON.stringify(user));
      setError('');
    } else {
      console.error('Login failed!');
      setError('Incorrect email or password.');
    }
  };

  return (
    <div className="form-container">
      {!showRegistrationForm && (
        <Form className='login-form' onSubmit={handleLogin}>
          <div className='form-header'>
            <h2>Login</h2>
          </div>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder='Enter your school email...'
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder='Enter your password...'
              required
            />
          </FormGroup>
          <div className='login-button'>
            <Button color='primary' type="submit">
              <b>Sign-in</b>
            </Button>
            <p> or <Link to='/register' onClick={handleRegister}> Register</Link></p>
          </div>
          {error && <div style={{ color: 'red' }} className='error'>{error}</div>}
          <div className='form-footer'>
          </div>
        </Form>
      )}
      {showRegistrationForm && <RegisterForm />}
    </div>
  );
}

export default Login;
