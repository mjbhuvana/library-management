import React, { useState, useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';

const BookForm = ({ book, onClose }) => {
  const { addBook, updateBook } = useLibrary();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
      });
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (book) {
      updateBook(book.id, formData);
    } else {
      addBook(formData);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{book ? 'Edit Book' : 'Add New Book'}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>ISBN</label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) =>
                setFormData({ ...formData, isbn: e.target.value })
              }
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              {book ? 'Update' : 'Add'} Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;