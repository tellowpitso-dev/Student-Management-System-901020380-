import React, { useState } from "react";
import StudentTable from "./components/StudentTable.jsx";
import StudentFormModal from "./components/StudentFormModal.jsx";
import DeleteConfirmModal from "./components/DeleteConfirmModal.jsx";
import { initialStudents } from "./data/initialStudents.js";

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  function openAddForm() {
    setStudentToEdit(null);
    setIsFormOpen(true);
  }

  function openEditForm(student) {
    setStudentToEdit(student);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setStudentToEdit(null);
  }

  function saveStudent(studentToSave) {
    const duplicateId = students.some(
      (student) =>
        student.id.toLowerCase() === studentToSave.id.toLowerCase() &&
        student.id !== studentToEdit?.id
    );

    if (duplicateId) {
      window.alert("That student ID is already being used.");
      return;
    }

    if (studentToEdit) {
      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          student.id === studentToEdit.id ? studentToSave : student
        )
      );
    } else {
      setStudents((currentStudents) => [...currentStudents, studentToSave]);
    }

    closeForm();
  }

  function deleteStudent(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId)
    );
    setStudentToDelete(null);
  }

  const enrolledCount = students.filter(
    (student) => student.isEnrolled
  ).length;

  return (
    <main>
      <h1>Student dashboard</h1>
      <p>Total students: {students.length}</p>
      <p>Currently enrolled: {enrolledCount}</p>

      <button type="button" onClick={openAddForm}>
        Add student
      </button>

      <StudentTable
        students={students}
        onEdit={openEditForm}
        onDelete={setStudentToDelete}
      />

      {isFormOpen && (
        <StudentFormModal
          student={studentToEdit}
          onClose={closeForm}
          onSave={saveStudent}
        />
      )}

      {studentToDelete && (
        <DeleteConfirmModal
          student={studentToDelete}
          onCancel={() => setStudentToDelete(null)}
          onConfirm={deleteStudent}
        />
      )}
    </main>
  );
}
