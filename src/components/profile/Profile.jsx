import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import LogOut from '../button/LogOut';
import './style.css';
import '../utils/style/cardStyle.css'

const UserProfile = () => {
  const [userData, setUserData] = useState({
    id: "",
    role: "",
    username: "",
    code: "",
    password: "",
    email: "",
    picture: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const userID = JSON.parse(localStorage.getItem('user')).id;
  const userRole = JSON.parse(localStorage.getItem('user')).role;
  const userCode = JSON.parse(localStorage.getItem('user')).code;
  const apiUrl = 'http://localhost:3001/users';

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'picture' ? files[0] : value;
    setUserData({ ...userData, [name]: newValue });
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    toggleModal();
  };

  const handleUpdateProfile = () => {
    const updatedData = { ...userData, id: userID, role: userRole, code: userCode };
    fetch(apiUrl + `/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update user data');
        }
        return response.json();
      })
      .then(data => {
        // Cập nhật dữ liệu người dùng trong state và local storage
        setUserData(data);
        localStorage.setItem('user', JSON.stringify(data));
        setIsEditing(false);
        toggleModal();

        fetch(apiUrl + `/${userID}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch updated user data');
            }
            return response.json();
          })
          .then(updatedUserData => {
            setUserData(updatedUserData);
          })
          .catch(error => {
            console.error('Error fetching updated user data:', error);
          });
      })
      .catch(error => console.error('Error updating user information:', error));
  };

  const handleCancelEdit = () => {
    setIsEditing(!isEditing);
    toggleModal();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className='profile-container'>
        <p style={{ textAlign: "center" }}>
          <img className="profile-picture" src={userData.picture} alt="Profile" />
          <Button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</Button>
        </p>
        <div className="profile-info">
          <p><strong>Code:</strong> {userCode}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p>
            <strong>Password:</strong> {showPassword ? userData.password : '********'}
            <Button class="toggle-password-btn" color="link" onClick={togglePasswordVisibility}>
              {showPassword ? <box-icon name='low-vision'></box-icon> : <box-icon name='bullseye'></box-icon>}
            </Button>
          </p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userRole}</p>

          <LogOut className="log-out-btn" />
        </div>

        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Edit Profile</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={userData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="picture">Profile Picture</Label>
              <Input
                type="file"
                name="picture"
                id="picture"
                onChange={handleInputChange}
                accept="image/*"
                placeholder="Select a new profile picture"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="save-btn" color="primary" onClick={handleUpdateProfile}>Save</Button>{' '}
            <Button className="cancel-btn" color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

    </div>
  );
};

export default UserProfile;
