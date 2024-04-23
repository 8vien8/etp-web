import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'reactstrap';

function ClassDetail() {
    const { classId } = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [coordinators, setCoordinators] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);
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
                    const filteredUsers = userData.filter(user => userIds.includes(user.id));

                    const coordinators = [];
                    const students = [];

                    filteredUsers.forEach(user => {
                        if (classData.coordinator_id.includes(user.id)) {
                            coordinators.push(user);
                        } else if (classData.student_ids.includes(user.id)) {
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
                    })
                    console.log(filteredSubmissionsData)

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!classInfo || !coordinators.length || !students.length || !courses.length || !submissions.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {error && <div>Error: {error}</div>}
            {!classInfo || !coordinators.length || !students.length || !courses.length || !submissions.length ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>{classInfo.name} Details</h2>
                    <h3 className="mb-2 text-muted" style={{ textAlign: "center" }}>Code: {classInfo.code}</h3>

                    <h3>Coordinators</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Coordinator ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coordinators.map(coordinator => (
                                <tr key={coordinator.id}>
                                    <td><img style={{ width: "40px", height: "40px" }} src={coordinator.picture} /></td>
                                    <td>{coordinator.code}</td>
                                    <td>{coordinator.username}</td>
                                    <td>{coordinator.email}</td>
                                    <td>Button</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Students</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Student ID</th>
                                <th>User name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td style={{ width: "10%" }}><img style={{ width: "40px", height: "40px" }} src={student.picture}></img></td>
                                    <td>{student.code}</td>
                                    <td>{student.username}</td>
                                    <td>{student.email}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Courses</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Documents</th>
                                <th>Assignments</th>
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
                                                <li key={document.id}>{document.filename}</li>
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
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h3>Submissions</h3>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Course name</th>
                                <th>Submit date</th>
                                <th>Grade</th>
                                <th>Comment</th>
                                <th>Assignments</th>
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
                                                <li key={document.id}>{document.filename}</li>
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
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default ClassDetail;
