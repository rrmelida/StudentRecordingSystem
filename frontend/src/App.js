import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null); // To store student being edited

  // Fetch students on page load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (name, course, image) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/api/students", {
            name,
            course,
            image,
        });

        fetchStudents();
        return { success: true, message: response.data.message || "Student added successfully!" };
    } 
    catch (error) {
        console.error("Add Student Error:", error); // Debugging
        return { 
            success: false, 
            message: error?.response?.data?.message || "An error occurred while adding the student." 
        };
    }
};

  const updateStudent = async (id, name, course, image) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/students/${id}`, {
        name,
        course,
        image, // Include updated image if available
      });
  
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Student Recording System</h1>
      <StudentForm addStudent={addStudent} updateStudent={updateStudent} editingStudent={editingStudent} />
      <StudentList students={students} deleteStudent={deleteStudent} editStudent={setEditingStudent} />
    </div>
  );
};

export default App;
