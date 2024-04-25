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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({
        name: '',
        class_name: '',
        class_code: '',
        start_date: '',
        end_date: '',
        documents: [],
        assignments: []
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const apiUrl = 'http://localhost:3001/courses';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
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

    //Edit

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
            const response = await fetch(`${apiUrl}/${editedCourse.id}`, {
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


    //Create 

    const toggleModalS = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const requiredFields = ['name', 'class_name', 'class_code', 'start_date', 'end_date'];
        const isValid = requiredFields.every(field => newCourse[field].trim() !== '');
        setIsFormValid(isValid);
    };

    const handleCreateCourse = () => {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCourse)
        })
            .then(response => response.json())
            .then(data => {
                toggleModalS();
                setCourses([...courses, data]);
            })
            .catch(error => console.error('Error creating new course:', error));
    };

    const addDocument = () => {
        setNewCourse({ ...newCourse, documents: [...newCourse.documents, {}] });
    };

    const addAssignment = () => {
        setNewCourse({ ...newCourse, assignments: [...newCourse.assignments, {}] });
    };

    const removeDocument = (index) => {
        const updatedDocuments = [...newCourse.documents];
        updatedDocuments.splice(index, 1);
        setNewCourse({ ...newCourse, documents: updatedDocuments });
    };

    const removeAssignment = (index) => {
        const updatedAssignments = [...newCourse.assignments];
        updatedAssignments.splice(index, 1);
        setNewCourse({ ...newCourse, assignments: updatedAssignments });
    };

    // const [classes, setClasses] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:3001/classes')
    //         .then(response => response.json())
    //         .then(data => {
    //             setClasses(data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);


    useEffect(() => {
        validateForm();
    }, [newCourse]);

    //Delete
    const toggleDeleteModal = () => {
        setDeleteModalOpen(!deleteModalOpen);
    };

    const confirmDelete = (course) => {
        setCourseToDelete(course);
        toggleDeleteModal();
    };

    const handleDeleteCourse = async () => {
        try {
            const response = await fetch(`${apiUrl}/${courseToDelete.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete course');
            }

            setCourses(courses.filter(course => course.id !== courseToDelete.id));
            setCourseToDelete(null);
            toggleDeleteModal();
            console.log('Course deleted successfully');
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div>
            <h2 className='header'>Article List</h2>
            <Button style={{ margin: "10px 0" }} color="success" onClick={toggleModalS}>Create Article</Button>

            <div className='dashboard-content'>
                {courses.map(course => (
                    <Card key={course.id}>
                        <CardBody>
                            <CardTitle tag="h2">{course.name}</CardTitle>
                            <CardSubtitle tag="h3" className="mb-2 text-muted">End Date: {course.end_date}</CardSubtitle>
                            <Button onClick={() => showCourseDetails(course)} color='primary' className="btn btn-primary">Detail</Button>
                            <Button onClick={() => confirmDelete(course)} color="danger">Delete</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <Modal centered isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Article Details</ModalHeader>
                <ModalBody>
                    {selectedCourse && (
                        <div>
                            <h2 style={{ display: "flex", justifyContent: "center" }}>{selectedCourse.name}</h2>
                            <h4>Applying for class</h4>
                            <Input type="text" name="class_name" value={selectedCourse.class_name} onChange={handleEditInputChange} />
                            <Input type="text" name="class_code" value={selectedCourse.class_code} onChange={handleEditInputChange} />
                            <h4>Article</h4>
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

            <Modal isOpen={isModalOpen} toggle={toggleModalS}>
                <ModalHeader toggle={toggleModalS}><div style={{ fontWeight: "bold" }}>Add New Article</div></ModalHeader>
                <ModalBody>
                    <h5> Apply for Faculties</h5>

                    {/* <Input type="select" onChange={handleInputChange} value={newCourse.class_code}>
                        <option value="">Select a class name...</option>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.name}>{cls.name}</option>
                        ))}
                    </Input>
                    <Input type="select" onChange={handleInputChange} value={newCourse.class_name}>
                        <option value="">Select a class code...</option>
                        {classes.map(cls => (
                            <option key={cls.id} value={cls.code}>{cls.code}</option>
                        ))}
                    </Input> */}
                    <Input type="text" name="class_name" placeholder="Class Name" value={newCourse.class_name} onChange={handleInputChange} />
                    <Input type="text" name="class_code" placeholder="Class Code" value={newCourse.class_code} onChange={handleInputChange} />
                    <hr />
                    <h5> Article information</h5>
                    <Input type="text" name="name" placeholder="Artitcle Name" value={newCourse.name} onChange={handleInputChange} />
                    <Input type="date" name="start_date" placeholder="Start Date" value={newCourse.start_date} onChange={handleInputChange} />
                    <Input type="date" name="end_date" placeholder="End Date" value={newCourse.end_date} onChange={handleInputChange} />
                    <hr />
                    <h5>Documents
                        <Button color="none" onClick={addDocument}><box-icon name='plus-circle'></box-icon></Button>
                    </h5>
                    {newCourse.documents.map((document, index) => (
                        <div key={index}>
                            <Input type="text" name={`documents[${index}].filename`} placeholder="Filename" value={document.filename} onChange={handleInputChange} />
                            <Input type="file" name={`documents[${index}].documentUrl`} onChange={handleInputChange} />
                            <Input type="date" name={`documents[${index}].uploadDate`} placeholder="Upload Date" value={document.uploadDate} onChange={handleInputChange} />
                            <Button color="none" onClick={() => removeDocument(index)}><box-icon name='minus-circle'></box-icon></Button>
                        </div>
                    ))}

                    <h5>Assignments
                        <Button color="none" onClick={addAssignment}><box-icon name='plus-circle'></box-icon></Button>
                    </h5>
                    {newCourse.assignments.map((assignment, index) => (
                        <div key={index}>
                            <Input type="text" name={`assignments[${index}].title`} placeholder="Title" value={assignment.title} onChange={handleInputChange} />
                            <Input type="text" name={`assignments[${index}].description`} placeholder="Description" value={assignment.description} onChange={handleInputChange} />
                            <Input type="date" name={`assignments[${index}].due_date`} placeholder="Due Date" value={assignment.due_date} onChange={handleInputChange} />
                            <Button color="none" onClick={() => removeAssignment(index)}><box-icon name='minus-circle'></box-icon></Button>
                            <hr />
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCreateCourse} disabled={!isFormValid}>Create</Button>{' '}
                    <Button color="secondary" onClick={toggleModalS}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
                <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete the article {courseToDelete && courseToDelete.name}?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteCourse}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Courses;
