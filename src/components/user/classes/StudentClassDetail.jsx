import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Label, Input } from 'reactstrap';
import Terms from '../../terms/Terms';

function StudentClassDetail() {
    const { classId } = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [courses, setCourses] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => setIsChecked(!isChecked);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isCourseDetailModalOpen, setIsCourseDetailModalOpen] = useState(false);

    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [isSubmissionDetailModalOpen, setIsSubmissionDetailModalOpen] = useState(false);

    const [newSubmission, setNewSubmission] = useState({
        student_id: "",
        class_name: "",
        class_code: "",
        course_name: "",
        submission_date: "",
        title: "",
        status: "",
        description: "",
        files: [],
        grade: "",
        comment: ""
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));

    const classApiUrl = 'http://localhost:3001/classes';
    const userApiUrl = 'http://localhost:3001/users';
    const courseApiUrl = 'http://localhost:3001/courses';
    const submissionApiUrl = 'http://localhost:3001/submissions';

    useEffect(() => {
        const isFormValid =
            newSubmission.course_name !== "" &&
            newSubmission.title !== "" &&
            newSubmission.description !== "" &&
            newSubmission.files.length > 0 &&
            isChecked
        setIsFormValid(isFormValid);
    }, [newSubmission, isChecked]);

    useEffect(() => {
        setCurrentDate(new Date().toISOString().slice(0, 10));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCode = localStorage.getItem('userCode');
                // Fetch class info
                const classResponse = await fetch(classApiUrl + `/${classId}`);
                if (!classResponse.ok) {
                    throw new Error('Failed to fetch class data');
                }
                const classData = await classResponse.json();
                setClassInfo(classData);

                const userIds = [...classData.student_ids];

                // User information
                const usersResponse = await fetch(userApiUrl);
                if (!usersResponse.ok) {
                    throw new Error('Failed to fetch users data');
                }
                const userData = await usersResponse.json();

                if (userData.length > 0) {
                    const filteredUsers = userData.filter(user => userIds.includes(user.code));

                    const students = [];

                    filteredUsers.forEach(user => {
                        (classData.student_ids.includes(user.code))
                        students.push(user);

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
                    });

                    // Submissions data
                    const submissionsResponse = await fetch(submissionApiUrl);
                    if (!submissionsResponse.ok) {
                        throw new Error('Failed to fetch submissions data');
                    }
                    const submissionsData = await submissionsResponse.json();
                    const filteredSubmissionsData = submissionsData.filter(submission => {
                        return submission.class_name === classData.name
                            && submission.class_code === classData.code
                            && filteredCourseData.some(course => course.name === submission.course_name)
                            && students.some(student => submission.student_id === student.code)
                            && students.some(student => userCode === student.code);
                    });

                    setSubmissions(filteredSubmissionsData);
                    setCourses(filteredCourseData);
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

    // Create a new submission
    const handleRemoveFile = (fileName) => {
        const updatedFiles = selectedFiles.filter(file => file.name !== fileName);
        setSelectedFiles(updatedFiles);
        const updatedSubmissionFiles = newSubmission.files.filter(file => file.name !== fileName);
        setNewSubmission({ ...newSubmission, files: updatedSubmissionFiles });
    };

    const toggleSubmissionModal = () => {
        setIsSubmissionModalOpen(!isSubmissionModalOpen);
    };

    const handleSubmissionInputChange = (e) => {
        const { name, value } = e.target;
        setNewSubmission({ ...newSubmission, [name]: value });
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const selectedFilesArray = [...selectedFiles];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileData = {
                    name: files[i].name,
                    content: event.target.result
                };
                selectedFilesArray.push(fileData);
                setNewSubmission({ ...newSubmission, files: selectedFilesArray });
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const handleSubmitSubmission = async () => {
        try {
            if (!newSubmission || !classInfo) {
                throw new Error('New submission or class info is not available');
            }

            const userCode = localStorage.getItem('userCode');

            let newId = 1;
            if (submissions.length > 0) {
                const lastSubmission = submissions[submissions.length - 1];
                newId = parseInt(lastSubmission.id) + 1;
            }

            const submissionData = {
                id: newId.toString(),
                student_id: userCode,
                class_name: classInfo.name,
                class_code: classInfo.code,
                course_name: newSubmission.course_name,
                status: "pending",
                submission_date: currentDate,
                title: newSubmission.title,
                description: newSubmission.description,
                files: newSubmission.files.map(file => ({
                    name: file.name,
                    content: file.content.split(',')[1]
                })),
                grade: newSubmission.grade,
                comment: newSubmission.comment
            };

            const response = await fetch(submissionApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                throw new Error('Failed to create new submission');
            }
            window.location.reload();
            setIsSubmissionModalOpen(false);
        } catch (error) {
            console.error('Error creating submission:', error);
        }
    };

    // Courses
    const handleShowCourseDetail = (course) => {
        setSelectedCourse(course);
        setIsCourseDetailModalOpen(true);
    };

    const toggleCourseDetailModal = () => {
        setIsCourseDetailModalOpen(!isCourseDetailModalOpen);
    };

    // View submission
    const handleShowSubmissionDetail = (submission) => {
        setSelectedSubmission(submission);
        setIsSubmissionDetailModalOpen(true);
    };
    const toggleSubmissionDetailModal = () => {
        setEditedSubmission(null);
        setEditDescription(null);
        setEditedFile(null);
        setIsSubmissionDetailModalOpen(!isSubmissionDetailModalOpen);
    };

    // Edit submission details
    const [editedSubmission, setEditedSubmission] = useState(null);
    const [editedDescription, setEditDescription] = useState('');
    const [editedFile, setEditedFile] = useState([]);

    const isPastEndDate = (courseName) => {
        const course = courses.find(course => course.name === courseName);
        if (course) {
            const endDate = new Date(course.end_date);
            const currentDate = new Date();
            return currentDate > endDate;
        }
        return false;
    };

    const handleEdit = () => {
        setEditedSubmission(selectedSubmission);
        setEditDescription(selectedSubmission.description);
        setEditedFile(selectedSubmission.files);
    };

    const handleSave = () => {
        if (!editedSubmission) return;
        const updatedSubmission = {
            description: editedDescription,
            files: editedFile
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {error && <div>Error: {error}</div>}
            {!classInfo && !courses.length ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>{classInfo.name} Details</h2>
                    <h3 className="mb-2 text-muted" style={{ textAlign: "center" }}>Code: {classInfo.code}</h3>

                    <h3>Articles</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                    <td>{course.id}</td>
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
                                <th>Rating</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map(submission => (
                                <tr key={submission.id}>
                                    <td>{submission.student_id}</td>
                                    <td>{submission.course_name}</td>
                                    <td>{submission.submission_date}</td>
                                    <td>{submission.grade}</td>
                                    <td>{submission.status}</td>
                                    <td style={{ width: "10%" }}><Button color="primary" onClick={() => handleShowSubmissionDetail(submission)}>Detail</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Articles */}
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
                                                    <td>{document.filename}</td>
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
                                                <td>
                                                    {selectedSubmission.description}
                                                    {editedSubmission && isSubmissionDetailModalOpen ? (
                                                        <Input value={editedDescription} onChange={(e) => setEditDescription(e.target.value)} />
                                                    ) : (
                                                        selectedSubmission.description
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}>
                                                    <strong>Grade</strong>
                                                </td>
                                                <td>{selectedSubmission.grade}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}>
                                                    <strong>Comment</strong>
                                                </td>
                                                <td>{selectedSubmission.comment}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: "30%" }}><strong>Files</strong></td>
                                                <td>
                                                    {editedSubmission && isSubmissionDetailModalOpen ? (
                                                        <Input type="file" onChange={handleFileInputChange} multiple />
                                                    ) : (
                                                        <ul>
                                                            {selectedSubmission.files.map((file, index) => (
                                                                <li key={index}>
                                                                    <a href='' target="_blank" rel="noopener noreferrer">{file.name}</a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleSubmissionDetailModal}>Close</Button>
                            {selectedSubmission && (
                                <Button style={{ display: isPastEndDate(selectedSubmission.course_name) ? 'none' : 'inline-block' }} color="primary" onClick={handleEdit}>Edit</Button>
                            )}
                            {editedSubmission && (editedSubmission !== selectedSubmission.grade || editedFile !== selectedSubmission.comment) && (
                                <Button color="success" onClick={handleSave}>Save</Button>
                            )}
                        </ModalFooter>
                    </Modal>

                    {/* Create */}
                    <Button color="primary" onClick={toggleSubmissionModal}>Create New Submission</Button>

                    {/* Create Submission modal */}
                    <Modal isOpen={isSubmissionModalOpen} toggle={toggleSubmissionModal}>
                        <ModalHeader>Create New Submission</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="course_name">Course Name</Label>
                                <Input type="select" name="course_name" id="course_name" onChange={handleSubmissionInputChange}>
                                    <option>Select Course</option>
                                    {courses.map(course => (
                                        <option key={course.id}>{course.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" onChange={handleSubmissionInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" id="description" onChange={handleSubmissionInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="files">Files</Label>
                                <Input type="file" name="files" id="files" multiple onChange={handleFileInputChange} />
                            </FormGroup>
                            <FormGroup style={{ display: "flex" }} check>
                                <Label check>
                                    <Input type="checkbox" onChange={handleCheckboxChange} checked={isChecked} />
                                </Label>
                                <div style={{ display: "flex", gap: "5px" }}>I agree with <Terms /> and conditions </div>
                            </FormGroup>
                            <ul>
                                {selectedFiles.map((index, file) => (
                                    <li key={index}>
                                        {file.name}
                                        <Button color="link" onClick={() => handleRemoveFile(file.name)}>Remove</Button>
                                    </li>
                                ))}
                            </ul>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleSubmitSubmission} disabled={!isFormValid}>Submit</Button>
                            <Button color="secondary" onClick={toggleSubmissionModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default StudentClassDetail;
