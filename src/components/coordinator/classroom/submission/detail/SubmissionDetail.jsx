import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const SubmissionDetail = ({ submission }) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div>
            <h3>Submission Detail</h3>
            <p><strong>Student ID:</strong> {submission.studentID}</p>
            <p><strong>Submission Title:</strong> {submission.submissionTitle}</p>
            <p><strong>Date:</strong> {submission.date}</p>
            <h4>Files:</h4>
            <ul>
                {submission.files.map((file, index) => (
                    <li key={index}>{file.fileName}</li>
                ))}
            </ul>
            <Button color="info" onClick={toggleModal}>Edit</Button>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Submission</ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        defaultValue={submission.studentID}
                        placeholder="Student ID"
                        disabled
                    />
                    <Input
                        type="text"
                        defaultValue={submission.submissionTitle}
                        placeholder="Submission Title"
                        disabled
                    />
                    <Input
                        type="text"
                        defaultValue={submission.date}
                        placeholder="Date"
                        disabled
                    />
                    <h4>Files:</h4>
                    <ul>
                        {submission.files.map((file, index) => (
                            <li key={index}>{file.fileName}</li>
                        ))}
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

SubmissionDetail.propTypes = {
    submission: PropTypes.shape({
        studentID: PropTypes.string.isRequired,
        submissionTitle: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        files: PropTypes.arrayOf(
            PropTypes.shape({
                fileName: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default SubmissionDetail;
