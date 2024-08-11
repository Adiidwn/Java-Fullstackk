import React, { useState } from "react";
import { UserDetail } from "./types/UserDetails";
import UserDetailForm from "./UserDetailForm";
import { useUserDetails } from "./hooks/useUserDetails";
import { useSearch } from "./hooks/useSearch";
import { calculateAge } from "./utils/ageUtils";
import "./style/UserDetailList.css";

const UserDetailList: React.FC = () => {
  const { userDetails, deleteUser, fetchUserDetails } = useUserDetails();
  const {
    nikSearchTerm,
    namaSearchTerm,
    filteredUserDetails,
    setNikSearchTerm,
    setNamaSearchTerm,
  } = useSearch(userDetails);

  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit" | "details">(
    "create"
  );

  const handleSelectUser = (user: UserDetail, mode: "edit" | "details") => {
    setSelectedUser(user);
    setFormMode(mode);
    setShowForm(true);
  };

  const handleDeleteUser = (user: UserDetail) => {
    if (
      window.confirm(`Are you sure you want to delete ${user.namaLengkap}?`)
    ) {
      deleteUser(user.id!);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleSave = async (userDetail: UserDetail) => {
    try {
      const method = userDetail.id ? "PUT" : "POST";
      const response = await fetch(
        `http://localhost:8080/api/v1/user-details${
          userDetail.id ? `/${userDetail.id}` : ""
        }`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetail),
        }
      );
      if (!response.ok)
        throw new Error(
          `${method === "POST" ? "Failed to create" : "Failed to update"} user`
        );
      await fetchUserDetails();
      handleCloseForm();
    } catch (error) {
      console.error("Error saving user detail:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Aplikasi Data Pribadi</h2>

      <div
        className="search-container mb-4"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="form-group">
          <label htmlFor="nikSearch">NIK:</label>
          <input
            type="text"
            id="nikSearch"
            className="form-control"
            placeholder="Enter NIK"
            value={nikSearchTerm}
            onChange={(e) => setNikSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="namaSearch">Nama:</label>
          <input
            type="text"
            id="namaSearch"
            className="form-control"
            placeholder="Enter Nama Lengkap"
            value={namaSearchTerm}
            onChange={(e) => setNamaSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedUser(null);
            setFormMode("create");
            setShowForm(true);
          }}
        >
          Add User
        </button>
      </div>

      <div className="table-responsive border rounded p-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nama Lengkap</th>
              <th>Umur</th>
              <th>Tanggal Lahir</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th>Negara</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserDetails.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td> {/* Displaying sequential number */}
                <td>{user.nik}</td>
                <td>{user.namaLengkap}</td>
                <td>{calculateAge(user.tanggalLahir)}</td>
                <td>{user.tanggalLahir}</td>
                <td>{user.jenisKelamin}</td>
                <td>{user.alamat}</td>
                <td>{user.negara}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm mr-2"
                    onClick={() => handleSelectUser(user, "edit")}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mr-2"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleSelectUser(user, "details")}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <UserDetailForm
          selectedUser={selectedUser}
          onSave={handleSave}
          onClose={handleCloseForm}
          mode={formMode}
        />
      )}
    </div>
  );
};

export default UserDetailList;
