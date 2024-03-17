import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import './styleLogin.css'
import { Link } from 'react-router-dom'
function Login() {
  return (
    <div className="login-form-container">
      <Form className='login-form'>
        <div className='form-header'>
          <h1>Login</h1>
        </div>
        <FormGroup className='form-group'>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            id="email" 
            placeholder='Enter your school email...' 
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Password</label>
          <input 
            type="password"
            name="password"
            id="password" 
            placeholder='Enter your password...'
            required
          />
        </FormGroup>
        <div className='login-register'>
          <Button 
            type="submit"
          >
            <b>Sign-in</b>
          </Button>
          <p> or <Link to ='/register'> Register</Link></p>
        </div>
        <div className='login-form-footer'>
          <p>Forgot your password? <Link to ='/reset'>Reset now!</Link></p>
        </div>
      </Form>
    </div>
  )
}

export default Login