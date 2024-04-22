import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ClassDetail() {
    const { classId } = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [coordinators, setCoordinators] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch class info
                const classResponse = await fetch(`http://localhost:3001/classes/${classId}`);
                if (!classResponse.ok) {
                    throw new Error('Failed to fetch class data');
                }
                const classData = await classResponse.json();
                setClassInfo(classData);

                // Fetch users info based on coordinator_id and student_ids
                const userIds = [classData.coordinator_id, ...classData.student_ids];
                const usersResponse = await fetch('http://localhost:3001/users');
                console.log(userIds);
                if (!usersResponse.ok) {
                    throw new Error('Failed to fetch users data');
                }
                const userData = await usersResponse.json();

                // Check if userData exists and has users property before filtering
                if (userData && userData.users) {
                    const filteredUsers = userData.users.filter(user => userIds.includes(user.id));

                    // Filter users by role
                    const coordinatorUsers = filteredUsers.filter(user => user.role === "coordinator");
                    const studentUsers = filteredUsers.filter(user => user.role === "student");

                    setCoordinators(coordinatorUsers);
                    setStudents(studentUsers);
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

    if (!classInfo || !coordinators.length || !students.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{classInfo.name} Details</h2>
            <p>Code: {classInfo.code}</p>
            <h3>Coordinators:</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {coordinators.map(coordinator => (
                        <tr key={coordinator.id}>
                            <td>{coordinator.id}</td>
                            <td>{coordinator.username}</td>
                            <td>{coordinator.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Students:</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.username}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/classes">Back to Classes</Link>
        </div>
    );
}

export default ClassDetail;
