import { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import './classMembersStyle.css';
import ClassMembersDetail from './detail/ClassMemberDetail';

function ClassMembers() {
    const apiUrl = 'http://localhost:3001/students';

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [modal, setModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        filterStudents();
    }, [searchInput, students]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${apiUrl}/${deleteId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            setStudents(prevStudents => prevStudents.filter(student => student.id !== deleteId));
            setModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setModal(true);
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filterStudents = useCallback(() => {
        const filtered = students.filter(student => {
            return student.id.toString().includes(searchInput) || student.name.toLowerCase().includes(searchInput.toLowerCase());
        });
        setFilteredStudents(filtered);
    }, [searchInput, students]);

    return (
        <div className="class-members">
            <h3>Class Members here</h3>
            <div className='search'>
                <Input
                    className="custom-input"
                    type="text"
                    placeholder="Search by ID or Name"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <box-icon name='search'></box-icon>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <Table bordered responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Academic Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.academicYear}</td>
                                <td>
                                    <ClassMembersDetail student={student} />
                                    <Button color="danger" onClick={() => confirmDelete(student.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this student?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ClassMembers;
