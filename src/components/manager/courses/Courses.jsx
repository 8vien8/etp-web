import { useState, useEffect } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CourseStyle.css'
function Courses() {
    const [courses, setCourses] = useState([]);
    const [courseDetails, setCourseDetails] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const coursesEndpoint = 'http://localhost:3001/courses';
    const courseDetailsEndpoint = 'http://localhost:3001/courses';

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(coursesEndpoint);
                const data = await response.json();
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const fetchCourseDetails = async (courseId) => {
        try {
            const response = await fetch(`${courseDetailsEndpoint}/${courseId}`);
            const data = await response.json();
            setCourseDetails(data);
            toggleModal();
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2 className='header'>Courses</h2>
            <div className='dashboard-content'>
                {courses.map(course => (
                    <Card key={course.id} style={{ width: '18%' }}>
                        <CardBody className='articles-container'>
                            <CardTitle tag="h2">
                                {course.name}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h3"
                            >
                                <p> Code: {course.courseID} </p>
                            </CardSubtitle>
                            <Button onClick={() => fetchCourseDetails(course.id)}>Detail</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Course Detail</ModalHeader>
                <ModalBody>
                    {courseDetails && (
                        <div>
                            <p><strong>Code:</strong> {courseDetails.courseID}</p>
                            <p><strong>Name:</strong> {courseDetails.name}</p>
                            <p><strong>Create Date:</strong> {courseDetails.createDate}</p>
                            <p><strong>Start date:</strong> {courseDetails.startDate}</p>
                            <p><strong>End date:</strong> {courseDetails.endDate}</p>
                            <p className='course-class-applying'><strong>Applying with Classes</strong></p>
                            {courseDetails && courseDetails.classApply && (
                                <div>
                                    <strong>Class Name:</strong>{' '}
                                    {courseDetails.classApply.map((classItem, index) => (
                                        <span key={classItem.id}>
                                            {classItem.className}
                                            {index !== courseDetails.classApply.length - 1 && ', '}
                                        </span>
                                    ))}
                                    <br />
                                    <strong>Class Code:</strong>{' '}
                                    {courseDetails.classApply.map((classItem, index) => (
                                        <span key={classItem.id}>
                                            {classItem.classCode}
                                            {index !== courseDetails.classApply.length - 1 && ', '}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Courses

