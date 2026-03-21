// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const ViewStaffsingle = () => {
//   const { id } = useParams();
//   const [staff, setStaff] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchStaff = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/staff/singlestaff/${id}`);
//       setStaff(res.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching staff:", error.message);
//       Swal.fire("Oops!", "Failed to load staff data", "error");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="container text-center mt-5">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!staff) {
//     return (
//       <div className="container text-center mt-5">
//         <h4 className="text-danger">No staff found</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <div
//         className="p-4 rounded-4"
//         style={{
//           background: '#ffffff',
//           boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//           borderRadius: '16px',
//         }}
//       >
//         {/* Gradient Header */}
//         <div
//           className="p-4 mb-4 text-white d-flex justify-content-between align-items-center"
//           style={{
//             background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//             borderRadius: '12px',
//           }}
//         >
//           <div>
//             <h3 className="fw-bold m-0 text-capitalize">{staff.name}</h3>
//             <small className="badge bg-light text-dark mt-2">
//               {staff.isBanned ? 'Banned' : 'Active'}
//             </small>
//           </div>
//           <i className="fa fa-user-circle fa-3x text-white"></i>
//         </div>

//         {/* Staff Info */}
//         <div className="row px-3">
//           <div className="col-md-6 mb-4">
//             <h6 className="text-muted mb-1">📧 Email</h6>
//             <p className="fw-semibold">{staff.email}</p>

//             <h6 className="text-muted mb-1">💼 Role</h6>
//             <p className="fw-semibold text-capitalize">{staff.role}</p>

//             <h6 className="text-muted mb-1">📞 Contact Email</h6>
//             <p className="fw-semibold">{staff.contact?.email || '—'}</p>
//           </div>

//           <div className="col-md-6 mb-4">
//             <h6 className="text-muted mb-2">🛠️ Skills</h6>
//             {staff.skill?.length > 0 ? (
//               <div className="d-flex flex-wrap">
//                 {staff.skill.map((skill, idx) => (
//                   <span
//                     key={idx}
//                     className="badge me-2 mb-2"
//                     style={{
//                       backgroundColor: "#00f2fe",
//                       color: "#000",
//                       padding: "6px 12px",
//                       borderRadius: "12px",
//                       fontWeight: "500",
//                     }}
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-secondary">No skills added</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewStaffsingle;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Url } from 'src/url/url';

const ViewStaffsingle = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${Url}/staff/singlestaff/${id}`);
      console.log("fetxhsinglestaf",res)
      setStaff(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching staff:", error.message);
      Swal.fire("Oops!", "Failed to load staff data", "error");
      setLoading(false);
    }
  };

//   const handleToggle = async (field) => {
//     try {
//       setUpdating(true);
//       const payload = {
//         [field]: !staff[field]
//       };
//       await axios.put(`${Url}/staff/toggle-status/${id}`, payload);
//       Swal.fire("Success", `${field} updated successfully`, "success");
//       fetchStaff();
//     } catch (err) {
//       console.error("Failed to update", err);
//       Swal.fire("Error", `Failed to update ${field}`, "error");
//     } finally {
//       setUpdating(false);
//     }
//   };



const handleToggle = async (field) => {
    try {
      setUpdating(true);
      const payload = {
        [field]: !staff[field],
      };
      await axios.put(`${Url}/staff/toggle-status/${id}`, payload);
  
      Swal.fire({
        icon: 'success',
        title: `${field} updated successfully`,
        timer: 1500, // milliseconds
        showConfirmButton: false,
      });
  
      fetchStaff();
    } catch (err) {
      console.error("Failed to update", err);
      Swal.fire({
        icon: 'error',
        title: `Failed to update ${field}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setUpdating(false);
    }
  };
  
  useEffect(() => {
    fetchStaff();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="container text-center mt-5">
        <h4 className="text-danger">No staff found</h4>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div
        className="p-4 rounded-4"
        style={{
          background: '#ffffff',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: '16px',
        }}
      >
        {/* Header */}
        <div
          className="p-4 mb-4 text-white d-flex justify-content-between align-items-center"
          style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '12px',
          }}
        >
        {/* Ban Toggle */}
<div className="form-check form-switch d-flex align-items-center gap-2">
  <input
    className="form-check-input"
    type="checkbox"
    id="banSwitch"
    checked={staff.isBanned}
    onChange={() => handleToggle('isBanned')}
    disabled={updating}
  />
  <label className="form-check-label text-white fw-semibold" htmlFor="banSwitch">
    {staff.isBanned ? 'Unban User' : 'Ban User'}
  </label>
</div>

{/* Active Toggle */}
<div className="form-check form-switch d-flex align-items-center gap-2">
  <input
    className="form-check-input"
    type="checkbox"
    id="activeSwitch"
    checked={staff.isActive}
    onChange={() => handleToggle('isActive')}
    disabled={updating}
  />
  <label className="form-check-label text-white fw-semibold" htmlFor="activeSwitch">
    {staff.isActive ? 'Deactivate User' : 'Activate User'}
  </label>
</div>

        </div>

        {/* Staff Info */}
        <div className="row px-3">
          <div className="col-md-6 mb-4">
            <h6 className="text-muted mb-1"> Name</h6>
            <p className='fw-semibold text-capitalize'>{staff.name}</p>
            <h6 className="text-muted mb-1">📧 Email</h6>
            <p className="fw-semibold">{staff.email}</p>

            <h6 className="text-muted mb-1">💼 Role</h6>
            <p className="fw-semibold text-capitalize">{staff.role}</p>

            <h6 className="text-muted mb-1">📞 Contact Email</h6>
            <p className="fw-semibold">{staff.contact?.email || '—'}</p>
          </div>

          <div className="col-md-6 mb-4">
            <h6 className="text-muted mb-2">🛠️ Skills</h6>
            {staff.skill?.length > 0 ? (
              <div className="d-flex flex-wrap">
                {staff.skill.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge me-2 mb-2"
                    style={{
                      backgroundColor: "#00f2fe",
                      color: "#000",
                      padding: "6px 12px",
                      borderRadius: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-secondary">No skills added</p>
            )}
          </div>
        </div>


        {staff?.overallRating?.count > 0 && (
  <div className="d-flex align-items-center gap-2">
    <div className="d-flex align-items-center">
    <h6 className='text-muted me-2 mb-0'>Rating</h6>

      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={`bi ${i < Math.round(staff.overallRating.average) ? "fa-solid fa-star" : "bi-star"} text-danger`}
        ></i>
      ))}
    </div>
    <small className="text-muted">
      ({staff.overallRating.count}{staff.overallRating.count > 1 ? "" : ""})
    </small>
  </div>
)}

      </div>
    </div>
  );
};

export default ViewStaffsingle;






