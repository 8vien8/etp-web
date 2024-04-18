import { useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import './styleLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from '../registerForm/RegisterForm'
import { mockUsers } from '../../../mockdata'
function Login() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const handleRegister = () => {
    setShowRegistrationForm(!showRegistrationForm)
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUsers.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('Login successful!');
      console.log(user.role);
      switch (user.role) {
        case 'admin':
          navigate("/admin/home")
          break;
        case 'manager':
          navigate("/manager/home")
          break;
        case 'coordinator':
          navigate("/coordinator/home")
          break;
        case 'student':
          navigate("/user/home")
          break;
        case 'guest':
          navigate("/guest/home")
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
        <Form className='login-form'
          onSubmit={handleLogin}
        >
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder='Enter your password...'
              required
            />
          </FormGroup>
          <div className='login-button'>
            <Button
              type="submit"
            >
              <b>Sign-in</b>
            </Button>
            <p> or <Link to='/register' onClick={handleRegister}> Register</Link></p>
          </div>
          {error && { error }}
          <div className='form-footer'>
            <p>Forgot your password? <Link to='/reset'>Reset now!</Link></p>
          </div>
        </Form>
      )}
      {showRegistrationForm && <RegisterForm />}
    </div>
  )
}

export default Login