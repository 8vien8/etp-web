import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MaClassDetail() {
    const [classDetails, setClassDetails] = useState(null);
    const { id } = useParams();

    const apiUrl = 'http://localhost:3001/class'

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/${id}`);
                const data = await response.json();
                setClassDetails(data);
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };

        fetchClassDetails();
    }, [id]);

    if (!classDetails) return <p>Loading...</p>;

    return (
        <div>
            <h2>Class Detail</h2>
            <p><strong>Name:</strong> {classDetails.className}</p>
            <p><strong>Coordinator:</strong> {classDetails.coordinatorName}</p>
            <p><strong>Coordinator ID:</strong> {classDetails.coordinatorID}</p>
            <p><strong>Students</strong></p>
            <ul>
                {classDetails.studentList && classDetails.studentList.map(student => (
                    <li key={student.id}>{student.studentName} - ID: {student.studentID}</li>
                ))}
            </ul>
            <p><strong>Courses</strong></p>
            <ul>
                {classDetails.courseList && classDetails.courseList.map(course => (
                    <li key={course.id}>{course.courseName} - ID: {course.courseID}</li>
                ))}
            </ul>
            <p><strong>Documents</strong></p>
            <ul>
                {classDetails.documentList && classDetails.documentList.map(document => (
                    <li key={document.id}> URL: <a href={document.documentUrl}>{document.documentUrl}</a> - Upload: {document.uploadDate}</li>
                ))}
            </ul>
        </div>
    );
}

export default MaClassDetail;
