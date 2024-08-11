import React, { useState, useEffect } from "react";

interface UserDetail {
  id?: number;
  nik: string;
  namaLengkap: string;
  jenisKelamin: string;
  tanggalLahir: string;
  alamat: string;
  negara: string;
}

interface UserDetailFormProps {
  selectedUser: UserDetail | null;
  onSave: (userDetail: UserDetail) => void;
  onClose: () => void;
  mode: "create" | "edit" | "details";
}

const UserDetailForm: React.FC<UserDetailFormProps> = ({
  selectedUser,
  onSave,
  onClose,
  mode,
}) => {
  const [userDetail, setUserDetail] = useState<UserDetail>({
    nik: "",
    namaLengkap: "",
    jenisKelamin: "",
    tanggalLahir: "",
    alamat: "",
    negara: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setUserDetail(selectedUser);
    }
  }, [selectedUser]);

  const nations = [
    "USA",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Japan",
    "China",
    "India",
    "Australia",
    "Brazil",
    "South Africa",
    "Indonesia",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserDetail((prevState) => ({
      ...prevState,
      jenisKelamin: prevState.jenisKelamin === value ? "" : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userDetail);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ display: "block" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {mode === "create"
                ? "Add User"
                : mode === "edit"
                ? "Edit User"
                : "User Details"}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="nik">NIK:</label>
                <input
                  type="text"
                  id="nik"
                  name="nik"
                  className="form-control"
                  value={userDetail.nik}
                  onChange={handleChange}
                  readOnly={mode === "details"}
                />
              </div>
              <div className="form-group">
                <label htmlFor="namaLengkap">Nama Lengkap:</label>
                <input
                  type="text"
                  id="namaLengkap"
                  name="namaLengkap"
                  className="form-control"
                  value={userDetail.namaLengkap}
                  onChange={handleChange}
                  readOnly={mode === "details"}
                />
              </div>
              <div className="form-group">
                <label>Jenis Kelamin:</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Laki-Laki"
                      checked={userDetail.jenisKelamin === "Laki-Laki"}
                      onChange={handleGenderChange}
                      disabled={mode === "details"}
                    />
                    Laki - Laki
                  </label>
                  <label className="ml-2" style={{ marginLeft: "10px" }}>
                    <input
                      type="checkbox"
                      value="Perempuan"
                      checked={userDetail.jenisKelamin === "Perempuan"}
                      onChange={handleGenderChange}
                      disabled={mode === "details"}
                    />
                    Perempuan
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tanggalLahir">Tanggal Lahir:</label>
                <input
                  type="date"
                  id="tanggalLahir"
                  name="tanggalLahir"
                  className="form-control"
                  value={userDetail.tanggalLahir}
                  onChange={handleChange}
                  readOnly={mode === "details"}
                />
              </div>
              <div className="form-group">
                <label htmlFor="alamat">Alamat:</label>
                <textarea
                  id="alamat"
                  name="alamat"
                  className="form-control"
                  rows={3}
                  value={userDetail.alamat}
                  onChange={handleChange}
                  readOnly={mode === "details"}
                />
              </div>
              <div className="form-group">
                <label htmlFor="negara">Negara:</label>
                {mode === "details" ? (
                  <input
                    type="text"
                    id="negara"
                    name="negara"
                    className="form-control"
                    value={userDetail.negara}
                    readOnly
                  />
                ) : (
                  <select
                    id="negara"
                    name="negara"
                    className="form-control"
                    value={userDetail.negara}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {nations.map((nation) => (
                      <option key={nation} value={nation}>
                        {nation}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="modal-footer">
              {mode !== "details" && (
                <>
                  <button type="submit" className="btn btn-primary">
                    {mode === "create" ? "Add" : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </>
              )}
              {mode === "details" && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetailForm;
