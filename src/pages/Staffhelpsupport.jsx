// "use client";

// /**
//  * StaffHelpSupport.jsx
//  *
//  * Used by: Management Staff & Admin Assistant
//  * - Shows only tickets assigned to them
//  * - Can reply (real-time chat)
//  * - Can escalate to Admin Assistant (staff only) OR back to Admin
//  * - Real-time updates via Socket.IO
//  */

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";


// // ─── Constants ───────────────────────────────────────────────────────────────
// const STATUS_COLORS = {
//   open:          { bg: "#fff3e0", text: "#e65100", dot: "#f57c00" },
//   "in-progress": { bg: "#e3f2fd", text: "#01579b", dot: "#0288d1" },
//   resolved:      { bg: "#e8f5e9", text: "#1b5e20", dot: "#388e3c" },
//   closed:        { bg: "#f5f5f5", text: "#424242", dot: "#9e9e9e" },
// };
// const PRIORITY_COLORS = {
//   high:   { bg: "#ffebee", text: "#b71c1c" },
//   medium: { bg: "#fff8e1", text: "#f57f17" },
//   low:    { bg: "#e8f5e9", text: "#2e7d32" },
// };

// const Badge = ({ label, colorMap }) => {
//   const c = colorMap?.[label] || { bg: "#f0f0f0", text: "#555" };
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600,
//       background: c.bg, color: c.text,
//     }}>
//       {c.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}
//       {label}
//     </span>
//   );
// };

// // ─── Chat panel ──────────────────────────────────────────────────────────────
// const TicketChat = ({ ticket, staffId, staffName, onUpdate }) => {
//   const [text,    setText]    = useState("");
//   const [sending, setSending] = useState(false);
//   const chatEnd               = useRef(null);

//   useEffect(() => {
//     setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: "smooth" }), 80);
//   }, [ticket?.messages?.length]);

//   const sendReply = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sender:     "staff",
//           senderId:   staffId,
//           senderName: staffName,
//           message:    text.trim(),
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setText("");
//         onUpdate(data.ticket);
//       }
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Message send nahi hua." });
//     } finally {
//       setSending(false);
//     }
//   };

//   const fmtTime = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//   const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
//   const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

//   return (
//     <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//       {/* Messages */}
//       <div style={{
//         flex: 1, overflowY: "auto", padding: 16,
//         background: "#f8fafc", display: "flex", flexDirection: "column", gap: 12,
//         minHeight: 280, maxHeight: 400,
//       }}>
//         {(ticket?.messages || []).map((msg, i) => {
//           const isMe     = msg.senderId === staffId || (msg.sender === "admin" && staffId === "admin");
//           const isSystem = msg.senderName === "System";
//           if (isSystem) return (
//             <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
//               <span style={{ background: "#e2e8f0", padding: "2px 10px", borderRadius: 50 }}>{msg.message}</span>
//             </div>
//           );
//           return (
//             <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
//               {!isMe && (
//                 <div style={{
//                   width: 28, height: 28, borderRadius: "50%", background: "#e0f2fe",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 11, fontWeight: 700, color: "#0288d1",
//                   marginRight: 8, flexShrink: 0, alignSelf: "flex-end",
//                 }}>
//                   {(msg.senderName || "?").charAt(0).toUpperCase()}
//                 </div>
//               )}
//               <div style={{ maxWidth: "72%" }}>
//                 {!isMe && (
//                   <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, marginLeft: 2 }}>
//                     {msg.senderName} {msg.sender === "client" ? "👤" : "🛡️"}
//                   </div>
//                 )}
//                 <div style={{
//                   padding: "10px 14px",
//                   borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
//                   background: isMe ? "#0288d1" : "#fff",
//                   color: isMe ? "#fff" : "#1a1a2e",
//                   fontSize: 13, lineHeight: 1.5,
//                   boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
//                   border: isMe ? "none" : "1px solid #e8edf2",
//                 }}>
//                   {msg.message}
//                 </div>
//                 <div style={{ fontSize: 10, color: "#94a3b8", textAlign: isMe ? "right" : "left", marginTop: 3 }}>
//                   {fmtDate(msg.createdAt)} · {fmtTime(msg.createdAt)}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={chatEnd} />
//       </div>

//       {/* Input */}
//       {isClosed ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#94a3b8", borderTop: "1px solid #f0f0f0" }}>
//           🔒 Ticket {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display: "flex", gap: 8, padding: "12px 16px", alignItems: "center", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
//           <input
//             type="text" placeholder="Client ko reply karein..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendReply()}
//             style={{
//               flex: 1, padding: "9px 14px", borderRadius: 50,
//               border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc",
//             }}
//           />
//           <button
//             onClick={sendReply} disabled={!text.trim() || sending}
//             style={{
//               width: 38, height: 38, borderRadius: "50%",
//               background: text.trim() ? "#0288d1" : "#e0e0e0",
//               border: "none", color: "#fff", cursor: text.trim() ? "pointer" : "default",
//               display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//             }}
//           >
//             {sending ? "⋯" : "➤"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // Props: { staffId, staffName, staffRole: "staff" | "admin-assistant", adminAssistantList? }
// // ════════════════════════════════════════════════════════════════════════════
// const StaffHelpSupport = ({ staffId, staffName, staffRole = "staff", adminAssistantList = [] }) => {
//   const [tickets,      setTickets]      = useState([]);
//   const [activeTicket, setActiveTicket] = useState(null);
//   const [loading,      setLoading]      = useState(true);
//   const [tab,          setTab]          = useState("all"); // "all" | "open" | "in-progress" | "resolved"

//   // Escalate modal
//   const [showEscalate,  setShowEscalate]  = useState(false);
//   const [escalateForm,  setEscalateForm]  = useState({
//     toRole: staffRole === "staff" ? "admin-assistant" : "admin",
//     toId:   "",
//     toName: "",
//     reason: "",
//   });
//   const [escalating, setEscalating] = useState(false);

//   const socketRef = useRef(null);

//   // ── Socket.IO ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!staffId) return;

//     const socket  = socketIo(Url, { transports: ["websocket"] });
//     socketRef.current = socket;

//     // Join personal user room (existing pattern in your app)
//     const token = localStorage.getItem("staffToken") || sessionStorage.getItem("staffToken") || "";
//     if (token) socket.emit("join", token);

//     // New ticket assigned to me
//     socket.on("support:assigned_to_you", (data) => {
//       Swal.fire({
//         toast: true, position: "top-end", icon: "info", showConfirmButton: false,
//         timer: 5000, title: `New Ticket Assigned: #${data.ticketCode}`,
//         text: `${data.subject} — ${data.clientName}`,
//       });
//       fetchTickets();
//     });

//     // Ticket updated (reply came in)
//     socket.on("support:ticket_updated", (updated) => {
//       if (updated.assignedTo?.id !== staffId) {
//         // Ticket was re-assigned away from me → remove from list
//         setTickets((prev) => prev.filter((t) => t._id !== updated._id));
//         setActiveTicket((prev) => (prev?._id === updated._id ? null : prev));
//         return;
//       }
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       setActiveTicket((prev) => (prev?._id === updated._id ? updated : prev));
//     });

//     return () => socket.disconnect();
//   }, [staffId]);

//   // ── Fetch Assigned Tickets ──────────────────────────────────────────────
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const data = await res.json();
//       if (res.ok) setTickets(data.tickets || []);
//     } catch { console.error("Failed to fetch tickets"); }
//     finally { setLoading(false); }
//   }, [staffId]);

//   useEffect(() => { fetchTickets(); }, [fetchTickets]);

//   // ── Escalate ────────────────────────────────────────────────────────────
//   const handleEscalate = async () => {
//     if (!activeTicket || !escalateForm.reason.trim()) {
//       Swal.fire({ icon: "warning", title: "Reason required", text: "Escalation reason likhein." });
//       return;
//     }
//     setEscalating(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromId:   staffId,
//           fromName: staffName,
//           toRole:   escalateForm.toRole,
//           toId:     escalateForm.toRole === "admin" ? null : escalateForm.toId,
//           toName:   escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName,
//           reason:   escalateForm.reason,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Escalated!", timer: 2000, showConfirmButton: false });
//         // Remove ticket from my list since it's no longer assigned to me
//         setTickets((prev) => prev.filter((t) => t._id !== activeTicket._id));
//         setActiveTicket(null);
//         setShowEscalate(false);
//         setEscalateForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: data.message });
//       }
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." });
//     } finally {
//       setEscalating(false);
//     }
//   };

//   // ── Filtered list by tab ────────────────────────────────────────────────
//   const displayed = tab === "all"
//     ? tickets
//     : tickets.filter((t) => t.status === tab);

//   const formatDate = (d) =>
//     new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

//   const tabs = [
//     { key: "all",         label: "All",         count: tickets.length },
//     { key: "open",        label: "Open",        count: tickets.filter((t) => t.status === "open").length },
//     { key: "in-progress", label: "In Progress", count: tickets.filter((t) => t.status === "in-progress").length },
//     { key: "resolved",    label: "Resolved",    count: tickets.filter((t) => t.status === "resolved").length },
//   ];

//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>
//       {/* Header */}
//       <div style={{ marginBottom: 24 }}>
//         <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
//           🎧 My Support Tickets
//         </h2>
//         <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
//           Tickets assigned to you · {staffName} ({staffRole})
//         </p>
//       </div>

//       {/* Tabs */}
//       <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4 }}>
//         {tabs.map((t) => (
//           <button
//             key={t.key}
//             onClick={() => setTab(t.key)}
//             style={{
//               flex: 1, padding: "8px 12px", borderRadius: 8, border: "none",
//               background: tab === t.key ? "#fff" : "transparent",
//               boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
//               fontWeight: tab === t.key ? 700 : 500,
//               color: tab === t.key ? "#1976d2" : "#64748b",
//               cursor: "pointer", fontSize: 13,
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
//             }}
//           >
//             {t.label}
//             {t.count > 0 && (
//               <span style={{
//                 background: tab === t.key ? "#1976d2" : "#94a3b8",
//                 color: "#fff", borderRadius: 50, minWidth: 18, height: 18,
//                 display: "inline-flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 10, padding: "0 4px",
//               }}>
//                 {t.count}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Ticket List or Detail */}
//       {activeTicket ? (
//         /* ── Active Ticket Chat View ──────────────────────────────────── */
//         <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
//           {/* Header */}
//           <div style={{
//             padding: "14px 18px", background: "#f8fafc",
//             borderBottom: "1px solid #e2e8f0",
//             display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <button
//                 onClick={() => { setActiveTicket(null); setShowEscalate(false); }}
//                 style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#94a3b8" }}
//               >
//                 ←
//               </button>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>
//                   #{activeTicket.ticketId} —{" "}
//                   {activeTicket.subject === "Other" ? activeTicket.customSubject : activeTicket.subject}
//                 </div>
//                 <div style={{ fontSize: 11, color: "#64748b" }}>
//                   {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}
//                 </div>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
//               <Badge label={activeTicket.status}   colorMap={STATUS_COLORS} />
//               <Badge label={activeTicket.priority} colorMap={PRIORITY_COLORS} />
//               {activeTicket.status !== "closed" && activeTicket.status !== "resolved" && (
//                 <button
//                   onClick={() => setShowEscalate(!showEscalate)}
//                   style={{
//                     padding: "6px 14px", borderRadius: 8, border: "none",
//                     background: "#fff3e0", color: "#e65100",
//                     fontWeight: 600, fontSize: 12, cursor: "pointer",
//                     display: "flex", alignItems: "center", gap: 5,
//                   }}
//                 >
//                   ⬆️ Escalate
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Escalate Panel */}
//           {showEscalate && (
//             <div style={{ padding: 16, background: "#fffde7", borderBottom: "1px solid #ffe082" }}>
//               <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Escalate Ticket</div>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//                 {/* Target role */}
//                 <div>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Escalate To</label>
//                   <select
//                     value={escalateForm.toRole}
//                     onChange={(e) => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })}
//                     style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }}
//                   >
//                     {staffRole === "staff" && (
//                       <option value="admin-assistant">Admin Assistant</option>
//                     )}
//                     <option value="admin">Back to Admin</option>
//                   </select>
//                 </div>

//                 {/* Select admin assistant if applicable */}
//                 {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Select Assistant</label>
//                     <select
//                       value={escalateForm.toId}
//                       onChange={(e) => {
//                         const a = adminAssistantList.find((x) => x._id === e.target.value);
//                         setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" });
//                       }}
//                       style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13 }}
//                     >
//                       <option value="">-- Select --</option>
//                       {adminAssistantList.map((a) => (
//                         <option key={a._id} value={a._id}>{a.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 {/* Reason */}
//                 <div style={{ flex: 1, minWidth: 200 }}>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Reason *</label>
//                   <input
//                     type="text"
//                     placeholder="Escalation ka reason likhein..."
//                     value={escalateForm.reason}
//                     onChange={(e) => setEscalateForm({ ...escalateForm, reason: e.target.value })}
//                     style={{
//                       width: "100%", padding: "8px 12px", borderRadius: 8,
//                       border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box",
//                     }}
//                   />
//                 </div>

//                 <button
//                   onClick={handleEscalate}
//                   disabled={escalating || !escalateForm.reason.trim()}
//                   style={{
//                     padding: "9px 18px", borderRadius: 8, border: "none",
//                     background: escalating ? "#ffa726" : "#f57c00",
//                     color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
//                   }}
//                 >
//                   {escalating ? "Escalating..." : "⬆️ Escalate"}
//                 </button>
//                 <button
//                   onClick={() => setShowEscalate(false)}
//                   style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13 }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Chat */}
//           <TicketChat
//             ticket={activeTicket}
//             staffId={staffId}
//             staffName={staffName}
//             onUpdate={(updated) => {
//               setActiveTicket(updated);
//               setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//             }}
//           />
//         </div>
//       ) : (
//         /* ── Ticket List ──────────────────────────────────────────────── */
//         loading ? (
//           <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//             <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
//             <p>Loading tickets...</p>
//           </div>
//         ) : displayed.length === 0 ? (
//           <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//             <div style={{ fontSize: 48, marginBottom: 10 }}>🎉</div>
//             <p style={{ fontWeight: 600 }}>No tickets assigned to you.</p>
//             <p style={{ fontSize: 13 }}>Admin se request karo assignment ke liye.</p>
//           </div>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {displayed.map((ticket) => (
//               <div
//                 key={ticket._id}
//                 style={{
//                   border: "1.5px solid #e8edf2", borderRadius: 12, background: "#fff",
//                   boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden",
//                 }}
//               >
//                 <div style={{ padding: "14px 16px" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                     <div>
//                       <div style={{ fontWeight: 700, fontSize: 13 }}>
//                         #{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}
//                       </div>
//                       <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
//                         👤 {ticket.clientName} · {ticket.projectName || ticket.projectId}
//                         · {formatDate(ticket.createdAt)}
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", gap: 5 }}>
//                       <Badge label={ticket.status}   colorMap={STATUS_COLORS} />
//                       <Badge label={ticket.priority} colorMap={PRIORITY_COLORS} />
//                     </div>
//                   </div>

//                   {/* Last message */}
//                   <p style={{
//                     margin: "8px 0 0", fontSize: 12, color: "#64748b",
//                     display: "-webkit-box", WebkitLineClamp: 2,
//                     WebkitBoxOrient: "vertical", overflow: "hidden",
//                   }}>
//                     {ticket.messages?.[ticket.messages.length - 1]?.message}
//                   </p>
//                 </div>

//                 <div style={{
//                   borderTop: "1px solid #f0f4f8", padding: "10px 16px",
//                   background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center",
//                 }}>
//                   <span style={{ fontSize: 11, color: "#94a3b8" }}>
//                     {ticket.messages?.length || 0} messages
//                   </span>
//                   <button
//                     onClick={() => setActiveTicket(ticket)}
//                     style={{
//                       background: "#0288d1", color: "#fff", border: "none",
//                       borderRadius: 8, padding: "6px 14px",
//                       fontSize: 12, fontWeight: 600, cursor: "pointer",
//                       display: "flex", alignItems: "center", gap: 5,
//                     }}
//                   >
//                     💬 Open Chat
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default StaffHelpSupport;






















// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

// // ─── Constants ───────────────────────────────────────────────────────────────
// const STATUS_COLORS = {
//   open:          { bg: "#fff3e0", text: "#e65100", dot: "#f57c00" },
//   "in-progress": { bg: "#e3f2fd", text: "#01579b", dot: "#0288d1" },
//   resolved:      { bg: "#e8f5e9", text: "#1b5e20", dot: "#388e3c" },
//   closed:        { bg: "#f5f5f5", text: "#424242", dot: "#9e9e9e" },
// };
// const PRIORITY_COLORS = {
//   high:   { bg: "#ffebee", text: "#b71c1c" },
//   medium: { bg: "#fff8e1", text: "#f57f17" },
//   low:    { bg: "#e8f5e9", text: "#2e7d32" },
// };

// const Badge = ({ label, colorMap }) => {
//   const c = colorMap?.[label] || { bg: "#f0f0f0", text: "#555" };
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600,
//       background: c.bg, color: c.text,
//     }}>
//       {c.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}
//       {label}
//     </span>
//   );
// };

// // ─── Helper: session storage se management staff data nikalo ────────────────
// const getStaffFromSession = () => {
//   try {
//     // management_staff key mein JSON object hai: { _id, name, email, roleName, slug, ... }
//     const raw = sessionStorage.getItem("management_staff");
//     if (!raw) return null;
//     return JSON.parse(raw);
//   } catch {
//     return null;
//   }
// };

// const getTokenFromSession = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") ||
//   "";

// // ─── Chat Panel ──────────────────────────────────────────────────────────────
// const TicketChat = ({ ticket, staffId, staffName, onUpdate }) => {
//   const [text,    setText]    = useState("");
//   const [sending, setSending] = useState(false);
//   const chatEnd               = useRef(null);

//   useEffect(() => {
//     setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: "smooth" }), 80);
//   }, [ticket?.messages?.length]);

//   const sendReply = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sender:     "staff",
//           senderId:   staffId,
//           senderName: staffName,
//           message:    text.trim(),
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setText("");
//         onUpdate(data.ticket);
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: data.message || "Send failed." });
//       }
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Message send nahi hua." });
//     } finally {
//       setSending(false);
//     }
//   };

//   const fmtTime = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//   const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
//   const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       {/* Messages */}
//       <div style={{
//         overflowY: "auto", padding: 16, background: "#f8fafc",
//         display: "flex", flexDirection: "column", gap: 12,
//         minHeight: 280, maxHeight: 420,
//       }}>
//         {(ticket?.messages || []).length === 0 && (
//           <div style={{ textAlign: "center", color: "#94a3b8", paddingTop: 40, fontSize: 13 }}>
//             No messages yet.
//           </div>
//         )}
//         {(ticket?.messages || []).map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";

//           if (isSystem) return (
//             <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
//               <span style={{ background: "#e2e8f0", padding: "2px 12px", borderRadius: 50 }}>
//                 {msg.message}
//               </span>
//             </div>
//           );

//           return (
//             <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
//               {!isMe && (
//                 <div style={{
//                   width: 28, height: 28, borderRadius: "50%",
//                   background: msg.sender === "client" ? "#e3f2fd" : "#fce4ec",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 11, fontWeight: 700,
//                   color: msg.sender === "client" ? "#1976d2" : "#c2185b",
//                   marginRight: 8, flexShrink: 0, alignSelf: "flex-end",
//                 }}>
//                   {(msg.senderName || "?").charAt(0).toUpperCase()}
//                 </div>
//               )}
//               <div style={{ maxWidth: "72%" }}>
//                 {!isMe && (
//                   <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, marginLeft: 2 }}>
//                     {msg.senderName} {msg.sender === "client" ? "👤" : "🛡️"}
//                   </div>
//                 )}
//                 <div style={{
//                   padding: "10px 14px",
//                   borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
//                   background: isMe ? "#0288d1" : "#fff",
//                   color: isMe ? "#fff" : "#1a1a2e",
//                   fontSize: 13, lineHeight: 1.5,
//                   boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
//                   border: isMe ? "none" : "1px solid #e8edf2",
//                 }}>
//                   {msg.message}
//                 </div>
//                 <div style={{
//                   fontSize: 10, color: "#94a3b8",
//                   textAlign: isMe ? "right" : "left", marginTop: 3,
//                 }}>
//                   {fmtDate(msg.createdAt)} · {fmtTime(msg.createdAt)}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={chatEnd} />
//       </div>

//       {/* Input */}
//       {isClosed ? (
//         <div style={{
//           padding: "12px 16px", textAlign: "center",
//           fontSize: 12, color: "#94a3b8", borderTop: "1px solid #f0f0f0",
//         }}>
//           🔒 Ticket {ticket?.status}. Status change karo to reply kar sako.
//         </div>
//       ) : (
//         <div style={{
//           display: "flex", gap: 8, padding: "12px 16px", alignItems: "center",
//           borderTop: "1px solid #f0f0f0", background: "#fff",
//         }}>
//           <input
//             type="text"
//             placeholder="Client ko reply karein..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendReply()}
//             style={{
//               flex: 1, padding: "9px 14px", borderRadius: 50,
//               border: "1.5px solid #e2e8f0", fontSize: 13,
//               outline: "none", background: "#f8fafc",
//             }}
//           />
//           <button
//             onClick={sendReply}
//             disabled={!text.trim() || sending}
//             style={{
//               width: 38, height: 38, borderRadius: "50%",
//               background: text.trim() ? "#0288d1" : "#e0e0e0",
//               border: "none", color: "#fff",
//               cursor: text.trim() ? "pointer" : "default",
//               display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//               fontSize: 16,
//             }}
//           >
//             {sending ? "⋯" : "➤"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // Props are OPTIONAL — component auto-reads from sessionStorage if not passed
// // ════════════════════════════════════════════════════════════════════════════
// const StaffHelpSupport = ({
//   staffId:    propStaffId,
//   staffName:  propStaffName,
//   staffRole:  propStaffRole,
//   adminAssistantList = [],
// }) => {
//   // ── Read staff identity: props → sessionStorage fallback ──────────────
//   const [staffId,   setStaffId]   = useState(propStaffId   || "");
//   const [staffName, setStaffName] = useState(propStaffName || "");
//   const [staffRole, setStaffRole] = useState(propStaffRole || "staff");

//   useEffect(() => {
//     // If props already provided, skip
//     if (propStaffId) return;

//     const staffData = getStaffFromSession();
//     if (staffData) {
//       setStaffId(staffData._id || staffData.id || "");
//       setStaffName(staffData.name || staffData.firstName || "");
//       // slug "help-support" → "staff", "admin-assistant" → "admin-assistant"
//       const slug = staffData.slug || staffData.roleName || "";
//       setStaffRole(
//         slug.includes("admin-assistant") || slug.includes("admin assistant")
//           ? "admin-assistant"
//           : "staff"
//       );
//     }
//   }, [propStaffId]);

//   // ── State ──────────────────────────────────────────────────────────────
//   const [tickets,      setTickets]      = useState([]);
//   const [activeTicket, setActiveTicket] = useState(null);
//   const [loading,      setLoading]      = useState(false);
//   const [error,        setError]        = useState("");
//   const [tab,          setTab]          = useState("all");

//   // Escalate
//   const [showEscalate, setShowEscalate] = useState(false);
//   const [escalateForm, setEscalateForm] = useState({
//     toRole: "admin", toId: "", toName: "", reason: "",
//   });
//   const [escalating, setEscalating] = useState(false);

//   const socketRef = useRef(null);

//   // ── Update escalate default when role is known ─────────────────────────
//   useEffect(() => {
//     setEscalateForm((f) => ({
//       ...f,
//       toRole: staffRole === "staff" ? "admin-assistant" : "admin",
//     }));
//   }, [staffRole]);

//   // ── Socket.IO ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!staffId) return;

//     const socket = socketIo(Url, { transports: ["websocket"] });
//     socketRef.current = socket;

//     const token = getTokenFromSession();
//     if (token) socket.emit("join", token);

//     socket.on("support:assigned_to_you", (data) => {
//       Swal.fire({
//         toast: true, position: "top-end", icon: "info",
//         showConfirmButton: false, timer: 5000,
//         title: `New Ticket Assigned: #${data.ticketCode}`,
//         text: `${data.subject} — ${data.clientName}`,
//       });
//       fetchTickets();
//     });

//     socket.on("support:ticket_updated", (updated) => {
//       // If re-assigned away from me → remove
//       if (updated.assignedTo?.id !== staffId) {
//         setTickets((prev) => prev.filter((t) => t._id !== updated._id));
//         setActiveTicket((prev) => (prev?._id === updated._id ? null : prev));
//         return;
//       }
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       setActiveTicket((prev) => (prev?._id === updated._id ? updated : prev));
//     });

//     return () => socket.disconnect();
//   }, [staffId]);

//   // ── Fetch tickets assigned to this staff ───────────────────────────────
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true);
//     setError("");
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const data = await res.json();
//       if (res.ok) {
//         setTickets(data.tickets || []);
//       } else {
//         setError(data.message || "Failed to fetch tickets.");
//       }
//     } catch (err) {
//       console.error("Fetch tickets error:", err);
//       setError("Network error. Please refresh.");
//     } finally {
//       setLoading(false);
//     }
//   }, [staffId]);

//   useEffect(() => {
//     if (staffId) fetchTickets();
//   }, [staffId, fetchTickets]);

//   // ── Escalate ────────────────────────────────────────────────────────────
//   const handleEscalate = async () => {
//     if (!activeTicket || !escalateForm.reason.trim()) {
//       Swal.fire({ icon: "warning", title: "Reason required", text: "Escalation reason likhein." });
//       return;
//     }
//     if (escalateForm.toRole === "admin-assistant" && !escalateForm.toId) {
//       Swal.fire({ icon: "warning", title: "Select Assistant", text: "Admin Assistant select karein." });
//       return;
//     }
//     setEscalating(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromId:   staffId,
//           fromName: staffName,
//           toRole:   escalateForm.toRole,
//           toId:     escalateForm.toRole === "admin" ? null : escalateForm.toId,
//           toName:   escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName,
//           reason:   escalateForm.reason,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Escalated! ✅", timer: 2000, showConfirmButton: false });
//         setTickets((prev) => prev.filter((t) => t._id !== activeTicket._id));
//         setActiveTicket(null);
//         setShowEscalate(false);
//         setEscalateForm({
//           toRole: staffRole === "staff" ? "admin-assistant" : "admin",
//           toId: "", toName: "", reason: "",
//         });
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: data.message });
//       }
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." });
//     } finally {
//       setEscalating(false);
//     }
//   };

//   // ── Derived ────────────────────────────────────────────────────────────
//   const displayed = tab === "all"
//     ? tickets
//     : tickets.filter((t) => t.status === tab);

//   const formatDate = (d) =>
//     new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

//   const tabs = [
//     { key: "all",         label: "All",         count: tickets.length },
//     { key: "open",        label: "Open",        count: tickets.filter((t) => t.status === "open").length },
//     { key: "in-progress", label: "In Progress", count: tickets.filter((t) => t.status === "in-progress").length },
//     { key: "resolved",    label: "Resolved",    count: tickets.filter((t) => t.status === "resolved").length },
//   ];

//   // ── Guard: no staffId yet ──────────────────────────────────────────────
//   if (!staffId) {
//     return (
//       <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontFamily: "'Segoe UI', sans-serif" }}>
//         <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
//         <p style={{ fontWeight: 600 }}>Staff identity nahi mili.</p>
//         <p style={{ fontSize: 13 }}>Please login karein ya page refresh karein.</p>
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────────────────────────────────────
//   return (
//     <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>

//       {/* Header */}
//       <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
//         <div>
//           <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
//             🎧 My Support Tickets
//           </h2>
//           <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
//             Tickets assigned to you · <b>{staffName}</b> ({staffRole})
//           </p>
//         </div>
//         <button
//           onClick={fetchTickets}
//           style={{
//             padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0",
//             background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600, color: "#374151",
//           }}
//         >
//           🔄 Refresh
//         </button>
//       </div>

//       {/* Error */}
//       {error && (
//         <div style={{
//           background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 10,
//           padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#c62828",
//         }}>
//           ⚠️ {error}
//         </div>
//       )}

//       {/* Tabs */}
//       <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4 }}>
//         {tabs.map((t) => (
//           <button
//             key={t.key}
//             onClick={() => setTab(t.key)}
//             style={{
//               flex: 1, padding: "8px 12px", borderRadius: 8, border: "none",
//               background: tab === t.key ? "#fff" : "transparent",
//               boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
//               fontWeight: tab === t.key ? 700 : 500,
//               color: tab === t.key ? "#1976d2" : "#64748b",
//               cursor: "pointer", fontSize: 13,
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
//               transition: "all 0.15s",
//             }}
//           >
//             {t.label}
//             {t.count > 0 && (
//               <span style={{
//                 background: tab === t.key ? "#1976d2" : "#94a3b8",
//                 color: "#fff", borderRadius: 50, minWidth: 18, height: 18,
//                 display: "inline-flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 10, padding: "0 4px",
//               }}>
//                 {t.count}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* ── Active Ticket Chat ─────────────────────────────────────────── */}
//       {activeTicket ? (
//         <div style={{
//           border: "1.5px solid #e2e8f0", borderRadius: 16,
//           overflow: "hidden", background: "#fff",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//         }}>
//           {/* Ticket Header */}
//           <div style={{
//             padding: "14px 18px", background: "#f8fafc",
//             borderBottom: "1px solid #e2e8f0",
//             display: "flex", alignItems: "center",
//             justifyContent: "space-between", flexWrap: "wrap", gap: 8,
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <button
//                 onClick={() => { setActiveTicket(null); setShowEscalate(false); }}
//                 style={{
//                   background: "#f1f5f9", border: "none", cursor: "pointer",
//                   width: 30, height: 30, borderRadius: "50%",
//                   fontSize: 16, color: "#64748b",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                 }}
//               >
//                 ←
//               </button>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>
//                   #{activeTicket.ticketId} —{" "}
//                   {activeTicket.subject === "Other"
//                     ? activeTicket.customSubject
//                     : activeTicket.subject}
//                 </div>
//                 <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
//                   👤 {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}
//                 </div>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
//               <Badge label={activeTicket.status}   colorMap={STATUS_COLORS} />
//               <Badge label={activeTicket.priority} colorMap={PRIORITY_COLORS} />
//               {activeTicket.status !== "closed" && activeTicket.status !== "resolved" && (
//                 <button
//                   onClick={() => setShowEscalate(!showEscalate)}
//                   style={{
//                     padding: "6px 14px", borderRadius: 8, border: "none",
//                     background: showEscalate ? "#fff3e0" : "#fff3e0",
//                     color: "#e65100", fontWeight: 600, fontSize: 12,
//                     cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
//                   }}
//                 >
//                   ⬆️ Escalate
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Escalate Panel */}
//           {showEscalate && (
//             <div style={{
//               padding: 16, background: "#fffde7",
//               borderBottom: "1px solid #ffe082",
//             }}>
//               <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>
//                 ⬆️ Escalate Ticket
//               </div>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//                 {/* Target role */}
//                 <div>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4, color: "#374151" }}>
//                     Escalate To
//                   </label>
//                   <select
//                     value={escalateForm.toRole}
//                     onChange={(e) => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })}
//                     style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}
//                   >
//                     {staffRole === "staff" && (
//                       <option value="admin-assistant">Admin Assistant</option>
//                     )}
//                     <option value="admin">Back to Admin</option>
//                   </select>
//                 </div>

//                 {/* Select assistant */}
//                 {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4, color: "#374151" }}>
//                       Select Assistant
//                     </label>
//                     <select
//                       value={escalateForm.toId}
//                       onChange={(e) => {
//                         const a = adminAssistantList.find((x) => x._id === e.target.value);
//                         setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" });
//                       }}
//                       style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}
//                     >
//                       <option value="">-- Select --</option>
//                       {adminAssistantList.map((a) => (
//                         <option key={a._id} value={a._id}>{a.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 {/* Reason */}
//                 <div style={{ flex: 1, minWidth: 200 }}>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4, color: "#374151" }}>
//                     Reason *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Escalation ka reason likhein..."
//                     value={escalateForm.reason}
//                     onChange={(e) => setEscalateForm({ ...escalateForm, reason: e.target.value })}
//                     style={{
//                       width: "100%", padding: "8px 12px", borderRadius: 8,
//                       border: "1.5px solid #e2e8f0", fontSize: 13,
//                       boxSizing: "border-box", outline: "none", background: "#fff",
//                     }}
//                   />
//                 </div>

//                 <button
//                   onClick={handleEscalate}
//                   disabled={escalating || !escalateForm.reason.trim()}
//                   style={{
//                     padding: "9px 18px", borderRadius: 8, border: "none",
//                     background: escalating ? "#ffa726" : "#f57c00",
//                     color: "#fff", fontWeight: 700, fontSize: 13,
//                     cursor: escalating ? "wait" : "pointer",
//                   }}
//                 >
//                   {escalating ? "Escalating..." : "⬆️ Confirm"}
//                 </button>
//                 <button
//                   onClick={() => setShowEscalate(false)}
//                   style={{
//                     padding: "9px 14px", borderRadius: 8,
//                     border: "1.5px solid #e2e8f0", background: "#fff",
//                     cursor: "pointer", fontSize: 13,
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Chat */}
//           <TicketChat
//             ticket={activeTicket}
//             staffId={staffId}
//             staffName={staffName}
//             onUpdate={(updated) => {
//               setActiveTicket(updated);
//               setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//             }}
//           />
//         </div>
//       ) : (
//         /* ── Ticket List ──────────────────────────────────────────────── */
//         loading ? (
//           <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//             <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
//             <p>Loading tickets...</p>
//           </div>
//         ) : displayed.length === 0 ? (
//           <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//             <div style={{ fontSize: 48, marginBottom: 10 }}>🎉</div>
//             <p style={{ fontWeight: 600, fontSize: 15 }}>
//               {tab === "all" ? "Koi ticket assigned nahi hai." : `Koi ${tab} ticket nahi.`}
//             </p>
//             <p style={{ fontSize: 13 }}>
//               {tab === "all" ? "Admin se assignment ka wait karein." : "Doosra tab check karein."}
//             </p>
//           </div>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {displayed.map((ticket) => (
//               <div
//                 key={ticket._id}
//                 style={{
//                   border: "1.5px solid #e8edf2", borderRadius: 12, background: "#fff",
//                   boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden",
//                 }}
//               >
//                 <div style={{ padding: "14px 16px" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                     <div>
//                       <div style={{ fontWeight: 700, fontSize: 13 }}>
//                         #{ticket.ticketId} —{" "}
//                         {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}
//                       </div>
//                       <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
//                         👤 {ticket.clientName} · {ticket.projectName || ticket.projectId} · {formatDate(ticket.createdAt)}
//                       </div>
//                     </div>
//                     <div style={{ display: "flex", gap: 5 }}>
//                       <Badge label={ticket.status}   colorMap={STATUS_COLORS} />
//                       <Badge label={ticket.priority} colorMap={PRIORITY_COLORS} />
//                     </div>
//                   </div>

//                   {/* Last message preview */}
//                   {ticket.messages?.length > 0 && (
//                     <p style={{
//                       margin: "8px 0 0", fontSize: 12, color: "#64748b",
//                       display: "-webkit-box", WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical", overflow: "hidden",
//                     }}>
//                       {ticket.messages[ticket.messages.length - 1]?.message}
//                     </p>
//                   )}
//                 </div>

//                 <div style={{
//                   borderTop: "1px solid #f0f4f8", padding: "10px 16px",
//                   background: "#f8fafc", display: "flex",
//                   justifyContent: "space-between", alignItems: "center",
//                 }}>
//                   <span style={{ fontSize: 11, color: "#94a3b8" }}>
//                     💬 {ticket.messages?.length || 0} messages
//                   </span>
//                   <button
//                     onClick={() => { setActiveTicket(ticket); setShowEscalate(false); }}
//                     style={{
//                       background: "#0288d1", color: "#fff", border: "none",
//                       borderRadius: 8, padding: "6px 14px",
//                       fontSize: 12, fontWeight: 600, cursor: "pointer",
//                       display: "flex", alignItems: "center", gap: 5,
//                     }}
//                   >
//                     💬 Open Chat
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default StaffHelpSupport;




















"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import { io as socketIo } from "socket.io-client";
import { Url } from "src/url/url";

const STATUS_COLORS = {
  open:          { bg: "#fff3e0", text: "#e65100", dot: "#f57c00" },
  "in-progress": { bg: "#e3f2fd", text: "#01579b", dot: "#0288d1" },
  resolved:      { bg: "#e8f5e9", text: "#1b5e20", dot: "#388e3c" },
  closed:        { bg: "#f5f5f5", text: "#424242", dot: "#9e9e9e" },
};
const PRIORITY_COLORS = {
  high:   { bg: "#ffebee", text: "#b71c1c" },
  medium: { bg: "#fff8e1", text: "#f57f17" },
  low:    { bg: "#e8f5e9", text: "#2e7d32" },
};

const Badge = ({ label, colorMap }) => {
  const c = colorMap?.[label] || { bg: "#f0f0f0", text: "#555" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text }}>
      {c.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}
      {label}
    </span>
  );
};

const getStaffFromSession = () => {
  try {
    const raw = sessionStorage.getItem("management_staff");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const getTokenFromSession = () =>
  sessionStorage.getItem("management_token") ||
  localStorage.getItem("management_token") ||
  localStorage.getItem("staffToken") || "";

// ─── Chat Panel ───────────────────────────────────────────────────────────────
const TicketChat = ({ ticket, staffId, staffName, onUpdate }) => {
  const [text, setText]       = useState("");
  const [sending, setSending] = useState(false);
  const chatEnd               = useRef(null);

  useEffect(() => {
    setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }, [ticket?.messages?.length]);

  const sendReply = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      const res  = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "staff", senderId: staffId, senderName: staffName, message: text.trim() }),
      });
      const data = await res.json();
      if (res.ok) { setText(""); onUpdate(data.ticket); }
      else Swal.fire({ icon: "error", title: "Error", text: data.message || "Send failed." });
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Message send nahi hua." });
    } finally { setSending(false); }
  };

  const fmtTime  = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const fmtDate  = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ overflowY: "auto", padding: 16, background: "#f8fafc", display: "flex", flexDirection: "column", gap: 12, minHeight: 280, maxHeight: 420 }}>
        {!(ticket?.messages?.length) && (
          <div style={{ textAlign: "center", color: "#94a3b8", paddingTop: 40, fontSize: 13 }}>No messages yet.</div>
        )}
        {(ticket?.messages || []).map((msg, i) => {
          const isMe     = msg.senderId === staffId;
          const isSystem = msg.senderName === "System";
          if (isSystem) return (
            <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
              <span style={{ background: "#e2e8f0", padding: "2px 12px", borderRadius: 50 }}>{msg.message}</span>
            </div>
          );
          return (
            <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
              {!isMe && (
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: msg.sender === "client" ? "#e3f2fd" : "#fce4ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: msg.sender === "client" ? "#1976d2" : "#c2185b", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
                  {(msg.senderName || "?").charAt(0).toUpperCase()}
                </div>
              )}
              <div style={{ maxWidth: "72%" }}>
                {!isMe && <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, marginLeft: 2 }}>{msg.senderName} {msg.sender === "client" ? "👤" : "🛡️"}</div>}
                <div style={{ padding: "10px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? "#0288d1" : "#fff", color: isMe ? "#fff" : "#1a1a2e", fontSize: 13, lineHeight: 1.5, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: isMe ? "none" : "1px solid #e8edf2" }}>
                  {msg.message}
                </div>
                <div style={{ fontSize: 10, color: "#94a3b8", textAlign: isMe ? "right" : "left", marginTop: 3 }}>
                  {fmtDate(msg.createdAt)} · {fmtTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEnd} />
      </div>

      {isClosed ? (
        <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#94a3b8", borderTop: "1px solid #f0f0f0" }}>
          🔒 Ticket {ticket?.status}.
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, padding: "12px 16px", alignItems: "center", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
          <input type="text" placeholder="Client ko reply karein..." value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendReply()}
            style={{ flex: 1, padding: "9px 14px", borderRadius: 50, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc" }}
          />
          <button onClick={sendReply} disabled={!text.trim() || sending}
            style={{ width: 38, height: 38, borderRadius: "50%", background: text.trim() ? "#0288d1" : "#e0e0e0", border: "none", color: "#fff", cursor: text.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
            {sending ? "⋯" : "➤"}
          </button>
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════
const StaffHelpSupport = ({ staffId: propStaffId, staffName: propStaffName, staffRole: propStaffRole, adminAssistantList = [] }) => {

  const [staffId,   setStaffId]   = useState(propStaffId   || "");
  const [staffName, setStaffName] = useState(propStaffName || "");
  const [staffRole, setStaffRole] = useState(propStaffRole || "staff");

  useEffect(() => {
    if (propStaffId) return;
    const d = getStaffFromSession();
    if (d) {
      setStaffId(d._id || d.id || "");
      setStaffName(d.name || d.firstName || "");
      const slug = d.slug || d.roleName || "";
      setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
    }
  }, [propStaffId]);

  const [tickets,      setTickets]      = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");
  const [tab,          setTab]          = useState("all");
  const [showEscalate, setShowEscalate] = useState(false);
  const [escalateForm, setEscalateForm] = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
  const [escalating,   setEscalating]   = useState(false);

  const socketRef       = useRef(null);
  // ✅ Always-fresh ref so socket callbacks don't get stale closure
  const activeTicketRef = useRef(null);
  useEffect(() => { activeTicketRef.current = activeTicket; }, [activeTicket]);

  useEffect(() => {
    setEscalateForm((f) => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" }));
  }, [staffRole]);

  // ── Fetch all my tickets ──────────────────────────────────────────────
  const fetchTickets = useCallback(async () => {
    if (!staffId) return;
    setLoading(true); setError("");
    try {
      const res  = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
      const data = await res.json();
      if (res.ok) setTickets(data.tickets || []);
      else setError(data.message || "Failed to fetch.");
    } catch { setError("Network error. Please refresh."); }
    finally { setLoading(false); }
  }, [staffId]);

  // ✅ Fetch one ticket fresh — updates list + open chat simultaneously
  const fetchSingleTicket = useCallback(async (ticketMongoId) => {
    try {
      const res  = await fetch(`${Url}/api/support/tickets/${ticketMongoId}`);
      const data = await res.json();
      if (!res.ok || !data.ticket) return;
      const updated = data.ticket;
      setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
    } catch { /* silent */ }
  }, []);

  useEffect(() => { if (staffId) fetchTickets(); }, [staffId, fetchTickets]);

  // ── Socket.IO ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!staffId) return;

    const socket = socketIo(Url, { transports: ["websocket"], reconnectionAttempts: 5 });
    socketRef.current = socket;

    socket.on("connect", () => {
      const token = getTokenFromSession();
      if (token) socket.emit("join", token);
    });

    // New ticket assigned to me
    socket.on("support:assigned_to_you", (data) => {
      Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 5000, title: `New Ticket: #${data.ticketCode}`, text: `${data.subject} — ${data.clientName}` });
      fetchTickets();
    });

    // Full ticket object update (status change, reassignment)
    socket.on("support:ticket_updated", (updated) => {
      if (updated.assignedTo?.id !== staffId) {
        // Reassigned away from me
        setTickets((prev) => prev.filter((t) => t._id !== updated._id));
        if (activeTicketRef.current?._id === updated._id) setActiveTicket(null);
        return;
      }
      setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
    });

    // ✅ THIS WAS MISSING — client sends message → staff sees it instantly
    socket.on("support:new_message", ({ ticketId: ticketMongoId }) => {
      if (activeTicketRef.current?._id === ticketMongoId) {
        // Chat is open → fetch fresh messages right now
        fetchSingleTicket(ticketMongoId);
      } else {
        // Chat not open → refresh list (updates last message preview + unread feel)
        fetchTickets();
      }
    });

    return () => { socket.disconnect(); socketRef.current = null; };
  }, [staffId, fetchTickets, fetchSingleTicket]);

  // ── Escalate ──────────────────────────────────────────────────────────
  const handleEscalate = async () => {
    if (!activeTicket || !escalateForm.reason.trim()) {
      Swal.fire({ icon: "warning", title: "Reason required", text: "Escalation reason likhein." }); return;
    }
    if (escalateForm.toRole === "admin-assistant" && !escalateForm.toId) {
      Swal.fire({ icon: "warning", title: "Select Assistant", text: "Admin Assistant select karein." }); return;
    }
    setEscalating(true);
    try {
      const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromId: staffId, fromName: staffName, toRole: escalateForm.toRole, toId: escalateForm.toRole === "admin" ? null : escalateForm.toId, toName: escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName, reason: escalateForm.reason }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({ icon: "success", title: "Escalated! ✅", timer: 2000, showConfirmButton: false });
        setTickets((prev) => prev.filter((t) => t._id !== activeTicket._id));
        setActiveTicket(null); setShowEscalate(false);
        setEscalateForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
      } else Swal.fire({ icon: "error", title: "Error", text: data.message });
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
    finally { setEscalating(false); }
  };

  const displayed  = tab === "all" ? tickets : tickets.filter((t) => t.status === tab);
  const formatDate = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  const tabs = [
    { key: "all", label: "All", count: tickets.length },
    { key: "open", label: "Open", count: tickets.filter((t) => t.status === "open").length },
    { key: "in-progress", label: "In Progress", count: tickets.filter((t) => t.status === "in-progress").length },
    { key: "resolved", label: "Resolved", count: tickets.filter((t) => t.status === "resolved").length },
  ];

  if (!staffId) return (
    <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
      <p style={{ fontWeight: 600 }}>Staff identity nahi mili.</p>
      <p style={{ fontSize: 13 }}>Please login karein ya page refresh karein.</p>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🎧 My Support Tickets</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>Tickets assigned to you · <b>{staffName}</b> ({staffRole})</p>
        </div>
        <button onClick={fetchTickets} style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>🔄 Refresh</button>
      </div>

      {error && <div style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#c62828" }}>⚠️ {error}</div>}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4 }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", background: tab === t.key ? "#fff" : "transparent", boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none", fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? "#1976d2" : "#64748b", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
            {t.label}
            {t.count > 0 && <span style={{ background: tab === t.key ? "#1976d2" : "#94a3b8", color: "#fff", borderRadius: 50, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px" }}>{t.count}</span>}
          </button>
        ))}
      </div>

      {activeTicket ? (
        <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          {/* Ticket Header */}
          <div style={{ padding: "14px 18px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => { setActiveTicket(null); setShowEscalate(false); }} style={{ background: "#f1f5f9", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: "50%", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>#{activeTicket.ticketId} — {activeTicket.subject === "Other" ? activeTicket.customSubject : activeTicket.subject}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>👤 {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <Badge label={activeTicket.status}   colorMap={STATUS_COLORS} />
              <Badge label={activeTicket.priority} colorMap={PRIORITY_COLORS} />
              {activeTicket.status !== "closed" && activeTicket.status !== "resolved" && (
                <button onClick={() => setShowEscalate(!showEscalate)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>⬆️ Escalate</button>
              )}
            </div>
          </div>

          {/* Escalate Panel */}
          {showEscalate && (
            <div style={{ padding: 16, background: "#fffde7", borderBottom: "1px solid #ffe082" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>⬆️ Escalate Ticket</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Escalate To</label>
                  <select value={escalateForm.toRole} onChange={(e) => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })} style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
                    {staffRole === "staff" && <option value="admin-assistant">Admin Assistant</option>}
                    <option value="admin">Back to Admin</option>
                  </select>
                </div>
                {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Select Assistant</label>
                    <select value={escalateForm.toId} onChange={(e) => { const a = adminAssistantList.find((x) => x._id === e.target.value); setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" }); }} style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
                      <option value="">-- Select --</option>
                      {adminAssistantList.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
                    </select>
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Reason *</label>
                  <input type="text" placeholder="Escalation ka reason likhein..." value={escalateForm.reason} onChange={(e) => setEscalateForm({ ...escalateForm, reason: e.target.value })} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box", outline: "none", background: "#fff" }} />
                </div>
                <button onClick={handleEscalate} disabled={escalating || !escalateForm.reason.trim()} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: escalating ? "#ffa726" : "#f57c00", color: "#fff", fontWeight: 700, fontSize: 13, cursor: escalating ? "wait" : "pointer" }}>{escalating ? "Escalating..." : "⬆️ Confirm"}</button>
                <button onClick={() => setShowEscalate(false)} style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13 }}>Cancel</button>
              </div>
            </div>
          )}

          <TicketChat ticket={activeTicket} staffId={staffId} staffName={staffName}
            onUpdate={(updated) => {
              setActiveTicket(updated);
              setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
            }}
          />
        </div>
      ) : loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div><p>Loading tickets...</p></div>
      ) : displayed.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🎉</div>
          <p style={{ fontWeight: 600, fontSize: 15 }}>{tab === "all" ? "Koi ticket assigned nahi hai." : `Koi ${tab} ticket nahi.`}</p>
          <p style={{ fontSize: 13 }}>{tab === "all" ? "Admin se assignment ka wait karein." : "Doosra tab check karein."}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {displayed.map((ticket) => (
            <div key={ticket._id} style={{ border: "1.5px solid #e8edf2", borderRadius: 12, background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden" }}>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>#{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>👤 {ticket.clientName} · {ticket.projectName || ticket.projectId} · {formatDate(ticket.createdAt)}</div>
                  </div>
                  <div style={{ display: "flex", gap: 5 }}><Badge label={ticket.status} colorMap={STATUS_COLORS} /><Badge label={ticket.priority} colorMap={PRIORITY_COLORS} /></div>
                </div>
                {ticket.messages?.length > 0 && (
                  <p style={{ margin: "8px 0 0", fontSize: 12, color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {ticket.messages[ticket.messages.length - 1]?.message}
                  </p>
                )}
              </div>
              <div style={{ borderTop: "1px solid #f0f4f8", padding: "10px 16px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>💬 {ticket.messages?.length || 0} messages</span>
                <button onClick={() => { setActiveTicket(ticket); setShowEscalate(false); }} style={{ background: "#0288d1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>💬 Open Chat</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffHelpSupport;