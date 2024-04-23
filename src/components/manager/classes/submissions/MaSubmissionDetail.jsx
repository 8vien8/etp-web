import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'reactstrap';

const MaSubmissionDetail = () => {
    const { classId, courseId } = useParams();
    const apiUrl = `http://localhost:3001/class/${classId}`;
    const [classDetails, setClassDetails] = useState(null);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course submissions');
                }
                const data = await response.json();
                setClassDetails(data)
            } catch (error) {
                console.error('Error fetching course submissions:', error);
            }
        };

        fetchClassDetails();
    }, [courseId, classId]);

    return (
        <div>
            {classDetails && (
                <div>
                    <h2>Submissions for Course: {courseId}</h2>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Submission Title</th>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Grade</th>
                                <th>Comment</th>
                                <th>Graded</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classDetails.courses.map(course => (
                                course.id === courseId && course.submissions.map(submission => (
                                    <tr key={submission.id}>
                                        <td>{submission.submissionTitle}</td>
                                        <td>{submission.studentID}</td>
                                        <td>{submission.studentName}</td>
                                        <td>{submission.grade}</td>
                                        <td>{submission.comment}</td>
                                        <td>{submission.graded}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MaSubmissionDetail;
