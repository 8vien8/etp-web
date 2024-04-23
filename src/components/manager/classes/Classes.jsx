import { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

function Classes() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/classes');
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 className='header'>Classes List</h2>
            <div className='dashboard-content'>
                {classes.map(classItem => (
                    <Card style={{ width: "20%" }} key={classItem.id}>
                        <CardBody>
                            <CardTitle tag="h2">{classItem.name}</CardTitle>
                            <CardSubtitle tag="h3" className="mb-2 text-muted">Code: {classItem.code}</CardSubtitle>
                            <Link to={`${classItem.id}`} className="btn btn-primary">Detail</Link>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Classes;
