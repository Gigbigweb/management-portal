// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Url } from "src/url/url";

// const EmailBuilderImages = () => {
//   const [icons, setIcons] = useState([]);
//   const [file, setFile] = useState(null);
//   const [name, setName] = useState("");

//   const fetchIcons = async () => {
//     const res = await axios.get(`${Url}/api/BulkEmailImages/all`);
//     setIcons(res.data.data);
//   };

//   useEffect(() => {
//     fetchIcons();
//   }, []);

//   const uploadIcon = async () => {
//     if (!file) return alert("Please select a file.");
//     if (!name.trim()) return alert("Please enter icon name.");

//     const formData = new FormData();
//     formData.append("iconFile", file);
//     formData.append("name", name);

//     try {
//       await axios.post(`${Url}/api/BulkEmailImages/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setFile(null);
//       setName("");
//       fetchIcons();
//       alert("Icon uploaded successfully!");

//     } catch (error) {
//       console.log(error);
//       alert("Upload failed!");
//     }
//   };

//   const deleteIcon = async (id) => {
//     await axios.delete(`${Url}/api/BulkEmailImages/${id}`);
//     fetchIcons();
//   };

//   return (
//     <div className="container p-4">

//       <h3 className="mb-4 fw-bold">images Library</h3>

//       {/* NAME INPUT */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Enter icon name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       {/* FILE INPUT */}
//       <input
//         type="file"
//         className="form-control mb-3"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       {/* UPLOAD BUTTON */}
//       <button className="btn btn-primary mb-4" onClick={uploadIcon}>
//         Upload Icon
//       </button>

//       {/* ICONS GRID */}
//       <div className="row mt-4">
//         {icons.length === 0 && (
//           <p className="text-muted">No images uploaded yet.</p>
//         )}

//         {icons.map((icon) => (
//           <div className="col-3 col-sm-2 text-center mb-4" key={icon._id}>
//             <img
//               src={icon.iconUrl}
//               style={{
//                 width: "70px",
//                 height: "70px",
//                 objectFit: "contain",
//                 border: "1px solid #ddd",
//                 borderRadius: "6px",
//                 padding: "5px"
//               }}
//             />
//             <p className="small mt-2">{icon.name}</p>

//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => deleteIcon(icon._id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default EmailBuilderImages;









// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Url } from "src/url/url";

// const EmailBuilderImages = () => {
//   const [icons, setIcons] = useState([]);
//   const [file, setFile] = useState(null);
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   // FETCH IMAGES
//   const fetchIcons = async () => {
//     try {
//       const res = await axios.get(`${Url}/api/BulkEmailImages/all`);
//       setIcons(res.data.data || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchIcons();
//   }, []);

//   // UPLOAD IMAGE
//   const uploadIcon = async () => {
//     if (!file) {
//       alert("Please select a file.");
//       return;
//     }

//     if (!name.trim()) {
//       alert("Please enter image name.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("iconFile", file);
//     formData.append("name", name);

//     try {
//       setLoading(true);

//       await axios.post(`${Url}/api/BulkEmailImages/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setFile(null);
//       setName("");
//       fetchIcons();

//       alert("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Upload failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // DELETE IMAGE (FIXED HERE)
//   const deleteIcon = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this image?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${Url}/api/BulkEmailImages/${id}`);
//       fetchIcons();
//       alert("Deleted successfully!");
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Delete failed!");
//     }
//   };

//   // COPY URL
//   const copyToClipboard = async (url) => {
//     try {
//       await navigator.clipboard.writeText(url);
//       alert("Copied to clipboard!");
//     } catch (err) {
//       console.error("Clipboard error:", err);
//       alert("Failed to copy!");
//     }
//   };

//   return (
//     <div className="container p-4">
//       <h3 className="mb-4 fw-bold">Images Library</h3>

//       {/* INPUTS */}
//       <div className="row">
//         <div className="col-md-4 mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter image name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div className="col-md-4 mb-3">
//           <input
//             type="file"
//             className="form-control"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </div>

//         <div className="col-md-4 mb-3">
//           <button
//             className="btn btn-primary w-100"
//             onClick={uploadIcon}
//             disabled={loading}
//           >
//             {loading ? "Uploading..." : "Upload Image"}
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="table-responsive mt-4">
//         <table className="table table-bordered table-hover align-middle">
//           <thead className="table-dark">
//             <tr>
//               <th style={{ width: "100px" }}>Preview</th>
//               <th>Name</th>
//               <th>Full URL</th>
//               <th style={{ width: "120px" }}>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {icons.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center text-muted">
//                   No images uploaded yet.
//                 </td>
//               </tr>
//             ) : (
//               icons.map((icon) => (
//                 <tr key={icon._id}>
//                   {/* IMAGE */}
//                   <td className="text-center">
//                     <img
//                       src={icon.iconUrl}
//                       alt={icon.name}
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         objectFit: "contain",
//                         border: "1px solid #ddd",
//                         borderRadius: "6px",
//                         padding: "4px",
//                         background: "#fff",
//                       }}
//                     />
//                   </td>

//                   {/* NAME */}
//                   <td>{icon.name}</td>

//                   {/* URL */}
//                   <td>
//                     <div className="d-flex gap-2">
//                       <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         value={icon.iconUrl}
//                         readOnly
//                       />
//                       <button
//                         className="btn btn-outline-secondary btn-sm"
//                         onClick={() => copyToClipboard(icon.iconUrl)}
//                       >
//                         Copy
//                       </button>
//                     </div>
//                   </td>

//                   {/* ACTION */}
//                   <td className="text-center">
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => deleteIcon(icon._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmailBuilderImages;












"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Url } from "src/url/url";
import { Container } from "@mui/material";

const EmailBuilderImages = () => {
  // ✅ Permission - iconsFormat ke andar bulkEmailImages field se control hoga
  const permissions = JSON.parse(sessionStorage.getItem('management_permissions') || '{}');
  const perm      = permissions?.iconsFormat || {};
  const enabled   = perm?.bulkEmailImages === true;  // ✅ iconsFormat.bulkEmailImages
  const canAdd    = perm?.add    === true;
  const canDelete = perm?.delete === true;

  const [icons, setIcons]     = useState([]);
  const [file, setFile]       = useState(null);
  const [name, setName]       = useState("");
  const [loading, setLoading] = useState(false);

  const fetchIcons = async () => {
    try {
      const res = await axios.get(`${Url}/api/BulkEmailImages/all`);
      setIcons(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchIcons(); }, []);

  const uploadIcon = async () => {
    if (!file)        return alert("Please select a file.");
    if (!name.trim()) return alert("Please enter image name.");

    const formData = new FormData();
    formData.append("iconFile", file);
    formData.append("name", name);

    try {
      setLoading(true);
      await axios.post(`${Url}/api/BulkEmailImages/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      setName("");
      fetchIcons();
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const deleteIcon = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.delete(`${Url}/api/BulkEmailImages/${id}`);
      fetchIcons();
      alert("Deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed!");
    }
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Clipboard error:", err);
      alert("Failed to copy!");
    }
  };

  // ✅ ACCESS DENIED - bulkEmailImages false ho to
  if (!enabled) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
          <div style={{ fontSize: 50 }}>🔒</div>
          <h4 style={{ marginTop: 16, color: '#1e293b' }}>Access Denied</h4>
          <p>Aapke paas is page ka access nahi hai.</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="container p-4">
      <h3 className="mb-4 fw-bold">Images Library</h3>

      {/* ✅ Upload section - sirf canAdd pe dikhega */}
      {canAdd && (
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text" className="form-control" placeholder="Enter image name"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="file" className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="col-md-4 mb-3">
            <button className="btn btn-primary w-100" onClick={uploadIcon} disabled={loading}>
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "100px" }}>Preview</th>
              <th>Name</th>
              <th>Full URL</th>
              {/* ✅ Action column sirf canDelete pe dikhega */}
              {canDelete && <th style={{ width: "120px" }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {icons.length === 0 ? (
              <tr>
                <td colSpan={canDelete ? 4 : 3} className="text-center text-muted">
                  No images uploaded yet.
                </td>
              </tr>
            ) : (
              icons.map((icon) => (
                <tr key={icon._id}>
                  <td className="text-center">
                    <img
                      src={icon.iconUrl} alt={icon.name}
                      style={{ width: "60px", height: "60px", objectFit: "contain", border: "1px solid #ddd", borderRadius: "6px", padding: "4px", background: "#fff" }}
                    />
                  </td>
                  <td>{icon.name}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <input type="text" className="form-control form-control-sm" value={icon.iconUrl} readOnly />
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => copyToClipboard(icon.iconUrl)}>
                        Copy
                      </button>
                    </div>
                  </td>
                  {/* ✅ Delete button - sirf canDelete pe */}
                  {canDelete && (
                    <td className="text-center">
                      <button className="btn btn-danger btn-sm" onClick={() => deleteIcon(icon._id)}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailBuilderImages;