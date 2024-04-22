import { useState, useEffect } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:3001/class');
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2 className='header'>Classes</h2>
            <div className='dashboard-content'>
                {classes.map(cls => (
                    <Card key={cls.id} style={{ width: '18%' }}>
                        <CardBody className='articles-container'>
                            <CardTitle tag="h2">
                                {cls.className}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h3"
                            >
                                <p> Code: {cls.classID} </p>
                            </CardSubtitle>
                            <Link to={`${cls.id}`} className="btn btn-primary">Detail</Link>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Classes;
