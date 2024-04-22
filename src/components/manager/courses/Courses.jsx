import { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, CardSubtitle } from 'reactstrap';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editedCourse, setEditedCourse] = useState(null);
    const [editedDocuments, setEditedDocuments] = useState([]);
    const [editedAssignments, setEditedAssignments] = useState([]);
    const [saveDisabled, setSaveDisabled] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/courses');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const allAssignmentsFilled = editedAssignments.every(assignment => Object.values(assignment).every(value => value.trim() !== ''));
        const allDocumentsFilled = editedDocuments.every(document => Object.values(document).every(value => value.trim() !== ''));

        setSaveDisabled(!allAssignmentsFilled || !allDocumentsFilled);
    }, [editedAssignments, editedDocuments]);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const showCourseDetails = (course) => {
        setSelectedCourse(course);
        setEditedCourse({ ...course });
        setEditedDocuments([...course.documents]);
        setEditedAssignments([...course.assignments]);
        toggleModal();
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDocumentFileChange = (e, index) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const updatedDocuments = [...editedDocuments];
            updatedDocuments[index].documentUrl = reader.result;
            setEditedDocuments(updatedDocuments);
        };
    };

    const handleAssignmentInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedAssignments = [...editedAssignments];
        updatedAssignments[index][name] = value;
        setEditedAssignments(updatedAssignments);
    };

    const handleDocumentInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedDocuments = [...editedDocuments];
        updatedDocuments[index][name] = value;
        setEditedDocuments(updatedDocuments);
    };

    const handleAddDocument = () => {
        setEditedDocuments([...editedDocuments, { filename: '', documentUrl: '', uploadDate: '' }]);
    };

    const handleAddAssignment = () => {
        setEditedAssignments([...editedAssignments, { title: '', description: '', due_date: '' }]);
    };

    const handleDeleteDocument = (index) => {
        const updatedDocuments = [...editedDocuments];
        updatedDocuments.splice(index, 1);
        setEditedDocuments(updatedDocuments);
    };

    const handleDeleteAssignment = (index) => {
        const updatedAssignments = [...editedAssignments];
        updatedAssignments.splice(index, 1);
        setEditedAssignments(updatedAssignments);
    };

    const handleSaveEdit = async () => {
        try {
            const updatedCourse = { ...editedCourse, documents: editedDocuments, assignments: editedAssignments };
            const response = await fetch(`http://localhost:3001/courses/${editedCourse.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCourse)
            });

            if (!response.ok) {
                throw new Error('Failed to update course');
            }

            console.log('Course updated successfully');

            toggleModal();
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div>
            <h2 className='header'>Courses List</h2>
            <div className='dashboard-content'>
                {courses.map(course => (
                    <Card key={course.id}>
                        <CardBody>
                            <CardTitle tag="h2">{course.name}</CardTitle>
                            <CardSubtitle tag="h3" className="mb-2 text-muted">End Date: {course.end_date}</CardSubtitle>
                            <Button onClick={() => showCourseDetails(course)}>Detail</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <Modal style={{ width: "80vh" }} centered isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Course Details</ModalHeader>
                <ModalBody>
                    {selectedCourse && (
                        <div>
                            <h2 style={{ display: "flex", justifyContent: "center" }}>{selectedCourse.name}</h2>
                            <Input type="text" name="name" value={editedCourse.name} onChange={handleEditInputChange} />
                            <Input type="date" name="start_date" value={editedCourse.start_date} onChange={handleEditInputChange} />
                            <Input type="date" name="end_date" value={editedCourse.end_date} onChange={handleEditInputChange} />
                            <hr />
                            <h4>
                                Assignments
                                <Button color="none" onClick={handleAddAssignment}>
                                    <box-icon name='plus-circle' type='solid' ></box-icon>
                                </Button>
                            </h4>

                            {editedAssignments.map((assignment, index) => (
                                <div style={{ marginTop: 5 }} key={index}>
                                    <Input type="text" name="title" value={assignment.title} onChange={(e) => handleAssignmentInputChange(e, index)} />
                                    <Input type="text" name="description" value={assignment.description} onChange={(e) => handleAssignmentInputChange(e, index)} />
                                    <Input type="date" name="due_date" value={assignment.due_date} onChange={(e) => handleAssignmentInputChange(e, index)} />
                                    <Button style={{ marginTop: 5 }} color="danger" onClick={() => handleDeleteAssignment(index)}>Delete</Button>
                                </div>
                            ))}
                            <hr />

                            <h3>
                                Documents:
                                <Button color="none" onClick={handleAddDocument}>
                                    <box-icon name='plus-circle' type='solid' ></box-icon>
                                </Button>
                            </h3>
                            {editedDocuments.map((document, index) => (
                                <div style={{ marginTop: 5 }} key={index}>
                                    <Input type="text" name="filename" value={document.filename} onChange={(e) => handleDocumentInputChange(e, index)} />
                                    <p style={{ overflow: "hidden" }}>Document url: <a href={document.documentUrl}>{document.documentUrl}</a></p>
                                    <Input type="file" accept=".docx,.pdf,.jpg,.jpeg/*" name="documentUrl" onChange={(e) => handleDocumentFileChange(e, index)} />
                                    <Button style={{ marginTop: 5 }} color="danger" onClick={() => handleDeleteDocument(index)}>Delete</Button>
                                </div>
                            ))}

                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSaveEdit} disabled={saveDisabled}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Courses;
