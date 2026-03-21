// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Url } from '../url/url'; 

// const ClientView = () => {
//   const { id  } = useParams();
//   console.log(id )
//   const [clientData, setClientData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchClientData = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/clientDetail/${id}`);
//       console.log(res)
//       setClientData(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching client:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClientData();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" role="status" />
//       </div>
//     );
//   }

//   if (!clientData) {
//     return <h4 className="text-danger text-center">Client not found</h4>;
//   }

//   return (
//     <div className="container py-4">
//       <div className="card shadow p-4">
//         <h3 className="mb-3">Client Information</h3>
//         <p><strong>Name:</strong> {clientData.name}</p>
//         <p><strong>Email:</strong> {clientData.email}</p>
//         <p><strong>Phone:</strong> {clientData.phone || 'N/A'}</p>
//         <p><strong>Status:</strong> {JSON.parse(clientData.verified) ? 'Verified' : 'Unverified'}</p>
//         <p><strong>Client ID:</strong> {clientData._id}</p>
//       </div>
//     </div>
//   );
// };

// export default ClientView;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Url } from '../url/url'; 

// const ClientView = () => {
//   const { id } = useParams();
//   const [clientData, setClientData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchClientData = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/clientDetail/${id}`);
//       setClientData(res.data);
//     } catch (error) {
//       console.error('Error fetching client:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchClientProjects = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/clientviewdata/${id}`);
//       console.log(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchClientData();
//     fetchClientProjects()
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" role="status" />
//       </div>
//     );
//   }

//   if (!clientData) {
//     return <h4 className="text-danger text-center">Client not found</h4>;
//   }

//   return (
//     <div className="container py-4">
//       <div className="card shadow-lg border-0 rounded-4 px-4 py-5">
//         <div className="d-flex align-items-center mb-4">
//           <i className="fa-solid fa-user-circle fa-3x text-primary me-3"></i>
//           <div>
//             <h4 className="mb-0">Client Profile</h4>
//             <small className="text-muted">Client ID: {clientData._id}</small>
//           </div>
//         </div>

//         <div className="row gy-3">
//           <div className="col-md-6">
//             <div className="d-flex align-items-center">
//               <i className="fa-solid fa-user fa-fw me-2 text-secondary"></i>
//               <span><strong>Name:</strong> {clientData.name}</span>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="d-flex align-items-center">
//               <i className="fa-solid fa-envelope fa-fw me-2 text-secondary"></i>
//               <span><strong>Email:</strong> {clientData.email}</span>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="d-flex align-items-center">
//               <i className="fa-solid fa-phone fa-fw me-2 text-secondary"></i>
//               <span><strong>Phone:</strong> {clientData.phone || 'N/A'}</span>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="d-flex align-items-center">
//               <i className="fa-solid fa-user-check fa-fw me-2 text-secondary"></i>
//               <span>
//                 <strong>Status:</strong>{' '}
//                 <span className={`badge ${JSON.parse(clientData.verified) ? 'bg-success' : 'bg-danger'}`}>
//                   {JSON.parse(clientData.verified) ? 'Verified' : 'Unverified'}
//                 </span>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientView;





// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Url } from '../url/url';

// const ClientView = () => {
//   const { id } = useParams();
//   const [clientData, setClientData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const projectsPerPage = 9; // number of cards per page

//   // Fetch client profile
//   const fetchClientData = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/clientDetail/${id}`);
//       setClientData(res.data);
//     } catch (error) {
//       console.error('Error fetching client:', error);
//     }
//   };
//   const handleChatClick = (conversationId) => {
//     navigate(`/dashboard/projectchat?conv=${conversationId}`);
//   };
//   // Fetch client projects
//   const fetchClientProjects = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/clientviewdata/${id}`);
//       console.log(res)
//       setProjects(res.data.data || []);
//     } catch (err) {
//       console.error('Error fetching projects:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetchClientData();
//     fetchClientProjects();
//   }, [id]);

//   // Pagination calculations
//   const indexOfLast = currentPage * projectsPerPage;
//   const indexOfFirst = indexOfLast - projectsPerPage;
//   const currentProjects = projects.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(projects.length / projectsPerPage);

//   const handlePageChange = (pageNum) => {
//     setCurrentPage(pageNum);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" role="status" />
//       </div>
//     );
//   }

//   if (!clientData) {
//     return <h4 className="text-danger text-center">Client not found</h4>;
//   }

//   return (
//     <div className="container py-4">
  
//       {/* Client Profile Card */}
//       <div className="card shadow border-0 rounded-4 px-4 py-5 mb-5 bg-light">
//         <div className="d-flex align-items-center mb-4">
//           <i className="fa-solid fa-user-circle fa-3x text-primary me-3"></i>
//           <div>
//             <h3 className="mb-0 fw-semibold">Client Profile</h3>
//             <small className="text-muted">Client ID: {clientData._id}</small>
//           </div>
//         </div>
  
//         <div className="row gy-4">
//           <div className="col-md-6">
//             <i className="fa-solid fa-user text-secondary me-2"></i>
//             <strong>Name:</strong> {clientData.name}
//           </div>
//           <div className="col-md-6">
//             <i className="fa-solid fa-envelope text-secondary me-2"></i>
//             <strong>Email:</strong> {clientData.email}
//           </div>
//           <div className="col-md-6">
//             <i className="fa-solid fa-phone text-secondary me-2"></i>
//             <strong>Phone:</strong> {clientData.phone || 'N/A'}
//           </div>
//           <div className="col-md-6">
//             <i className="fa-solid fa-user-check text-secondary me-2"></i>
//             <strong>Status:</strong>{' '}
//             <span className={`badge rounded-pill px-3 py-1 ${JSON.parse(clientData.verified) ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
//               {JSON.parse(clientData.verified) ? 'Verified' : 'Unverified'}
//             </span>
//           </div>
//         </div>
//       </div>
  
//       {/* Projects Section */}
//       <h4 className="mb-4 fw-semibold">Projects</h4>
  
//       {projects.length === 0 ? (
//         <p className="text-muted">No projects found for this client.</p>
//       ) : (
//         <>
//       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//   {currentProjects.map((project) => (
//     <div key={project.projectId} className="col">
//       <div className="project-card shadow-sm border-0 rounded-4 p-4 h-100 d-flex flex-column bg-white transition">
//         <div className="mb-2 d-flex align-items-center justify-content-between">
//           <h6 className="text-primary fw-semibold mb-0">
//             <i className="fa-solid fa-diagram-project me-2"></i> Project #{project.projectId}
//           </h6>
//         </div>
//         <div className="mb-2 text-muted small">
//           <i className="fa-solid fa-box me-2 text-dark"></i>Type: <span className="fw-medium text-dark">{project.projectType}</span>
//         </div>
//         <div className="mb-2">
//           <i className="fa-solid fa-toolbox me-2 text-dark"></i>
//           <span className="fw-medium">Services:</span>{' '}
//           {project.service.map((s) => (
//             <span key={s.serviceId} className="badge bg-light text-dark border rounded-pill me-1 mb-1">
//               <i className="fa-solid fa-puzzle-piece me-1 text-secondary"></i>{s.serviceName}
//             </span>
//           ))}
//         </div>
//         <div className="mb-2">
//           <i className="fa-solid fa-signal me-2 text-dark"></i>
//           <span className="fw-medium">Status:</span>{' '}
//           <span className={`badge rounded-pill px-3 py-1 ${project.projectStatus === 'running' ? 'bg-info-subtle text-info' : 'bg-warning-subtle text-warning'}`}>
//             {project.projectStatus.charAt(0).toUpperCase() + project.projectStatus.slice(1)}
//           </span>
//         </div>
//         <div className="mb-3">
//           <i className="fa-solid fa-wallet me-2 text-dark"></i>
//           <span className="fw-medium">Total Spend:</span> ₹{project.totalPrice}
//         </div>
//         <div className="mt-auto text-end">
//           <button className="btn btn-outline-primary rounded-pill px-3 btn-sm"onClick={()=>handleChatClick(project.conversationId)}>
//             <i className="fa-solid fa-comments me-1"></i> Chat
//           </button>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

  
//           {/* Pagination */}
//           {totalPages > 1 && (
//             <nav className="mt-5">
//               <ul className="pagination justify-content-center">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
//                   <li key={pageNum} className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
//                     <button className="page-link" onClick={() => handlePageChange(pageNum)}>
//                       {pageNum}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           )}
//         </>
//       )}
//     </div>
//   );
  
// };

// export default ClientView;



import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Url } from '../url/url';

const ClientView = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  const handleChatClick = (conversationId) => {
    navigate(`/dashboard/projectchat?conv=${conversationId}`);
  };

  const fetchClientProjects = async () => {
    try {
      const res = await axios.get(`${Url}/client/clientviewdata/${id}`);
      console.log(res)
      const data = res.data;
      setClientData(data.client); // 👈 Fixed this
      setProjects(data.client.projects || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchClientProjects();
  }, [id]);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!clientData) {
    return <h4 className="text-danger text-center">Client not found</h4>;
  }

  return (
    <div className="container py-4">

      {/* 🟦 Summary Box */}
      <div className="card shadow-sm border-0 rounded-4 mb-4 bg-white px-4 py-4">
        <h5 className="fw-semibold mb-4">
          <i className="fa-solid fa-chart-bar me-2 text-primary"></i>Client Summary
        </h5>
        <div className="row g-4">
          <div className="col-md-3">
            <div className="p-3 bg-light rounded text-center">
              <div className="fw-bold text-primary">Total Projects</div>
              <div className="fs-5">{clientData.totalProjects}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-light rounded text-center">
              <div className="fw-bold text-warning">Running Projects</div>
              <div className="fs-5">{clientData.runningProjects}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-light rounded text-center">
              <div className="fw-bold text-success">Completed</div>
              <div className="fs-5">{clientData.completeProjects}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-light rounded text-center">
              <div className="fw-bold text-dark">Total Spend</div>
              <div className="fs-5">₹{clientData.totalSpend}</div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

      </div>

      {/* 🧾 Client Profile Card */}
      <div className="card shadow border-0 rounded-4 px-4 py-5 mb-5 bg-light">
        <div className="d-flex align-items-center mb-4">
          <i className="fa-solid fa-user-circle fa-3x text-primary me-3"></i>
          <div>
            <h3 className="mb-0 fw-semibold">Client Profile</h3>
            <small className="text-muted">Client ID: {clientData._id}</small>
          </div>
        </div>

        <div className="row gy-4">
          <div className="col-md-6">
            <i className="fa-solid fa-user text-secondary me-2"></i>
            <strong>Name:</strong> {clientData.name}
          </div>
          <div className="col-md-6">
            <i className="fa-solid fa-envelope text-secondary me-2"></i>
            <strong>Email:</strong> {clientData.email}
          </div>
          <div className="col-md-6">
            <i className="fa-solid fa-phone text-secondary me-2"></i>
            <strong>Phone:</strong> {clientData.phone || 'N/A'}
          </div>
          <div className="col-md-4">
          <i className="fa-solid fa-location-dot text-secondary me-2"></i>
            <strong>Address:</strong> {clientData.address}, {clientData.city}, {clientData.country} - {clientData.pinCode}</div>

          <div className="col-md-6">
            <i className="fa-solid fa-user-check text-secondary me-2"></i>
            <strong>Status:</strong>{' '}
            <span className={`badge rounded-pill px-3 py-1 ${clientData.verified ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
              {clientData.verified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>
      </div>

      {/* 📦 Projects Section */}
      <h4 className="mb-4 fw-semibold">Projects</h4>

      {projects.length === 0 ? (
        <p className="text-muted">No projects found for this client.</p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {currentProjects.map((project) => (
              <div key={project.projectId} className="col">
                <div className="project-card shadow-sm border-0 rounded-4 p-4 h-100 d-flex flex-column bg-white transition">
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <h6 className="text-primary fw-semibold mb-0">
                      <i className="fa-solid fa-diagram-project me-2"></i> Project #{project.projectId}
                    </h6>
                  </div>
                  <div className="mb-2 text-muted small">
                    <i className="fa-solid fa-box me-2 text-dark"></i>Type: <span className="fw-medium text-dark">{project.projectType}</span>
                  </div>
                  <div className="mb-2">
                    <i className="fa-solid fa-toolbox me-2 text-dark"></i>
                    <span className="fw-medium">Services:</span>{' '}
                    {project.service.map((s) => (
                      <span key={s.serviceId} className="badge bg-light text-dark border rounded-pill me-1 mb-1">
                        <i className="fa-solid fa-puzzle-piece me-1 text-secondary"></i>{s.serviceName}
                      </span>
                    ))}
                  </div>
                  <div className="mb-2">
                    <i className="fa-solid fa-signal me-2 text-dark"></i>
                    <span className="fw-medium">Status:</span>{' '}
                    <span className={`badge rounded-pill px-3 py-1 ${project.projectStatus === 'running' ? 'bg-info-subtle text-info' : 'bg-warning-subtle text-warning'}`}>
                      {project.projectStatus.charAt(0).toUpperCase() + project.projectStatus.slice(1)}
                    </span>
                  </div>
                
                  <div className="mt-auto text-end">
                    <button className="btn btn-outline-primary rounded-pill px-3 btn-sm" onClick={() => handleChatClick(project.conversationId)}>
                      <i className="fa-solid fa-comments me-1"></i> Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-5">
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <li key={pageNum} className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default ClientView;

