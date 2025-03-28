import React, { useState, useEffect } from "react";
import "../StudentForm.css";

const StudentForm = ({ addStudent, updateStudent, editingStudent }) => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setCourse(editingStudent.course);
      setImage(editingStudent.image || ""); // Load existing image if available
    }
  }, [editingStudent]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result); // Convert to base64
        };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !course) {
        showToast("Please fill in all fields.", "error");
        return;
    }

    try {
        if (editingStudent) {
            await updateStudent(editingStudent.id, name, course, image);
            showToast("Student updated successfully!", "success");
        } else {
            const result = await addStudent(name, course, image);
            showToast(result.message, result.success ? "success" : "error"); 
        }

        setName("");
        setCourse("");
        setImage("");
    } catch (error) {
        showToast("An unexpected error occurred.", "error");
    }
  };

  //! Show Toast Notification
  const showToast = (message, type) => {
    setToastMessage({ text: message, type });
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="student-form">
      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" className="image-preview" />}

        <input type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
        


        <button type="submit">{editingStudent ? "Update Student" : "Add Student"}</button>
      </form>

      {/* Toast Message */}
      {toastMessage && <div className={`toast-message ${toastMessage.type}`}>{toastMessage.text}</div>}
    </div>
  );
};

export default StudentForm;
