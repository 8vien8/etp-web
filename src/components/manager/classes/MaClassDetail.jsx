import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, ListGroup, ListGroupItem } from 'reactstrap';
import './classDetail.css'
import '../../utils/style/cardStyle.css';

function ClassDetail() {
    const { classId } = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [coordinators, setCoordinators] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const [newCoordinatorId, setNewCoordinatorId] = useState('');
    const [newStudentId, setNewStudentId] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [coordinatorList, setCoordinatorList] = useState([]);
    const [editedSubmission, setEditedSubmission] = useState(null);
    const [editedGrade, setEditedGrade] = useState('');
    const [editedComment, setEditedComment] = useState('');
    const [editedStatus, setEditedStatus] = useState('');


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isCourseDetailModalOpen, setIsCourseDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [coordinatorToDelete, setCoordinatorToDelete] = useState(null);
    const [isDeleteStudentModalOpen, setIsDeleteStudentModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isSubmissionDetailModalOpen, setIsSubmissionDetailModalOpen] = useState(false);

    const confirmDeleteStudent = () => {
        if (studentToDelete) {
            handleDeleteStudent(studentToDelete);
        }
        setIsDeleteStudentModalOpen(false);
    };

    const handleShowSubmissionDetail = (submission) => {
        setSelectedSubmission(submission);
        setIsSubmissionDetailModalOpen(true);
    };

    const classApiUrl = 'http://localhost:3001/classes'
    const userApiUrl = 'http://localhost:3001/users'
    const courseApiUrl = 'http://localhost:3001/courses'
    const submissionApiUrl = 'http://localhost:3001/submissions'

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch class info
                const classResponse = await fetch(classApiUrl + `/${classId}`);
                if (!classResponse.ok) {
                    throw new Error('Failed to fetch class data');
                }
                const classData = await classResponse.json();
                setClassInfo(classData);

                // Combine coordinator_id and student_ids into one array
                const userIds = [...classData.coordinator_id, ...classData.student_ids];

                // User information
                const usersResponse = await fetch(userApiUrl);
                if (!usersResponse.ok) {
                    throw new Error('Failed to fetch users data');
                }
                const userData = await usersResponse.json();

                if (userData.length > 0) {
                    const filteredUsers = userData.filter(user => userIds.includes(user.code));

                    const coordinators = [];
                    const students = [];

                    filteredUsers.forEach(user => {
                        if (classData.coordinator_id.includes(user.code)) {
                            coordinators.push(user);
                        } else if (classData.student_ids.includes(user.code)) {
                            students.push(user);
                        }
                    });

                    // Course data
                    const courseResponse = await fetch(courseApiUrl);
                    if (!courseResponse.ok) {
                        throw new Error('Failed to fetch course data');
                    }
                    const courseData = await courseResponse.json();
                    const filteredCourseData = courseData.filter(course => {
                        return course.class_name === classData.name
                            && course.class_code === classData.code;
                    })

                    //Submissions data
                    const submissionsResponse = await fetch(submissionApiUrl);
                    if (!submissionsResponse.ok) {
                        throw new Error('Failed to fetch submissions data');
                    }
                    const submissionsData = await submissionsResponse.json();
                    const filteredSubmissionsData = submissionsData.filter(submission => {
                        return submission.class_name === classData.name
                            && submission.class_code === classData.code
                            && filteredCourseData.some(course => course.name === submission.course_name)
                            && students.some(student => submission.student_id === student.code);
                    })

                    setSubmissions(filteredSubmissionsData)
                    setCourses(filteredCourseData);
                    setCoordinators(coordinators);
                    setStudents(students);
                } else {
                    throw new Error('Users data not found or malformed');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, [classId]);

    //Coordinator
    useEffect(() => {
        const fetchCoordinator = async () => {
            try {
                const response = await fetch(userApiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch coordinators');
                }
                const data = await response.json();
                setCoordinatorList(data.filter(user => user.role === 'coordinator'));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchCoordinator();
    }, []);

    //Student
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(userApiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                setStudentList(data.filter(user => user.role === 'student'));
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Coordinator
    const handleDeleteCoordinator = async (coordinatorId) => {
        try {
            const updatedCoordinators = coordinators.filter(coordinator => coordinator.code !== coordinatorId);
            setCoordinators(updatedCoordinators);
            const updateResponse = await fetch(`${classApiUrl}/${classId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coordinator_id: updatedCoordinators.map(coordinator => coordinator.code)
                })
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update coordinator in database');
            }

        } catch (error) {
            console.error('Error updating coordinator:', error);
        }
    };

    const confirmDeleteCoordinator = () => {
        if (coordinatorToDelete) {
            handleDeleteCoordinator(coordinatorToDelete);
        }
        setIsDeleteModalOpen(false);
    };

    const handleAddCoordinator = async () => {
        try {
            if (inputValue === '') {
                return;
            }
            if (coordinators.some(coordinator => coordinator.code === newCoordinatorId)) {
                alert('This user is already a coordinator in the class.');
                return;
            }
            const updatedCoordinators = [...coordinators, coordinatorList.find(user => user.code === newCoordinatorId)];
            setCoordinators(updatedCoordinators);

            const updateResponse = await fetch(`${classApiUrl}/${classId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coordinator_id: updatedCoordinators.map(coordinator => coordinator.code)
                })
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update coordinators in the database');
            }

            setNewCoordinatorId('');
            setIsModalOpen(!isModalOpen);

        } catch (error) {
            console.error('Error adding coordinator:', error);
        }
    };

    const handleListGroupItemClick = (userCode) => {
        setNewCoordinatorId(userCode);
        setInputValue(userCode);
    };

    //Students
    const handleDeleteStudent = async (studentId) => {
        try {
            const updatedStudents = students.filter(student => student.code !== studentId);
            setStudents(updatedStudents);
            const updateResponse = await fetch(`${classApiUrl}/${classId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    student_ids: updatedStudents.map(student => student.code)
                })
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update student in database');
            }

        } catch (error) {
            console.error('Error updating student list:', error);
        }
    };

    const handleAddStudent = async () => {
        try {
            if (inputValue === '') {
                return;
            }
            if (students.some(student => student.code === newStudentId)) {
                alert('This user is already a student in the class.');
                return;
            }
            const updatedStudents = [...students, studentList.find(user => user.code === newStudentId)];
            setStudents(updatedStudents);
            const updateResponse = await fetch(`${classApiUrl}/${classId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    student_ids: updatedStudents.map(student => student.code)
                })
            });
            if (!updateResponse.ok) {
                throw new Error('Failed to update students in the database');
            }
            setNewStudentId('');
            setIsStudentModalOpen(!isStudentModalOpen);

        } catch (error) {
            console.error('Error adding student:', error);
        }
    }

    const handleStudentListGroupItemClick = (userCode) => {
        setNewStudentId(userCode);
        setInputValue(userCode);
    };

    const handleSearchInputChange = async (e) => {
        setSearchInput(e.target.value);
        setInputValue(e.target.value);
    };

    // Courses
    const handleShowCourseDetail = (course) => {
        setSelectedCourse(course);
        setIsCourseDetailModalOpen(true);
    };

    const toggleCourseDetailModal = () => {
        setIsCourseDetailModalOpen(!isCourseDetailModalOpen);
    };

    // Submission

    const handleEdit = () => {
        setEditedSubmission(selectedSubmission);
        setEditedGrade(selectedSubmission.grade);
        setEditedComment(selectedSubmission.comment);
        setEditedStatus(selectedSubmission.status);

    };

    const toggleSubmissionDetailModal = () => {
        setEditedStatus(null);
        setEditedSubmission(null);
        setEditedGrade(null);
        setEditedComment(null);
        setIsSubmissionDetailModalOpen(!isSubmissionDetailModalOpen);
    };

    const handleSave = () => {
        if (!editedSubmission) return;
        const updatedSubmission = {
            grade: editedGrade,
            comment: editedComment,
            status: editedStatus
        };

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSubmission)
        };

        fetch(`${submissionApiUrl}/${editedSubmission.id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Update failed');
                }
                toggleSubmissionDetailModal();
                window.location.reload();
            })
            .catch(error => {
                console.error('Update failed:', error);
            });

    };


    return (
        <div style={{ padding: "20px" }}>
            {error && <div>Error: {error}</div>}
            {!classInfo && !coordinators.length && !students.length && !courses.length && !submissions.length ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>{classInfo.name} Details</h2>
                    <h3 className="mb-2 text-muted" style={{ textAlign: "center" }}>Code: {classInfo.code}</h3>

                    <h3>Coordinators</h3>
                    <h5 style={{ color: "green", display: "flex", alignItems: "center" }}>
                        Add new coordinator for class
                        <Button
                            style={{ display: "flex", alignItems: "center" }}
                            color="none"
                            onClick={() => setIsModalOpen(true)}>
                            <box-icon name='user-plus'></box-icon>
                        </Button>
                    </h5>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Coordinator ID</th>
                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coordinators.map(coordinator => (
                                <tr key={coordinator.id}>
                                    <td>
                                        <Link to={coordinator.picture}>
                                            <img style={{ width: "40px", height: "40px" }} src={coordinator.picture} />
                                        </Link>
                                    </td>
                                    <td>{coordinator.code}</td>
                                    <td>{coordinator.username}</td>
                                    <td>{coordinator.email}</td>
                                    <td style={{ width: "10%" }}>
                                        <Button className="btn btn-danger"
                                            onClick={() => { setCoordinatorToDelete(coordinator.code); setIsDeleteModalOpen(true); }}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Students</h3>
                    <h5 style={{ color: "green", display: "flex", alignItems: "center" }}>
                        Add new student into class
                        <Button
                            style={{ display: "flex", alignItems: "center" }}
                            color="none"
                            onClick={() => setIsStudentModalOpen(true)}>
                            <box-icon name='user-plus'></box-icon>
                        </Button>
                    </h5>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Student ID</th>
                                <th>User name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td style={{ width: "10%" }}>
                                        <Link>
                                            <img style={{ width: "40px", height: "40px" }} src={student.picture}></img>
                                        </Link>
                                    </td>
                                    <td>{student.code}</td>
                                    <td>{student.username}</td>
                                    <td>{student.email}</td>
                                    <td style={{ width: "10%" }}>
                                        <Button className="btn btn-danger"
                                            onClick={() => { setStudentToDelete(student.code); setIsDeleteStudentModalOpen(true) }}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Articles</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Documents</th>
                                <th>Assignments</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id}>
                                    {/* <td>{course.id}</td> */}
                                    <td>{course.name}</td>
                                    <td>{course.start_date}</td>
                                    <td>{course.end_date}</td>
                                    <td>
                                        <ul>
                                            {course.documents.map(document => (
                                                <li key={document.id}>
                                                    {document.filename}

                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            {course.assignments.map(assignment => (
                                                <li key={assignment.id}>{assignment.title}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <Button color="primary" onClick={() => handleShowCourseDetail(course)}>Detail</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Submissions</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Course</th>
                                <th>Submit date</th>
                                <th>Status</th>
                                <th>Rating</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map(submission => (
                                <tr key={submission.id}>
                                    <td>{submission.student_id}</td>
                                    <td>{submission.course_name}</td>
                                    <td>{submission.submission_date}</td>
                                    <td>{submission.status}</td>
                                    <td>{submission.grade}</td>
                                    <td style={{ width: "10%" }}><Button color="primary" onClick={() => handleShowSubmissionDetail(submission)}>Detail</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Coordinator */}
                    <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
                        <ModalHeader>Add Coordinator</ModalHeader>
                        <ModalBody>
                            <Input
                                type="text"
                                value={inputValue}
                                onChange={handleSearchInputChange}
                                placeholder="Search for coordinator by name"
                            />
                            <hr />
                            <ListGroup>
                                {coordinatorList
                                    .filter(user => user.username.toLowerCase().includes(searchInput.toLowerCase()))
                                    .map(user => (
                                        <ListGroupItem key={user.id} onClick={() => handleListGroupItemClick(user.code)}>
                                            <Link style={{ textDecoration: "unset" }}>
                                                {user.code} - {user.username}
                                            </Link>
                                        </ListGroupItem>
                                    ))}
                            </ListGroup>
                        </ModalBody>
                        <ModalFooter>

                            <Button color="primary" disabled={inputValue === ''} onClick={handleAddCoordinator}>Confirm</Button>{' '}
                            <Button color="secondary" onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={isDeleteModalOpen} toggle={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
                        <ModalHeader toggle={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>Confirm Delete</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this coordinator?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={confirmDeleteCoordinator}>Delete</Button>
                            <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    {/* Student  */}
                    <Modal isOpen={isStudentModalOpen} toggle={() => setIsStudentModalOpen(!isStudentModalOpen)}>
                        <ModalHeader>Add Student</ModalHeader>
                        <ModalBody>
                            <Input
                                type="text"
                                value={inputValue}
                                onChange={handleSearchInputChange}
                                placeholder="Search for students by name"
                            />
                            <hr />
                            <ListGroup>
                                {studentList
                                    .filter(user => user.username.toLowerCase().includes(searchInput.toLowerCase()))
                                    .map(user => (
                                        <ListGroupItem key={user.id} onClick={() => handleStudentListGroupItemClick(user.code)}>
                                            <Link style={{ textDecoration: "unset" }}>
                                                {user.code} - {user.username}
                                            </Link>
                                        </ListGroupItem>
                                    ))}
                            </ListGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleAddStudent} disabled={inputValue === ''}>
                                Confirm
                            </Button>
                            <Button color="secondary" onClick={() => setIsStudentModalOpen(!isStudentModalOpen)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={isDeleteStudentModalOpen} toggle={() => setIsDeleteStudentModalOpen(!isDeleteStudentModalOpen)}>
                        <ModalHeader toggle={() => setIsDeleteStudentModalOpen(!isDeleteStudentModalOpen)}>Confirm Delete</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this student
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={confirmDeleteStudent}>Delete</Button>
                            <Button color="secondary" onClick={() => setIsDeleteStudentModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    {/* Course */}
                    <Modal className='course-details' isOpen={isCourseDetailModalOpen} toggle={toggleCourseDetailModal}>
                        <ModalHeader className='header'>{selectedCourse && (<>{selectedCourse.name}</>)} Detail</ModalHeader>
                        <ModalBody >
                            {selectedCourse && (
                                <>
                                    <p><strong>ID:</strong> {selectedCourse.id}</p>
                                    <p><strong>Name:</strong> {selectedCourse.name}</p>
                                    <p><strong>Start Date:</strong> {selectedCourse.start_date}</p>
                                    <p><strong>End Date:</strong> {selectedCourse.end_date}</p>
                                    <h4>Documents</h4>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>Filename</th>
                                                <th>Document URL</th>
                                                <th>Upload Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedCourse.documents.map(document => (
                                                <tr key={document.id}>
                                                    <td>{document.filename} </td>
                                                    <td>{document.documentUrl}</td>
                                                    <td>{document.uploadDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <h4>Description</h4>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                {/* <th>Auth Code</th> */}
                                                <th>Detail</th>
                                                <th>Due Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedCourse.assignments.map(assignment => (
                                                <tr key={assignment.id}>
                                                    <td>{assignment.title}</td>
                                                    {/* <td>{assignment.auth_code}</td> */}
                                                    <td>{assignment.description}</td>
                                                    <td>{assignment.due_date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleCourseDetailModal}>Close</Button>
                        </ModalFooter>
                    </Modal>

                    {/* Submission */}
                    <Modal className='course-details' isOpen={isSubmissionDetailModalOpen} toggle={toggleSubmissionDetailModal}>
                        <ModalHeader>Submission Detail</ModalHeader>
                        <ModalBody>
                            {selectedSubmission && (
                                <div>
                                    <Table bordered striped>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Student ID</strong></td>
                                                <td>{selectedSubmission.student_id}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Class Name</strong></td>
                                                <td>{selectedSubmission.class_name}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Class Code</strong></td>
                                                <td>{selectedSubmission.class_code}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Course Name</strong></td>
                                                <td>{selectedSubmission.course_name}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Assignment ID</strong></td>
                                                <td>{selectedSubmission.assignment_id}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Submission Date</strong></td>
                                                <td>{selectedSubmission.submission_date}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Title</strong></td>
                                                <td>{selectedSubmission.title}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Description</strong></td>
                                                <td>{selectedSubmission.description}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}>
                                                    <strong>Rating</strong>
                                                </td>
                                                <td>
                                                    {editedSubmission && isSubmissionDetailModalOpen ? (
                                                        <Input value={editedGrade} onChange={(e) => setEditedGrade(e.target.value)} />
                                                    ) : (
                                                        selectedSubmission.grade
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}>
                                                    <strong>Status</strong>
                                                </td>
                                                <td>
                                                    {editedSubmission && isSubmissionDetailModalOpen ? (
                                                        <Input type='select' value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)} >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Approve">Approve</option>
                                                            <option value="Reject">Reject</option>
                                                        </Input>
                                                    ) : (
                                                        selectedSubmission.status
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}>
                                                    <strong>Comment</strong>
                                                </td>
                                                <td>
                                                    {editedSubmission && isSubmissionDetailModalOpen ? (
                                                        <Input value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                                                    ) : (
                                                        selectedSubmission.comment
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Files</strong></td>
                                                <td>
                                                    <ul>
                                                        {selectedSubmission.files.map((file, index) => (
                                                            <li key={index}>
                                                                {file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleSubmissionDetailModal}>Close</Button>
                            <Button color="primary" onClick={handleEdit}>Edit</Button>
                            {editedSubmission && (editedGrade !== selectedSubmission.grade || editedComment !== selectedSubmission.comment || editedStatus !== selectedSubmission.status) && (
                                <Button color="success" onClick={handleSave}>Save</Button>
                            )}
                        </ModalFooter>
                    </Modal>

                </div>
            )
            }
        </div >
    );
}

export default ClassDetail;
