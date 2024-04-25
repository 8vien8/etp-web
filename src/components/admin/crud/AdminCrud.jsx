import { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editedUser, setEditedUser] = useState({
    id: '',
    username: '',
    email: '',
    code: '',
    role: '',
    password: ''
  });
  const [newUser, setNewUser] = useState({
    id: '',
    username: '',
    email: '',
    code: '',
    role: '',
    password: '',
    picture: ''
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const apiUrl = 'http://localhost:3001/users'
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(apiUrl + `/${deleteUserId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setDeleteUserId(null);
      setShowDeleteModal(false);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(apiUrl + `/${editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      setShowEditModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleAddUser = async () => {
    try {
      if (!newUser.id || !newUser.username || !newUser.email || !newUser.code || !newUser.role || !newUser.password) {
        throw new Error('All fields are required');
      }
      const maxId = Math.max(...users.map(user => user.id));
      const newId = `${maxId + 1}`;
      const newUserWithId = { ...newUser, id: newId };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserWithId)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setSuccessMessage('User created successfully');
      setShowAddModal(false);
      fetchData();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const toggleDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteModal(!showDeleteModal);
  };

  const toggleEditModal = (user) => {
    if (user) {
      setEditedUser(user);
    }
    setShowEditModal(!showEditModal);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const renderUsersByRole = (role) => {
    const filteredUsers = users.filter(user => user.role === role);
    const isAdminAndSingle = (role) => {
      return role === 'admin' && users.filter(user => user.role === 'admin').length === 1;
    };

    if (filteredUsers.length === 0) {
      return <p>There are no users with role {role}</p>;
    }
    return (
      <div key={role}>
        <h2>{role.charAt(0).toUpperCase() + role.slice(1)}s</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.code}</td>
                <td style={{ width: "20%" }}>
                  <Button
                    color="danger"
                    disabled={isAdminAndSingle(user.role)}
                    onClick={() => {
                      setDeleteUserId(user.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button color="primary" onClick={() => {
                    setEditedUser(user);
                    setShowEditModal(true);
                  }}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Manage Users</h1>
      <Button style={{ marginBottom: "10px" }} color="success" onClick={toggleAddModal}>Add User</Button>
      {renderUsersByRole('admin')}
      {renderUsersByRole('manager')}
      {renderUsersByRole('coordinator')}
      {renderUsersByRole('student')}
      {renderUsersByRole('guest')}

      <Modal isOpen={showDeleteModal} toggle={() => toggleDeleteModal(null)}>
        <ModalHeader toggle={() => toggleDeleteModal(null)}>Confirm Delete</ModalHeader>
        <ModalBody>Are you sure you want to delete this user?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleDeleteModal(null)}>Cancel</Button>{' '}
          <Button color="danger" onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showEditModal} toggle={() => toggleEditModal(null)}>
        <ModalHeader tag="h3" toggle={() => toggleEditModal(null)}>Editing {editedUser.username}</ModalHeader>
        <ModalBody style={{ margin: "10px" }}>
          <FormGroup>
            <Label tag="h5" for="username">Username</Label>
            <Input type="text" name="username" id="username" value={editedUser.username} onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label tag="h5" for="email">Email</Label>
            <Input type="email" name="email" id="email" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label tag="h5" for="code">Code</Label>
            <Input type="text" name="code" id="code" value={editedUser.code} onChange={(e) => setEditedUser({ ...editedUser, code: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label tag="h5" for="role">Role</Label>
            <Input type="select" name="role" id="role" value={editedUser.role} onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="coordinator">Coordinator</option>
              <option value="student">Student</option>
              <option value="guest">Guest</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label tag="h5" for="password">Password</Label>
            <Input type="password" name="password" id="password" value={editedUser.password} onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleEditModal(null)}>Cancel</Button>
          <Button color="primary" onClick={handleEdit}>Save</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showAddModal} toggle={toggleAddModal}>
        <ModalHeader toggle={toggleAddModal}>Add New User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="newUsername">Username</Label>
            <Input type="text" name="newUsername" id="newUsername" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="newEmail">Email</Label>
            <Input type="email" name="newEmail" id="newEmail" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="newCode">Code</Label>
            <Input type="text" name="newCode" id="newCode" value={newUser.code} onChange={(e) => setNewUser({ ...newUser, code: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="newRole">Role</Label>
            <Input type="select" name="newRole" id="newRole" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="coordinator">Coordinator</option>
              <option value="student">Student</option>
              <option value="guest">Guest</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">Password</Label>
            <Input type="password" name="newPassword" id="newPassword" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="newPicture">Picture</Label>
            <Input type="file" name="newPicture" id="newPicture" value={newUser.picture} onChange={(e) => setNewUser({ ...newUser, picture: e.target.value })} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleAddModal}>Cancel</Button>{' '}
          <Button color="success" onClick={handleAddUser}>Add User</Button>
        </ModalFooter>
      </Modal>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default AdminDashboard;
