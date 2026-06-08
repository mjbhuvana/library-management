import React, { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import MemberForm from "./MemberForm";

const MemberList = () => {
  const { members, deleteMember } = useLibrary();

  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Library Members</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add Member
        </button>
      </div>

      {showForm && (
        <MemberForm
          member={editingMember}
          onClose={handleCloseForm}
        />
      )}

      <div className="cards-grid">
        {members.map((member) => (
          <div
            key={member.id}
            className="card member-card"
          >
            <div className="card-header">
              <div className="avatar">
                {member.name.charAt(0)}
              </div>

              <div className="member-info">
                <h4>{member.name}</h4>
                <p>{member.email}</p>
              </div>
            </div>

            <div className="card-body">
              <p>
                <strong>Member since:</strong>{" "}
                {member.membershipDate}
              </p>
            </div>

            <div className="card-actions">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleEdit(member)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  deleteMember(member.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <p className="no-data">
          No members registered
        </p>
      )}
    </div>
  );
};

export default MemberList;