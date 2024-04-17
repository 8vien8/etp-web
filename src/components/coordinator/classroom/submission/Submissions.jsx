import { useState, useEffect } from 'react';
import { Input, Table } from 'reactstrap';
import GradeSubmission from '../gradeSubmission/GradeSubmission';
import EditGrade from '../editGrade/EditGrade';
import SubmissionDetail from './detail/SubmissionDetail';
import './submissionsStyle.css'

function Submissions() {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [searchStatus, setSearchStatus] = useState('');
    const [modal, setModal] = useState(false);

    const apiUrl = 'http://localhost:3001/submissions';

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterSubmissions();
    }, [searchStatus, submissions,]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSubmissions(data);
        } catch (error) {
            console.error(error);
        }
    };

    const filterSubmissions = () => {
        const filtered = submissions.filter(submission => {
            const matchStatus = searchStatus === '' || submission.graded === searchStatus;
            return matchStatus;
        });
        setFilteredSubmissions(filtered);
    };


    const handleSaveGrade = async (submissionId, grade, comment, updatedSubmission) => {
        try {
            const response = await fetch(`${apiUrl}/${submissionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSubmission),
            });
            if (!response.ok) {
                throw new Error('Failed to update grade');
            }
            // Update the local state with the updatedSubmission
            const updatedData = submissions.map(item =>
                item.id === submissionId ? updatedSubmission : item
            );
            setSubmissions(updatedData);
            toggleModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Submission List</h2>
            <div className="search-submissions">
                <Input
                    type="select"
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="Graded">Graded</option>
                    <option value="Ungraded">Ungraded</option>
                </Input>
            </div>
            <Table striped>
                <thead>
                    <tr>
                        <th>Submission Date</th>
                        <th>Title</th>
                        <th>Student ID</th>
                        {/* <th>Student name</th> */}
                        <th>Grade</th>
                        <th className='action-column'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubmissions.map(submission => (
                        <tr key={submission.id}>
                            <td>{submission.date}</td>
                            <td>{submission.submissionTitle}</td>
                            <td>{submission.studentID}</td>
                            {/* <td>{submission.studentName}</td> */}
                            <td>{submission.grade}</td>
                            <td className='action-column'>
                                <GradeSubmission
                                    submission={submission}
                                    onSaveGrade={handleSaveGrade}
                                />
                                <EditGrade
                                    submission={submission}
                                    onSaveGrade={handleSaveGrade}
                                />
                                <SubmissionDetail submission={submission} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Submissions;
