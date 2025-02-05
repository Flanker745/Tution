import { useState, useEffect } from "react";
import React from "react";
import logo from "./assets/logo.jpeg";

export default function Tution() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    studentClass: "",
    joinDate: "",
    lastFeeSubmit: "",
    dueFee: "",
  });

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedStudents;
    if (formData.id) {
      updatedStudents = students.map((student) =>
        student.id === formData.id ? formData : student
      );
    } else {
      const newStudent = { ...formData, id: Date.now() };
      updatedStudents = [...students, newStudent];
    }
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setFormData({
      id: null,
      name: "",
      studentClass: "",
      joinDate: "",
      lastFeeSubmit: "",
      dueFee: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student record?")) {
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setFormData(studentToEdit);
    scrollToBottom();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex flex-col items-center">
      <div className="flex">
        <h1 className="text-4xl font-extrabold text-white mb-6">
          Tuition Teacher Dashboard
        </h1>
        <img className="w-[120px] rounded-lg h-[100px] ml-4" src={logo} alt="Logo" />
      </div>

      {/* Student List */}
      <div className="max-w-4xl bg-white p-6 rounded-xl shadow-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Student Records</h2>
        {students.length === 0 ? (
          <p className="text-gray-600 text-lg">No students added.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {students.map((student, index) => (
              <div key={student.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold">S.No. {index + 1}</p>
                <p><span className="font-bold">Name:</span> {student.name}</p>
                <p><span className="font-bold">Class:</span> {student.studentClass}</p>
                <p><span className="font-bold">Join Date:</span> {student.joinDate}</p>
                <p><span className="font-bold">Last Fee Submission:</span> {student.lastFeeSubmit}</p>
                <p><span className="font-bold">Due Fee:</span> ₹{student.dueFee}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-xl shadow-2xl w-full mt-6">
        <h3 className="mb-4 text-center text-xl font-semibold">{formData.id ? "Update Student" : "Add Student"}</h3>

        <label className="block text-gray-700 font-bold mb-1">Student Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3 text-lg"
          required
        />

        <label className="block text-gray-700 font-bold mb-1">Class</label>
        <input
          type="text"
          name="studentClass"
          placeholder="Enter class"
          value={formData.studentClass}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3 text-lg"
          required
        />

        <label className="block text-gray-700 font-bold mb-1">Admission Date</label>
        <input
          type="date"
          name="joinDate"
          value={formData.joinDate}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3 text-lg"
          required
        />

        <label className="block text-gray-700 font-bold mb-1">Last Fee Submission Date</label>
        <input
          type="date"
          name="lastFeeSubmit"
          value={formData.lastFeeSubmit}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3 text-lg"
          required
        />

        <label className="block text-gray-700 font-bold mb-1">Due Fee (₹)</label>
        <input
          type="number"
          name="dueFee"
          placeholder="Enter due fee"
          value={formData.dueFee}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-3 text-lg"
          required
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded w-full text-lg font-semibold hover:shadow-lg transition-all"
        >
          {formData.id ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}
