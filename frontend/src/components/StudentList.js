import React, { useState, useEffect } from "react";
import "../StudentList.css";

const StudentList = ({ students, deleteStudent, editStudent }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState("");

    const handleDelete = async () => {
        if (selectedStudent) {
            await deleteStudent(selectedStudent.id);
            setMessage(`${selectedStudent.name} has been deleted.`);
            setShowModal(false);
            setSelectedStudent(null);
        }
    };

    // Auto-hide message after 3 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="student-list">
            <h2>Student List</h2>

            {/* Toast Message */}
            {message && <div className="toast-message">{message}</div>}

            {students.length === 0 ? (
                <p className="no-students">No students added yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {student.image ? (
                                        <img
                                            src={student.image}
                                            alt="Student"
                                            className="student-image"
                                        />
                                    ) : (
                                        <span className="no-image">No Image</span>
                                    )}
                                </td>
                                <td>{student.name}</td>
                                <td>{student.course}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => editStudent(student)}>
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => {
                                            setSelectedStudent(student);
                                            setShowModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete <strong>{selectedStudent?.name}</strong>?</p>
                        <div className="modal-actions">
                            <button className="confirm-btn" onClick={handleDelete}>Yes</button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;
