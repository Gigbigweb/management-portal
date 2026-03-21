// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Container } from '@mui/material';
// import axios from "axios";
// import { useParams, useNavigate } from 'react-router-dom';
// import { Url } from 'src/url/url';
// import Swal from 'sweetalert2';

// const StaffUpdateprofile = () => {
//   const { id } = useParams(); 
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [skillInput, setSkillInput] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     role: '',
//     address: '',
//     phone: '',
//     dob: '',
//     experience: '',
//     skill: ['']
//   });

//   const [roleAllData, setRoleAllData] = useState([]);

//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const res = await axios.get(`${Url}/staff/singlestaff/${id}`);
//         const data = res.data.data;
//         setFormData({
//           name: data.name || '',
//           email: data.contact?.email || '',
//           role: data.role || '',
//           address: data.address || '',
//           phone: data.phone || '',
//           dob: data.dob || '',
//           experience: data.experience || '',
//           skill: data.skill || ['']
//         });
//       } catch (error) {
//         console.error('Error fetching staff:', error);
//       }
//     };

//     const fetchRoles = async () => {
//       try {
//         const res = await axios.get(`${Url}/role`);
//         setRoleAllData(res.data);
//       } catch (err) {
//         console.error('Error fetching roles:', err);
//       }
//     };

//     fetchStaff();
//     fetchRoles();
//   }, [id]);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSkillKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       const trimmed = skillInput.trim();
//       if (trimmed && !formData.skill.includes(trimmed)) {
//         setFormData(prev => ({ ...prev, skill: [...prev.skill, trimmed] }));
//         setSkillInput('');
//       } else if (formData.skill.includes(trimmed)) {
//         toast.warning("Skill already added!");
//       }
//     }
//   };

//   const removeSkill = (index) => {
//     const updated = [...formData.skill];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, skill: updated }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = { ...formData };
//       const res = await axios.put(`${Url}/staff/staffupdate/${id}`, payload);

//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Staff updated successfully ✅',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         navigate('/dashboard/staff');
//       });
//     } catch (err) {
//       console.error('Update Error:', err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong ❌',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Teamlans | Update Staff</title>
//       </Helmet>
//       <Container className='card bg-white rounded border p-3'>
//         <section>
//           <form className="form" onSubmit={handleSubmit}>
//             <div className="row">
//               {['name', 'email', 'phone', 'address', 'dob', 'experience'].map((field, idx) => (
//                 <div key={idx} className="col-lg-6 col-md-6 col-12 mb-2">
//                   <div className="form-group">
//                     <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                     <input
//                       type="text"
//                       name={field}
//                       placeholder={`Enter ${field}`}
//                       className="form-control addpackageinput"
//                       value={formData[field]}
//                       onChange={formHandle}
//                     />
//                   </div>
//                 </div>
//               ))}

//               <div className="col-lg-6 col-md-6 col-12 mb-2">
//                 <div className="form-group">
//                   <label>Role</label>
//                   <select
//                     name="role"
//                     className="form-control addpackageinput"
//                     value={formData.role}
//                     onChange={formHandle}
//                   >
//                     <option value="">Choose Role</option>
//                     {roleAllData.map((roleValue, index) => (
//                       <option key={index} value={roleValue.role}>
//                         {roleValue.role}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="col-12 mb-3">
//                 <label>Skills</label>

//                 {/* Chips */}
//                 <div className="d-flex flex-wrap gap-2 mb-2">
//                   {formData.skill.map((skill, index) => (
//                     <span key={index} className="badge bg-primary px-3 py-2 rounded-pill d-flex align-items-center">
//                       {skill}
//                       <button
//                         type="button"
//                         onClick={() => removeSkill(index)}
//                         className="btn-close btn-close-white ms-2"
//                         aria-label="Remove"
//                         style={{ fontSize: '0.7rem' }}
//                       ></button>
//                     </span>
//                   ))}
//                 </div>

//                 {/* Input with Add Button */}
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     className="form-control addpackageinput"
//                     placeholder="Type a skill"
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     onKeyDown={handleSkillKeyDown}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={() => {
//                       const trimmed = skillInput.trim();
//                       if (trimmed && !formData.skill.includes(trimmed)) {
//                         setFormData(prev => ({ ...prev, skill: [...prev.skill, trimmed] }));
//                         setSkillInput('');
//                       } else if (formData.skill.includes(trimmed)) {
//                         toast.warning("Skill already added!");
//                       }
//                     }}
//                   >
//                     + Add Skill
//                   </button>
//                 </div>
//               </div>

//               <div className="col-12 mb-2">
//                 <button type="submit" className="btn btn-primary border shadow">
//                   {loading ? "Updating..." : "Update"}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </section>
//       </Container>
//     </>
//   );
// };

// export default StaffUpdateprofile;























// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Container } from '@mui/material';
// import axios from "axios";
// import { useParams, useNavigate } from 'react-router-dom';
// import { Url } from 'src/url/url';
// import Swal from 'sweetalert2';

// const StaffUpdateprofile = () => {
//   const { id } = useParams(); 
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [skillInput, setSkillInput] = useState('');

//   const [formData, setFormData] = useState({
//     firstName: '',
//     role: '',
//     address: '',
//     dob: '',
//     experience: '',
//     skill: [''],
//     contact: {
//       email: '',
//       phone: '',
//       whatsappNumber: ''
//     }
//   });

//   const [roleAllData, setRoleAllData] = useState([]);

//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const res = await axios.get(`${Url}/staff/singlestaff/${id}`);

//         const data = res.data.data;
//         setFormData({
//           firstName: data.firstName || '',
//           role: data.role || '',
//           address: data.address || '',
//           dob: data.dob || '',
//           experience: data.experience || '',
//           skill: data.skill || [''],
//           contact: {
//             email: data.contact?.email || '',
//             phone: data.contact?.phone || '',
//             whatsappNumber: data.contact?.whatsappNumber || ''
//           }
//         });
//       } catch (error) {
//         console.error('Error fetching staff:', error);
//       }
//     };

//     const fetchRoles = async () => {
//       try {
//         const res = await axios.get(`${Url}/role`);
//         setRoleAllData(res.data);
//       } catch (err) {
//         console.error('Error fetching roles:', err);
//       }
//     };

//     fetchStaff();
//     fetchRoles();
//   }, [id]);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     if (['email', 'phone', 'whatsappNumber'].includes(name)) {
//       setFormData(prev => ({
//         ...prev,
//         contact: {
//           ...prev.contact,
//           [name]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSkillKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       const trimmed = skillInput.trim();
//       if (trimmed && !formData.skill.includes(trimmed)) {
//         setFormData(prev => ({ ...prev, skill: [...prev.skill, trimmed] }));
//         setSkillInput('');
//       } else if (formData.skill.includes(trimmed)) {
//         toast.warning("Skill already added!");
//       }
//     }
//   };

//   const removeSkill = (index) => {
//     const updated = [...formData.skill];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, skill: updated }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = { ...formData };
//       const res = await axios.put(`${Url}/staff/staffupdate/${id}`, payload);

//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Staff updated successfully ✅',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         navigate('/dashboard/staff');
//       });
//     } catch (err) {
//       console.error('Update Error:', err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong ❌',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
// console.log("formData",formData)
//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Teamlans | Update Staff</title>
//       </Helmet>
//       <Container className='card bg-white rounded border p-3'>
//         <section>
//           <form className="form" onSubmit={handleSubmit}>
//             <div className="row">
//               {/* Basic Fields */}
//               {['firstName', 'address', 'dob', 'experience'].map((field, idx) => (
//                 <div key={idx} className="col-lg-6 col-md-6 col-12 mb-2">
//                   <div className="form-group">
//                     <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                     <input
//                       type="text"
//                       name={field}
//                       placeholder={`Enter ${field}`}
//                       className="form-control addpackageinput"
//                       value={formData[field]}
//                       onChange={formHandle}
//                     />
//                   </div>
//                 </div>
//               ))}
//                 {/* Role Select */}
//                 <div className="col-lg-6 col-md-6 col-12 mb-2">
//                 <div className="form-group">
//                   <label>Role</label>
//                   <select
//                     name="role"
//                     className="form-control addpackageinput"
//                     value={formData.role}
//                     onChange={formHandle}
//                   >
//                     <option value="">Choose Role</option>
//                     {roleAllData.map((roleValue, index) => (
//                       <option key={index} value={roleValue.role}>
//                         {roleValue.role}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Contact Details Section */}
//               <div className="col-12 mt-4 mb-2">
//                 <h5 className="text-primary">Contact Details <small className="text-muted">(Optional)</small></h5>
//                 <hr />
//               </div>

//               <div className="col-lg-6 col-md-6 col-12 mb-2">
//                 <label>Contact Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   placeholder="Enter contact email"
//                   value={formData.contact.email}
//                   onChange={formHandle}
//                 />
//               </div>

//               <div className="col-lg-6 col-md-6 col-12 mb-2">
//                 <label>Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   className="form-control"
//                   placeholder="Enter phone number"
//                   value={formData.contact.phone}
//                   onChange={formHandle}
//                 />
//               </div>

//               <div className="col-lg-6 col-md-6 col-12 mb-4">
//                 <label>WhatsApp Number</label>
//                 <input
//                   type="text"
//                   name="whatsappNumber"
//                   className="form-control"
//                   placeholder="Enter WhatsApp number"
//                   value={formData.contact.whatsappNumber}
//                   onChange={formHandle}
//                 />
//               </div>

            

//               {/* Skills */}
//               <div className="col-12 mb-3">
//                 <label>Skills</label>
//                 <div className="d-flex flex-wrap gap-2 mb-2">
//                   {formData.skill.map((skill, index) => (
//                     <span key={index} className="badge bg-primary px-3 py-2 rounded-pill d-flex align-items-center">
//                       {skill}
//                       <button
//                         type="button"
//                         onClick={() => removeSkill(index)}
//                         className="btn-close btn-close-white ms-2"
//                         aria-label="Remove"
//                         style={{ fontSize: '0.7rem' }}
//                       ></button>
//                     </span>
//                   ))}
//                 </div>

//                 <div className="input-group">
//                   <input
//                     type="text"
//                     className="form-control addpackageinput"
//                     placeholder="Type a skill"
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     onKeyDown={handleSkillKeyDown}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={() => {
//                       const trimmed = skillInput.trim();
//                       if (trimmed && !formData.skill.includes(trimmed)) {
//                         setFormData(prev => ({ ...prev, skill: [...prev.skill, trimmed] }));
//                         setSkillInput('');
//                       } else if (formData.skill.includes(trimmed)) {
//                         toast.warning("Skill already added!");
//                       }
//                     }}
//                   >
//                     + Add Skill
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="col-12 mb-2">
//                 <button type="submit" className="btn btn-primary border shadow">
//                   {loading ? "Updating..." : "Update"}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </section>
//       </Container>
//     </>
//   );
// };

// export default StaffUpdateprofile;









import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Url } from 'src/url/url';
import Swal from 'sweetalert2';

// ─── Constants ────────────────────────────────────────────────────────────────
const INITIAL_FORM = {
  firstName:  '',
  role:       '',
  address:    '',
  dob:        '',
  experience: '',
  skill:      [],
  contact: {
    email:           '',
    phone:           '',
    whatsappNumber:  '',
  },
};

const CONTACT_FIELDS = ['email', 'phone', 'whatsappNumber'];

const BASIC_FIELDS = [
  { name: 'firstName',  label: 'First Name',  type: 'text'  },
  { name: 'address',    label: 'Address',      type: 'text'  },
  { name: 'dob',        label: 'Date of Birth',type: 'date'  },
  { name: 'experience', label: 'Experience',   type: 'text'  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const SkillBadge = ({ skill, onRemove }) => (
  <span className="badge bg-primary px-3 py-2 rounded-pill d-flex align-items-center gap-1">
    {skill}
    <button
      type="button"
      onClick={onRemove}
      className="btn-close btn-close-white ms-1"
      aria-label={`Remove ${skill}`}
      style={{ fontSize: '0.65rem' }}
    />
  </span>
);

const FormField = ({ label, children }) => (
  <div className="col-lg-6 col-md-6 col-12 mb-3">
    <div className="form-group">
      {label && <label className="fw-semibold mb-1">{label}</label>}
      {children}
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="col-12 mt-3 mb-2">
    <h6 className="text-primary fw-bold mb-1">
      {title}
      {subtitle && <small className="text-muted fw-normal ms-2">{subtitle}</small>}
    </h6>
    <hr className="mt-1" />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const StaffUpdateprofile = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [formData,     setFormData]     = useState(INITIAL_FORM);
  const [roleAllData,  setRoleAllData]  = useState([]);
  const [skillInput,   setSkillInput]   = useState('');
  const [loading,      setLoading]      = useState(false);
  const [fetching,     setFetching]     = useState(true);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const fetchStaff = useCallback(async () => {
    try {
      const { data } = await axios.get(`${Url}/staff/singlestaff/${id}`);
      const d = data.data;
      setFormData({
        ...INITIAL_FORM,
        firstName:  d.firstName  || '',
        role:       d.role       || '',
        address:    d.address    || '',
        dob:        d.dob        || '',
        experience: d.experience || '',
        skill:      Array.isArray(d.skill) ? d.skill : [],
        contact: {
          email:          d.contact?.email          || '',
          phone:          d.contact?.phone          || '',
          whatsappNumber: d.contact?.whatsappNumber || '',
        },
      });
    } catch (err) {
      console.error('Error fetching staff:', err);
      toast.error('Failed to load staff data');
    } finally {
      setFetching(false);
    }
  }, [id]);

  const fetchRoles = useCallback(async () => {
    try {
      const { data } = await axios.get(`${Url}/role`);
      setRoleAllData(data);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
    fetchRoles();
  }, [fetchStaff, fetchRoles]);

  // ── Form handlers ──────────────────────────────────────────────────────────
  const formHandle = useCallback((e) => {
    const { name, value } = e.target;
    if (CONTACT_FIELDS.includes(name)) {
      setFormData(prev => ({ ...prev, contact: { ...prev.contact, [name]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const addSkill = useCallback(() => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (formData.skill.includes(trimmed)) {
      toast.warning('Skill already added!');
      return;
    }
    setFormData(prev => ({ ...prev, skill: [...prev.skill, trimmed] }));
    setSkillInput('');
  }, [skillInput, formData.skill]);

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      skill: prev.skill.filter((_, i) => i !== index),
    }));
  }, []);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${Url}/staff/staffupdate/${id}`, formData);
      await Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Staff updated successfully ✅',
        confirmButtonText: 'OK',
      });
      navigate('/dashboard/staff');
    } catch (err) {
      console.error('Update Error:', err);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong ❌' });
    } finally {
      setLoading(false);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (fetching) return (
    <Container className="card bg-white rounded border p-4 text-center text-muted">
      Loading staff data…
    </Container>
  );

  return (
    <>
      <ToastContainer />
      <Helmet><title>Teamlans | Update Staff</title></Helmet>

      <Container className="card bg-white rounded border p-3">
        <section>
          <h5 className="fw-bold mb-3">Update Staff Profile</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">

              {/* ── Basic Fields ── */}
              {BASIC_FIELDS.map(({ name, label, type }) => (
                <FormField key={name} label={label}>
                  <input
                    type={type}
                    name={name}
                    placeholder={`Enter ${label}`}
                    className="form-control"
                    value={formData[name]}
                    onChange={formHandle}
                  />
                </FormField>
              ))}

              {/* ── Role Select ── */}
              <FormField label="Role">
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={formHandle}
                >
                  <option value="">Choose Role</option>
                  {roleAllData.map((r, i) => (
                    <option key={i} value={r.role}>{r.role}</option>
                  ))}
                </select>
              </FormField>

              {/* ── Contact Details ── */}
              <SectionHeader title="Contact Details" subtitle="(Optional)" />

              <FormField label="Contact Email">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter contact email"
                  className="form-control"
                  value={formData.contact.email}
                  onChange={formHandle}
                />
              </FormField>

              <FormField label="Phone">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  className="form-control"
                  value={formData.contact.phone}
                  onChange={formHandle}
                />
              </FormField>

              <FormField label="WhatsApp Number">
                <input
                  type="tel"
                  name="whatsappNumber"
                  placeholder="Enter WhatsApp number"
                  className="form-control"
                  value={formData.contact.whatsappNumber}
                  onChange={formHandle}
                />
              </FormField>

              {/* ── Skills ── */}
              <SectionHeader title="Skills" />

              <div className="col-12 mb-3">
                {/* Skill badges */}
                {formData.skill.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {formData.skill.map((skill, index) => (
                      <SkillBadge
                        key={`${skill}-${index}`}
                        skill={skill}
                        onRemove={() => removeSkill(index)}
                      />
                    ))}
                  </div>
                )}

                {/* Skill input */}
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a skill and press Enter or ,"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={addSkill}
                  >
                    + Add
                  </button>
                </div>
                <small className="text-muted">Press Enter or comma to add a skill</small>
              </div>

              {/* ── Submit ── */}
              <div className="col-12 mb-2">
                <button
                  type="submit"
                  className="btn btn-primary px-4 shadow-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2" />Updating…</>
                  ) : 'Update Staff'}
                </button>
              </div>

            </div>
          </form>
        </section>
      </Container>
    </>
  );
};

export default StaffUpdateprofile;


