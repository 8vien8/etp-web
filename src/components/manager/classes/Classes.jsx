import { useState, useEffect } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [classesDetails, setClassesDetails] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const classesEndpoint = 'http://localhost:3001/class';
    const classesDetailsEndpoint = 'http://localhost:3001/class';

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(classesEndpoint);
                const data = await response.json();
                setClasses(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const fetchClassDetails = async (classId) => {
        try {
            const response = await fetch(`${classesDetailsEndpoint}/${classId}`);
            const data = await response.json();
            setClassesDetails(data);
            toggleModal();
        } catch (error) {
            console.error('Error fetching class details:', error);
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <h2 className='header'>Classes</h2>
            <div className='dashboard-content'>
                {classes.map(classes => (
                    <Card key={classes.id} style={{ width: '18%' }}>
                        <CardBody className='articles-container'>
                            <CardTitle tag="h2">
                                {classes.className}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h3"
                            >
                                <p> Code: {classes.classID} </p>
                            </CardSubtitle>
                            <Button onClick={() => fetchClassDetails(classes.id)}>Detail</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Class Detail</ModalHeader>
                <ModalBody>
                    {classesDetails && (
                        <div>
                            <p><strong>Name:</strong> {classesDetails.className}</p>
                            <p><strong>Coordinator:</strong> {classesDetails.coordinatorName}</p>
                            <p><strong>Coordinator ID:</strong> {classesDetails.coordinatorID}</p>
                            <p><strong>Students</strong></p>
                            {classesDetails.studentList && (
                                <ul>
                                    {classesDetails.studentList.map(student => (
                                        <li key={student.id}>{student.studentName} - ID: {student.studentID}</li>
                                    ))}
                                </ul>
                            )}
                            <p><strong>Courses</strong></p>
                            {classesDetails.courseList && (
                                <ul>
                                    {classesDetails.courseList.map(course => (
                                        <li key={course.id}>{course.courseName} - ID: {course.courseID}</li>
                                    ))}
                                </ul>
                            )}
                            <p><strong>Documents</strong></p>
                            {classesDetails.documentList && (
                                <ul>
                                    {classesDetails.documentList.map(document => (
                                        <li key={document.id}> URL: <a>{document.documentUrl}</a> - Upload: {document.uploadDate}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Classes