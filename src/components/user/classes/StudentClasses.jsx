import { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function StudentClasses() {
    const [classes, setClasses] = useState([]);
    const userCode = localStorage.getItem('userCode');
    const apiUrl = 'http://localhost:3001/classes'

    const fetchClasses = async () => {
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                const userCode = localStorage.getItem('userCode');

                const filteredClasses = data.filter(classItem => classItem.student_ids.includes(userCode));
                setClasses(filteredClasses);
            } else {
                console.error('Error fetching class data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching class data:', error);
        }
    };

    console.log('userCode:', userCode);

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div>
            <h2 className='header'>Faculty list</h2>
            <div className='dashboard-content'>
                {classes.map(classItem => (
                    <Card style={{ width: "20%" }} key={classItem.id}>
                        <CardBody>
                            <CardTitle tag="h2">{classItem.name}</CardTitle>
                            <CardSubtitle tag="h3" className="mb-2 text-muted">Code: {classItem.code}</CardSubtitle>
                            <Button tag={Link} to={`${classItem.id}`} className="btn btn-primary">Detail</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default StudentClasses;
