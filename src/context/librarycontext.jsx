import React, { createContext, useContext, useState } from "react";

const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      available: true,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      available: true,
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0446310789",
      available: false,
    },
  ]);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@email.com",
      membershipDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@email.com",
      membershipDate: "2024-03-22",
    },
  ]);

  const [borrowings, setBorrowings] = useState([
    {
      id: 1,
      bookId: 3,
      memberId: 1,
      borrowDate: "2026-05-10",
      dueDate: "2026-05-24",
      returnDate: null,
    },
  ]);

  // Add Book
  const addBook = (book) => {
    setBooks([
      ...books,
      {
        ...book,
        id: Date.now(),
        available: true,
      },
    ]);
  };

  // Update Book
  const updateBook = (id, updatedBook) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
  };

  // Delete Book
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Add Member
  const addMember = (member) => {
    setMembers([
      ...members,
      {
        ...member,
        id: Date.now(),
        membershipDate: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  // Update Member
  const updateMember = (id, updatedMember) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, ...updatedMember } : member
      )
    );
  };

  // Delete Member
  const deleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  // Borrow Book
  const borrowBook = (bookId, memberId) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    setBorrowings([
      ...borrowings,
      {
        id: Date.now(),
        bookId,
        memberId,
        borrowDate: new Date().toISOString().split("T")[0],
        dueDate: dueDate.toISOString().split("T")[0],
        returnDate: null,
      },
    ]);

    setBooks(
      books.map((book) =>
        book.id === bookId
          ? { ...book, available: false }
          : book
      )
    );
  };

  // Return Book
  const returnBook = (borrowingId) => {
    const borrowing = borrowings.find(
      (item) => item.id === borrowingId
    );

    if (borrowing) {
      setBorrowings(
        borrowings.map((item) =>
          item.id === borrowingId
            ? {
                ...item,
                returnDate: new Date()
                  .toISOString()
                  .split("T")[0],
              }
            : item
        )
      );

      setBooks(
        books.map((book) =>
          book.id === borrowing.bookId
            ? { ...book, available: true }
            : book
        )
      );
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        members,
        borrowings,
        addBook,
        updateBook,
        deleteBook,
        addMember,
        updateMember,
        deleteMember,
        borrowBook,
        returnBook,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryProvider;