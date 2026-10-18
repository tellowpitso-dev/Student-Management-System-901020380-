import React from "react";

export default function DeleteConfirmModal({
  student,
  onCancel,
  onConfirm,
}) {
  if (!student) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onCancel}
      role="presentation"
    >
      <section
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-message"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="delete-title">Delete student?</h2>

        <p id="delete-message">
          Are you sure you want to delete?{" "}
          <strong>{student.fullName}</strong>? This cannot be undone.
        </p>

        <div className="modal-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>

          <button
            type="button"
            className="button-danger"
            onClick={() => onConfirm(student.id)}
          >
            Delete student
          </button>
        </div>
      </section>
    </div>
  );
}
