import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const GradeSubmission = ({ submission, onSaveGrade }) => {
    const [grade, setGrade] = useState(submission.grade);
    const [comment, setComment] = useState(submission.comment);
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleSave = async () => {
        try {
            if (grade && comment) {
                const updatedSubmission = { ...submission, grade: grade, comment: comment, graded: 'Graded' };
                await onSaveGrade(submission.id, grade, comment, updatedSubmission);
                toggleModal();
            } else {
                alert('Please fill in both grade and comment before saving.');
            }
        } catch (error) {
            console.error('Failed to save grade:', error);
        }
    };

    return (
        <>
            <Button color="primary" onClick={toggleModal} disabled={submission.graded === 'Graded'}>
                Grade
            </Button>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Grade Submission</ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        value={grade}
                        onChange={e => setGrade(e.target.value)}
                        placeholder="Enter grade..."
                        disabled={submission.graded === 'Graded'}
                    />
                    <Input
                        type="textarea"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Enter comment..."
                        disabled={submission.graded === 'Graded'}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave} disabled={submission.graded === 'Graded'}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

GradeSubmission.propTypes = {
    submission: PropTypes.shape({
        id: PropTypes.string.isRequired,
        grade: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        graded: PropTypes.string.isRequired,
    }).isRequired,
    onSaveGrade: PropTypes.func.isRequired,
};

export default GradeSubmission;
