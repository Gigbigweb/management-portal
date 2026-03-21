// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Url } from "src/url/url";

// const FreelancersView = () => {
//   const { id } = useParams();
//   const [staff, setStaff] = useState(null);

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`${Url}/staff/by-freelancer/${id}`)
//         .then((res) => {
//           setStaff(res.data);
//         })
//         .catch((err) => {
//           console.error("Error fetching staff:", err);
//         });
//     }
//   }, [id]);

//   if (!staff) return <p className="text-center mt-5">Loading...</p>;
// console.log("staff",staff)
//   return (
//     <div className="container mt-5">
//       {/* Profile Header */}
//       <div className="bg-white shadow-lg rounded-2xl p-5 mb-4 text-center border">
//         <h2 className="text-2xl font-bold text-primary">
//           {staff.name} <span className="text-muted">({staff.role})</span>
//         </h2>
//         <p className="text-secondary">{staff.email}</p>
//         <span
//           className={`badge ${
//             staff.isActive ? "bg-success" : "bg-danger"
//           } px-3 py-2 mt-2`}
//         >
//           {staff.isActive ? "Active" : "Inactive"}
//         </span>

//         {/* Profile Completion */}
      
   
//       </div>

//       {/* Grid Layout */}
//       <div className="row g-4">
//         {/* Basic Info */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3 h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary mb-3">Basic Info</h5>
//               <p><i className="fa-solid fa-envelope me-2 text-secondary"></i> {staff.email}</p>
//               <p><i className="fa-solid fa-phone me-2 text-secondary"></i> {staff.phone}</p>
//               <p><i className="fa-solid fa-calendar-days me-2 text-secondary"></i> DOB: {staff.dob || "N/A"}</p>
//               <p><i className="fa-solid fa-check-circle me-2 text-secondary"></i> Experience: {staff.experience || "N/A"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3 h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary mb-3">Skills</h5>
//               {staff.skill && staff.skill.length > 0 ? (
//                 staff.skill.map((s, i) => (
//                   <span key={i} className="badge bg-info text-dark me-2 mb-2 p-2">{s}</span>
//                 ))
//               ) : (
//                 <p>No skills added</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bank Details */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3 h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary mb-3">Bank Details</h5>
//               <p><i className="fa-solid fa-building-columns me-2 text-secondary"></i> Bank: {staff.bankDetail?.name || "N/A"}</p>
//               <p>Account: {staff.bankDetail?.accountNumber || "N/A"}</p>
//               <p>IFSC: {staff.bankDetail?.ifscCode || "N/A"}</p>
//               <p>Verified: {staff.bankDetail?.bankverifiedByAdmin || "Pending"}</p>
//               <button className="btn bg-primary text-white">Send money</button>
//             </div>
//           </div>
//         </div>

//         {/* Address & Social */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3 h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary mb-3">Address</h5>
//               <p>{staff.fullAddress?.street}, {staff.fullAddress?.building}, {staff.fullAddress?.state}, {staff.fullAddress?.country}, {staff.fullAddress?.pincode}</p>
              
//               <h6 className="mt-3 text-secondary">Social Media</h6>
//               <p><i className="fa-brands fa-linkedin me-2 text-primary"></i> {staff.socialmedia?.linkedin || "N/A"}</p>
//               <p><i className="fa-brands fa-instagram me-2 text-danger"></i> {staff.socialmedia?.instagram || "N/A"}</p>

//               <h6 className="mt-3 text-secondary">Portfolio</h6>
//               <p><i className="fa-solid fa-briefcase me-2 text-success"></i> {staff.portfolios?.portfolio || "N/A"}</p>
//               <p><i className="fa-brands fa-behance me-2 text-info"></i> {staff.portfolios?.behance || "N/A"}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreelancersView;













// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Url } from "src/url/url";

// const FreelancersView = () => {
//   const { id } = useParams();
//   const [staff, setStaff] = useState(null);

//   // Modal state
//   const [showModal, setShowModal] = useState(false);

//   // Form inputs
//   const [ifsc, setIfsc] = useState("");
//   const [account, setAccount] = useState("");
//   const [amount, setAmount] = useState("");

  

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`${Url}/staff/by-freelancer/${id}`)
//         .then((res) => {
//           setStaff(res.data);
//         })
//         .catch((err) => {
//           console.error("Error fetching staff:", err);
//         });
//     }
//   }, [id]);

//   if (!staff) return <p className="text-center mt-5">Loading...</p>;
//   console.log("staff", staff);

//   // Handle send money button inside modal
//   const handleSendMoney = () => {
//     if (!ifsc || !account || !amount) {
//       alert("Please fill all fields");
//       return;
//     }
//     console.log("Sending money:", { ifsc, account, amount, staffId: staff._id });

//     // Example API call
//     // axios.post(`${Url}/payment/send`, { ifsc, account, amount, staffId: staff._id })
//     //   .then(res => console.log("Payment success:", res.data))
//     //   .catch(err => console.error("Payment error:", err));

//     setShowModal(false);
//     setIfsc("");
//     setAccount("");
//     setAmount("");
//   };

//   return (
//     <div className="container mt-5">
//       {/* Profile Header */}
//       <div className="bg-white shadow-lg rounded-2xl p-5 mb-4 text-center border">
//         <h2 className="text-2xl font-bold text-primary">
//           {staff.name} <span className="text-muted">({staff.role})</span>
//         </h2>
//         <p className="text-secondary">{staff.email}</p>
//         <span
//           className={`badge ${staff.isActive ? "bg-success" : "bg-danger"} px-3 py-2 mt-2`}
//         >
//           {staff.isActive ? "Active" : "Inactive"}
//         </span>
//       </div>

//       {/* Grid Layout */}
//       <div className="row g-4">
//         {/* Basic Info */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3 h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary mb-3">Basic Info</h5>
//               <p><i className="fa-solid fa-envelope me-2 text-secondary"></i> {staff.email}</p>
//               <p><i className="fa-solid fa-phone me-2 text-secondary"></i> {staff.phone}</p>
//               <p><i className="fa-solid fa-calendar-days me-2 text-secondary"></i> DOB: {staff.dob || "N/A"}</p>
//               <p><i className="fa-solid fa-check-circle me-2 text-secondary"></i> Experience: {staff.experience || "N/A"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3 h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary mb-3">Skills</h5>
//               {staff.skill && staff.skill.length > 0 ? (
//                 staff.skill.map((s, i) => (
//                   <span key={i} className="badge bg-info text-dark me-2 mb-2 p-2">{s}</span>
//                 ))
//               ) : (
//                 <p>No skills added</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bank Details */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3 h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary mb-3">Bank Details</h5>
//               <p><i className="fa-solid fa-building-columns me-2 text-secondary"></i> Bank: {staff.bankDetail?.name || "N/A"}</p>
//               <p>Account: {staff.bankDetail?.accountNumber || "N/A"}</p>
//               <p>IFSC: {staff.bankDetail?.ifscCode || "N/A"}</p>
//               <p>Verified: {staff.bankDetail?.bankverifiedByAdmin || "Pending"}</p>
//               <button 
//                 className="btn bg-primary text-white"
//                 onClick={() => setShowModal(true)}
//               >
//                 Send money
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Address & Social */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3 h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary mb-3">Address</h5>
//               <p>{staff.fullAddress?.street}, {staff.fullAddress?.building}, {staff.fullAddress?.state}, {staff.fullAddress?.country}, {staff.fullAddress?.pincode}</p>
              
//               <h6 className="mt-3 text-secondary">Social Media</h6>
//               <p><i className="fa-brands fa-linkedin me-2 text-primary"></i> {staff.socialmedia?.linkedin || "N/A"}</p>
//               <p><i className="fa-brands fa-instagram me-2 text-danger"></i> {staff.socialmedia?.instagram || "N/A"}</p>

//               <h6 className="mt-3 text-secondary">Portfolio</h6>
//               <p><i className="fa-solid fa-briefcase me-2 text-success"></i> {staff.portfolios?.portfolio || "N/A"}</p>
//               <p><i className="fa-brands fa-behance me-2 text-info"></i> {staff.portfolios?.behance || "N/A"}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Send Money Modal */}
//       {showModal && (
//         <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content rounded-3">
//               <div className="modal-header">
//                 <h5 className="modal-title">Send Money</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">IFSC Code</label>
//                   <input 
//                     type="text" 
//                     className="form-control"
//                     value={ifsc}
//                     onChange={(e) => setIfsc(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Account Number</label>
//                   <input 
//                     type="text" 
//                     className="form-control"
//                     value={account}
//                     onChange={(e) => setAccount(e.target.value)}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Amount (₹)</label>
//                   <input 
//                     type="number" 
//                     className="form-control"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   type="button" 
//                   className="btn btn-secondary" 
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-primary"
//                   onClick={handleSendMoney}
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Backdrop */}
//       {showModal && <div className="modal-backdrop fade show"></div>}
//     </div>
//   );
// };

// export default FreelancersView;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Url } from "src/url/url";

const FreelancersView = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
const [bankApproved, SetBankApporved] = useState(false);
  // Single state for form inputs
  const [formData, setFormData] = useState({
    ifsc: "",
    account: "",
    amount: "",
  });

  // Fetch staff data
  useEffect(() => {
    if (id) {
      axios
        .get(`${Url}/staff/by-freelancer/${id}`)
        .then((res) => {
          setStaff(res.data);
        })
        .catch((err) => {
          console.error("Error fetching staff:", err);
        });
    }
  }, [id]);

  if (!staff) return <p className="text-center mt-5">Loading...</p>;

  // Handle input changes for modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle send money button inside modal
  const handleSendMoney = () => {
    const { ifsc, account, amount } = formData;

    if (!ifsc || !account || !amount) {
      alert("Please fill all fields");
      return;
    }

    // Create final payload object
    const payload = {
      ...formData,
      staffId: staff._id,
    };

    console.log("Sending money object:", payload);

    // Example API call
    // axios.post(`${Url}/payment/send`, payload)
    //   .then(res => console.log("Payment success:", res.data))
    //   .catch(err => console.error("Payment error:", err));

    // Reset form and close modal
    setShowModal(false);
    setFormData({ ifsc: "", account: "", amount: "" });
  };
console.log("staff",staff)
  return (
    <div className="container mt-5">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-2xl p-5 mb-4 text-center border">
        <h2 className="text-2xl font-bold text-primary">
          {staff.name} <span className="text-muted">({staff.role})</span>
        </h2>
        <p className="text-secondary">{staff.email}</p>
        <span
          className={`badge ${staff.isActive ? "bg-success" : "bg-danger"} px-3 py-2 mt-2`}
        >
          {staff.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Grid Layout */}
      <div className="row g-4">
        {/* Basic Info */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">Basic Info</h5>
              <p><i className="fa-solid fa-envelope me-2 text-secondary"></i> {staff.email}</p>
              <p><i className="fa-solid fa-phone me-2 text-secondary"></i> {staff.phone}</p>
              <p><i className="fa-solid fa-calendar-days me-2 text-secondary"></i> DOB: {staff.dob || "N/A"}</p>
              <p><i className="fa-solid fa-check-circle me-2 text-secondary"></i> Experience: {staff.experience || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">Skills</h5>
              {staff.skill && staff.skill.length > 0 ? (
                staff.skill.map((s, i) => (
                  <span key={i} className="badge bg-info text-dark me-2 mb-2 p-2">{s}</span>
                ))
              ) : (
                <p>No skills added</p>
              )}
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">Bank Details</h5>
              <p><i className="fa-solid fa-building-columns me-2 text-secondary"></i> Bank: {staff.bankDetail?.name || "N/A"}</p>
              <p>Account: {staff.bankDetail?.accountNumber || "N/A"}</p>
              <p>IFSC: {staff.bankDetail?.ifscCode || "N/A"}</p>
              {/* <p>VerifiedbyStaff: {staff.bankDetail?.staffverifiedbank || "Unverified"} <i className="fa-solid fa-circle-check text-success"></i></p> */}
             <p>
  VerifiedbyStaff:{" "}
  {staff.bankDetail?.staffverifiedbank === "verified" ? (
    <>
      Verified <i className="fa-solid fa-circle-check text-success"></i>
    </>
  ) : (
    <>
      Unverified <i className="fa-solid fa-circle-xmark text-danger"></i>
    </>
  )}
</p>

              <p>VerifiedbyAdmin: {staff.bankDetail?.bankverifiedByAdmin || "unverified"}</p>
              <button
                className="btn bg-primary text-white"
                onClick={() => setShowModal(true)}
              >
                verification amount
              </button>
              <div className="text-end">
              <button
                className="btn bg-success text-white ms-2"
                onClick={() => SetBankApporved(true)}
              >
                Bank Approved <i class="fa-regular fa-thumbs-up"></i>
              </button>
                <p>click to Bank approved by admin</p>

              </div>
            </div>
          </div>
        </div>

        {/* Address & Social */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-body">
              <h5 className="card-title text-primary mb-3">Address</h5>
              <p>{staff.fullAddress?.street}, {staff.fullAddress?.building}, {staff.fullAddress?.state}, {staff.fullAddress?.country}, {staff.fullAddress?.pincode}</p>

              <h6 className="mt-3 text-secondary">Social Media</h6>
              <p><i className="fa-brands fa-linkedin me-2 text-primary"></i> {staff.socialmedia?.linkedin || "N/A"}</p>
              <p><i className="fa-brands fa-instagram me-2 text-danger"></i> {staff.socialmedia?.instagram || "N/A"}</p>

              <h6 className="mt-3 text-secondary">Portfolio</h6>
              <p><i className="fa-solid fa-briefcase me-2 text-success"></i> {staff.portfolios?.portfolio || "N/A"}</p>
              <p><i className="fa-brands fa-behance me-2 text-info"></i> {staff.portfolios?.behance || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Send Money Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-3">
              <div className="modal-header">
                <h5 className="modal-title">Send Money</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">IFSC Code</label>
                  <input
                    type="text"
                    name="ifsc"
                    className="form-control"
                    value={formData.ifsc}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    name="account"
                    className="form-control"
                    value={formData.account}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendMoney}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      
      {bankApproved && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-3">
              <div className="modal-header">
                <h6 className="modal-title">Really you want to Approved the bank Account</h6>
                <button type="button" className="btn-close" onClick={() => SetBankApporved(false)}></button>
              </div>
              {/* <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">IFSC Code</label>
                  <input
                    type="text"
                    name="ifsc"
                    className="form-control"
                    value={formData.ifsc}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    name="account"
                    className="form-control"
                    value={formData.account}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div> */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => SetBankApporved(false)}
                >
                  Cancel <i className="fa-solid fa-xmark"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSendMoney}
                >
                  Proceed  <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default FreelancersView;
