"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Url } from "src/url/url";

const IconsFormat = () => {
  const [icons, setIcons] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

  const fetchIcons = async () => {
    const res = await axios.get(`${Url}/icons/all`);
    setIcons(res.data.data);
  };

  useEffect(() => {
    fetchIcons();
  }, []);

  const uploadIcon = async () => {
    if (!file) return alert("Please select a file.");
    if (!name.trim()) return alert("Please enter icon name.");

    const formData = new FormData();
    formData.append("iconFile", file);
    formData.append("name", name);

    try {
      await axios.post(`${Url}/icons/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
      setName("");
      fetchIcons();
      alert("Icon uploaded successfully!");

    } catch (error) {
      console.log(error);
      alert("Upload failed!");
    }
  };

  const deleteIcon = async (id) => {
    await axios.delete(`${Url}/icons/${id}`);
    fetchIcons();
  };

  return (
    <div className="container p-4">

      <h3 className="mb-4 fw-bold">Icons Library</h3>

      {/* NAME INPUT */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter icon name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* FILE INPUT */}
      <input
        type="file"
        className="form-control mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* UPLOAD BUTTON */}
      <button className="btn btn-primary mb-4" onClick={uploadIcon}>
        Upload Icon
      </button>

      {/* ICONS GRID */}
      <div className="row mt-4">
        {icons.length === 0 && (
          <p className="text-muted">No icons uploaded yet.</p>
        )}

        {icons.map((icon) => (
          <div className="col-3 col-sm-2 text-center mb-4" key={icon._id}>
            <img
              src={icon.iconUrl}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "5px"
              }}
            />
            <p className="small mt-2">{icon.name}</p>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteIcon(icon._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default IconsFormat;
