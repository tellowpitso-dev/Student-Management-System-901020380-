import React from "react";

export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <p>No student records yet. Add a student to get started.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Full name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Course</th>
          <th>Enrollment status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.fullName}</td>
            <td>{student.age}</td>
            <td>{student.email}</td>
            <td>{student.course}</td>
            <td>{student.isEnrolled ? "Enrolled" : "Not enrolled"}</td>
            <td>
              <button type="button" onClick={() => onEdit(student)}>
                Edit
              </button>
              <button type="button" onClick={() => onDelete(student)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
