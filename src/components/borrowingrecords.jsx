import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import BorrowForm from "./BorrowForm";

const BorrowingRecords = () => {
  const {
    borrowings,
    books,
    members,
    returnBook,
  } = useLibrary();

  const [showForm, setShowForm] =
    useState(false);

  const getBookTitle = (bookId) =>
    books.find((b) => b.id === bookId)
      ?.title || "Unknown";

  const getMemberName = (memberId) =>
    members.find((m) => m.id === memberId)
      ?.name || "Unknown";

  const isOverdue = (
    dueDate,
    returnDate
  ) => {
    if (returnDate) return false;

    return (
      new Date(dueDate) < new Date()
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Borrowing Records</h2>

        <button
          className="btn btn-primary"
          onClick={() =>
            setShowForm(true)
          }
        >
          + New Borrowing
        </button>
      </div>

      {showForm && (
        <BorrowForm
          onClose={() =>
            setShowForm(false)
          }
        />
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Member</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {borrowings.map((record) => (
              <tr
                key={record.id}
                className={
                  isOverdue(
                    record.dueDate,
                    record.returnDate
                  )
                    ? "overdue-row"
                    : ""
                }
              >
                <td>
                  {getBookTitle(
                    record.bookId
                  )}
                </td>

                <td>
                  {getMemberName(
                    record.memberId
                  )}
                </td>

                <td>
                  {record.borrowDate}
                </td>

                <td>
                  {record.dueDate}
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      record.returnDate
                        ? "returned"
                        : isOverdue(
                            record.dueDate,
                            record.returnDate
                          )
                        ? "overdue"
                        : "active"
                    }`}
                  >
                    {record.returnDate
                      ? `Returned ${record.returnDate}`
                      : isOverdue(
                          record.dueDate,
                          record.returnDate
                        )
                      ? "Overdue"
                      : "Active"}
                  </span>
                </td>

                <td>
                  {!record.returnDate && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        returnBook(
                          record.id
                        )
                      }
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {borrowings.length === 0 && (
          <p className="no-data">
            No borrowing records
          </p>
        )}
      </div>
    </div>
  );
};

export default BorrowingRecords;