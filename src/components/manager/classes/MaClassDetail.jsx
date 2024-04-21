import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import './classDetail.css'

function MaClassDetail() {
    const { id } = useParams();
    const apiUrl = `http://localhost:3001/class/${id}`;

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
    const [newUploadDate, setNewUploadDate] = useState('');
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentID, setNewStudentID] = useState('');
    const [courseDueDate, setNewCourseDueDate] = useState('');

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
    const handleUpdateClassID = async () => {
        try {
            const response = await fetch(apiUrl + '/classID', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ className: newClassID })
            });
            if (!response.ok) {
                throw new Error('Failed to update class ID');
            }
            // Update information after update
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error updating class name:', error);
        }
    };
    const handleUpdateClassName = async () => {
        try {
            const response = await fetch(apiUrl + '/className', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ className: newClassName })
            });
            if (!response.ok) {
                throw new Error('Failed to update class name');
            }
            // Update information after update
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error updating class name:', error);
        }
    };

    const handleUpdateClass = async () => {
        try {
            await handleUpdateClassID();
            await handleUpdateClassName();
            setShowEditClassInformations(!showEditClassInformations);
        } catch (error) {
            alert.error('Error updating class:', error);
        }
    };

    // Coordinator

    const handleEditCoordinatorName = async () => {
        try {
            const response = await fetch(apiUrl + '/coordinatorName', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ coordinatorName: newCoordinatorName })
            });
            if (!response.ok) {
                throw new Error('Failed to edit coordinator');
            }
            // Update class information after update coordinator
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error adding coordinator:', error);
        }
    };
    const handleEditCoordinatorID = async () => {
        try {
            const response = await fetch(apiUrl + '/coordinatorID', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ coordinatorName: newCoordinatorID })
            });
            if (!response.ok) {
                throw new Error('Failed to edit coordinator');
            }
            // Update class information after update coordinator
            const updatedClass = await response.json();
            setClassDetails(updatedClass);
        } catch (error) {
            console.error('Error adding coordinator:', error);
        }
    };

    const handleEditCoordinator = async () => {
        try {
            await handleEditCoordinatorID();
            await handleEditCoordinatorName();
            setShowEditCoordinator(!showEditCoordinator)
        } catch (error) {
            alert.error('Error editing coordinator:', error);
        }
    }

    //  Courses
    const handleAddCourse = async () => {
        try {
            const response = await fetch(apiUrl + '/courseList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ courseName: newCourseName })
            });
            if (!response.ok) {
                throw new Error('Failed to add course');
            }
            // Update class information after update course
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


    // Documents

    const handleAddDocument = async () => {
        try {
            const response = await fetch(apiUrl + '/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ documentUrl: newDocumentUrl, uploadDate: newUploadDate })
            });
            if (!response.ok) {
                throw new Error('Failed to add document');
            }
            // Update class information after add  document
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

    // const handleDeleteCoordinator = async (coordinatorId) => {
    //     try {
    //         const response = await fetch(apiUrl + `/coordinators/${coordinatorId}`, {
    //             method: 'DELETE'
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to delete coordinator');
    //         }
    //         // Update class information after delete coordinator
    //         const updatedClass = await response.json();
    //         setClassDetails(updatedClass);
    //     } catch (error) {
    //         console.error('Error deleting coordinator:', error);
    //     }
    // };

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
                                />
                                <Label>Edit Class ID</Label>
                                <Input
                                    value={newClassID}
                                    onChange={(e) => setNewClassID(e.target.value)}
                                    type='text'
                                    placeholder='Class ID'
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
                        <div style={{ display: 'flex' }}>
                            <h3>Coordinators</h3>
                            {!showEditCoordinator && (
                                <Button style={{ backgroundColor: 'unset', border: 'unset', paddingBottom: '0' }} onClick={handleShowEditCoordinator}><box-icon name='edit'></box-icon></Button>
                            )}
                        </div>
                        <p><strong>Coordinator: </strong>{classDetails.coordinatorName} - <strong>ID: </strong> {classDetails.coordinatorID}</p>

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

                    {/* Add document */}
                    <Input
                        type="text"
                        value={newDocumentUrl}
                        onChange={(e) => setNewDocumentUrl(e.target.value)}
                        placeholder="Enter document URL"
                    />
                    <Input
                        type="text"
                        value={newUploadDate}
                        onChange={(e) => setNewUploadDate(e.target.value)}
                        placeholder="Enter upload date"
                    />
                    <Button onClick={handleAddDocument}>Add </Button>

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
                                {classDetails.studentList && classDetails.studentList.map(student => (
                                    <tr key={student.id}>
                                        <td style={{ width: "20%" }}>{student.studentID}</td>
                                        <td>{student.studentName}</td>
                                        <td style={{ width: "10%" }}>
                                            <Button color='danger' onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
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
                                {classDetails.courseList && classDetails.courseList.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.courseName} </td>
                                        <td>{course.courseID} </td>
                                        <td>{course.publicDate} </td>
                                        <td>{course.startDate} </td>
                                        <td>{course.endDate} </td>
                                        <td style={{ width: "18%" }}>
                                            <Button style={{ marginRight: "5px" }} color='danger' onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
                                            <Button style={{ marginLeft: "5px" }} color='primary' onClick={() => handleShowEditCourseDueDate(course.id)}>Set date</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {/* Add course */}
                        <Input
                            type="text"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            placeholder="Enter new course name"
                        />
                        <Button onClick={handleAddCourse}>Add</Button>

                        {showEditCourseDueDate && (
                            <Modal isOpen={showEditCourseDueDate}>
                                <ModalHeader style={{ textAlign: "center" }} toggle={handleShowEditCourseDueDate}>Edit Course Due Date</ModalHeader>
                                <ModalBody>
                                    <Label>Choose new due date for course</Label>
                                    <Input type='date'
                                        onChange={(e) => setNewCourseDueDate(e.target.value)}
                                        value={courseDueDate}
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
                    <ul>
                        {classDetails.documentList && classDetails.documentList.map(document => (
                            <li key={document.id}>
                                <a href={document.documentUrl}>{document.documentUrl}</a> - Upload: {document.uploadDate}
                                <Button color='danger' onClick={() => handleDeleteDocument(document.id)}>Delete</Button>
                            </li>
                        ))}
                    </ul>
                </div >
            )
            }
        </div >
    );
}

export default MaClassDetail;
