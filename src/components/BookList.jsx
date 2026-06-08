import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import BookForm from "./BookForm";

const BookList = () => {
  const { books, deleteBook } = useLibrary();

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Books Catalog</h2>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add Book
          </button>
        </div>
      </div>

      {showForm && (
        <BookForm
          book={editingBook}
          onClose={handleCloseForm}
        />
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>

                <td>
                  <span
                    className={`status-badge ${
                      book.available
                        ? "available"
                        : "borrowed"
                    }`}
                  >
                    {book.available
                      ? "Available"
                      : "Borrowed"}
                  </span>
                </td>

                <td className="actions">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBooks.length === 0 && (
          <p className="no-data">
            No books found
          </p>
        )}
      </div>
    </div>
  );
};

export default BookList;