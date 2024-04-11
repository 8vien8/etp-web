import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const EditGrade = ({ submission, onSaveGrade }) => {
    const [modal, setModal] = useState(false);
    const [gradeInput, setGradeInput] = useState(submission.grade);
    const [commentInput, setCommentInput] = useState(submission.comment);

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleGradeInputChange = (event) => {
        setGradeInput(event.target.value);
    };

    const handleCommentInputChange = (event) => {
        setCommentInput(event.target.value);
    };

    const handleSaveGrade = () => {
        try {
            if (gradeInput && commentInput) {
                const updatedSubmission = {
                    ...submission,
                    grade: gradeInput,
                    comment: commentInput,
                    graded: 'Graded'
                };
                onSaveGrade(submission.id, gradeInput, commentInput, updatedSubmission);
                toggleModal();
            } else {
                alert('Please fill in all fields');
            }
        } catch (error) {
            alert('Failed to save submission');
        }
    }

    return (
        <>
            <Button color="primary" onClick={toggleModal} disabled={submission.graded !== 'Graded'}>
                Edit Grade
            </Button>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Grade</ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        value={gradeInput}
                        onChange={handleGradeInputChange}
                    />
                    <Input
                        required
                        type="textarea"
                        value={commentInput}
                        onChange={handleCommentInputChange}
                        placeholder="Enter comment..."
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSaveGrade}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

EditGrade.propTypes = {
    submission: PropTypes.object.isRequired,
    onSaveGrade: PropTypes.func.isRequired
};

export default EditGrade;
