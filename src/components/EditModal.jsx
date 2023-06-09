import React, { useEffect, useState } from "react";
import Select from "react-select";
import { GoPrimitiveDot } from "react-icons/go";

const options = [
  { value: "very-high", label: "Very High" },
  { value: "high", label: "High" },
  { value: "normal", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "very-low", label: "Very Low" },
];

const getOptionLabel = (option) => {
  switch (option.value) {
    case "very-high":
      return (
        <>
          <span style={{ color: "#ED4C5C" }}>
            <GoPrimitiveDot />
          </span>{" "}
          {option.label}
        </>
      );
    case "high":
      return (
        <>
          <span style={{ color: "#F8A541" }}>
            <GoPrimitiveDot />
          </span>{" "}
          {option.label}
        </>
      );
    case "normal":
      return (
        <>
          <span style={{ color: "#00A790" }}>
            <GoPrimitiveDot />
          </span>{" "}
          {option.label}
        </>
      );
    case "low":
      return (
        <>
          <span style={{ color: "#428BC1" }}>
            <GoPrimitiveDot />
          </span>{" "}
          {option.label}
        </>
      );
    case "very-low":
      return (
        <>
          <span style={{ color: "#8942C1" }}>
            <GoPrimitiveDot />
          </span>{" "}
          {option.label}
        </>
      );
    default:
      return (
        <>
          <span>
            <GoPrimitiveDot />
          </span>{" "}
          {option.label}
        </>
      );
  }
};

export default function EditModal({ loading, editAction, data }) {
  const [listItemName, setListItemName] = useState("");
  const [priority, setPriority] = useState(null);

  useEffect(() => {
    if (data?.title) setListItemName(data?.title);
    if (data?.priority)
      setPriority(options.filter((opt) => opt.value === data?.priority)[0]);
  }, [data?.priority, data?.title]);

  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header px-5">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Edit List Item
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-5 row d-flex">
            <div className="mb-3">
              <label htmlFor="listItemName" className="form-label fw-bold">
                NAMA LIST ITEM
              </label>
              <input
                type="text"
                value={listItemName}
                onChange={(e) => setListItemName(e.target.value)}
                className="form-control form-control-lg"
                id="listItemName"
                placeholder="Tambahkan nama Activity"
              />
            </div>
            <div className="mb-3" style={{ maxWidth: "300px" }}>
              <label htmlFor="priority" className="form-label fw-bold">
                PRIORITY
              </label>
              <Select
                value={priority}
                className="form-control form-control-lg p-0 border-0"
                onChange={(selected) => setPriority(selected)}
                options={options}
                placeholder="Select Priority"
                getOptionLabel={getOptionLabel}
              />
            </div>
          </div>
          <div className="modal-footer px-5">
            <button
              type="button"
              className="btn btn-secondary d-none"
              data-bs-dismiss="modal"
              id="closeEditModal"
            >
              Close
            </button>
            {loading ? (
              <button
                style={{ fontSize: "18px" }}
                className="btn btn-custom btn-blue text-white py-3 px-4 fw-bold rounded-pill"
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            ) : (
              <button
                style={{ fontSize: "18px" }}
                disabled={listItemName && priority ? false : true}
                className="btn btn-custom btn-blue text-white py-3 px-4 fw-bold rounded-pill"
                onClick={() => {
                  editAction(data.id, {
                    listItemName,
                    priority: priority.value,
                  });
                  document.getElementById("closeEditModal").click();
                }}
              >
                Simpan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
