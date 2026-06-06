import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

const BorrowForm = ({ onClose }) => {
  const { books, members, borrowBook } = useLibrary();

  const [formData, setFormData] = useState({
    bookId: "",
    memberId: "",
  });

  const availableBooks = books.filter(
    (book) => book.available
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    borrowBook(
      parseInt(formData.bookId),
      parseInt(formData.memberId)
    );

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>New Borrowing</h3>

          <button
            className="close-btn"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Book</label>

            <select
              value={formData.bookId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bookId: e.target.value,
                })
              }
              required
            >
              <option value="">
                -- Select a book --
              </option>

              {availableBooks.map((book) => (
                <option
                  key={book.id}
                  value={book.id}
                >
                  {book.title}
                </option>
              ))}
            </select>

            {availableBooks.length === 0 && (
              <small className="text-muted">
                No books available
              </small>
            )}
          </div>

          <div className="form-group">
            <label>Select Member</label>

            <select
              value={formData.memberId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  memberId: e.target.value,
                })
              }
              required
            >
              <option value="">
                -- Select a member --
              </option>

              {members.map((member) => (
                <option
                  key={member.id}
                  value={member.id}
                >
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                availableBooks.length === 0
              }
            >
              Confirm Borrowing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowForm;