// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Url } from "src/url/url";

// const S3_BASE = "https://s3.ap-south-1.amazonaws.com/bucket.gigbig/";

// const ImagePicker = ({ preview, onChange }) => {
//   const ref = useRef();
//   return (
//     <div
//       onClick={() => ref.current.click()}
//       style={{ border: "2px dashed #c4b5fd", borderRadius: 10, cursor: "pointer", overflow: "hidden", background: "#faf5ff", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}
//     >
//       {preview ? (
//         <img src={preview} alt="" style={{ width: "100%", maxHeight: 140, objectFit: "cover", display: "block" }} />
//       ) : (
//         <div style={{ textAlign: "center", color: "#7c3aed", padding: 12 }}>
//           <div style={{ fontSize: 20 }}>📷</div>
//           <p style={{ margin: "3px 0 0", fontSize: 12, color: "#374151" }}>Click to select combo image</p>
//           <p style={{ margin: 0, fontSize: 10, color: "#9ca3af" }}>Backend uploads to S3</p>
//         </div>
//       )}
//       <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={onChange} />
//     </div>
//   );
// };

// const ComboCard = ({ combo, onEdit, onDelete }) => (
//   <div
//     style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s" }}
//     onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 20px rgba(99,102,241,0.12)"}
//     onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"}
//   >
//     {combo.image && (
//       <img
//         src={`${S3_BASE}${combo.image}`}
//         alt=""
//         style={{ width: "100%", height: 130, objectFit: "cover" }}
//         onError={e => { e.target.style.display = "none"; }}
//       />
//     )}
//     <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <div>
//         <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>COMBO PACK</p>
//         <h3 style={{ margin: "2px 0 0", color: "#fff", fontSize: 15, fontWeight: 700 }}>{combo.comboName}</h3>
//       </div>
//       <div style={{ display: "flex", gap: 5 }}>
//         <button onClick={() => onEdit(combo)} style={{ background: "#ffffff22", border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", color: "#fff", fontSize: 14 }}>✏️</button>
//         <button onClick={() => onDelete(combo._id)} style={{ background: "#ff444422", border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>🗑️</button>
//       </div>
//     </div>
//     <div style={{ padding: "12px 16px" }}>
//       {combo.description && <p style={{ margin: "0 0 8px", fontSize: 12, color: "#6b7280" }}>{combo.description}</p>}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
//         {combo.services.map((s, i) => (
//           <span key={i} style={{ background: "#f3f4f6", borderRadius: 20, padding: "3px 9px", fontSize: 11, color: "#374151", fontWeight: 500 }}>{s.serviceName}</span>
//         ))}
//       </div>
//       <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
//         <span style={{ fontSize: 20, fontWeight: 800, color: "#1f2937" }}>₹{combo.finalPrice}</span>
//         {combo.discountPercentage > 0 && (
//           <>
//             <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>₹{combo.comboPrice}</span>
//             <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>{combo.discountPercentage}% OFF</span>
//           </>
//         )}
//       </div>
//       <p style={{ margin: "4px 0 0", fontSize: 11, color: "#9ca3af" }}>{combo.services.length} services included</p>
//     </div>
//   </div>
// );

// const ComboServices = () => {
//   const [combos, setCombos]             = useState([]);
//   const [allServices, setAllServices]   = useState([]);
//   const [showModal, setShowModal]       = useState(false);
//   const [editing, setEditing]           = useState(null);
//   const [loading, setLoading]           = useState(false);
//   const [saving, setSaving]             = useState(false);
//   const [toast, setToast]               = useState(null);
//   const [search, setSearch]             = useState("");
//   const [imageFile, setImageFile]       = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [form, setForm] = useState({
//     comboName: "", description: "", selectedIds: [], comboPrice: "", discountPercentage: "",
//   });

//   useEffect(() => { loadServices(); loadCombos(); }, []);

//   const loadServices = async () => {
//     try {
//       const res = await axios.get(`${Url}/service/getallServices`);
//       setAllServices(res.data?.data || []);
//     } catch (e) { console.error("Services:", e); }
//   };

//   const loadCombos = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${Url}/api/combo/all`);
//       setCombos(res.data?.data || []);
//     } catch (e) { console.error("Combos:", e); }
//     finally { setLoading(false); }
//   };

//   const notify = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const openCreate = () => {
//     setEditing(null);
//     setForm({ comboName: "", description: "", selectedIds: [], comboPrice: "", discountPercentage: "" });
//     setImageFile(null);
//     setImagePreview("");
//     setSearch("");
//     setShowModal(true);
//   };

//   const openEdit = (c) => {
//     setEditing(c);
//     setForm({
//       comboName: c.comboName,
//       description: c.description || "",
//       selectedIds: c.services.map(s => s.serviceId?._id || s.serviceId),
//       comboPrice: c.comboPrice,
//       discountPercentage: String(c.discountPercentage || ""),
//     });
//     setImageFile(null);
//     setImagePreview(c.image ? `${S3_BASE}${c.image}` : "");
//     setSearch("");
//     setShowModal(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const toggle = (id) => {
//     setForm(p => ({
//       ...p,
//       selectedIds: p.selectedIds.includes(id)
//         ? p.selectedIds.filter(x => x !== id)
//         : [...p.selectedIds, id],
//     }));
//   };

//   const finalPrice = (() => {
//     const p = Number(form.comboPrice);
//     const d = Number(form.discountPercentage) || 0;
//     return p ? Math.round(p - p * d / 100) : null;
//   })();

//   const submit = async () => {
//     if (!form.comboName.trim()) return notify("Enter combo name", "error");
//     if (form.selectedIds.length < 2) return notify("Select at least 2 services", "error");
//     if (!form.comboPrice) return notify("Enter combo price", "error");

//     setSaving(true);

//     const fd = new FormData();
//     fd.append("comboName", form.comboName);
//     fd.append("description", form.description);
//     fd.append("comboPrice", form.comboPrice);
//     fd.append("discountPercentage", Number(form.discountPercentage) || 0);
//     fd.append("serviceIds", form.selectedIds.join(","));
//     if (imageFile) {
//       fd.append("image", imageFile);
//     }

//     try {
//       if (editing) {
//         await axios.put(`${Url}/api/combo/update/${editing._id}`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await axios.post(`${Url}/api/combo/create`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       notify(editing ? "Combo updated!" : "Combo created!");
//       setShowModal(false);
//       loadCombos();
//     } catch (e) {
//       notify(e?.response?.data?.message || "Error saving combo", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const del = async (id) => {
//     if (!window.confirm("Delete this combo?")) return;
//     try {
//       await axios.delete(`${Url}/api/combo/delete/${id}`);
//       notify("Deleted");
//       loadCombos();
//     } catch {
//       notify("Delete failed", "error");
//     }
//   };

//   const filtered = allServices.filter(s =>
//     s.serviceName?.toLowerCase().includes(search.toLowerCase())
//   );

//   const inp = { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fafafa", fontFamily: "inherit" };
//   const lbl = { fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" };

//   return (
//     <div style={{ minHeight: "100vh", background: "#f8f8fc", fontFamily: "'Segoe UI', sans-serif" }}>

//       {toast && (
//         <div style={{ position: "fixed", top: 20, right: 20, zIndex: 999999, background: toast.type === "error" ? "#fee2e2" : "#dcfce7", color: toast.type === "error" ? "#dc2626" : "#16a34a", border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 500, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
//           {toast.msg}
//         </div>
//       )}

//       <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div>
//           <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1f2937" }}>
//             <span style={{ color: "#6366f1" }}>Combo</span> Services
//           </h1>
//           <p style={{ margin: 0, color: "#9ca3af", fontSize: 12 }}>Bundle services into combo packages</p>
//         </div>
//         <button onClick={openCreate} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
//           + Create Combo
//         </button>
//       </div>

//       <div style={{ padding: "24px 28px" }}>
//         {loading ? (
//           <div style={{ textAlign: "center", padding: 80, color: "#9ca3af" }}>Loading...</div>
//         ) : combos.length === 0 ? (
//           <div style={{ textAlign: "center", padding: 80 }}>
//             <div style={{ fontSize: 44 }}>📦</div>
//             <p style={{ color: "#9ca3af", margin: "8px 0 0" }}>No combos yet. Create your first one!</p>
//           </div>
//         ) : (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
//             {combos.map(c => (
//               <ComboCard key={c._id} combo={c} onEdit={openEdit} onDelete={del} />
//             ))}
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div
//           onClick={() => setShowModal(false)}
//           style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, padding: 16 }}
//         >
//           <div
//             onClick={e => e.stopPropagation()}
//             style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 560, maxHeight: "92vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", padding: "22px 24px" }}
//           >
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//               <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{editing ? "Edit Combo" : "Create Combo"}</h2>
//               <button onClick={() => setShowModal(false)} style={{ background: "#f3f4f6", border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✕</button>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

//               <div>
//                 <label style={lbl}>
//                   Combo Image
//                   <span style={{ marginLeft: 6, fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>backend → S3</span>
//                 </label>
//                 <ImagePicker preview={imagePreview} onChange={handleImageChange} />
//               </div>

//               <div>
//                 <label style={lbl}>Combo Name *</label>
//                 <input
//                   value={form.comboName}
//                   onChange={e => setForm(p => ({ ...p, comboName: e.target.value }))}
//                   placeholder="e.g. Startup Branding Pack"
//                   style={inp}
//                 />
//               </div>

//               <div>
//                 <label style={lbl}>Description</label>
//                 <textarea
//                   value={form.description}
//                   onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
//                   rows={2}
//                   placeholder="What's included in this combo..."
//                   style={{ ...inp, resize: "vertical" }}
//                 />
//               </div>

//               <div>
//                 <label style={lbl}>
//                   Select Services *
//                   <span style={{ marginLeft: 7, background: form.selectedIds.length > 0 ? "#ede9fe" : "#f3f4f6", color: form.selectedIds.length > 0 ? "#7c3aed" : "#9ca3af", borderRadius: 20, padding: "1px 8px", fontSize: 11, fontWeight: 700 }}>
//                     {form.selectedIds.length} selected
//                   </span>
//                 </label>

//                 <div style={{ position: "relative", marginBottom: 8 }}>
//                   <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#9ca3af" }}>🔍</span>
//                   <input
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     placeholder={`Search from ${allServices.length} services...`}
//                     style={{ ...inp, paddingLeft: 30 }}
//                   />
//                 </div>

//                 {form.selectedIds.length > 0 && (
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
//                     {form.selectedIds.map(id => {
//                       const svc = allServices.find(s => s._id === id);
//                       return svc ? (
//                         <span key={id} style={{ background: "#6366f1", color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
//                           {svc.serviceName}
//                           <span onClick={() => toggle(id)} style={{ cursor: "pointer", fontWeight: 700 }}>×</span>
//                         </span>
//                       ) : null;
//                     })}
//                   </div>
//                 )}

//                 <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 10, maxHeight: 260, overflowY: "auto" }}>
//                   {filtered.length === 0 ? (
//                     <div style={{ padding: 20, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
//                       {search ? "No services match your search" : "No services available"}
//                     </div>
//                   ) : (
//                     filtered.map((s, idx) => {
//                       const selected = form.selectedIds.includes(s._id);
//                       return (
//                         <div
//                           key={s._id}
//                           onClick={() => toggle(s._id)}
//                           style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", cursor: "pointer", background: selected ? "#f0f0ff" : idx % 2 === 0 ? "#fff" : "#fafafa", borderBottom: idx < filtered.length - 1 ? "1px solid #f3f4f6" : "none", transition: "background 0.1s" }}
//                         >
//                           <img
//                             src={`${S3_BASE}${s.image}`}
//                             alt={s.serviceName}
//                             style={{ width: 36, height: 36, borderRadius: 7, objectFit: "cover", flexShrink: 0 }}
//                             onError={e => { e.target.style.display = "none"; }}
//                           />
//                           <div style={{ flex: 1, minWidth: 0 }}>
//                             <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#1f2937", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.serviceName}</p>
//                             <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>₹{s.basePrice || s.price}</p>
//                           </div>
//                           <div style={{ width: 20, height: 20, borderRadius: "50%", background: selected ? "#6366f1" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, flexShrink: 0, fontWeight: 700 }}>
//                             {selected ? "✓" : ""}
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//                 <div>
//                   <label style={lbl}>Combo Price (₹) *</label>
//                   <input type="number" value={form.comboPrice} onChange={e => setForm(p => ({ ...p, comboPrice: e.target.value }))} placeholder="999" style={inp} />
//                 </div>
//                 <div>
//                   <label style={lbl}>Discount (%)</label>
//                   <input type="number" value={form.discountPercentage} onChange={e => setForm(p => ({ ...p, discountPercentage: e.target.value }))} placeholder="10" min={0} max={100} style={inp} />
//                 </div>
//               </div>

//               {finalPrice !== null && (
//                 <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <span style={{ fontSize: 13, color: "#15803d", fontWeight: 500 }}>Final Price After Discount</span>
//                   <span style={{ fontSize: 18, fontWeight: 800, color: "#15803d" }}>₹{finalPrice}</span>
//                 </div>
//               )}

//               <button
//                 onClick={submit}
//                 disabled={saving}
//                 style={{ background: saving ? "#c4b5fd" : "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}
//               >
//                 {saving ? "Saving..." : editing ? "Update Combo" : "Create Combo"}
//               </button>

//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ComboServices;

















// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Url } from "src/url/url";

// const S3_BASE = "https://s3.ap-south-1.amazonaws.com/bucket.gigbig/";

// const ImagePicker = ({ preview, onChange }) => {
//   const ref = useRef();
//   return (
//     <div
//       onClick={() => ref.current.click()}
//       style={{ border: "2px dashed #c4b5fd", borderRadius: 10, cursor: "pointer", overflow: "hidden", background: "#faf5ff", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}
//     >
//       {preview ? (
//         <img src={preview} alt="" style={{ width: "100%", maxHeight: 140, objectFit: "cover", display: "block" }} />
//       ) : (
//         <div style={{ textAlign: "center", color: "#7c3aed", padding: 12 }}>
//           <div style={{ fontSize: 20 }}>📷</div>
//           <p style={{ margin: "3px 0 0", fontSize: 12, color: "#374151" }}>Click to select combo image</p>
//           <p style={{ margin: 0, fontSize: 10, color: "#9ca3af" }}>Backend uploads to S3</p>
//         </div>
//       )}
//       <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={onChange} />
//     </div>
//   );
// };

// const ComboCard = ({ combo, onEdit, onDelete }) => (
//   <div
//     style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s" }}
//     onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 20px rgba(99,102,241,0.12)"}
//     onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"}
//   >
//     {combo.image && (
//       <img
//         src={`${S3_BASE}${combo.image}`}
//         alt=""
//         style={{ width: "100%", height: 130, objectFit: "cover" }}
//         onError={e => { e.target.style.display = "none"; }}
//       />
//     )}
//     <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <div>
//         <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>COMBO PACK</p>
//         <h3 style={{ margin: "2px 0 0", color: "#fff", fontSize: 15, fontWeight: 700 }}>{combo.comboName}</h3>
//         {combo.category?.category && (
//           <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{combo.category.category}</p>
//         )}
//       </div>
//       <div style={{ display: "flex", gap: 5 }}>
//         <button onClick={() => onEdit(combo)} style={{ background: "#ffffff22", border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", color: "#fff", fontSize: 14 }}>✏️</button>
//         <button onClick={() => onDelete(combo._id)} style={{ background: "#ff444422", border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>🗑️</button>
//       </div>
//     </div>
//     <div style={{ padding: "12px 16px" }}>
//       {combo.description && <p style={{ margin: "0 0 8px", fontSize: 12, color: "#6b7280" }}>{combo.description}</p>}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
//         {combo.services.map((s, i) => (
//           <span key={i} style={{ background: "#f3f4f6", borderRadius: 20, padding: "3px 9px", fontSize: 11, color: "#374151", fontWeight: 500 }}>{s.serviceName}</span>
//         ))}
//       </div>
//       <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
//         <span style={{ fontSize: 20, fontWeight: 800, color: "#1f2937" }}>₹{combo.finalPrice}</span>
//         {combo.discountPercentage > 0 && (
//           <>
//             <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>₹{combo.comboPrice}</span>
//             <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>{combo.discountPercentage}% OFF</span>
//           </>
//         )}
//       </div>
//       <p style={{ margin: "4px 0 0", fontSize: 11, color: "#9ca3af" }}>{combo.services.length} services included</p>
//     </div>
//   </div>
// );

// const ComboServices = () => {
//   const [combos, setCombos]             = useState([]);
//   const [allServices, setAllServices]   = useState([]);
//   const [categories, setCategories]     = useState([]);
//   const [showModal, setShowModal]       = useState(false);
//   const [editing, setEditing]           = useState(null);
//   const [loading, setLoading]           = useState(false);
//   const [saving, setSaving]             = useState(false);
//   const [toast, setToast]               = useState(null);
//   const [search, setSearch]             = useState("");
//   const [imageFile, setImageFile]       = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [form, setForm] = useState({
//     comboName: "", description: "", selectedIds: [],
//     comboPrice: "", discountPercentage: "", category: "",
//   });

//   useEffect(() => { loadServices(); loadCombos(); loadCategories(); }, []);

//   const loadServices = async () => {
//     try {
//       const res = await axios.get(`${Url}/service/getallServices`);
//       setAllServices(res.data?.data || []);
//     } catch (e) { console.error("Services:", e); }
//   };

//   const loadCombos = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${Url}/api/combo/all`);
//       setCombos(res.data?.data || []);
//     } catch (e) { console.error("Combos:", e); }
//     finally { setLoading(false); }
//   };

//   // Category API: GET /category  →  array of { _id, category, ... }
//   const loadCategories = async () => {
//     try {
//       const res = await axios.get(`${Url}/category`);
//       // response can be array directly or { data: [...] }
//       const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
//       setCategories(list);
//     } catch (e) { console.error("Categories:", e); }
//   };

//   const notify = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const openCreate = () => {
//     setEditing(null);
//     setForm({ comboName: "", description: "", selectedIds: [], comboPrice: "", discountPercentage: "", category: "" });
//     setImageFile(null);
//     setImagePreview("");
//     setSearch("");
//     setShowModal(true);
//   };

//   const openEdit = (c) => {
//     setEditing(c);
//     setForm({
//       comboName: c.comboName,
//       description: c.description || "",
//       selectedIds: c.services.map(s => s.serviceId?._id || s.serviceId),
//       comboPrice: c.comboPrice,
//       discountPercentage: String(c.discountPercentage || ""),
//       category: c.category?._id || c.category || "",
//     });
//     setImageFile(null);
//     setImagePreview(c.image ? `${S3_BASE}${c.image}` : "");
//     setSearch("");
//     setShowModal(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const toggle = (id) => {
//     setForm(p => ({
//       ...p,
//       selectedIds: p.selectedIds.includes(id)
//         ? p.selectedIds.filter(x => x !== id)
//         : [...p.selectedIds, id],
//     }));
//   };

//   const finalPrice = (() => {
//     const p = Number(form.comboPrice);
//     const d = Number(form.discountPercentage) || 0;
//     return p ? Math.round(p - p * d / 100) : null;
//   })();

//   const submit = async () => {
//     if (!form.comboName.trim()) return notify("Enter combo name", "error");
//     if (form.selectedIds.length < 2) return notify("Select at least 2 services", "error");
//     if (!form.comboPrice) return notify("Enter combo price", "error");

//     setSaving(true);

//     const fd = new FormData();
//     fd.append("comboName", form.comboName);
//     fd.append("description", form.description);
//     fd.append("comboPrice", form.comboPrice);
//     fd.append("discountPercentage", Number(form.discountPercentage) || 0);
//     fd.append("serviceIds", form.selectedIds.join(","));
//     if (form.category) fd.append("category", form.category);
//     if (imageFile) fd.append("image", imageFile);

//     try {
//       if (editing) {
//         await axios.put(`${Url}/api/combo/update/${editing._id}`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await axios.post(`${Url}/api/combo/create`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       notify(editing ? "Combo updated!" : "Combo created!");
//       setShowModal(false);
//       loadCombos();
//     } catch (e) {
//       notify(e?.response?.data?.message || "Error saving combo", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const del = async (id) => {
//     if (!window.confirm("Delete this combo?")) return;
//     try {
//       await axios.delete(`${Url}/api/combo/delete/${id}`);
//       notify("Deleted");
//       loadCombos();
//     } catch {
//       notify("Delete failed", "error");
//     }
//   };

//   const filtered = allServices.filter(s =>
//     s.serviceName?.toLowerCase().includes(search.toLowerCase())
//   );

//   const inp = { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fafafa", fontFamily: "inherit" };
//   const lbl = { fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" };

//   return (
//     <div style={{ minHeight: "100vh", background: "#f8f8fc", fontFamily: "'Segoe UI', sans-serif" }}>

//       {toast && (
//         <div style={{ position: "fixed", top: 20, right: 20, zIndex: 999999, background: toast.type === "error" ? "#fee2e2" : "#dcfce7", color: toast.type === "error" ? "#dc2626" : "#16a34a", border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 500, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
//           {toast.msg}
//         </div>
//       )}

//       {/* Header */}
//       <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div>
//           <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1f2937" }}>
//             <span style={{ color: "#6366f1" }}>Combo</span> Services
//           </h1>
//           <p style={{ margin: 0, color: "#9ca3af", fontSize: 12 }}>Bundle services into combo packages</p>
//         </div>
//         <button onClick={openCreate} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
//           + Create Combo
//         </button>
//       </div>

//       {/* Grid */}
//       <div style={{ padding: "24px 28px" }}>
//         {loading ? (
//           <div style={{ textAlign: "center", padding: 80, color: "#9ca3af" }}>Loading...</div>
//         ) : combos.length === 0 ? (
//           <div style={{ textAlign: "center", padding: 80 }}>
//             <div style={{ fontSize: 44 }}>📦</div>
//             <p style={{ color: "#9ca3af", margin: "8px 0 0" }}>No combos yet. Create your first one!</p>
//           </div>
//         ) : (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
//             {combos.map(c => (
//               <ComboCard key={c._id} combo={c} onEdit={openEdit} onDelete={del} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div
//           onClick={() => setShowModal(false)}
//           style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, padding: 16 }}
//         >
//           <div
//             onClick={e => e.stopPropagation()}
//             style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 560, maxHeight: "92vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", padding: "22px 24px" }}
//           >
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//               <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{editing ? "Edit Combo" : "Create Combo"}</h2>
//               <button onClick={() => setShowModal(false)} style={{ background: "#f3f4f6", border: "none", borderRadius: 7, width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✕</button>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

//               {/* Image */}
//               <div>
//                 <label style={lbl}>
//                   Combo Image
//                   <span style={{ marginLeft: 6, fontSize: 10, color: "#9ca3af", fontWeight: 400 }}>backend → S3</span>
//                 </label>
//                 <ImagePicker preview={imagePreview} onChange={handleImageChange} />
//               </div>

//               {/* Combo Name */}
//               <div>
//                 <label style={lbl}>Combo Name *</label>
//                 <input
//                   value={form.comboName}
//                   onChange={e => setForm(p => ({ ...p, comboName: e.target.value }))}
//                   placeholder="e.g. Startup Branding Pack"
//                   style={inp}
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label style={lbl}>Description</label>
//                 <textarea
//                   value={form.description}
//                   onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
//                   rows={2}
//                   placeholder="What's included in this combo..."
//                   style={{ ...inp, resize: "vertical" }}
//                 />
//               </div>

//               {/* Category Dropdown */}
//               <div>
//                 <label style={lbl}>Category</label>
//                 <select
//                   value={form.category}
//                   onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
//                   style={{ ...inp, cursor: "pointer", color: form.category ? "#1f2937" : "#9ca3af" }}
//                 >
//                   <option value="">-- Select Category --</option>
//                   {categories.map(cat => (
//                     <option key={cat._id} value={cat._id}>{cat.category}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Service Selector */}
//               <div>
//                 <label style={lbl}>
//                   Select Services *
//                   <span style={{ marginLeft: 7, background: form.selectedIds.length > 0 ? "#ede9fe" : "#f3f4f6", color: form.selectedIds.length > 0 ? "#7c3aed" : "#9ca3af", borderRadius: 20, padding: "1px 8px", fontSize: 11, fontWeight: 700 }}>
//                     {form.selectedIds.length} selected
//                   </span>
//                 </label>

//                 <div style={{ position: "relative", marginBottom: 8 }}>
//                   <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#9ca3af" }}>🔍</span>
//                   <input
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     placeholder={`Search from ${allServices.length} services...`}
//                     style={{ ...inp, paddingLeft: 30 }}
//                   />
//                 </div>

//                 {form.selectedIds.length > 0 && (
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
//                     {form.selectedIds.map(id => {
//                       const svc = allServices.find(s => s._id === id);
//                       return svc ? (
//                         <span key={id} style={{ background: "#6366f1", color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
//                           {svc.serviceName}
//                           <span onClick={() => toggle(id)} style={{ cursor: "pointer", fontWeight: 700 }}>×</span>
//                         </span>
//                       ) : null;
//                     })}
//                   </div>
//                 )}

//                 <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 10, maxHeight: 260, overflowY: "auto" }}>
//                   {filtered.length === 0 ? (
//                     <div style={{ padding: 20, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
//                       {search ? "No services match your search" : "No services available"}
//                     </div>
//                   ) : (
//                     filtered.map((s, idx) => {
//                       const selected = form.selectedIds.includes(s._id);
//                       return (
//                         <div
//                           key={s._id}
//                           onClick={() => toggle(s._id)}
//                           style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", cursor: "pointer", background: selected ? "#f0f0ff" : idx % 2 === 0 ? "#fff" : "#fafafa", borderBottom: idx < filtered.length - 1 ? "1px solid #f3f4f6" : "none", transition: "background 0.1s" }}
//                         >
//                           <img
//                             src={`${S3_BASE}${s.image}`}
//                             alt={s.serviceName}
//                             style={{ width: 36, height: 36, borderRadius: 7, objectFit: "cover", flexShrink: 0 }}
//                             onError={e => { e.target.style.display = "none"; }}
//                           />
//                           <div style={{ flex: 1, minWidth: 0 }}>
//                             <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#1f2937", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.serviceName}</p>
//                             <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>₹{s.basePrice || s.price}</p>
//                           </div>
//                           <div style={{ width: 20, height: 20, borderRadius: "50%", background: selected ? "#6366f1" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, flexShrink: 0, fontWeight: 700 }}>
//                             {selected ? "✓" : ""}
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               </div>

//               {/* Pricing */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//                 <div>
//                   <label style={lbl}>Combo Price (₹) *</label>
//                   <input type="number" value={form.comboPrice} onChange={e => setForm(p => ({ ...p, comboPrice: e.target.value }))} placeholder="999" style={inp} />
//                 </div>
//                 <div>
//                   <label style={lbl}>Discount (%)</label>
//                   <input type="number" value={form.discountPercentage} onChange={e => setForm(p => ({ ...p, discountPercentage: e.target.value }))} placeholder="10" min={0} max={100} style={inp} />
//                 </div>
//               </div>

//               {/* Final Price Preview */}
//               {finalPrice !== null && (
//                 <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <span style={{ fontSize: 13, color: "#15803d", fontWeight: 500 }}>Final Price After Discount</span>
//                   <span style={{ fontSize: 18, fontWeight: 800, color: "#15803d" }}>₹{finalPrice}</span>
//                 </div>
//               )}

//               {/* Submit */}
//               <button
//                 onClick={submit}
//                 disabled={saving}
//                 style={{ background: saving ? "#c4b5fd" : "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer" }}
//               >
//                 {saving ? "Saving..." : editing ? "Update Combo" : "Create Combo"}
//               </button>

//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default ComboServices;





import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Url } from "src/url/url";
import { Container } from "@mui/material";
import { permissions } from "src/utils/SessionfileData";

const S3_BASE = "https://s3.ap-south-1.amazonaws.com/bucket.gigbig/";

const ImagePicker = ({ preview, onChange }) => {
  const ref = useRef();
  return (
    <div
      onClick={() => ref.current.click()}
      style={{
        border: "2px dashed #c4b5fd",
        borderRadius: 10,
        cursor: "pointer",
        overflow: "hidden",
        background: "#faf5ff",
        minHeight: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {preview ? (
        <img
          src={preview}
          alt=""
          style={{ width: "100%", maxHeight: 140, objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{ textAlign: "center", color: "#7c3aed", padding: 12 }}>
          <div style={{ fontSize: 20 }}>📷</div>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#374151" }}>Click to select combo image</p>
          <p style={{ margin: 0, fontSize: 10, color: "#9ca3af" }}>Backend uploads to S3</p>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={onChange} />
    </div>
  );
};

const ComboCard = ({ combo, onEdit, onDelete, canEdit, canDelete }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 14,
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      transition: "box-shadow 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 20px rgba(99,102,241,0.12)")}
    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)")}
  >
    {combo.image && (
      <img
        src={`${S3_BASE}${combo.image}`}
        alt=""
        style={{ width: "100%", height: 130, objectFit: "cover" }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    )}
    <div
      style={{
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        padding: "14px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.7)",
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          COMBO PACK
        </p>
        <h3 style={{ margin: "2px 0 0", color: "#fff", fontSize: 15, fontWeight: 700 }}>
          {combo.comboName}
        </h3>
        {combo.category?.category && (
          <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
            {combo.category.category}
          </p>
        )}
      </div>

      {/* ✅ Only show action buttons if canEdit or canDelete */}
      {(canEdit || canDelete) && (
        <div style={{ display: "flex", gap: 5 }}>
          {canEdit && (
            <button
              onClick={() => onEdit(combo)}
              style={{
                background: "#ffffff22",
                border: "none",
                borderRadius: 7,
                width: 30,
                height: 30,
                cursor: "pointer",
                color: "#fff",
                fontSize: 14,
              }}
            >
              ✏️
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => onDelete(combo._id)}
              style={{
                background: "#ff444422",
                border: "none",
                borderRadius: 7,
                width: 30,
                height: 30,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              🗑️
            </button>
          )}
        </div>
      )}
    </div>

    <div style={{ padding: "12px 16px" }}>
      {combo.description && (
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "#6b7280" }}>{combo.description}</p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
        {combo.services.map((s, i) => (
          <span
            key={i}
            style={{
              background: "#f3f4f6",
              borderRadius: 20,
              padding: "3px 9px",
              fontSize: 11,
              color: "#374151",
              fontWeight: 500,
            }}
          >
            {s.serviceName}
          </span>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px solid #f3f4f6",
          paddingTop: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 800, color: "#1f2937" }}>₹{combo.finalPrice}</span>
        {combo.discountPercentage > 0 && (
          <>
            <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
              ₹{combo.comboPrice}
            </span>
            <span
              style={{
                background: "#dcfce7",
                color: "#16a34a",
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 20,
              }}
            >
              {combo.discountPercentage}% OFF
            </span>
          </>
        )}
      </div>
      <p style={{ margin: "4px 0 0", fontSize: 11, color: "#9ca3af" }}>
        {combo.services.length} services included
      </p>
    </div>
  </div>
);

const ComboServices = () => {
  // ✅ Permission setup - same as Package component
  const perm      = permissions?.comboServices || {};
  const enabled   = perm?.enable === true;
  const canAdd    = perm?.add    === true;
  const canEdit   = perm?.edit   === true;
  const canDelete = perm?.delete === true;

  const [combos, setCombos]             = useState([]);
  const [allServices, setAllServices]   = useState([]);
  const [categories, setCategories]     = useState([]);
  const [showModal, setShowModal]       = useState(false);
  const [editing, setEditing]           = useState(null);
  const [loading, setLoading]           = useState(false);
  const [saving, setSaving]             = useState(false);
  const [toast, setToast]               = useState(null);
  const [search, setSearch]             = useState("");
  const [imageFile, setImageFile]       = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [form, setForm] = useState({
    comboName: "",
    description: "",
    selectedIds: [],
    comboPrice: "",
    discountPercentage: "",
    category: "",
  });

  useEffect(() => {
    loadServices();
    loadCombos();
    loadCategories();
  }, []);

  const loadServices = async () => {
    try {
      const res = await axios.get(`${Url}/service/getallServices`);
      setAllServices(res.data?.data || []);
    } catch (e) {
      console.error("Services:", e);
    }
  };

  const loadCombos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${Url}/api/combo/all`);
      setCombos(res.data?.data || []);
    } catch (e) {
      console.error("Combos:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${Url}/category`);
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setCategories(list);
    } catch (e) {
      console.error("Categories:", e);
    }
  };

  const notify = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({
      comboName: "",
      description: "",
      selectedIds: [],
      comboPrice: "",
      discountPercentage: "",
      category: "",
    });
    setImageFile(null);
    setImagePreview("");
    setSearch("");
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      comboName: c.comboName,
      description: c.description || "",
      selectedIds: c.services.map((s) => s.serviceId?._id || s.serviceId),
      comboPrice: c.comboPrice,
      discountPercentage: String(c.discountPercentage || ""),
      category: c.category?._id || c.category || "",
    });
    setImageFile(null);
    setImagePreview(c.image ? `${S3_BASE}${c.image}` : "");
    setSearch("");
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const toggle = (id) => {
    setForm((p) => ({
      ...p,
      selectedIds: p.selectedIds.includes(id)
        ? p.selectedIds.filter((x) => x !== id)
        : [...p.selectedIds, id],
    }));
  };

  const finalPrice = (() => {
    const p = Number(form.comboPrice);
    const d = Number(form.discountPercentage) || 0;
    return p ? Math.round(p - (p * d) / 100) : null;
  })();

  const submit = async () => {
    if (!form.comboName.trim()) return notify("Enter combo name", "error");
    if (form.selectedIds.length < 2) return notify("Select at least 2 services", "error");
    if (!form.comboPrice) return notify("Enter combo price", "error");

    setSaving(true);

    const fd = new FormData();
    fd.append("comboName", form.comboName);
    fd.append("description", form.description);
    fd.append("comboPrice", form.comboPrice);
    fd.append("discountPercentage", Number(form.discountPercentage) || 0);
    fd.append("serviceIds", form.selectedIds.join(","));
    if (form.category) fd.append("category", form.category);
    if (imageFile) fd.append("image", imageFile);

    try {
      if (editing) {
        await axios.put(`${Url}/api/combo/update/${editing._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${Url}/api/combo/create`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      notify(editing ? "Combo updated!" : "Combo created!");
      setShowModal(false);
      loadCombos();
    } catch (e) {
      notify(e?.response?.data?.message || "Error saving combo", "error");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete this combo?")) return;
    try {
      await axios.delete(`${Url}/api/combo/delete/${id}`);
      notify("Deleted");
      loadCombos();
    } catch {
      notify("Delete failed", "error");
    }
  };

  const filtered = allServices.filter((s) =>
    s.serviceName?.toLowerCase().includes(search.toLowerCase())
  );

  const inp = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 8,
    border: "1.5px solid #e5e7eb",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    background: "#fafafa",
    fontFamily: "inherit",
  };
  const lbl = {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 5,
    display: "block",
  };

  // ✅ ACCESS DENIED - same as Package component
  if (!enabled) {
    return (
      <Container>
        <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}>
          <div style={{ fontSize: 50 }}>🔒</div>
          <h4 style={{ marginTop: 16, color: "#1e293b" }}>Access Denied</h4>
          <p>Aapke paas is page ka access nahi hai.</p>
        </div>
      </Container>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8fc", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 999999,
            background: toast.type === "error" ? "#fee2e2" : "#dcfce7",
            color: toast.type === "error" ? "#dc2626" : "#16a34a",
            border: `1px solid ${toast.type === "error" ? "#fca5a5" : "#86efac"}`,
            borderRadius: 10,
            padding: "10px 16px",
            fontSize: 13,
            fontWeight: 500,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "18px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1f2937" }}>
            <span style={{ color: "#6366f1" }}>Combo</span> Services
          </h1>
          <p style={{ margin: 0, color: "#9ca3af", fontSize: 12 }}>
            Bundle services into combo packages
          </p>
        </div>

        {/* ✅ canAdd check - same as Package */}
        {canAdd && (
          <button
            onClick={openCreate}
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "9px 18px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Create Combo
          </button>
        )}
      </div>

      {/* Grid */}
      <div style={{ padding: "24px 28px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#9ca3af" }}>Loading...</div>
        ) : combos.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <div style={{ fontSize: 44 }}>📦</div>
            <p style={{ color: "#9ca3af", margin: "8px 0 0" }}>
              No combos yet. Create your first one!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            {combos.map((c) => (
              // ✅ canEdit & canDelete pass to ComboCard
              <ComboCard
                key={c._id}
                combo={c}
                onEdit={openEdit}
                onDelete={del}
                canEdit={canEdit}
                canDelete={canDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 18,
              width: "100%",
              maxWidth: 560,
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
                {editing ? "Edit Combo" : "Create Combo"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: 7,
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Image */}
              <div>
                <label style={lbl}>
                  Combo Image
                  <span
                    style={{ marginLeft: 6, fontSize: 10, color: "#9ca3af", fontWeight: 400 }}
                  >
                    backend → S3
                  </span>
                </label>
                <ImagePicker preview={imagePreview} onChange={handleImageChange} />
              </div>

              {/* Combo Name */}
              <div>
                <label style={lbl}>Combo Name *</label>
                <input
                  value={form.comboName}
                  onChange={(e) => setForm((p) => ({ ...p, comboName: e.target.value }))}
                  placeholder="e.g. Startup Branding Pack"
                  style={inp}
                />
              </div>

              {/* Description */}
              <div>
                <label style={lbl}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={2}
                  placeholder="What's included in this combo..."
                  style={{ ...inp, resize: "vertical" }}
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label style={lbl}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  style={{
                    ...inp,
                    cursor: "pointer",
                    color: form.category ? "#1f2937" : "#9ca3af",
                  }}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Selector */}
              <div>
                <label style={lbl}>
                  Select Services *
                  <span
                    style={{
                      marginLeft: 7,
                      background: form.selectedIds.length > 0 ? "#ede9fe" : "#f3f4f6",
                      color: form.selectedIds.length > 0 ? "#7c3aed" : "#9ca3af",
                      borderRadius: 20,
                      padding: "1px 8px",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {form.selectedIds.length} selected
                  </span>
                </label>

                <div style={{ position: "relative", marginBottom: 8 }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 13,
                      color: "#9ca3af",
                    }}
                  >
                    🔍
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search from ${allServices.length} services...`}
                    style={{ ...inp, paddingLeft: 30 }}
                  />
                </div>

                {form.selectedIds.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                    {form.selectedIds.map((id) => {
                      const svc = allServices.find((s) => s._id === id);
                      return svc ? (
                        <span
                          key={id}
                          style={{
                            background: "#6366f1",
                            color: "#fff",
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 11,
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          {svc.serviceName}
                          <span
                            onClick={() => toggle(id)}
                            style={{ cursor: "pointer", fontWeight: 700 }}
                          >
                            ×
                          </span>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}

                <div
                  style={{
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 10,
                    maxHeight: 260,
                    overflowY: "auto",
                  }}
                >
                  {filtered.length === 0 ? (
                    <div
                      style={{ padding: 20, textAlign: "center", color: "#9ca3af", fontSize: 13 }}
                    >
                      {search ? "No services match your search" : "No services available"}
                    </div>
                  ) : (
                    filtered.map((s, idx) => {
                      const selected = form.selectedIds.includes(s._id);
                      return (
                        <div
                          key={s._id}
                          onClick={() => toggle(s._id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 12px",
                            cursor: "pointer",
                            background: selected
                              ? "#f0f0ff"
                              : idx % 2 === 0
                              ? "#fff"
                              : "#fafafa",
                            borderBottom:
                              idx < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
                            transition: "background 0.1s",
                          }}
                        >
                          <img
                            src={`${S3_BASE}${s.image}`}
                            alt={s.serviceName}
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 7,
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: 600,
                                fontSize: 13,
                                color: "#1f2937",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {s.serviceName}
                            </p>
                            <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>
                              ₹{s.basePrice || s.price}
                            </p>
                          </div>
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: selected ? "#6366f1" : "#e5e7eb",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: 11,
                              flexShrink: 0,
                              fontWeight: 700,
                            }}
                          >
                            {selected ? "✓" : ""}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={lbl}>Combo Price (₹) *</label>
                  <input
                    type="number"
                    value={form.comboPrice}
                    onChange={(e) => setForm((p) => ({ ...p, comboPrice: e.target.value }))}
                    placeholder="999"
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Discount (%)</label>
                  <input
                    type="number"
                    value={form.discountPercentage}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, discountPercentage: e.target.value }))
                    }
                    placeholder="10"
                    min={0}
                    max={100}
                    style={inp}
                  />
                </div>
              </div>

              {/* Final Price Preview */}
              {finalPrice !== null && (
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: 10,
                    padding: "10px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#15803d", fontWeight: 500 }}>
                    Final Price After Discount
                  </span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#15803d" }}>
                    ₹{finalPrice}
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={submit}
                disabled={saving}
                style={{
                  background: saving
                    ? "#c4b5fd"
                    : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "Saving..." : editing ? "Update Combo" : "Create Combo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComboServices;