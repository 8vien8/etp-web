import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SubmissionDetail = ({ submission }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    function getFileIcon(fileType) {
        switch (fileType) {
            case 'text/plain':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return <img width="64" height="64" src="https://img.icons8.com/external-creatype-filed-outline-colourcreatype/64/000000/external-docx-text-file-extension-creatype-filed-outline-colourcreatype.png" alt="docx" />;
            case 'application/pdf':
                return <img width="48" height="48" src="https://img.icons8.com/color/48/pdf.png" alt="pdf" />;
            case 'image/jpeg':
            case 'image/png':
                return <img width="48" height="48" src="https://img.icons8.com/color/48/image-file.png" alt="image" />;
            default:
                return <img width="50" height="50" src="https://img.icons8.com/ios/50/file--v1.png" alt="file" />;
        }
    }


    return (
        <>
            <Button color="info" onClick={toggleModal}>Detail</Button>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Submission Detail</ModalHeader>
                <ModalBody>
                    <p><strong>Author ID:</strong> {submission.studentID}</p>
                    <p><strong>Author name:</strong> {submission.studentName}</p>
                    <p><strong>Submission Title:</strong> {submission.submissionTitle}</p>
                    <p><strong>Date:</strong> {submission.date}</p>
                    <p><strong>Comment:</strong> {submission.comment}</p>

                    {submission.files && submission.files.length > 0 ? (
                        <>
                            <h4>Files:</h4>
                            <ul>
                                {submission.files.map((file, index) => (
                                    <li key={index}>
                                        <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">{file.fileName}</a>
                                        {getFileIcon(file.fileType)}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No files uploaded</p>
                    )}

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

SubmissionDetail.propTypes = {
    submission: PropTypes.shape({
        studentID: PropTypes.string.isRequired,
        studentName: PropTypes.string.isRequired,
        submissionTitle: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        files: PropTypes.arrayOf(
            PropTypes.shape({
                fileName: PropTypes.string.isRequired,
            })
        ),
    })
};

export default SubmissionDetail;
