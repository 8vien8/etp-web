import { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [modal, setModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [classToDelete, setClassToDelete] = useState(null);
    const [newClassData, setNewClassData] = useState({
        name: '',
        code: '',
        coordinator_id: [],
        student_ids: []
    });
    const [coordinatorOptions, setCoordinatorOptions] = useState([]);
    const [isValid, setIsValid] = useState(false);

    const toggleModal = () => setModal(!modal);
    const toggleConfirmModal = () => setConfirmModal(!confirmModal);

    const handleChange = e => {
        const { name, options } = e.target;
        const selectedOptions = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setNewClassData({
            ...newClassData,
            [name]: selectedOptions
        });
    };

    const handleRemoveCoordinator = index => {
        const updatedCoordinatorIds = [...newClassData.coordinator_id];
        updatedCoordinatorIds.splice(index, 1);
        setNewClassData({
            ...newClassData,
            coordinator_id: updatedCoordinatorIds
        });
    };

    const fetchClasses = async () => {
        try {
            const response = await fetch('http://localhost:3001/classes');
            if (response.ok) {
                const data = await response.json();
                setClasses(data);
            } else {
                console.error('Error fetching class data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    const fetchCoordinatorOptions = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            if (response.ok) {
                const data = await response.json();
                const coordinatorCodes = data.filter(user => user.role === 'coordinator').map(coordinator => coordinator.code);
                setCoordinatorOptions(coordinatorCodes);
            } else {
                console.error('Failed to fetch coordinator options:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching coordinator options:', error);
        }
    };

    useEffect(() => {
        fetchClasses();
        fetchCoordinatorOptions();
    }, []);

    useEffect(() => {
        setIsValid(newClassData.name && newClassData.code && newClassData.coordinator_id.length > 0);
    }, [newClassData]);

    const addNewClass = async () => {
        try {
            const maxId = classes.reduce((max, cls) => Math.max(max, parseInt(cls.id)), 0);
            const newId = (maxId + 1).toString();
            const dataWithNewId = { ...newClassData, id: newId };

            const response = await fetch('http://localhost:3001/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataWithNewId)
            });
            if (response.ok) {
                const data = await response.json();
                setClasses([...classes, data]);
                toggleModal();

                setNewClassData({
                    name: '',
                    code: '',
                    coordinator_id: [],
                    student_ids: []
                });
            } else {
                console.error('Failed to add new class:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding new class:', error);
        }
    };


    const confirmDeleteClass = () => {
        setConfirmModal(false);
        if (classToDelete) {
            deleteClass(classToDelete);
        }
    };

    const deleteClass = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/classes/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setClasses(classes.filter(classItem => classItem.id !== id));
            } else {
                console.error('Failed to delete class:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    // Function to show the confirm modal before deleting a class
    const handleShowConfirmModal = (id) => {
        setClassToDelete(id);
        setConfirmModal(true);
    };

    return (
        <div>
            <h2 className='header'>Classes List</h2>
            <Button style={{ marginBottom: "10px" }} color="primary" onClick={toggleModal}>Create Class</Button>
            <div className='dashboard-content'>
                {classes.map(classItem => (
                    <Card style={{ width: "20%" }} key={classItem.id}>
                        <CardBody>
                            <CardTitle tag="h2">{classItem.name}</CardTitle>
                            <CardSubtitle tag="h3" className="mb-2 text-muted">Code: {classItem.code}</CardSubtitle>
                            <Button tag={Link} to={`${classItem.id}`} className="btn btn-primary">Detail</Button>
                            <Button color="danger" onClick={() => handleShowConfirmModal(classItem.id)}>Delete</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Delete modal */}
            <Modal isOpen={confirmModal} toggle={toggleConfirmModal}>
                <ModalHeader toggle={toggleConfirmModal}>Confirm Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this class?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={confirmDeleteClass}>Yes</Button>{' '}
                    <Button color="secondary" onClick={toggleConfirmModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* Create modal */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Create New Class</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label style={{ fontWeight: "bold", fontSize: "1.2rem" }} for="name">Name</Label>
                            <Input type="text" placeholder="Class Name" name="name" id="name" value={newClassData.name} onChange={e => setNewClassData({ ...newClassData, name: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label style={{ fontWeight: "bold", fontSize: "1.2rem" }} for="code">Code</Label>
                            <Input type="text" placeholder="Class Code" name="code" id="code" value={newClassData.code} onChange={e => setNewClassData({ ...newClassData, code: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label style={{ fontWeight: "bold", fontSize: "1.2rem" }} for="coordinator_id">Coordinator Codes</Label>
                            <Input type="text" placeholder="Choose 1 or many coordinators (press Ctr + Click)" name="coordinator_id" id="coordinator_id" readOnly value={newClassData.coordinator_id.join(', ')} />
                            <Input type="select" name="coordinator_id" id="coordinator_id_select" value={newClassData.coordinator_id} onChange={handleChange} multiple>
                                {coordinatorOptions.map(code => (
                                    <option key={code} value={code}>{code}</option>
                                ))}
                            </Input>
                            {newClassData.coordinator_id.length > 0 && (
                                <div>
                                    <Label>Selected Coordinator Codes:</Label>
                                    <ul>
                                        {newClassData.coordinator_id.map((code, index) => (
                                            <li key={index} className="pointer-hover">
                                                {code}
                                                <Button color="none" onClick={() => handleRemoveCoordinator(index)}><box-icon name='minus-circle'></box-icon></Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={addNewClass} disabled={!isValid}>Create</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Classes;
