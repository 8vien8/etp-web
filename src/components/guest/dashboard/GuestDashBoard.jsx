import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function ApprovedSubmissions() {
    const [approvedSubmissions, setApprovedSubmissions] = useState([]);

    useEffect(() => {
        const fetchApprovedSubmissions = async () => {
            try {
                const response = await fetch('http://localhost:3001/submissions');
                if (!response.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                const submissions = await response.json();
                const approved = submissions.filter(submission => submission.status === 'Approve');
                setApprovedSubmissions(approved);
            } catch (error) {
                console.error('Error fetching approved submissions:', error);
            }
        };

        fetchApprovedSubmissions();
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}> Submissions</h2>
            <ul>
                {approvedSubmissions.map(submission => (
                    <Card style={{ width: "25%" }} key={submission.id} className="mb-3">
                        <CardBody>
                            <CardTitle style={{ textAlign: "center" }} tag="h5"><strong>Article: {submission.course_name}</strong></CardTitle>
                            <CardText tag="h5"><strong>{submission.title}</strong></CardText>
                            <CardText>Rating: {submission.grade}</CardText>
                            <CardText>Feed Back: {submission.comment}</CardText>
                            <CardText>Description: {submission.description}</CardText>
                            <CardText>Contribution:: {submission.description}</CardText>
                            <ul>
                                {submission.files.map((file, index) => (
                                    <li key={index}><a href={`${file}`} target="_blank" rel="noopener noreferrer">
                                        {file}
                                    </a></li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                ))}
            </ul>
        </div>
    );
}

export default ApprovedSubmissions;
