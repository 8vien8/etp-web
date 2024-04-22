import { useState, useEffect } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './DirectorStyle.css'
function Directors() {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define the API endpoints
    const usersEndpoint = 'http://localhost:3001/coordinators';
    const userDetailsEndpoint = 'http://localhost:3001/coordinators';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(usersEndpoint);
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`${userDetailsEndpoint}/${userId}`);
            const data = await response.json();
            setUserDetails(data);
            toggleModal();
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2 className='header'>Directors</h2>
            <div className='dashboard-content'>
                {users.map(user => (
                    <Card key={user.id} style={{ width: '18%' }}>
                        <img
                            alt="Sample"
                            src={user.avatarUrl}
                            style={{ width: '100%' }}
                        />
                        <CardBody className='articles-container'>
                            <CardTitle tag="h2">
                                {user.name}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h3"
                            >
                                <p> ID: {user.coordinatorID} </p>
                            </CardSubtitle>
                            <Button onClick={() => fetchUserDetails(user.id)}>Detail</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>User Detail</ModalHeader>
                <ModalBody>
                    {userDetails && (
                        <div>
                            <p><strong>ID:</strong> {userDetails.coordinatorID}</p>
                            <p><strong>Name:</strong> {userDetails.name}</p>
                            <p><strong>Email:</strong> {userDetails.email}</p>
                            <p className='director-class-managing'><strong>Managing Classes</strong></p>
                            {userDetails && userDetails.classManage && (
                                <div>
                                    <strong>Class Name:</strong>{' '}
                                    {userDetails.classManage.map((classItem, index) => (
                                        <span key={classItem.id}>
                                            {classItem.className}
                                            {index !== userDetails.classManage.length - 1 && ', '}
                                        </span>
                                    ))}
                                    <br />
                                    <strong>Class Code:</strong>{' '}
                                    {userDetails.classManage.map((classItem, index) => (
                                        <span key={classItem.id}>
                                            {classItem.classCode}
                                            {index !== userDetails.classManage.length - 1 && ', '}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Directors;
