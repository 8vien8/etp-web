import { useState } from 'react';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./styleRegister.css"


function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const isEmailExists = (email, users) => {
    return users.some(user => user.email === email);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const createNewUser = async () => {
    try {
      const users = await fetchUsers();
      if (isEmailExists(email, users)) {
        alert('This email already exists. Please choose a different one.');
        return;
      }
      const maxUserId = Math.max(...users.map(user => user.id)) || 0;
      const maxUserCode = Math.max(...users.map(user => parseInt(user.code.substring(2)))) || 0;
      const maxUsername = Math.max(...users.map(user => parseInt(user.username.substring(5)))) || 0;

      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'guest',
          id: `${maxUserId + 1}`,
          code: `Gu${maxUserCode + 1}`,
          username: `guest${maxUsername + 1}`,
          password: password,
          email: email,
          picture: 'https://telegraph-image-bak.pages.dev/file/5d447a34d3484def3a7a3.jpg',
        }),
      });

      navigate('/login');
      window.location.reload();
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Password confirmation does not match');
      return;
    }
    createNewUser();
    navigate('/login');
  };

  return (
    <div className="form-container">
      <Form className='register-form' onSubmit={handleSubmit}>
        <div className='form-header'>
          <h2>Register</h2>
        </div>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder='Enter your school email...'
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder='Enter your password...'
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Confirm password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            placeholder='Re-enter your password...'
            required
          />
        </FormGroup>
        <div className='register-button'>
          <Button type="submit">Sign-up</Button>
        </div>
        <div className='form-footer'>
          <p>Already have an account?.
            <Link to='/login'>Sign in</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
