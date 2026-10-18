import React, { useState } from "react";

const emptyStudent = {
  id: "",
  fullName: "",
  age: "",
  email: "",
  course: "",
  isEnrolled: true,
};

function validateStudent(student) {
  const errors = {};

  if (!student.id.trim()) {
    errors.id = "Enter a student ID.";
  }

  if (!student.fullName.trim()) {
    errors.fullName = "Enter the student's full name.";
  }

  const age = Number(student.age);
  if (!Number.isInteger(age) || age < 16 || age > 100) {
    errors.age = "Enter an age between 16 and 100.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!student.course.trim()) {
    errors.course = "Enter the student's course.";
  }

  return errors;
}

export default function StudentFormModal({ student, onClose, onSave }) {
  const isEditing = Boolean(student);

  const [formData, setFormData] = useState(() =>
    student ? { ...student, age: String(student.age) } : { ...emptyStudent }
  );
  //Returns a stateful value, and a function to update it.
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  //any event
  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateStudent(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSave({
      ...formData,
      id: formData.id.trim(),
      fullName: formData.fullName.trim(),
      age: Number(formData.age),
      email: formData.email.trim(),
      course: formData.course.trim(),
    });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="student-form-title">
          {isEditing ? "Edit student" : "Add student"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Student ID
            <input name="id" value={formData.id} onChange={handleChange} />
          </label>
          {errors.id && <p className="error">{errors.id}</p>}

          <label>
            Full name
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </label>
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <label>
            Age
            <input
              name="age"
              type="number"
              min="16"
              max="100"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          {errors.age && <p className="error">{errors.age}</p>}

          <label>
            Email address
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}

          <label>
            Course of study
            <input
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
          </label>
          {errors.course && <p className="error">{errors.course}</p>}

          <label>
            <input
              name="isEnrolled"
              type="checkbox"
              checked={formData.isEnrolled}
              onChange={handleChange}
            />
            Currently enrolled
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              {isEditing ? "Save changes" : "Add student"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
