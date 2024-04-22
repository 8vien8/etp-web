import { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import './classDetail.css'

function MaClassDetail() {
    const { classId } = useParams();
    const apiUrl = `http://localhost:3001/class/${classId}`;

    const [classDetails, setClassDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showEditClassInformations, setShowEditClassInformations] = useState(false);
    const [showEditCoordinator, setShowEditCoordinator] = useState(false);
    const [showEditCourseDueDate, setShowEditCourseDueDate] = useState(false);

    const handleShowEditClassInformations = () => {
        setShowEditClassInformations(!showEditClassInformations);
    }

    const handleShowEditCoordinator = () => {
        setShowEditCoordinator(!showEditCoordinator);
    }

    const handleShowEditCourseDueDate = () => {
        setShowEditCourseDueDate(!showEditCourseDueDate);
    }

    const [newClassName, setNewClassName] = useState('');
    const [newClassID, setNewClassID] = useState('');
    const [newCoordinatorName, setNewCoordinatorName] = useState('');
    const [newCoordinatorID, setNewCoordinatorID] = useState('');
    const [newCourseName, setNewCourseName] = useState('');
    const [newDocumentUrl, setNewDocumentUrl] = useState('');
    // const [newUploadDate, setNewUploadDate] = useState('');
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentID, setNewStudentID] = useState('');
    const [courseDueDate, setNewCourseDueDate] = useState('');
    const [courseStartDate, setNewCourseStartDate] = useState('');

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setClassDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching class details:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchClassDetails();
    }, [apiUrl]);

    // Class Information
    const handleUpdateClass = async () => {
        try {
            const response = await fetch(apiUrl + '/classInfo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ className: newClassName, classID: newClassID })
            });
            if (!response.ok) {
                throw new Error('Failed to update class information');
            }
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
            setShowEditClassInformations(!showEditClassInformations);
        } catch (error) {
            console.error('Error updating class information:', error);
        }
    };

    // Coordinator

    const handleEditCoordinator = async () => {
        try {
            const response = await fetch(apiUrl + '/coordinator', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ coordinatorName: newCoordinatorName, coordinatorID: newCoordinatorID })
            });
            if (!response.ok) {
                throw new Error('Failed to edit coordinator');
            }
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
            setShowEditCoordinator(!showEditCoordinator)
        } catch (error) {
            console.error('Error editing coordinator:', error);
        }
    };

    //  Courses
    const handleAddCourse = async () => {
        if (!newCourseName || !courseStartDate || !courseDueDate) {
            alert('Please enter all fields.');
            return;
        }
        try {
            const response = await fetch(apiUrl + '/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ courseName: newCourseName, startDate: courseStartDate, endDate: courseDueDate })
            });
            if (!response.ok) {
                throw new Error('Failed to add course');
            }
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleSetCourseDueDate = async () => {
        try {
            // const formattedDate = `${courseDueDate.getDate().toString().padStart(2, '0')}-${(courseDueDate.getMonth() + 1).toString().padStart(2, '0')}-${courseDueDate.getFullYear()}`;

            const response = await fetch(apiUrl + '/endDate', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    endDate: courseDueDate
                })
            });

            if (!response.ok) {
                throw new Error('Failed to set course due date');
            }

            const updatedClass = await response.json();
            setClassDetails(updatedClass);
            handleShowEditCourseDueDate();
        } catch (error) {
            console.error('Error setting course due date:', error);
        }
    }

    const [modal, setModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const toggleModal = () => setModal(!modal);

    const confirmDelete = () => {
        if (courseToDelete) {
            handleDeleteCourse(courseToDelete);
            setModal(false);
        }
        if (studentToDelete) {
            handleDeleteStudent(studentToDelete);
            setModal(false);
        }
    };

    // Documents

    const handleAddDocument = async () => {
        if (!newDocumentUrl) {
            alert('Please choose a file for upload');
            return;
        }
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];

            const currentDocuments = classDetails.documents || [];
            const newDocument = { documentUrl: newDocumentUrl, uploadDate: formattedDate };
            const updatedDocuments = [...currentDocuments, newDocument];

            const response = await fetch(apiUrl + '/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ documents: updatedDocuments })
            });

            if (!response.ok) {
                throw new Error('Failed to add document');
            }

            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error adding document:', error);
        }
    };


    const handleAddStudent = async () => {
        try {
            const response = await fetch(apiUrl + '/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentName: newStudentName, studentID: newStudentID })
            });
            if (!response.ok) {
                throw new Error('Failed to add student');
            }
            // Update class information after add student
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await fetch(apiUrl + `/students/${studentId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            // Update class information after delete student
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await fetch(apiUrl + `/courses/${courseId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete course');
            }
            // Update class information after delete course
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleDeleteDocument = async (documentId) => {
        try {
            const response = await fetch(apiUrl + `/documents/${documentId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete document');
            }
            // Update class information after delete document
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {classDetails && (
                <div>
                    <div className='class-detail-header'>
                        <h2>
                            <strong>{classDetails.className}</strong>
                            <strong>({classDetails.classID})</strong>

                        </h2>
                        {!showEditClassInformations && (
                            <Button style={{ backgroundColor: 'unset', border: 'unset', paddingBottom: '0' }} onClick={handleShowEditClassInformations}><box-icon name='edit'></box-icon></Button>
                        )}
                    </div>
                    {/* Edit class info */}
                    {showEditClassInformations && (
                        <Modal isOpen={showEditClassInformations}>
                            <ModalHeader style={{ textAlign: "center" }} toggle={handleShowEditClassInformations}>
                                Edit Class Information
                            </ModalHeader>
                            <ModalBody>
                                <Label>Edit Class Name</Label>
                                <Input
                                    value={newClassName}
                                    onChange={(e) => setNewClassName(e.target.value)}
                                    type='text'
                                    placeholder='Class Name'
                                    required
                                />
                                <Label>Edit Class ID</Label>
                                <Input
                                    value={newClassID}
                                    onChange={(e) => setNewClassID(e.target.value)}
                                    type='text'
                                    placeholder='Class ID'
                                    required
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' variant='primary' onClick={handleUpdateClass}>
                                    Update
                                </Button>
                                <Button variant='secondary' onClick={handleShowEditClassInformations}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )}
                    <div className='coordinator'>
                        <h4>
                            <strong>Coordinator: </strong>{classDetails.coordinatorName} - <strong>ID: </strong> {classDetails.coordinatorID}
                            {!showEditCoordinator && (
                                <Button style={{ backgroundColor: 'unset', border: 'unset', paddingBottom: '0' }} onClick={handleShowEditCoordinator}><box-icon name='edit'></box-icon></Button>
                            )}
                        </h4>

                        {/* Edit coordinator */}
                        {showEditCoordinator && (
                            <Modal isOpen={showEditCoordinator}>
                                <ModalHeader style={{ textAlign: "center" }} toggle={handleShowEditCoordinator}>Edit Coordinator Information</ModalHeader>
                                <ModalBody>
                                    <Label>Edit Coordinator Name</Label>
                                    <Input
                                        value={newCoordinatorName}
                                        onChange={(e) => setNewCoordinatorName(e.target.value)}
                                        type='text'
                                        placeholder='Coordinator Name'
                                    />
                                    <Label>Edit Coordinator ID</Label>
                                    <Input
                                        value={newCoordinatorID}
                                        onChange={(e) => setNewCoordinatorID(e.target.value)}
                                        type='text'
                                        placeholder='Coordinator ID'
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='primary' variant='primary' onClick={handleEditCoordinator}>
                                        Update
                                    </Button>
                                    <Button variant='secondary' onClick={handleShowEditCoordinator}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        )}
                    </div>

                    {/* Add students */}
                    <div className='student'>
                        <h3>Students</h3>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th scope='row'>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classDetails.students && classDetails.students.map(student => (
                                    <tr key={student.id}>
                                        <td style={{ width: "20%" }}>{student.studentID}</td>
                                        <td>{student.studentName}</td>
                                        <td style={{ width: "10%" }}>
                                            <Button color='danger'
                                                onClick={() => { setStudentToDelete(student.id); toggleModal() }}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Input
                            type="text"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                            placeholder="Enter student name"
                        />
                        <Input
                            type="text"
                            value={newStudentID}
                            onChange={(e) => setNewStudentID(e.target.value)}
                            placeholder="Enter student ID"
                        />
                        <Button onClick={handleAddStudent}>Add</Button>
                    </div>

                    <div className='courses'>
                        <h3>Courses</h3>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Release</th>
                                    <th>Open</th>
                                    <th>Close</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classDetails.courses && classDetails.courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.courseName}</td>
                                        <td>{course.courseID}</td>
                                        <td>{course.publicDate}</td>
                                        <td>{course.startDate}</td>
                                        <td>{course.endDate}</td>
                                        <td style={{ width: "25%" }}>
                                            <Button style={{ marginRight: "5px" }} color='danger' onClick={() => {
                                                setCourseToDelete(course.id);
                                                toggleModal();
                                            }}>Delete</Button>
                                            <Button style={{ marginLeft: "5px" }} color='primary' onClick={() => handleShowEditCourseDueDate(course.id)}>Set date</Button>
                                            <Link to={`course/${course.id}/submissions`}>
                                                <Button style={{ marginLeft: "5px" }} color='success'>Articles</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Modal for confirming deletion */}
                        <Modal isOpen={modal} toggle={toggleModal}>
                            <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
                            <ModalBody>
                                Are you sure you want to delete. Your data will be deleted!!
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={confirmDelete}>Delete</Button>{' '}
                                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {/* Add course */}
                        <Input
                            style={{ width: '30%' }}
                            type="text"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            placeholder="Enter new course name"
                            required
                        />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <div>
                                <Label><strong>Start Date</strong></Label>
                                <Input
                                    type="date"
                                    value={courseStartDate}
                                    onChange={(e) => setNewCourseStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label><strong>End Date</strong></Label>
                                <Input
                                    type="date"
                                    value={courseDueDate}
                                    onChange={(e) => setNewCourseDueDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button onClick={handleAddCourse}>Add</Button>

                        {showEditCourseDueDate && (
                            <Modal isOpen={showEditCourseDueDate}>
                                <ModalHeader style={{ textAlign: "center" }} toggle={handleShowEditCourseDueDate}>Edit Course Due Date</ModalHeader>
                                <ModalBody>
                                    <Label>Choose new due date for course</Label>
                                    <Input type='date'
                                        onChange={(e) => setNewCourseDueDate(e.target.value)}
                                        value={courseDueDate}
                                        required
                                    >
                                    </Input>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='primary' variant='primary' onClick={handleSetCourseDueDate}>
                                        Update
                                    </Button>
                                    <Button variant='secondary' onClick={handleShowEditCourseDueDate}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        )}
                    </div>

                    <h3>Documents</h3>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Document</th>
                                <th>Upload date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classDetails.documents && classDetails.documents.map(document => (
                                <tr key={document.id}>
                                    <td href={document.documentUrl}>{document.documentUrl}</td>
                                    <td>{document.uploadDate}</td>
                                    <td style={{ width: "10%" }}><Button color='danger' onClick={() => handleDeleteDocument(document.id)}>Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Add document */}
                    <Input
                        type="file"
                        value={newDocumentUrl}
                        onChange={(e) => setNewDocumentUrl(e.target.value)}
                        placeholder="Enter document URL"
                        required
                    />
                    <Button onClick={handleAddDocument}>Add </Button>
                </div >
            )
            }
            <Outlet />
        </div >
    );
}

export default MaClassDetail;
