import React, { useState, useEffect } from "react";
import { useLibrary } from "../context/LibraryContext";

const MemberForm = ({ member, onClose }) => {
  const { addMember, updateMember } = useLibrary();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
      });
    }
  }, [member]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (member) {
      updateMember(member.id, formData);
    } else {
      addMember(formData);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{member ? "Edit Member" : "Add New Member"}</h3>

          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
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

            <button
              type="submit"
              className="btn btn-primary"
            >
              {member ? "Update" : "Add"} Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberForm;