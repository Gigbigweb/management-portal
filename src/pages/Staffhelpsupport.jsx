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




















// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

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
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text }}>
//       {c.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}
//       {label}
//     </span>
//   );
// };

// const getStaffFromSession = () => {
//   try {
//     const raw = sessionStorage.getItem("management_staff");
//     return raw ? JSON.parse(raw) : null;
//   } catch { return null; }
// };

// const getTokenFromSession = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// // ─── Chat Panel ───────────────────────────────────────────────────────────────
// const TicketChat = ({ ticket, staffId, staffName, onUpdate }) => {
//   const [text, setText]       = useState("");
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
//         body: JSON.stringify({ sender: "staff", senderId: staffId, senderName: staffName, message: text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon: "error", title: "Error", text: data.message || "Send failed." });
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Message send nahi hua." });
//     } finally { setSending(false); }
//   };

//   const fmtTime  = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//   const fmtDate  = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
//   const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ overflowY: "auto", padding: 16, background: "#f8fafc", display: "flex", flexDirection: "column", gap: 12, minHeight: 280, maxHeight: 420 }}>
//         {!(ticket?.messages?.length) && (
//           <div style={{ textAlign: "center", color: "#94a3b8", paddingTop: 40, fontSize: 13 }}>No messages yet.</div>
//         )}
//         {(ticket?.messages || []).map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           if (isSystem) return (
//             <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
//               <span style={{ background: "#e2e8f0", padding: "2px 12px", borderRadius: 50 }}>{msg.message}</span>
//             </div>
//           );
//           return (
//             <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
//               {!isMe && (
//                 <div style={{ width: 28, height: 28, borderRadius: "50%", background: msg.sender === "client" ? "#e3f2fd" : "#fce4ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: msg.sender === "client" ? "#1976d2" : "#c2185b", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
//                   {(msg.senderName || "?").charAt(0).toUpperCase()}
//                 </div>
//               )}
//               <div style={{ maxWidth: "72%" }}>
//                 {!isMe && <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, marginLeft: 2 }}>{msg.senderName} {msg.sender === "client" ? "👤" : "🛡️"}</div>}
//                 <div style={{ padding: "10px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? "#0288d1" : "#fff", color: isMe ? "#fff" : "#1a1a2e", fontSize: 13, lineHeight: 1.5, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: isMe ? "none" : "1px solid #e8edf2" }}>
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

//       {isClosed ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#94a3b8", borderTop: "1px solid #f0f0f0" }}>
//           🔒 Ticket {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display: "flex", gap: 8, padding: "12px 16px", alignItems: "center", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
//           <input type="text" placeholder="Client ko reply karein..." value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendReply()}
//             style={{ flex: 1, padding: "9px 14px", borderRadius: 50, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc" }}
//           />
//           <button onClick={sendReply} disabled={!text.trim() || sending}
//             style={{ width: 38, height: 38, borderRadius: "50%", background: text.trim() ? "#0288d1" : "#e0e0e0", border: "none", color: "#fff", cursor: text.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
//             {sending ? "⋯" : "➤"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ════════════════════════════════════════════════════════════════════════════
// const StaffHelpSupport = ({ staffId: propStaffId, staffName: propStaffName, staffRole: propStaffRole, adminAssistantList = [] }) => {

//   const [staffId,   setStaffId]   = useState(propStaffId   || "");
//   const [staffName, setStaffName] = useState(propStaffName || "");
//   const [staffRole, setStaffRole] = useState(propStaffRole || "staff");

//   useEffect(() => {
//     if (propStaffId) return;
//     const d = getStaffFromSession();
//     if (d) {
//       setStaffId(d._id || d.id || "");
//       setStaffName(d.name || d.firstName || "");
//       const slug = d.slug || d.roleName || "";
//       setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [propStaffId]);

//   const [tickets,      setTickets]      = useState([]);
//   const [activeTicket, setActiveTicket] = useState(null);
//   const [loading,      setLoading]      = useState(false);
//   const [error,        setError]        = useState("");
//   const [tab,          setTab]          = useState("all");
//   const [showEscalate, setShowEscalate] = useState(false);
//   const [escalateForm, setEscalateForm] = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
//   const [escalating,   setEscalating]   = useState(false);

//   const socketRef       = useRef(null);
//   // ✅ Always-fresh ref so socket callbacks don't get stale closure
//   const activeTicketRef = useRef(null);
//   useEffect(() => { activeTicketRef.current = activeTicket; }, [activeTicket]);

//   useEffect(() => {
//     setEscalateForm((f) => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" }));
//   }, [staffRole]);

//   // ── Fetch all my tickets ──────────────────────────────────────────────
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const data = await res.json();
//       if (res.ok) setTickets(data.tickets || []);
//       else setError(data.message || "Failed to fetch.");
//     } catch { setError("Network error. Please refresh."); }
//     finally { setLoading(false); }
//   }, [staffId]);

//   // ✅ Fetch one ticket fresh — updates list + open chat simultaneously
//   const fetchSingleTicket = useCallback(async (ticketMongoId) => {
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${ticketMongoId}`);
//       const data = await res.json();
//       if (!res.ok || !data.ticket) return;
//       const updated = data.ticket;
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     } catch { /* silent */ }
//   }, []);

//   useEffect(() => { if (staffId) fetchTickets(); }, [staffId, fetchTickets]);

//   // ── Socket.IO ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!staffId) return;

//     const socket = socketIo(Url, { transports: ["websocket"], reconnectionAttempts: 5 });
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       const token = getTokenFromSession();
//       if (token) socket.emit("join", token);
//     });

//     // New ticket assigned to me
//     socket.on("support:assigned_to_you", (data) => {
//       Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 5000, title: `New Ticket: #${data.ticketCode}`, text: `${data.subject} — ${data.clientName}` });
//       fetchTickets();
//     });

//     // Full ticket object update (status change, reassignment)
//     socket.on("support:ticket_updated", (updated) => {
//       if (updated.assignedTo?.id !== staffId) {
//         // Reassigned away from me
//         setTickets((prev) => prev.filter((t) => t._id !== updated._id));
//         if (activeTicketRef.current?._id === updated._id) setActiveTicket(null);
//         return;
//       }
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     });

//     // ✅ THIS WAS MISSING — client sends message → staff sees it instantly
//     socket.on("support:new_message", ({ ticketId: ticketMongoId }) => {
//       if (activeTicketRef.current?._id === ticketMongoId) {
//         // Chat is open → fetch fresh messages right now
//         fetchSingleTicket(ticketMongoId);
//       } else {
//         // Chat not open → refresh list (updates last message preview + unread feel)
//         fetchTickets();
//       }
//     });

//     return () => { socket.disconnect(); socketRef.current = null; };
//   }, [staffId, fetchTickets, fetchSingleTicket]);

//   // ── Escalate ──────────────────────────────────────────────────────────
//   const handleEscalate = async () => {
//     if (!activeTicket || !escalateForm.reason.trim()) {
//       Swal.fire({ icon: "warning", title: "Reason required", text: "Escalation reason likhein." }); return;
//     }
//     if (escalateForm.toRole === "admin-assistant" && !escalateForm.toId) {
//       Swal.fire({ icon: "warning", title: "Select Assistant", text: "Admin Assistant select karein." }); return;
//     }
//     setEscalating(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fromId: staffId, fromName: staffName, toRole: escalateForm.toRole, toId: escalateForm.toRole === "admin" ? null : escalateForm.toId, toName: escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName, reason: escalateForm.reason }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Escalated! ✅", timer: 2000, showConfirmButton: false });
//         setTickets((prev) => prev.filter((t) => t._id !== activeTicket._id));
//         setActiveTicket(null); setShowEscalate(false);
//         setEscalateForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
//       } else Swal.fire({ icon: "error", title: "Error", text: data.message });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   const displayed  = tab === "all" ? tickets : tickets.filter((t) => t.status === tab);
//   const formatDate = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
//   const tabs = [
//     { key: "all", label: "All", count: tickets.length },
//     { key: "open", label: "Open", count: tickets.filter((t) => t.status === "open").length },
//     { key: "in-progress", label: "In Progress", count: tickets.filter((t) => t.status === "in-progress").length },
//     { key: "resolved", label: "Resolved", count: tickets.filter((t) => t.status === "resolved").length },
//   ];

//   if (!staffId) return (
//     <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontFamily: "'Segoe UI', sans-serif" }}>
//       <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
//       <p style={{ fontWeight: 600 }}>Staff identity nahi mili.</p>
//       <p style={{ fontSize: 13 }}>Please login karein ya page refresh karein.</p>
//     </div>
//   );

//   return (
//     <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>
//       <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
//         <div>
//           <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🎧 My Support Tickets</h2>
//           <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>Tickets assigned to you · <b>{staffName}</b> ({staffRole})</p>
//         </div>
//         <button onClick={fetchTickets} style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>🔄 Refresh</button>
//       </div>

//       {error && <div style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#c62828" }}>⚠️ {error}</div>}

//       {/* Tabs */}
//       <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4 }}>
//         {tabs.map((t) => (
//           <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", background: tab === t.key ? "#fff" : "transparent", boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none", fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? "#1976d2" : "#64748b", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
//             {t.label}
//             {t.count > 0 && <span style={{ background: tab === t.key ? "#1976d2" : "#94a3b8", color: "#fff", borderRadius: 50, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px" }}>{t.count}</span>}
//           </button>
//         ))}
//       </div>

//       {activeTicket ? (
//         <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
//           {/* Ticket Header */}
//           <div style={{ padding: "14px 18px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <button onClick={() => { setActiveTicket(null); setShowEscalate(false); }} style={{ background: "#f1f5f9", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: "50%", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>#{activeTicket.ticketId} — {activeTicket.subject === "Other" ? activeTicket.customSubject : activeTicket.subject}</div>
//                 <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>👤 {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}</div>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
//               <Badge label={activeTicket.status}   colorMap={STATUS_COLORS} />
//               <Badge label={activeTicket.priority} colorMap={PRIORITY_COLORS} />
//               {activeTicket.status !== "closed" && activeTicket.status !== "resolved" && (
//                 <button onClick={() => setShowEscalate(!showEscalate)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>⬆️ Escalate</button>
//               )}
//             </div>
//           </div>

//           {/* Escalate Panel */}
//           {showEscalate && (
//             <div style={{ padding: 16, background: "#fffde7", borderBottom: "1px solid #ffe082" }}>
//               <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>⬆️ Escalate Ticket</div>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//                 <div>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Escalate To</label>
//                   <select value={escalateForm.toRole} onChange={(e) => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })} style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                     {staffRole === "staff" && <option value="admin-assistant">Admin Assistant</option>}
//                     <option value="admin">Back to Admin</option>
//                   </select>
//                 </div>
//                 {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Select Assistant</label>
//                     <select value={escalateForm.toId} onChange={(e) => { const a = adminAssistantList.find((x) => x._id === e.target.value); setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" }); }} style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                       <option value="">-- Select --</option>
//                       {adminAssistantList.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
//                     </select>
//                   </div>
//                 )}
//                 <div style={{ flex: 1, minWidth: 200 }}>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Reason *</label>
//                   <input type="text" placeholder="Escalation ka reason likhein..." value={escalateForm.reason} onChange={(e) => setEscalateForm({ ...escalateForm, reason: e.target.value })} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box", outline: "none", background: "#fff" }} />
//                 </div>
//                 <button onClick={handleEscalate} disabled={escalating || !escalateForm.reason.trim()} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: escalating ? "#ffa726" : "#f57c00", color: "#fff", fontWeight: 700, fontSize: 13, cursor: escalating ? "wait" : "pointer" }}>{escalating ? "Escalating..." : "⬆️ Confirm"}</button>
//                 <button onClick={() => setShowEscalate(false)} style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13 }}>Cancel</button>
//               </div>
//             </div>
//           )}

//           <TicketChat ticket={activeTicket} staffId={staffId} staffName={staffName}
//             onUpdate={(updated) => {
//               setActiveTicket(updated);
//               setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//             }}
//           />
//         </div>
//       ) : loading ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div><p>Loading tickets...</p></div>
//       ) : displayed.length === 0 ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//           <div style={{ fontSize: 48, marginBottom: 10 }}>🎉</div>
//           <p style={{ fontWeight: 600, fontSize: 15 }}>{tab === "all" ? "Koi ticket assigned nahi hai." : `Koi ${tab} ticket nahi.`}</p>
//           <p style={{ fontSize: 13 }}>{tab === "all" ? "Admin se assignment ka wait karein." : "Doosra tab check karein."}</p>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {displayed.map((ticket) => (
//             <div key={ticket._id} style={{ border: "1.5px solid #e8edf2", borderRadius: 12, background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden" }}>
//               <div style={{ padding: "14px 16px" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                   <div>
//                     <div style={{ fontWeight: 700, fontSize: 13 }}>#{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}</div>
//                     <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>👤 {ticket.clientName} · {ticket.projectName || ticket.projectId} · {formatDate(ticket.createdAt)}</div>
//                   </div>
//                   <div style={{ display: "flex", gap: 5 }}><Badge label={ticket.status} colorMap={STATUS_COLORS} /><Badge label={ticket.priority} colorMap={PRIORITY_COLORS} /></div>
//                 </div>
//                 {ticket.messages?.length > 0 && (
//                   <p style={{ margin: "8px 0 0", fontSize: 12, color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                     {ticket.messages[ticket.messages.length - 1]?.message}
//                   </p>
//                 )}
//               </div>
//               <div style={{ borderTop: "1px solid #f0f4f8", padding: "10px 16px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <span style={{ fontSize: 11, color: "#94a3b8" }}>💬 {ticket.messages?.length || 0} messages</span>
//                 <button onClick={() => { setActiveTicket(ticket); setShowEscalate(false); }} style={{ background: "#0288d1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>💬 Open Chat</button>
//               </div>
//             </div>
//           ))}
//         </div>
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

// const STATUS_COLORS = {
//   open:          { bg: "#fff3e0", text: "#e65100", dot: "#f57c00" },
//   "in-progress": { bg: "#e3f2fd", text: "#01579b", dot: "#0288d1" },
//   resolved:      { bg: "#e8f5e9", text: "#1b5e20", dot: "#388e3c" },
//   closed:        { bg: "#f5f5f5", text: "#424242", dot: "#9e9e9e" },
//   escalated:     { bg: "#f3e5f5", text: "#6a1b9a", dot: "#8e24aa" },
// };
// const PRIORITY_COLORS = {
//   high:   { bg: "#ffebee", text: "#b71c1c" },
//   medium: { bg: "#fff8e1", text: "#f57f17" },
//   low:    { bg: "#e8f5e9", text: "#2e7d32" },
// };

// const Badge = ({ label, colorMap }) => {
//   const c = colorMap?.[label] || { bg: "#f0f0f0", text: "#555" };
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text }}>
//       {c.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}
//       {label}
//     </span>
//   );
// };

// const getStaffFromSession = () => {
//   try {
//     const raw = sessionStorage.getItem("management_staff");
//     return raw ? JSON.parse(raw) : null;
//   } catch { return null; }
// };

// const getTokenFromSession = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// // ─── Chat Panel ───────────────────────────────────────────────────────────────
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, readOnly }) => {
//   const [text, setText]       = useState("");
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
//         body: JSON.stringify({ sender: "staff", senderId: staffId, senderName: staffName, message: text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon: "error", title: "Error", text: data.message || "Send failed." });
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Message send nahi hua." });
//     } finally { setSending(false); }
//   };

//   const fmtTime  = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//   const fmtDate  = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
//   const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ overflowY: "auto", padding: 16, background: "#f8fafc", display: "flex", flexDirection: "column", gap: 12, minHeight: 280, maxHeight: 420 }}>
//         {!(ticket?.messages?.length) && (
//           <div style={{ textAlign: "center", color: "#94a3b8", paddingTop: 40, fontSize: 13 }}>No messages yet.</div>
//         )}
//         {(ticket?.messages || []).map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           if (isSystem) return (
//             <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
//               <span style={{ background: "#e2e8f0", padding: "2px 12px", borderRadius: 50 }}>{msg.message}</span>
//             </div>
//           );
//           return (
//             <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
//               {!isMe && (
//                 <div style={{ width: 28, height: 28, borderRadius: "50%", background: msg.sender === "client" ? "#e3f2fd" : "#fce4ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: msg.sender === "client" ? "#1976d2" : "#c2185b", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
//                   {(msg.senderName || "?").charAt(0).toUpperCase()}
//                 </div>
//               )}
//               <div style={{ maxWidth: "72%" }}>
//                 {!isMe && <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, marginLeft: 2 }}>{msg.senderName} {msg.sender === "client" ? "👤" : "🛡️"}</div>}
//                 <div style={{ padding: "10px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? "#0288d1" : "#fff", color: isMe ? "#fff" : "#1a1a2e", fontSize: 13, lineHeight: 1.5, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: isMe ? "none" : "1px solid #e8edf2" }}>
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

//       {/* Read-only mode for escalated tickets */}
//       {readOnly ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#8e24aa", borderTop: "1px solid #f0f0f0", background: "#fdf6ff" }}>
//           ⬆️ Yeh ticket escalate ho chuka hai. Sirf history dekh sakte hain.
//         </div>
//       ) : isClosed ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#94a3b8", borderTop: "1px solid #f0f0f0" }}>
//           🔒 Ticket {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display: "flex", gap: 8, padding: "12px 16px", alignItems: "center", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
//           <input type="text" placeholder="Client ko reply karein..." value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendReply()}
//             style={{ flex: 1, padding: "9px 14px", borderRadius: 50, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc" }}
//           />
//           <button onClick={sendReply} disabled={!text.trim() || sending}
//             style={{ width: 38, height: 38, borderRadius: "50%", background: text.trim() ? "#0288d1" : "#e0e0e0", border: "none", color: "#fff", cursor: text.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
//             {sending ? "⋯" : "➤"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Escalation Log Panel ─────────────────────────────────────────────────────
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding: "12px 16px", background: "#fdf6ff", borderTop: "1px solid #e1bee7" }}>
//       <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>📋 Escalation History</div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//         {log.map((entry, i) => (
//           <div key={i} style={{ background: "#fff", border: "1px solid #e1bee7", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
//               <span>
//                 <span style={{ fontWeight: 600, color: "#6a1b9a" }}>{entry.fromName || entry.from}</span>
//                 <span style={{ color: "#94a3b8", margin: "0 6px" }}>→</span>
//                 <span style={{ fontWeight: 600, color: "#0288d1" }}>{entry.toName || entry.to}</span>
//               </span>
//               <span style={{ color: "#94a3b8", fontSize: 10 }}>
//                 {new Date(entry.escalatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
//               </span>
//             </div>
//             {entry.reason && (
//               <div style={{ marginTop: 4, color: "#64748b", fontSize: 11 }}>📝 {entry.reason}</div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ════════════════════════════════════════════════════════════════════════════
// const StaffHelpSupport = ({ staffId: propStaffId, staffName: propStaffName, staffRole: propStaffRole, adminAssistantList = [] }) => {

//   const [staffId,   setStaffId]   = useState(propStaffId   || "");
//   const [staffName, setStaffName] = useState(propStaffName || "");
//   const [staffRole, setStaffRole] = useState(propStaffRole || "staff");

//   useEffect(() => {
//     if (propStaffId) return;
//     const d = getStaffFromSession();
//     if (d) {
//       setStaffId(d._id || d.id || "");
//       setStaffName(d.name || d.firstName || "");
//       const slug = d.slug || d.roleName || "";
//       setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [propStaffId]);

//   const [tickets,          setTickets]          = useState([]);
//   const [escalatedTickets, setEscalatedTickets] = useState([]); // ✅ NEW: escalated history
//   const [activeTicket,     setActiveTicket]     = useState(null);
//   const [isActiveEscalated,setIsActiveEscalated]= useState(false); // ✅ NEW: is current viewed ticket from escalated tab
//   const [loading,          setLoading]          = useState(false);
//   const [loadingEscalated, setLoadingEscalated] = useState(false);
//   const [error,            setError]            = useState("");
//   const [tab,              setTab]              = useState("all");
//   const [showEscalate,     setShowEscalate]     = useState(false);
//   const [escalateForm,     setEscalateForm]     = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
//   const [escalating,       setEscalating]       = useState(false);

//   const socketRef       = useRef(null);
//   const activeTicketRef = useRef(null);
//   useEffect(() => { activeTicketRef.current = activeTicket; }, [activeTicket]);

//   useEffect(() => {
//     setEscalateForm((f) => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" }));
//   }, [staffRole]);

//   // ── Fetch all my active tickets ───────────────────────────────────────
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const data = await res.json();
//       if (res.ok) setTickets(data.tickets || []);
//       else setError(data.message || "Failed to fetch.");
//     } catch { setError("Network error. Please refresh."); }
//     finally { setLoading(false); }
//   }, [staffId]);

//   // ✅ NEW: Fetch tickets I escalated (from escalationLog)
//   const fetchEscalatedTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoadingEscalated(true);
//     try {
//       // Fetch all tickets where this staff appears in escalationLog as "from"
//       const res  = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const data = await res.json();
//       if (res.ok) {
//         setEscalatedTickets(data.tickets || []);
//       } else {
//         // Fallback: filter from all tickets fetched (if backend route not available)
//         // This won't work well but is a graceful fallback
//         setEscalatedTickets([]);
//       }
//     } catch {
//       setEscalatedTickets([]);
//     } finally { setLoadingEscalated(false); }
//   }, [staffId]);

//   // ✅ Fetch one ticket fresh
//   const fetchSingleTicket = useCallback(async (ticketMongoId) => {
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${ticketMongoId}`);
//       const data = await res.json();
//       if (!res.ok || !data.ticket) return;
//       const updated = data.ticket;
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     } catch { /* silent */ }
//   }, []);

//   useEffect(() => {
//     if (staffId) {
//       fetchTickets();
//       fetchEscalatedTickets();
//     }
//   }, [staffId, fetchTickets, fetchEscalatedTickets]);

//   // Switch to escalated tab → re-fetch escalated list
//   useEffect(() => {
//     if (tab === "escalated" && staffId) {
//       fetchEscalatedTickets();
//     }
//   }, [tab, staffId, fetchEscalatedTickets]);

//   // ── Socket.IO ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!staffId) return;

//     const socket = socketIo(Url, { transports: ["websocket"], reconnectionAttempts: 5 });
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       const token = getTokenFromSession();
//       if (token) socket.emit("join", token);
//     });

//     socket.on("support:assigned_to_you", (data) => {
//       Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 5000, title: `New Ticket: #${data.ticketCode}`, text: `${data.subject} — ${data.clientName}` });
//       fetchTickets();
//     });

//     socket.on("support:ticket_updated", (updated) => {
//       if (updated.assignedTo?.id !== staffId) {
//         setTickets((prev) => prev.filter((t) => t._id !== updated._id));
//         if (activeTicketRef.current?._id === updated._id) setActiveTicket(null);
//         // ✅ Refresh escalated list when ticket is reassigned away (it might now appear in escalated)
//         fetchEscalatedTickets();
//         return;
//       }
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     });

//     socket.on("support:new_message", ({ ticketId: ticketMongoId }) => {
//       if (activeTicketRef.current?._id === ticketMongoId) {
//         fetchSingleTicket(ticketMongoId);
//       } else {
//         fetchTickets();
//       }
//     });

//     return () => { socket.disconnect(); socketRef.current = null; };
//   }, [staffId, fetchTickets, fetchEscalatedTickets, fetchSingleTicket]);

//   // ── Escalate ──────────────────────────────────────────────────────────
//   const handleEscalate = async () => {
//     if (!activeTicket || !escalateForm.reason.trim()) {
//       Swal.fire({ icon: "warning", title: "Reason required", text: "Escalation reason likhein." }); return;
//     }
//     if (escalateForm.toRole === "admin-assistant" && !escalateForm.toId) {
//       Swal.fire({ icon: "warning", title: "Select Assistant", text: "Admin Assistant select karein." }); return;
//     }
//     setEscalating(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fromId: staffId, fromName: staffName, toRole: escalateForm.toRole, toId: escalateForm.toRole === "admin" ? null : escalateForm.toId, toName: escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName, reason: escalateForm.reason }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Escalated! ✅", timer: 2000, showConfirmButton: false });
//         setTickets((prev) => prev.filter((t) => t._id !== activeTicket._id));
//         // ✅ Add to escalated list immediately (optimistic update)
//         setEscalatedTickets((prev) => [data.ticket, ...prev.filter((t) => t._id !== data.ticket._id)]);
//         setActiveTicket(null); setShowEscalate(false);
//         setEscalateForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
//         // Also re-fetch to be sure
//         fetchEscalatedTickets();
//       } else Swal.fire({ icon: "error", title: "Error", text: data.message });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   // ── Derived state ─────────────────────────────────────────────────────
//   const activeTicketsList = tab === "all" ? tickets : tab === "escalated" ? escalatedTickets : tickets.filter((t) => t.status === tab);
//   const formatDate        = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

//   const tabs = [
//     { key: "all",       label: "All",         count: tickets.length,                                          icon: "📋" },
//     { key: "open",      label: "Open",        count: tickets.filter((t) => t.status === "open").length,       icon: "🟡" },
//     { key: "in-progress", label: "In Progress", count: tickets.filter((t) => t.status === "in-progress").length, icon: "🔵" },
//     { key: "resolved",  label: "Resolved",    count: tickets.filter((t) => t.status === "resolved").length,   icon: "🟢" },
//     { key: "escalated", label: "Escalated",   count: escalatedTickets.length,                                 icon: "⬆️" }, // ✅ NEW
//   ];

//   if (!staffId) return (
//     <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontFamily: "'Segoe UI', sans-serif" }}>
//       <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
//       <p style={{ fontWeight: 600 }}>Staff identity nahi mili.</p>
//       <p style={{ fontSize: 13 }}>Please login karein ya page refresh karein.</p>
//     </div>
//   );

//   return (
//     <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>
//       <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
//         <div>
//           <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🎧 My Support Tickets</h2>
//           <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>Tickets assigned to you · <b>{staffName}</b> ({staffRole})</p>
//         </div>
//         <button onClick={() => { fetchTickets(); fetchEscalatedTickets(); }} style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>🔄 Refresh</button>
//       </div>

//       {error && <div style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#c62828" }}>⚠️ {error}</div>}

//       {/* Tabs */}
//       <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4, flexWrap: "wrap" }}>
//         {tabs.map((t) => (
//           <button key={t.key} onClick={() => { setTab(t.key); setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }}
//             style={{ flex: 1, minWidth: 80, padding: "8px 10px", borderRadius: 8, border: "none", background: tab === t.key ? "#fff" : "transparent", boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none", fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? (t.key === "escalated" ? "#6a1b9a" : "#1976d2") : "#64748b", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
//             <span>{t.icon}</span>
//             <span>{t.label}</span>
//             {t.count > 0 && (
//               <span style={{ background: tab === t.key ? (t.key === "escalated" ? "#8e24aa" : "#1976d2") : "#94a3b8", color: "#fff", borderRadius: 50, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px" }}>{t.count}</span>
//             )}
//           </button>
//         ))}
//       </div>

//       {/* ✅ Escalated tab info banner */}
//       {tab === "escalated" && !activeTicket && (
//         <div style={{ background: "#fdf6ff", border: "1px solid #e1bee7", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#6a1b9a", display: "flex", alignItems: "center", gap: 8 }}>
//           <span style={{ fontSize: 18 }}>⬆️</span>
//           <span>Yeh woh tickets hain jo aapne escalate kiye hain. Sirf history dekhne ke liye hain — reply nahi kar sakte.</span>
//         </div>
//       )}

//       {activeTicket ? (
//         <div style={{ border: `1.5px solid ${isActiveEscalated ? "#e1bee7" : "#e2e8f0"}`, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
//           {/* Ticket Header */}
//           <div style={{ padding: "14px 18px", background: isActiveEscalated ? "#fdf6ff" : "#f8fafc", borderBottom: `1px solid ${isActiveEscalated ? "#e1bee7" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <button onClick={() => { setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }} style={{ background: "#f1f5f9", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: "50%", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>#{activeTicket.ticketId} — {activeTicket.subject === "Other" ? activeTicket.customSubject : activeTicket.subject}</div>
//                 <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>👤 {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}</div>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
//               <Badge label={activeTicket.status}   colorMap={STATUS_COLORS} />
//               <Badge label={activeTicket.priority} colorMap={PRIORITY_COLORS} />
//               {/* ✅ Only show escalate button if NOT in escalated view */}
//               {!isActiveEscalated && activeTicket.status !== "closed" && activeTicket.status !== "resolved" && (
//                 <button onClick={() => setShowEscalate(!showEscalate)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>⬆️ Escalate</button>
//               )}
//               {/* ✅ Show "Escalated by you" badge */}
//               {isActiveEscalated && (
//                 <span style={{ padding: "4px 12px", borderRadius: 50, background: "#f3e5f5", color: "#6a1b9a", fontSize: 11, fontWeight: 600 }}>⬆️ Escalated by You</span>
//               )}
//             </div>
//           </div>

//           {/* ✅ Show escalation log for escalated tickets */}
//           {isActiveEscalated && activeTicket.escalationLog?.length > 0 && (
//             <EscalationLog log={activeTicket.escalationLog} />
//           )}

//           {/* Escalate Panel */}
//           {showEscalate && !isActiveEscalated && (
//             <div style={{ padding: 16, background: "#fffde7", borderBottom: "1px solid #ffe082" }}>
//               <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>⬆️ Escalate Ticket</div>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//                 <div>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Escalate To</label>
//                   <select value={escalateForm.toRole} onChange={(e) => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })} style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                     {staffRole === "staff" && <option value="admin-assistant">Admin Assistant</option>}
//                     <option value="admin">Back to Admin</option>
//                   </select>
//                 </div>
//                 {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Select Assistant</label>
//                     <select value={escalateForm.toId} onChange={(e) => { const a = adminAssistantList.find((x) => x._id === e.target.value); setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" }); }} style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                       <option value="">-- Select --</option>
//                       {adminAssistantList.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
//                     </select>
//                   </div>
//                 )}
//                 <div style={{ flex: 1, minWidth: 200 }}>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Reason *</label>
//                   <input type="text" placeholder="Escalation ka reason likhein..." value={escalateForm.reason} onChange={(e) => setEscalateForm({ ...escalateForm, reason: e.target.value })} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box", outline: "none", background: "#fff" }} />
//                 </div>
//                 <button onClick={handleEscalate} disabled={escalating || !escalateForm.reason.trim()} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: escalating ? "#ffa726" : "#f57c00", color: "#fff", fontWeight: 700, fontSize: 13, cursor: escalating ? "wait" : "pointer" }}>{escalating ? "Escalating..." : "⬆️ Confirm"}</button>
//                 <button onClick={() => setShowEscalate(false)} style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13 }}>Cancel</button>
//               </div>
//             </div>
//           )}

//           <TicketChat
//             ticket={activeTicket}
//             staffId={staffId}
//             staffName={staffName}
//             readOnly={isActiveEscalated} // ✅ Read-only for escalated tickets
//             onUpdate={(updated) => {
//               setActiveTicket(updated);
//               setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//             }}
//           />
//         </div>
//       ) : (loading && tab !== "escalated") || (loadingEscalated && tab === "escalated") ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div><p>Loading tickets...</p></div>
//       ) : activeTicketsList.length === 0 ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//           <div style={{ fontSize: 48, marginBottom: 10 }}>{tab === "escalated" ? "⬆️" : "🎉"}</div>
//           <p style={{ fontWeight: 600, fontSize: 15 }}>
//             {tab === "all" ? "Koi ticket assigned nahi hai." : tab === "escalated" ? "Aapne abhi koi ticket escalate nahi kiya." : `Koi ${tab} ticket nahi.`}
//           </p>
//           <p style={{ fontSize: 13 }}>
//             {tab === "all" ? "Admin se assignment ka wait karein." : tab === "escalated" ? "Jab aap koi ticket escalate karenge, yahan dikhega." : "Doosra tab check karein."}
//           </p>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {activeTicketsList.map((ticket) => {
//             const isEscalatedTicket = tab === "escalated";
//             return (
//               <div key={ticket._id} style={{ border: `1.5px solid ${isEscalatedTicket ? "#e1bee7" : "#e8edf2"}`, borderRadius: 12, background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden" }}>
//                 <div style={{ padding: "14px 16px" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                     <div>
//                       <div style={{ fontWeight: 700, fontSize: 13 }}>#{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}</div>
//                       <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>👤 {ticket.clientName} · {ticket.projectName || ticket.projectId} · {formatDate(ticket.createdAt)}</div>
//                     </div>
//                     <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
//                       <Badge label={ticket.status} colorMap={STATUS_COLORS} />
//                       <Badge label={ticket.priority} colorMap={PRIORITY_COLORS} />
//                       {/* ✅ Show who it was escalated to */}
//                       {isEscalatedTicket && ticket.assignedTo && (
//                         <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: "#e3f2fd", color: "#0288d1" }}>
//                           Now with: {ticket.assignedTo.name || ticket.assignedTo.role}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* ✅ Show escalation reason in list view */}
//                   {isEscalatedTicket && ticket.escalationLog?.length > 0 && (() => {
//                     const myLog = [...ticket.escalationLog].reverse().find((e) => e.from === staffId);
//                     return myLog ? (
//                       <div style={{ marginTop: 8, padding: "6px 10px", background: "#fdf6ff", borderRadius: 6, fontSize: 12, color: "#6a1b9a" }}>
//                         📝 Reason: <span style={{ fontWeight: 600 }}>{myLog.reason}</span>
//                         <span style={{ color: "#94a3b8", marginLeft: 8 }}>→ {myLog.toName}</span>
//                       </div>
//                     ) : null;
//                   })()}

//                   {!isEscalatedTicket && ticket.messages?.length > 0 && (
//                     <p style={{ margin: "8px 0 0", fontSize: 12, color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                       {ticket.messages[ticket.messages.length - 1]?.message}
//                     </p>
//                   )}
//                 </div>
//                 <div style={{ borderTop: "1px solid #f0f4f8", padding: "10px 16px", background: isEscalatedTicket ? "#fdf6ff" : "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <span style={{ fontSize: 11, color: "#94a3b8" }}>💬 {ticket.messages?.length || 0} messages</span>
//                   <button
//                     onClick={() => { setActiveTicket(ticket); setIsActiveEscalated(isEscalatedTicket); setShowEscalate(false); }}
//                     style={{ background: isEscalatedTicket ? "#8e24aa" : "#0288d1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
//                     {isEscalatedTicket ? "📋 View History" : "💬 Open Chat"}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
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

// const STATUS_COLORS = {
//   open:          { bg: "#fff3e0", text: "#e65100", dot: "#f57c00" },
//   "in-progress": { bg: "#e3f2fd", text: "#01579b", dot: "#0288d1" },
//   resolved:      { bg: "#e8f5e9", text: "#1b5e20", dot: "#388e3c" },
//   closed:        { bg: "#f5f5f5", text: "#424242", dot: "#9e9e9e" },
//   escalated:     { bg: "#f3e5f5", text: "#6a1b9a", dot: "#8e24aa" },
// };
// const PRIORITY_COLORS = {
//   high:   { bg: "#ffebee", text: "#b71c1c" },
//   medium: { bg: "#fff8e1", text: "#f57f17" },
//   low:    { bg: "#e8f5e9", text: "#2e7d32" },
// };

// const Badge = ({ label, colorMap }) => {
//   const c = colorMap?.[label] || { bg: "#f0f0f0", text: "#555" };
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text }}>
//       {c.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}
//       {label}
//     </span>
//   );
// };

// const getStaffFromSession = () => {
//   try {
//     const raw = sessionStorage.getItem("management_staff");
//     return raw ? JSON.parse(raw) : null;
//   } catch { return null; }
// };

// const getTokenFromSession = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// // ─── Chat Panel ───────────────────────────────────────────────────────────────
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, readOnly }) => {
//   const [text, setText]       = useState("");
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
//         body: JSON.stringify({ sender: "staff", senderId: staffId, senderName: staffName, message: text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon: "error", title: "Error", text: data.message || "Send failed." });
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Message send nahi hua." });
//     } finally { setSending(false); }
//   };

//   const fmtTime  = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//   const fmtDate  = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
//   const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ overflowY: "auto", padding: 16, background: "#f8fafc", display: "flex", flexDirection: "column", gap: 12, minHeight: 280, maxHeight: 380 }}>
//         {!(ticket?.messages?.length) && (
//           <div style={{ textAlign: "center", color: "#94a3b8", paddingTop: 40, fontSize: 13 }}>No messages yet.</div>
//         )}
//         {(ticket?.messages || []).map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           if (isSystem) return (
//             <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
//               <span style={{ background: "#e2e8f0", padding: "2px 12px", borderRadius: 50 }}>{msg.message}</span>
//             </div>
//           );
//           return (
//             <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
//               {!isMe && (
//                 <div style={{ width: 28, height: 28, borderRadius: "50%", background: msg.sender === "client" ? "#e3f2fd" : "#fce4ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: msg.sender === "client" ? "#1976d2" : "#c2185b", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
//                   {(msg.senderName || "?").charAt(0).toUpperCase()}
//                 </div>
//               )}
//               <div style={{ maxWidth: "72%" }}>
//                 {!isMe && <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, marginLeft: 2 }}>{msg.senderName} {msg.sender === "client" ? "👤" : "🛡️"}</div>}
//                 <div style={{ padding: "10px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? "#0288d1" : "#fff", color: isMe ? "#fff" : "#1a1a2e", fontSize: 13, lineHeight: 1.5, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: isMe ? "none" : "1px solid #e8edf2" }}>
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

//       {readOnly ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#8e24aa", borderTop: "1px solid #f0f0f0", background: "#fdf6ff" }}>
//           ⬆️ Yeh ticket escalate ho chuka hai. Sirf history dekh sakte hain.
//         </div>
//       ) : isClosed ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#94a3b8", borderTop: "1px solid #f0f0f0" }}>
//           🔒 Ticket {ticket?.status} hai.
//         </div>
//       ) : (
//         <div style={{ display: "flex", gap: 8, padding: "12px 16px", alignItems: "center", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
//           <input type="text" placeholder="Client ko reply karein..." value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendReply()}
//             style={{ flex: 1, padding: "9px 14px", borderRadius: 50, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc" }}
//           />
//           <button onClick={sendReply} disabled={!text.trim() || sending}
//             style={{ width: 38, height: 38, borderRadius: "50%", background: text.trim() ? "#0288d1" : "#e0e0e0", border: "none", color: "#fff", cursor: text.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
//             {sending ? "⋯" : "➤"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Escalation Log Panel ─────────────────────────────────────────────────────
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding: "12px 16px", background: "#fdf6ff", borderTop: "1px solid #e1bee7" }}>
//       <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>📋 Escalation History</div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//         {log.map((entry, i) => (
//           <div key={i} style={{ background: "#fff", border: "1px solid #e1bee7", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
//               <span>
//                 <span style={{ fontWeight: 600, color: "#6a1b9a" }}>{entry.fromName || entry.from}</span>
//                 <span style={{ color: "#94a3b8", margin: "0 6px" }}>→</span>
//                 <span style={{ fontWeight: 600, color: "#0288d1" }}>{entry.toName || entry.to}</span>
//               </span>
//               <span style={{ color: "#94a3b8", fontSize: 10 }}>
//                 {new Date(entry.escalatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
//               </span>
//             </div>
//             {entry.reason && (
//               <div style={{ marginTop: 4, color: "#64748b", fontSize: 11 }}>📝 {entry.reason}</div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ════════════════════════════════════════════════════════════════════════════
// const StaffHelpSupport = ({ staffId: propStaffId, staffName: propStaffName, staffRole: propStaffRole, adminAssistantList = [] }) => {

//   const [staffId,   setStaffId]   = useState(propStaffId   || "");
//   const [staffName, setStaffName] = useState(propStaffName || "");
//   const [staffRole, setStaffRole] = useState(propStaffRole || "staff");

//   useEffect(() => {
//     if (propStaffId) return;
//     const d = getStaffFromSession();
//     if (d) {
//       setStaffId(d._id || d.id || "");
//       setStaffName(d.name || d.firstName || "");
//       const slug = d.slug || d.roleName || "";
//       setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [propStaffId]);

//   const [tickets,           setTickets]           = useState([]);
//   const [escalatedTickets,  setEscalatedTickets]  = useState([]);
//   const [activeTicket,      setActiveTicket]      = useState(null);
//   const [isActiveEscalated, setIsActiveEscalated] = useState(false);
//   const [loading,           setLoading]           = useState(false);
//   const [loadingEscalated,  setLoadingEscalated]  = useState(false);
//   const [error,             setError]             = useState("");
//   const [tab,               setTab]               = useState("all");
//   const [showEscalate,      setShowEscalate]      = useState(false);
//   const [escalateForm,      setEscalateForm]      = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
//   const [escalating,        setEscalating]        = useState(false);
//   const [resolving,         setResolving]         = useState(false); // ✅ NEW

//   const socketRef       = useRef(null);
//   const activeTicketRef = useRef(null);
//   useEffect(() => { activeTicketRef.current = activeTicket; }, [activeTicket]);

//   useEffect(() => {
//     setEscalateForm((f) => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" }));
//   }, [staffRole]);

//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const data = await res.json();
//       if (res.ok) setTickets(data.tickets || []);
//       else setError(data.message || "Failed to fetch.");
//     } catch { setError("Network error. Please refresh."); }
//     finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalatedTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoadingEscalated(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const data = await res.json();
//       if (res.ok) setEscalatedTickets(data.tickets || []);
//       else setEscalatedTickets([]);
//     } catch { setEscalatedTickets([]); }
//     finally { setLoadingEscalated(false); }
//   }, [staffId]);

//   const fetchSingleTicket = useCallback(async (ticketMongoId) => {
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${ticketMongoId}`);
//       const data = await res.json();
//       if (!res.ok || !data.ticket) return;
//       const updated = data.ticket;
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     } catch { /* silent */ }
//   }, []);

//   useEffect(() => {
//     if (staffId) { fetchTickets(); fetchEscalatedTickets(); }
//   }, [staffId, fetchTickets, fetchEscalatedTickets]);

//   useEffect(() => {
//     if (tab === "escalated" && staffId) fetchEscalatedTickets();
//   }, [tab, staffId, fetchEscalatedTickets]);

//   // Socket.IO
//   useEffect(() => {
//     if (!staffId) return;
//     const socket = socketIo(Url, { transports: ["websocket"], reconnectionAttempts: 5 });
//     socketRef.current = socket;
//     socket.on("connect", () => {
//       const token = getTokenFromSession();
//       if (token) socket.emit("join", token);
//     });
//     socket.on("support:assigned_to_you", (data) => {
//       Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 5000, title: `New Ticket: #${data.ticketCode}`, text: `${data.subject} — ${data.clientName}` });
//       fetchTickets();
//     });
//     socket.on("support:ticket_updated", (updated) => {
//       if (updated.assignedTo?.id !== staffId) {
//         setTickets((prev) => prev.filter((t) => t._id !== updated._id));
//         if (activeTicketRef.current?._id === updated._id) setActiveTicket(null);
//         fetchEscalatedTickets();
//         return;
//       }
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     });
//     socket.on("support:new_message", ({ ticketId: ticketMongoId }) => {
//       if (activeTicketRef.current?._id === ticketMongoId) fetchSingleTicket(ticketMongoId);
//       else fetchTickets();
//     });
//     return () => { socket.disconnect(); socketRef.current = null; };
//   }, [staffId, fetchTickets, fetchEscalatedTickets, fetchSingleTicket]);

//   // ✅ NEW: Resolve handler
//   const handleResolve = async () => {
//     if (!activeTicket || resolving) return;
//     const confirm = await Swal.fire({
//       title: "Ticket Resolve Karein?",
//       text: "Kya aap confirm karte hain ki yeh issue resolve ho gaya hai?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "✅ Haan, Resolve Karo",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#388e3c",
//     });
//     if (!confirm.isConfirmed) return;
//     setResolving(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "resolved" }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Resolved! ✅", text: "Ticket successfully resolve ho gaya.", timer: 2000, showConfirmButton: false });
//         setActiveTicket(data.ticket);
//         setTickets((prev) => prev.map((t) => (t._id === data.ticket._id ? data.ticket : t)));
//         setShowEscalate(false);
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: data.message || "Status update failed." });
//       }
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Network error. Try again." });
//     } finally { setResolving(false); }
//   };

//   // Escalate handler
//   const handleEscalate = async () => {
//     if (!activeTicket || !escalateForm.reason.trim()) {
//       Swal.fire({ icon: "warning", title: "Reason required", text: "Escalation reason likhein." }); return;
//     }
//     if (escalateForm.toRole === "admin-assistant" && !escalateForm.toId) {
//       Swal.fire({ icon: "warning", title: "Select Assistant", text: "Admin Assistant select karein." }); return;
//     }
//     setEscalating(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fromId: staffId, fromName: staffName, toRole: escalateForm.toRole, toId: escalateForm.toRole === "admin" ? null : escalateForm.toId, toName: escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName, reason: escalateForm.reason }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Escalated! ✅", timer: 2000, showConfirmButton: false });
//         setTickets((prev) => prev.filter((t) => t._id !== activeTicket._id));
//         setEscalatedTickets((prev) => [data.ticket, ...prev.filter((t) => t._id !== data.ticket._id)]);
//         setActiveTicket(null); setShowEscalate(false);
//         setEscalateForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
//         fetchEscalatedTickets();
//       } else Swal.fire({ icon: "error", title: "Error", text: data.message });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   const activeTicketsList = tab === "all" ? tickets : tab === "escalated" ? escalatedTickets : tickets.filter((t) => t.status === tab);
//   const formatDate        = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

//   const tabs = [
//     { key: "all",         label: "All",         count: tickets.length,                                           icon: "📋" },
//     { key: "open",        label: "Open",        count: tickets.filter((t) => t.status === "open").length,        icon: "🟡" },
//     { key: "in-progress", label: "In Progress", count: tickets.filter((t) => t.status === "in-progress").length, icon: "🔵" },
//     { key: "resolved",    label: "Resolved",    count: tickets.filter((t) => t.status === "resolved").length,    icon: "🟢" },
//     { key: "escalated",   label: "Escalated",   count: escalatedTickets.length,                                  icon: "⬆️" },
//   ];

//   // Can ticket be actioned (not closed/resolved and not escalated view)
//   const isTicketActive = activeTicket &&
//     activeTicket.status !== "closed" &&
//     activeTicket.status !== "resolved" &&
//     !isActiveEscalated;

//   if (!staffId) return (
//     <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontFamily: "'Segoe UI', sans-serif" }}>
//       <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
//       <p style={{ fontWeight: 600 }}>Staff identity nahi mili.</p>
//       <p style={{ fontSize: 13 }}>Please login karein ya page refresh karein.</p>
//     </div>
//   );

//   return (
//     <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>
//       {/* Header */}
//       <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
//         <div>
//           <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🎧 My Support Tickets</h2>
//           <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>Tickets assigned to you · <b>{staffName}</b> ({staffRole})</p>
//         </div>
//         <button onClick={() => { fetchTickets(); fetchEscalatedTickets(); }}
//           style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
//           🔄 Refresh
//         </button>
//       </div>

//       {error && <div style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#c62828" }}>⚠️ {error}</div>}

//       {/* Tabs */}
//       <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4, flexWrap: "wrap" }}>
//         {tabs.map((t) => (
//           <button key={t.key}
//             onClick={() => { setTab(t.key); setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }}
//             style={{ flex: 1, minWidth: 80, padding: "8px 10px", borderRadius: 8, border: "none", background: tab === t.key ? "#fff" : "transparent", boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none", fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? (t.key === "escalated" ? "#6a1b9a" : "#1976d2") : "#64748b", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
//             <span>{t.icon}</span><span>{t.label}</span>
//             {t.count > 0 && (
//               <span style={{ background: tab === t.key ? (t.key === "escalated" ? "#8e24aa" : "#1976d2") : "#94a3b8", color: "#fff", borderRadius: 50, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px" }}>{t.count}</span>
//             )}
//           </button>
//         ))}
//       </div>

//       {tab === "escalated" && !activeTicket && (
//         <div style={{ background: "#fdf6ff", border: "1px solid #e1bee7", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#6a1b9a", display: "flex", alignItems: "center", gap: 8 }}>
//           <span style={{ fontSize: 18 }}>⬆️</span>
//           <span>Yeh woh tickets hain jo aapne escalate kiye hain. Sirf history dekhne ke liye hain — reply nahi kar sakte.</span>
//         </div>
//       )}

//       {/* Active ticket detail view */}
//       {activeTicket ? (
//         <div style={{ border: `1.5px solid ${isActiveEscalated ? "#e1bee7" : "#e2e8f0"}`, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>

//           {/* Ticket header */}
//           <div style={{ padding: "14px 18px", background: isActiveEscalated ? "#fdf6ff" : "#f8fafc", borderBottom: `1px solid ${isActiveEscalated ? "#e1bee7" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <button onClick={() => { setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }}
//                 style={{ background: "#f1f5f9", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: "50%", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>#{activeTicket.ticketId} — {activeTicket.subject === "Other" ? activeTicket.customSubject : activeTicket.subject}</div>
//                 <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>👤 {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}</div>
//               </div>
//             </div>

//             <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
//               <Badge label={activeTicket.status}   colorMap={STATUS_COLORS} />
//               <Badge label={activeTicket.priority} colorMap={PRIORITY_COLORS} />

//               {/* ✅ Resolve button */}
//               {isTicketActive && (
//                 <button onClick={handleResolve} disabled={resolving}
//                   style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: resolving ? "#a5d6a7" : "#2e7d32", color: "#fff", fontWeight: 600, fontSize: 12, cursor: resolving ? "wait" : "pointer", display: "flex", alignItems: "center", gap: 5 }}>
//                   {resolving ? "⏳ Resolving..." : "✅ Mark Resolved"}
//                 </button>
//               )}

//               {/* Escalate button */}
//               {isTicketActive && (
//                 <button onClick={() => setShowEscalate(!showEscalate)}
//                   style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
//                   ⬆️ Escalate
//                 </button>
//               )}

//               {isActiveEscalated && (
//                 <span style={{ padding: "4px 12px", borderRadius: 50, background: "#f3e5f5", color: "#6a1b9a", fontSize: 11, fontWeight: 600 }}>⬆️ Escalated by You</span>
//               )}
//             </div>
//           </div>

//           {/* Resolved notice */}
//           {!isActiveEscalated && activeTicket.status === "resolved" && (
//             <div style={{ padding: "10px 18px", background: "#e8f5e9", borderBottom: "1px solid #c8e6c9", fontSize: 13, color: "#2e7d32", display: "flex", alignItems: "center", gap: 8 }}>
//               <span>✅</span><span>Yeh ticket aapne resolve kar diya hai. Admin final close karega.</span>
//             </div>
//           )}

//           {isActiveEscalated && activeTicket.escalationLog?.length > 0 && (
//             <EscalationLog log={activeTicket.escalationLog} />
//           )}

//           {/* Escalate panel */}
//           {showEscalate && !isActiveEscalated && (
//             <div style={{ padding: 16, background: "#fffde7", borderBottom: "1px solid #ffe082" }}>
//               <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>⬆️ Escalate Ticket</div>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//                 <div>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Escalate To</label>
//                   <select value={escalateForm.toRole} onChange={(e) => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })}
//                     style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                     {staffRole === "staff" && <option value="admin-assistant">Admin Assistant</option>}
//                     <option value="admin">Back to Admin</option>
//                   </select>
//                 </div>
//                 {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Select Assistant</label>
//                     <select value={escalateForm.toId}
//                       onChange={(e) => { const a = adminAssistantList.find((x) => x._id === e.target.value); setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" }); }}
//                       style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                       <option value="">-- Select --</option>
//                       {adminAssistantList.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
//                     </select>
//                   </div>
//                 )}
//                 <div style={{ flex: 1, minWidth: 200 }}>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Reason *</label>
//                   <input type="text" placeholder="Escalation ka reason likhein..." value={escalateForm.reason}
//                     onChange={(e) => setEscalateForm({ ...escalateForm, reason: e.target.value })}
//                     style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box", outline: "none", background: "#fff" }} />
//                 </div>
//                 <button onClick={handleEscalate} disabled={escalating || !escalateForm.reason.trim()}
//                   style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: escalating ? "#ffa726" : "#f57c00", color: "#fff", fontWeight: 700, fontSize: 13, cursor: escalating ? "wait" : "pointer" }}>
//                   {escalating ? "Escalating..." : "⬆️ Confirm"}
//                 </button>
//                 <button onClick={() => setShowEscalate(false)}
//                   style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13 }}>Cancel</button>
//               </div>
//             </div>
//           )}

//           <TicketChat ticket={activeTicket} staffId={staffId} staffName={staffName}
//             readOnly={isActiveEscalated}
//             onUpdate={(updated) => {
//               setActiveTicket(updated);
//               setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//             }}
//           />
//         </div>

//       ) : (loading && tab !== "escalated") || (loadingEscalated && tab === "escalated") ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div><p>Loading tickets...</p></div>

//       ) : activeTicketsList.length === 0 ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//           <div style={{ fontSize: 48, marginBottom: 10 }}>{tab === "escalated" ? "⬆️" : "🎉"}</div>
//           <p style={{ fontWeight: 600, fontSize: 15 }}>
//             {tab === "all" ? "Koi ticket assigned nahi hai." : tab === "escalated" ? "Aapne abhi koi ticket escalate nahi kiya." : `Koi ${tab} ticket nahi.`}
//           </p>
//           <p style={{ fontSize: 13 }}>
//             {tab === "all" ? "Admin se assignment ka wait karein." : tab === "escalated" ? "Jab aap koi ticket escalate karenge, yahan dikhega." : "Doosra tab check karein."}
//           </p>
//         </div>

//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {activeTicketsList.map((ticket) => {
//             const isEscalatedTicket = tab === "escalated";
//             return (
//               <div key={ticket._id} style={{ border: `1.5px solid ${isEscalatedTicket ? "#e1bee7" : "#e8edf2"}`, borderRadius: 12, background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden" }}>
//                 <div style={{ padding: "14px 16px" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                     <div>
//                       <div style={{ fontWeight: 700, fontSize: 13 }}>#{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}</div>
//                       <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>👤 {ticket.clientName} · {ticket.projectName || ticket.projectId} · {formatDate(ticket.createdAt)}</div>
//                     </div>
//                     <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
//                       <Badge label={ticket.status} colorMap={STATUS_COLORS} />
//                       <Badge label={ticket.priority} colorMap={PRIORITY_COLORS} />
//                       {isEscalatedTicket && ticket.assignedTo && (
//                         <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: "#e3f2fd", color: "#0288d1" }}>
//                           Now with: {ticket.assignedTo.name || ticket.assignedTo.role}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {isEscalatedTicket && ticket.escalationLog?.length > 0 && (() => {
//                     const myLog = [...ticket.escalationLog].reverse().find((e) => e.from === staffId);
//                     return myLog ? (
//                       <div style={{ marginTop: 8, padding: "6px 10px", background: "#fdf6ff", borderRadius: 6, fontSize: 12, color: "#6a1b9a" }}>
//                         📝 Reason: <span style={{ fontWeight: 600 }}>{myLog.reason}</span>
//                         <span style={{ color: "#94a3b8", marginLeft: 8 }}>→ {myLog.toName}</span>
//                       </div>
//                     ) : null;
//                   })()}

//                   {!isEscalatedTicket && ticket.messages?.length > 0 && (
//                     <p style={{ margin: "8px 0 0", fontSize: 12, color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                       {ticket.messages[ticket.messages.length - 1]?.message}
//                     </p>
//                   )}
//                 </div>

//                 <div style={{ borderTop: "1px solid #f0f4f8", padding: "10px 16px", background: isEscalatedTicket ? "#fdf6ff" : "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <span style={{ fontSize: 11, color: "#94a3b8" }}>💬 {ticket.messages?.length || 0} messages</span>
//                   <button
//                     onClick={() => { setActiveTicket(ticket); setIsActiveEscalated(isEscalatedTicket); setShowEscalate(false); }}
//                     style={{ background: isEscalatedTicket ? "#8e24aa" : "#0288d1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
//                     {isEscalatedTicket ? "📋 View History" : "💬 Open Chat"}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
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

// const STATUS_COLORS = {
//   open:          { bg: "#fff3e0", text: "#e65100", dot: "#f57c00" },
//   "in-progress": { bg: "#e3f2fd", text: "#01579b", dot: "#0288d1" },
//   resolved:      { bg: "#e8f5e9", text: "#1b5e20", dot: "#388e3c" },
//   closed:        { bg: "#f5f5f5", text: "#424242", dot: "#9e9e9e" },
//   escalated:     { bg: "#f3e5f5", text: "#6a1b9a", dot: "#8e24aa" },
// };
// const PRIORITY_COLORS = {
//   high:   { bg: "#ffebee", text: "#b71c1c" },
//   medium: { bg: "#fff8e1", text: "#f57f17" },
//   low:    { bg: "#e8f5e9", text: "#2e7d32" },
// };

// const Badge = ({ label, colorMap }) => {
//   const c = colorMap?.[label] || { bg: "#f0f0f0", text: "#555" };
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text }}>
//       {c.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}
//       {label}
//     </span>
//   );
// };

// const getStaffFromSession = () => {
//   try {
//     const raw = sessionStorage.getItem("management_staff");
//     return raw ? JSON.parse(raw) : null;
//   } catch { return null; }
// };

// const getTokenFromSession = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// // ─── Chat Panel ───────────────────────────────────────────────────────────────
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, readOnly }) => {
//   const [text, setText]       = useState("");
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
//         body: JSON.stringify({ sender: "staff", senderId: staffId, senderName: staffName, message: text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon: "error", title: "Error", text: data.message || "Send failed." });
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Message send nahi hua." });
//     } finally { setSending(false); }
//   };

//   const fmtTime  = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//   const fmtDate  = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
//   const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ overflowY: "auto", padding: 16, background: "#f8fafc", display: "flex", flexDirection: "column", gap: 12, minHeight: 280, maxHeight: 380 }}>
//         {!(ticket?.messages?.length) && (
//           <div style={{ textAlign: "center", color: "#94a3b8", paddingTop: 40, fontSize: 13 }}>No messages yet.</div>
//         )}
//         {(ticket?.messages || []).map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           if (isSystem) return (
//             <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
//               <span style={{ background: "#e2e8f0", padding: "2px 12px", borderRadius: 50 }}>{msg.message}</span>
//             </div>
//           );
//           return (
//             <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
//               {!isMe && (
//                 <div style={{ width: 28, height: 28, borderRadius: "50%", background: msg.sender === "client" ? "#e3f2fd" : "#fce4ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: msg.sender === "client" ? "#1976d2" : "#c2185b", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
//                   {(msg.senderName || "?").charAt(0).toUpperCase()}
//                 </div>
//               )}
//               <div style={{ maxWidth: "72%" }}>
//                 {!isMe && <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, marginLeft: 2 }}>{msg.senderName} {msg.sender === "client" ? "👤" : "🛡️"}</div>}
//                 <div style={{ padding: "10px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? "#0288d1" : "#fff", color: isMe ? "#fff" : "#1a1a2e", fontSize: 13, lineHeight: 1.5, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: isMe ? "none" : "1px solid #e8edf2" }}>
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

//       {readOnly ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#8e24aa", borderTop: "1px solid #f0f0f0", background: "#fdf6ff" }}>
//           ⬆️ Yeh ticket escalate ho chuka hai. Sirf history dekh sakte hain.
//         </div>
//       ) : isClosed ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#94a3b8", borderTop: "1px solid #f0f0f0" }}>
//           🔒 Ticket {ticket?.status} hai.
//         </div>
//       ) : (
//         <div style={{ display: "flex", gap: 8, padding: "12px 16px", alignItems: "center", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
//           <input type="text" placeholder="Client ko reply karein..." value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendReply()}
//             style={{ flex: 1, padding: "9px 14px", borderRadius: 50, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc" }}
//           />
//           <button onClick={sendReply} disabled={!text.trim() || sending}
//             style={{ width: 38, height: 38, borderRadius: "50%", background: text.trim() ? "#0288d1" : "#e0e0e0", border: "none", color: "#fff", cursor: text.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
//             {sending ? "⋯" : "➤"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── Escalation Log Panel ─────────────────────────────────────────────────────
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding: "12px 16px", background: "#fdf6ff", borderTop: "1px solid #e1bee7" }}>
//       <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>📋 Escalation History</div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//         {log.map((entry, i) => (
//           <div key={i} style={{ background: "#fff", border: "1px solid #e1bee7", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
//               <span>
//                 <span style={{ fontWeight: 600, color: "#6a1b9a" }}>{entry.fromName || entry.from}</span>
//                 <span style={{ color: "#94a3b8", margin: "0 6px" }}>→</span>
//                 <span style={{ fontWeight: 600, color: "#0288d1" }}>{entry.toName || entry.to}</span>
//               </span>
//               <span style={{ color: "#94a3b8", fontSize: 10 }}>
//                 {new Date(entry.escalatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
//               </span>
//             </div>
//             {entry.reason && <div style={{ marginTop: 4, color: "#64748b", fontSize: 11 }}>📝 {entry.reason}</div>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ════════════════════════════════════════════════════════════════════════════
// const StaffHelpSupport = ({
//   staffId:           propStaffId,
//   staffName:         propStaffName,
//   staffRole:         propStaffRole,
//   adminAssistantList: propAdminAssistantList, // optional — auto-fetched if not passed
// }) => {

//   const [staffId,   setStaffId]   = useState(propStaffId   || "");
//   const [staffName, setStaffName] = useState(propStaffName || "");
//   const [staffRole, setStaffRole] = useState(propStaffRole || "staff");

//   // ✅ FIX: auto-fetch admin assistants if prop not passed
//   const [adminAssistantList, setAdminAssistantList] = useState(propAdminAssistantList || []);

//   // Read from sessionStorage if no props
//   useEffect(() => {
//     if (propStaffId) return;
//     const d = getStaffFromSession();
//     if (d) {
//       setStaffId(d._id || d.id || "");
//       setStaffName(d.name || d.firstName || "");
//       const slug = d.slug || d.roleName || "";
//       setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [propStaffId]);

//   // ✅ FIX: fetch admin-assistant list from /management-staff endpoint
//   useEffect(() => {
//     if (propAdminAssistantList?.length) return; // already provided via props
//     const fetchAssistants = async () => {
//       try {
//         const res  = await fetch(`${Url}/management-staff`);
//         const data = await res.json();
//         // API may return array directly or { staff: [...] }
//         const list = Array.isArray(data) ? data : (data.staff || data.data || []);
//         // Keep only admin-assistant role entries
//         const assistants = list.filter((s) => {
//           const slug = (s.slug || s.roleName || "").toLowerCase();
//           return slug.includes("admin-assistant") || slug.includes("admin assistant");
//         });
//         setAdminAssistantList(assistants);
//       } catch { /* silent — escalate to admin still works */ }
//     };
//     fetchAssistants();
//   }, [propAdminAssistantList]);

//   const [tickets,           setTickets]           = useState([]);
//   const [escalatedTickets,  setEscalatedTickets]  = useState([]);
//   const [activeTicket,      setActiveTicket]      = useState(null);
//   const [isActiveEscalated, setIsActiveEscalated] = useState(false);
//   const [loading,           setLoading]           = useState(false);
//   const [loadingEscalated,  setLoadingEscalated]  = useState(false);
//   const [error,             setError]             = useState("");
//   const [tab,               setTab]               = useState("all");
//   const [showEscalate,      setShowEscalate]      = useState(false);
//   const [escalateForm,      setEscalateForm]      = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
//   const [escalating,        setEscalating]        = useState(false);
//   const [resolving,         setResolving]         = useState(false);

//   const socketRef       = useRef(null);
//   const activeTicketRef = useRef(null);
//   useEffect(() => { activeTicketRef.current = activeTicket; }, [activeTicket]);

//   useEffect(() => {
//     setEscalateForm((f) => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" }));
//   }, [staffRole]);

//   // ── Fetch tickets ─────────────────────────────────────────────────────
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const data = await res.json();
//       if (res.ok) setTickets(data.tickets || []);
//       else setError(data.message || "Failed to fetch.");
//     } catch { setError("Network error. Please refresh."); }
//     finally { setLoading(false); }
//   }, [staffId]);





//   const fetchEscalatedTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoadingEscalated(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const data = await res.json();
//       setEscalatedTickets(res.ok ? (data.tickets || []) : []);
//     } catch { setEscalatedTickets([]); }
//     finally { setLoadingEscalated(false); }
//   }, [staffId]);

//   const fetchSingleTicket = useCallback(async (ticketMongoId) => {
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${ticketMongoId}`);
//       const data = await res.json();
//       if (!res.ok || !data.ticket) return;
//       const updated = data.ticket;
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     } catch { /* silent */ }
//   }, []);

//   useEffect(() => {
//     if (staffId) { fetchTickets(); fetchEscalatedTickets(); }
//   }, [staffId, fetchTickets, fetchEscalatedTickets]);

//   useEffect(() => {
//     if (tab === "escalated" && staffId) fetchEscalatedTickets();
//   }, [tab, staffId, fetchEscalatedTickets]);

//   // ── Socket.IO ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!staffId) return;
//     const socket = socketIo(Url, { transports: ["websocket"], reconnectionAttempts: 5 });
//     socketRef.current = socket;
//     socket.on("connect", () => {
//       const token = getTokenFromSession();
//       if (token) socket.emit("join", token);
//     });
//     socket.on("support:assigned_to_you", (data) => {
//       Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 5000, title: `New Ticket: #${data.ticketCode}`, text: `${data.subject} — ${data.clientName}` });
//       fetchTickets();
//     });
//     socket.on("support:ticket_updated", (updated) => {
//       if (updated.assignedTo?.id !== staffId) {
//         setTickets((prev) => prev.filter((t) => t._id !== updated._id));
//         if (activeTicketRef.current?._id === updated._id) setActiveTicket(null);
//         fetchEscalatedTickets();
//         return;
//       }
//       setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     });
//     socket.on("support:new_message", ({ ticketId: ticketMongoId }) => {
//       if (activeTicketRef.current?._id === ticketMongoId) fetchSingleTicket(ticketMongoId);
//       else fetchTickets();
//     });
//     return () => { socket.disconnect(); socketRef.current = null; };
//   }, [staffId, fetchTickets, fetchEscalatedTickets, fetchSingleTicket]);

//   // ── Resolve ───────────────────────────────────────────────────────────
//   const handleResolve = async () => {
//     if (!activeTicket || resolving) return;
//     const confirm = await Swal.fire({
//       title: "Ticket Resolve Karein?",
//       text: " are you confirmed to resolve the issue ?",
     
//       icon: "question", showCancelButton: true,
//       confirmButtonText: "✅ yes, Resolve it", cancelButtonText: "Cancel", confirmButtonColor: "#388e3c",
//     });
//     if (!confirm.isConfirmed) return;
//     setResolving(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "resolved" }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Resolved! ✅", timer: 2000, showConfirmButton: false });
//         setActiveTicket(data.ticket);
//         setTickets((prev) => prev.map((t) => (t._id === data.ticket._id ? data.ticket : t)));
//         setShowEscalate(false);
//       } else Swal.fire({ icon: "error", title: "Error", text: data.message || "Status update failed." });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Network error." }); }
//     finally { setResolving(false); }
//   };


  

//   // ── Escalate ──────────────────────────────────────────────────────────
//   const handleEscalate = async () => {
//     if (!activeTicket || !escalateForm.reason.trim()) {
//       Swal.fire({ icon: "warning", title: "Reason required", text: "Escalation reason likhein." }); return;
//     }
//     // ✅ FIX: if admin-assistant selected but no toId AND no assistants exist → auto-escalate to admin
//     if (escalateForm.toRole === "admin-assistant" && !escalateForm.toId) {
//       if (adminAssistantList.length === 0) {
//         // No admin assistants available → escalate to admin directly
//         setEscalateForm((f) => ({ ...f, toRole: "admin", toId: "", toName: "Admin" }));
//         Swal.fire({ icon: "info", title: "No Admin Assistant", text: "Koi admin assistant available nahi, admin ko escalate kar rahe hain.", timer: 2500, showConfirmButton: false });
//         return;
//       }
//       Swal.fire({ icon: "warning", title: "Select Assistant", text: "Admin Assistant select karein." }); return;
//     }
//     setEscalating(true);
//     try {
//       const res  = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromId: staffId, fromName: staffName,
//           toRole: escalateForm.toRole,
//           toId:   escalateForm.toRole === "admin" ? null : escalateForm.toId,
//           toName: escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName,
//           reason: escalateForm.reason,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Escalated! ✅", timer: 2000, showConfirmButton: false });
//         setTickets((prev) => prev.filter((t) => t._id !== activeTicket._id));
//         setEscalatedTickets((prev) => [data.ticket, ...prev.filter((t) => t._id !== data.ticket._id)]);
//         setActiveTicket(null); setShowEscalate(false);
//         setEscalateForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
//         fetchEscalatedTickets();
//       } else Swal.fire({ icon: "error", title: "Error", text: data.message });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   const activeTicketsList = tab === "all" ? tickets : tab === "escalated" ? escalatedTickets : tickets.filter((t) => t.status === tab);
//   const formatDate        = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
//   const isTicketActive    = activeTicket && activeTicket.status !== "closed" && activeTicket.status !== "resolved" && !isActiveEscalated;

//   const tabs = [
//     { key: "all",         label: "All",         count: tickets.length,                                           icon: "📋" },
//     { key: "open",        label: "Open",        count: tickets.filter((t) => t.status === "open").length,        icon: "🟡" },
//     { key: "in-progress", label: "In Progress", count: tickets.filter((t) => t.status === "in-progress").length, icon: "🔵" },
//     { key: "resolved",    label: "Resolved",    count: tickets.filter((t) => t.status === "resolved").length,    icon: "🟢" },
//     { key: "escalated",   label: "Escalated",   count: escalatedTickets.length,                                  icon: "⬆️" },
//   ];

//   if (!staffId) return (
//     <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontFamily: "'Segoe UI', sans-serif" }}>
//       <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
//       <p style={{ fontWeight: 600 }}>Staff identity nahi mili.</p>
//       <p style={{ fontSize: 13 }}>Please login karein ya page refresh karein.</p>
//     </div>
//   );

//   return (
//     <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>
//       {/* Header */}
//       <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
//         <div>
//           <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>🎧 My Support Tickets</h2>
//           <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
//             Tickets assigned to you · <b>{staffName}</b> ({staffRole})
//             {adminAssistantList.length > 0 && (
//               <span style={{ marginLeft: 8, fontSize: 11, color: "#8e24aa" }}>· {adminAssistantList.length} assistant(s) available</span>
//             )}
//           </p>
//         </div>
//         <button onClick={() => { fetchTickets(); fetchEscalatedTickets(); }}
//           style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
//           🔄 Refresh
//         </button>
//       </div>

//       {error && <div style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#c62828" }}>⚠️ {error}</div>}

//       {/* Tabs */}
//       <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4, flexWrap: "wrap" }}>
//         {tabs.map((t) => (
//           <button key={t.key}
//             onClick={() => { setTab(t.key); setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }}
//             style={{ flex: 1, minWidth: 80, padding: "8px 10px", borderRadius: 8, border: "none", background: tab === t.key ? "#fff" : "transparent", boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none", fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? (t.key === "escalated" ? "#6a1b9a" : "#1976d2") : "#64748b", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
//             <span>{t.icon}</span><span>{t.label}</span>
//             {t.count > 0 && (
//               <span style={{ background: tab === t.key ? (t.key === "escalated" ? "#8e24aa" : "#1976d2") : "#94a3b8", color: "#fff", borderRadius: 50, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px" }}>{t.count}</span>
//             )}
//           </button>
//         ))}
//       </div>

//       {tab === "escalated" && !activeTicket && (
//         <div style={{ background: "#fdf6ff", border: "1px solid #e1bee7", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#6a1b9a", display: "flex", alignItems: "center", gap: 8 }}>
//           <span style={{ fontSize: 18 }}>⬆️</span>
//           <span>Yeh woh tickets hain jo aapne escalate kiye hain. Sirf history dekhne ke liye hain.</span>
//         </div>
//       )}

//       {/* ── Active Ticket View ─────────────────────────────────────────── */}
//       {activeTicket ? (
//         <div style={{ border: `1.5px solid ${isActiveEscalated ? "#e1bee7" : "#e2e8f0"}`, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>

//           {/* Header */}
//           <div style={{ padding: "14px 18px", background: isActiveEscalated ? "#fdf6ff" : "#f8fafc", borderBottom: `1px solid ${isActiveEscalated ? "#e1bee7" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <button onClick={() => { setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }}
//                 style={{ background: "#f1f5f9", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: "50%", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>#{activeTicket.ticketId} — {activeTicket.subject === "Other" ? activeTicket.customSubject : activeTicket.subject}</div>
//                 <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>👤 {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}</div>
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
//               <Badge label={activeTicket.status}   colorMap={STATUS_COLORS} />
//               <Badge label={activeTicket.priority} colorMap={PRIORITY_COLORS} />
//               {isTicketActive && (
//                 <button onClick={handleResolve} disabled={resolving}
//                   style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: resolving ? "#a5d6a7" : "#2e7d32", color: "#fff", fontWeight: 600, fontSize: 12, cursor: resolving ? "wait" : "pointer" }}>
//                   {resolving ? "⏳..." : "✅ Mark Resolved"}
//                 </button>
//               )}
//               {isTicketActive && (
//                 <button onClick={() => setShowEscalate(!showEscalate)}
//                   style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: showEscalate ? "#ffe0b2" : "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
//                   ⬆️ Escalate
//                 </button>
//               )}
//               {isActiveEscalated && (
//                 <span style={{ padding: "4px 12px", borderRadius: 50, background: "#f3e5f5", color: "#6a1b9a", fontSize: 11, fontWeight: 600 }}>⬆️ Escalated by You</span>
//               )}
//             </div>
//           </div>

//           {/* Resolved notice */}
//           {!isActiveEscalated && activeTicket.status === "resolved" && (
//             <div style={{ padding: "10px 18px", background: "#e8f5e9", borderBottom: "1px solid #c8e6c9", fontSize: 13, color: "#2e7d32", display: "flex", alignItems: "center", gap: 8 }}>
//               ✅ Yeh ticket aapne resolve kar diya hai. Admin final close karega.
//             </div>
//           )}

//           {isActiveEscalated && <EscalationLog log={activeTicket.escalationLog} />}

//           {/* Escalate Panel */}
//           {showEscalate && !isActiveEscalated && (
//             <div style={{ padding: 16, background: "#fffde7", borderBottom: "1px solid #ffe082" }}>
//               <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>⬆️ Escalate Ticket</div>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//                 <div>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Escalate To</label>
//                   <select value={escalateForm.toRole}
//                     onChange={(e) => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })}
//                     style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                     {/* ✅ Show admin-assistant option only if assistants exist */}
//                     {staffRole === "staff" && adminAssistantList.length > 0 && (
//                       <option value="admin-assistant">Admin Assistant</option>
//                     )}
//                     <option value="admin">Back to Admin</option>
//                   </select>
//                 </div>

//                 {/* Assistant dropdown — only if admin-assistant role selected AND list available */}
//                 {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Select Assistant</label>
//                     <select value={escalateForm.toId}
//                       onChange={(e) => {
//                         const a = adminAssistantList.find((x) => x._id === e.target.value);
//                         setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" });
//                       }}
//                       style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                       <option value="">-- Select Assistant --</option>
//                       {adminAssistantList.map((a) => (
//                         <option key={a._id} value={a._id}>{a.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 <div style={{ flex: 1, minWidth: 200 }}>
//                   <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Reason *</label>
//                   <input type="text" placeholder="Escalation ka reason likhein..."
//                     value={escalateForm.reason}
//                     onChange={(e) => setEscalateForm({ ...escalateForm, reason: e.target.value })}
//                     style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box", outline: "none", background: "#fff" }} />
//                 </div>
//                 <button onClick={handleEscalate} disabled={escalating || !escalateForm.reason.trim()}
//                   style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: escalating ? "#ffa726" : "#f57c00", color: "#fff", fontWeight: 700, fontSize: 13, cursor: escalating ? "wait" : "pointer" }}>
//                   {escalating ? "Escalating..." : "⬆️ Confirm"}
//                 </button>
//                 <button onClick={() => setShowEscalate(false)}
//                   style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13 }}>Cancel</button>
//               </div>
//             </div>
//           )}

//           <TicketChat ticket={activeTicket} staffId={staffId} staffName={staffName}
//             readOnly={isActiveEscalated}
//             onUpdate={(updated) => {
//               setActiveTicket(updated);
//               setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
//             }}
//           />
//         </div>

//       ) : (loading && tab !== "escalated") || (loadingEscalated && tab === "escalated") ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div><p>Loading tickets...</p></div>

//       ) : activeTicketsList.length === 0 ? (
//         <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//           <div style={{ fontSize: 48, marginBottom: 10 }}>{tab === "escalated" ? "⬆️" : "🎉"}</div>
//           <p style={{ fontWeight: 600, fontSize: 15 }}>
//             {tab === "all" ? "Koi ticket assigned nahi hai." : tab === "escalated" ? "Aapne abhi koi ticket escalate nahi kiya." : `Koi ${tab} ticket nahi.`}
//           </p>
//           <p style={{ fontSize: 13 }}>
//             {tab === "all" ? "Admin se assignment ka wait karein." : tab === "escalated" ? "Jab aap escalate karenge, yahan dikhega." : "Doosra tab check karein."}
//           </p>
//         </div>

//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {activeTicketsList.map((ticket) => {
//             const isEscalatedTicket = tab === "escalated";
//             return (
//               <div key={ticket._id} style={{ border: `1.5px solid ${isEscalatedTicket ? "#e1bee7" : "#e8edf2"}`, borderRadius: 12, background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden" }}>
//                 <div style={{ padding: "14px 16px" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                     <div>
//                       <div style={{ fontWeight: 700, fontSize: 13 }}>#{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}</div>
//                       <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>👤 {ticket.clientName} · {ticket.projectName || ticket.projectId} · {formatDate(ticket.createdAt)}</div>
//                     </div>
//                     <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
//                       <Badge label={ticket.status}   colorMap={STATUS_COLORS} />
//                       <Badge label={ticket.priority} colorMap={PRIORITY_COLORS} />
//                       {isEscalatedTicket && ticket.assignedTo && (
//                         <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: "#e3f2fd", color: "#0288d1" }}>
//                           Now with: {ticket.assignedTo.name || ticket.assignedTo.role}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {isEscalatedTicket && (() => {
//                     const myLog = [...(ticket.escalationLog || [])].reverse().find((e) => e.from === staffId);
//                     return myLog ? (
//                       <div style={{ marginTop: 8, padding: "6px 10px", background: "#fdf6ff", borderRadius: 6, fontSize: 12, color: "#6a1b9a" }}>
//                         📝 Reason: <b>{myLog.reason}</b><span style={{ color: "#94a3b8", marginLeft: 8 }}>→ {myLog.toName}</span>
//                       </div>
//                     ) : null;
//                   })()}
//                   {!isEscalatedTicket && ticket.messages?.length > 0 && (
//                     <p style={{ margin: "8px 0 0", fontSize: 12, color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                       {ticket.messages[ticket.messages.length - 1]?.message}
//                     </p>
//                   )}
//                 </div>
//                 <div style={{ borderTop: "1px solid #f0f4f8", padding: "10px 16px", background: isEscalatedTicket ? "#fdf6ff" : "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <span style={{ fontSize: 11, color: "#94a3b8" }}>💬 {ticket.messages?.length || 0} messages</span>
//                   <button onClick={() => { setActiveTicket(ticket); setIsActiveEscalated(isEscalatedTicket); setShowEscalate(false); }}
//                     style={{ background: isEscalatedTicket ? "#8e24aa" : "#0288d1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
//                     {isEscalatedTicket ? "📋 View History" : "💬 Open Chat"}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
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

// const STATUS_COLORS = {
//   open:          { bg: "#fff3e0", text: "#e65100", dot: "#f57c00" },
//   "in-progress": { bg: "#e3f2fd", text: "#01579b", dot: "#0288d1" },
//   resolved:      { bg: "#e8f5e9", text: "#1b5e20", dot: "#388e3c" },
//   closed:        { bg: "#f5f5f5", text: "#424242", dot: "#9e9e9e" },
//   escalated:     { bg: "#f3e5f5", text: "#6a1b9a", dot: "#8e24aa" },
// };
// const PRIORITY_COLORS = {
//   high:   { bg: "#ffebee", text: "#b71c1c" },
//   medium: { bg: "#fff8e1", text: "#f57f17" },
//   low:    { bg: "#e8f5e9", text: "#2e7d32" },
// };

// const Badge = ({ label, colorMap }) => {
//   const c = colorMap?.[label] || { bg: "#f0f0f0", text: "#555" };
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text }}>
//       {c.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}
//       {label}
//     </span>
//   );
// };

// const UnreadDot = ({ count, size = 18 }) => {
//   if (!count || count <= 0) return null;
//   return (
//     <span style={{ background: "#f44336", color: "#fff", borderRadius: 50, minWidth: size, height: size, fontSize: size * 0.6, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700, padding: "0 4px", lineHeight: 1, animation: "supportPulse 1.5s ease infinite" }}>
//       {count > 99 ? "99+" : count}
//     </span>
//   );
// };

// const getStaffFromSession = () => {
//   try { const raw = sessionStorage.getItem("management_staff"); return raw ? JSON.parse(raw) : null; }
//   catch { return null; }
// };
// const getTokenFromSession = () => sessionStorage.getItem("management_token") || localStorage.getItem("management_token") || localStorage.getItem("staffToken") || "";

// const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
//   const [text, setText] = useState("");
//   const [sending, setSending] = useState(false);
//   const chatEnd = useRef(null);

//   useEffect(() => { setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: "smooth" }), 80); }, [ticket?.messages?.length]);
//   useEffect(() => { if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id); }, [ticket?._id]);

//   const sendReply = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sender: "staff", senderId: staffId, senderName: staffName, message: text.trim() }) });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon: "error", title: "Error", text: data.message || "Send failed." });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Message send nahi hua." }); }
//     finally { setSending(false); }
//   };

//   const fmtTime = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//   const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
//   const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ overflowY: "auto", padding: 16, background: "#f8fafc", display: "flex", flexDirection: "column", gap: 12, minHeight: 280, maxHeight: 380 }}>
//         {!(ticket?.messages?.length) && <div style={{ textAlign: "center", color: "#94a3b8", paddingTop: 40, fontSize: 13 }}>No messages yet.</div>}
//         {(ticket?.messages || []).map((msg, i) => {
//           const isMe = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           if (isSystem) return <div key={i} style={{ textAlign: "center", fontSize: 11, color: "#94a3b8" }}><span style={{ background: "#e2e8f0", padding: "2px 12px", borderRadius: 50 }}>{msg.message}</span></div>;
//           return (
//             <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
//               {!isMe && <div style={{ width: 28, height: 28, borderRadius: "50%", background: msg.sender === "client" ? "#e3f2fd" : "#fce4ec", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: msg.sender === "client" ? "#1976d2" : "#c2185b", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>{(msg.senderName || "?").charAt(0).toUpperCase()}</div>}
//               <div style={{ maxWidth: "72%" }}>
//                 {!isMe && <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, marginLeft: 2 }}>{msg.senderName} {msg.sender === "client" ? "👤" : "🛡️"}</div>}
//                 <div style={{ padding: "10px 14px", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: isMe ? "#0288d1" : "#fff", color: isMe ? "#fff" : "#1a1a2e", fontSize: 13, lineHeight: 1.5, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: isMe ? "none" : "1px solid #e8edf2" }}>{msg.message}</div>
//                 <div style={{ fontSize: 10, color: "#94a3b8", textAlign: isMe ? "right" : "left", marginTop: 3 }}>{fmtDate(msg.createdAt)} · {fmtTime(msg.createdAt)}</div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={chatEnd} />
//       </div>
//       {readOnly ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#8e24aa", borderTop: "1px solid #f0f0f0", background: "#fdf6ff" }}>This ticket has already been escalated. You can only view its history.</div>
//       ) : isClosed ? (
//         <div style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, color: "#94a3b8", borderTop: "1px solid #f0f0f0" }}>🔒 Ticket {ticket?.status} hai.</div>
//       ) : (
//         <div style={{ display: "flex", gap: 8, padding: "12px 16px", alignItems: "center", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
//           <input type="text" placeholder="Client ko reply karein..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendReply()} style={{ flex: 1, padding: "9px 14px", borderRadius: 50, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", background: "#f8fafc" }} />
//           <button onClick={sendReply} disabled={!text.trim() || sending} style={{ width: 38, height: 38, borderRadius: "50%", background: text.trim() ? "#0288d1" : "#e0e0e0", border: "none", color: "#fff", cursor: text.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>{sending ? "⋯" : "➤"}</button>
//         </div>
//       )}
//     </div>
//   );
// };

// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding: "12px 16px", background: "#fdf6ff", borderTop: "1px solid #e1bee7" }}>
//       <div style={{ fontSize: 11, fontWeight: 700, color: "#6a1b9a", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>📋 Escalation History</div>
//       <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//         {log.map((entry, i) => (
//           <div key={i} style={{ background: "#fff", border: "1px solid #e1bee7", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
//               <span><span style={{ fontWeight: 600, color: "#6a1b9a" }}>{entry.fromName || entry.from}</span><span style={{ color: "#94a3b8", margin: "0 6px" }}>→</span><span style={{ fontWeight: 600, color: "#0288d1" }}>{entry.toName || entry.to}</span></span>
//               <span style={{ color: "#94a3b8", fontSize: 10 }}>{new Date(entry.escalatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
//             </div>
//             {entry.reason && <div style={{ marginTop: 4, color: "#64748b", fontSize: 11 }}>📝 {entry.reason}</div>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const StaffHelpSupport = ({ staffId: propStaffId, staffName: propStaffName, staffRole: propStaffRole, adminAssistantList: propAdminAssistantList }) => {
//   const [staffId, setStaffId] = useState(propStaffId || "");
//   const [staffName, setStaffName] = useState(propStaffName || "");
//   const [staffRole, setStaffRole] = useState(propStaffRole || "staff");
//   const [adminAssistantList, setAdminAssistantList] = useState(propAdminAssistantList || []);

//   useEffect(() => {
//     if (propStaffId) return;
//     const d = getStaffFromSession();
//     if (d) { setStaffId(d._id || d.id || ""); setStaffName(d.name || d.firstName || ""); const slug = d.slug || d.roleName || ""; setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff"); }
//   }, [propStaffId]);

//   useEffect(() => {
//     if (propAdminAssistantList?.length) return;
//     fetch(`${Url}/management-staff`).then(r => r.json()).then(data => {
//       const list = Array.isArray(data) ? data : (data.staff || data.data || []);
//       setAdminAssistantList(list.filter(s => { const slug = (s.slug || s.roleName || "").toLowerCase(); return slug.includes("admin-assistant") || slug.includes("admin assistant"); }));
//     }).catch(() => {});
//   }, [propAdminAssistantList]);

//   const [tickets, setTickets] = useState([]);
//   const [escalatedTickets, setEscalatedTickets] = useState([]);
//   const [activeTicket, setActiveTicket] = useState(null);
//   const [isActiveEscalated, setIsActiveEscalated] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingEscalated, setLoadingEscalated] = useState(false);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState("all");
//   const [showEscalate, setShowEscalate] = useState(false);
//   const [escalateForm, setEscalateForm] = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
//   const [escalating, setEscalating] = useState(false);
//   const [resolving, setResolving] = useState(false);

//   const socketRef = useRef(null);
//   const activeTicketRef = useRef(null);
//   useEffect(() => { activeTicketRef.current = activeTicket; }, [activeTicket]);
//   useEffect(() => { setEscalateForm(f => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" })); }, [staffRole]);

//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try { const res = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`); const data = await res.json(); if (res.ok) setTickets(data.tickets || []); else setError(data.message || "Failed."); }
//     catch { setError("Network error."); } finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalatedTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoadingEscalated(true);
//     try { const res = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`); const data = await res.json(); setEscalatedTickets(res.ok ? (data.tickets || []) : []); }
//     catch { setEscalatedTickets([]); } finally { setLoadingEscalated(false); }
//   }, [staffId]);

//   const fetchSingleTicket = useCallback(async (id) => {
//     try { const res = await fetch(`${Url}/api/support/tickets/${id}`); const data = await res.json(); if (!res.ok || !data.ticket) return; setTickets(prev => prev.map(t => t._id === data.ticket._id ? data.ticket : t)); if (activeTicketRef.current?._id === data.ticket._id) setActiveTicket(data.ticket); }
//     catch {}
//   }, []);

//   const markRead = useCallback(async (ticketId) => {
//     try {
//       await fetch(`${Url}/api/support/tickets/${ticketId}/mark-read`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role: "staff" }) });
//       setTickets(prev => prev.map(t => t._id === ticketId ? { ...t, unreadByStaff: 0 } : t));
//       setActiveTicket(prev => prev?._id === ticketId ? { ...prev, unreadByStaff: 0 } : prev);
//     } catch {}
//   }, []);

//   useEffect(() => { if (staffId) { fetchTickets(); fetchEscalatedTickets(); } }, [staffId, fetchTickets, fetchEscalatedTickets]);
//   useEffect(() => { if (tab === "escalated" && staffId) fetchEscalatedTickets(); }, [tab, staffId, fetchEscalatedTickets]);

//   useEffect(() => {
//     if (!staffId) return;
//     const socket = socketIo(Url, { transports: ["websocket"], reconnectionAttempts: 5 });
//     socketRef.current = socket;
//     socket.on("connect", () => { const token = getTokenFromSession(); if (token) socket.emit("join", token); });
//     socket.on("support:assigned_to_you", (data) => { Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 5000, title: `New Ticket: #${data.ticketCode}`, text: `${data.subject} — ${data.clientName}` }); fetchTickets(); });
//     socket.on("support:ticket_updated", (updated) => {
//       if (updated.assignedTo?.id !== staffId) { setTickets(prev => prev.filter(t => t._id !== updated._id)); if (activeTicketRef.current?._id === updated._id) setActiveTicket(null); fetchEscalatedTickets(); return; }
//       setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     });
//     socket.on("support:new_message", ({ ticketId: tid }) => { if (activeTicketRef.current?._id === tid) fetchSingleTicket(tid); else fetchTickets(); });
//     socket.on("support:unread_update", ({ ticketId: tid, unreadByStaff }) => {
//       if (unreadByStaff === undefined) return;
//       if (activeTicketRef.current?._id === tid) return;
//       setTickets(prev => prev.map(t => t._id === tid ? { ...t, unreadByStaff } : t));
//     });
//     return () => { socket.disconnect(); socketRef.current = null; };
//   }, [staffId, fetchTickets, fetchEscalatedTickets, fetchSingleTicket]);

//   const handleResolve = async () => {
//     if (!activeTicket || resolving) return;
//     const confirm = await Swal.fire({ title: "Ticket Resolve Karein?", text: "Are you confirmed?", icon: "question", showCancelButton: true, confirmButtonText: "✅ Yes, Resolve it", cancelButtonText: "Cancel", confirmButtonColor: "#388e3c" });
//     if (!confirm.isConfirmed) return;
//     setResolving(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "resolved" }) });
//       const data = await res.json();
//       if (res.ok) { Swal.fire({ icon: "success", title: "Resolved! ✅", timer: 2000, showConfirmButton: false }); setActiveTicket(data.ticket); setTickets(prev => prev.map(t => t._id === data.ticket._id ? data.ticket : t)); setShowEscalate(false); }
//       else Swal.fire({ icon: "error", title: "Error", text: data.message });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Network error." }); } finally { setResolving(false); }
//   };

//   const handleEscalate = async () => {
//     if (!activeTicket || !escalateForm.reason.trim()) { Swal.fire({ icon: "warning", title: "Reason required", text: "Escalation reason likhein." }); return; }
//     if (escalateForm.toRole === "admin-assistant" && !escalateForm.toId) { if (adminAssistantList.length === 0) { setEscalateForm(f => ({ ...f, toRole: "admin", toId: "", toName: "Admin" })); Swal.fire({ icon: "info", title: "No Admin Assistant", timer: 2500, showConfirmButton: false }); return; } Swal.fire({ icon: "warning", title: "Select Assistant", text: "Admin Assistant select karein." }); return; }
//     setEscalating(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fromId: staffId, fromName: staffName, toRole: escalateForm.toRole, toId: escalateForm.toRole === "admin" ? null : escalateForm.toId, toName: escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName, reason: escalateForm.reason }) });
//       const data = await res.json();
//       if (res.ok) { Swal.fire({ icon: "success", title: "Escalated! ✅", timer: 2000, showConfirmButton: false }); setTickets(prev => prev.filter(t => t._id !== activeTicket._id)); setEscalatedTickets(prev => [data.ticket, ...prev.filter(t => t._id !== data.ticket._id)]); setActiveTicket(null); setShowEscalate(false); setEscalateForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" }); fetchEscalatedTickets(); }
//       else Swal.fire({ icon: "error", title: "Error", text: data.message });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); } finally { setEscalating(false); }
//   };

//   const activeTicketsList = tab === "all" ? tickets : tab === "escalated" ? escalatedTickets : tickets.filter(t => t.status === tab);
//   const formatDate = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
//   const isTicketActive = activeTicket && activeTicket.status !== "closed" && activeTicket.status !== "resolved" && !isActiveEscalated;
//   const totalUnread = tickets.reduce((sum, t) => sum + (t.unreadByStaff || 0), 0);
//   const tabs = [
//     { key: "all", label: "All", count: tickets.length, icon: "📋" },
//     { key: "open", label: "Open", count: tickets.filter(t => t.status === "open").length, icon: "🟡" },
//     { key: "in-progress", label: "In Progress", count: tickets.filter(t => t.status === "in-progress").length, icon: "🔵" },
//     { key: "resolved", label: "Resolved", count: tickets.filter(t => t.status === "resolved").length, icon: "🟢" },
//     { key: "escalated", label: "Escalated", count: escalatedTickets.length, icon: "⬆️" },
//   ];

//   if (!staffId) return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontFamily: "'Segoe UI', sans-serif" }}><div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div><p style={{ fontWeight: 600 }}>Staff identity nahi mili.</p><p style={{ fontSize: 13 }}>Please login karein ya page refresh karein.</p></div>;

//   return (
//     <>
//       <style>{`@keyframes supportPulse{0%,100%{opacity:1}50%{opacity:0.6}}`}</style>
//       <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 24, maxWidth: 1100, margin: "0 auto" }}>
//         <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
//           <div>
//             <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
//               🎧 My Support Tickets
//               {totalUnread > 0 && <span style={{ background: "#f44336", color: "#fff", borderRadius: 50, padding: "2px 10px", fontSize: 12, fontWeight: 700, animation: "supportPulse 1.5s ease infinite" }}>{totalUnread} new</span>}
//             </h2>
//             <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>Tickets assigned to you · <b>{staffName}</b> ({staffRole}){adminAssistantList.length > 0 && <span style={{ marginLeft: 8, fontSize: 11, color: "#8e24aa" }}>· {adminAssistantList.length} assistant(s)</span>}</p>
//           </div>
//           <button onClick={() => { fetchTickets(); fetchEscalatedTickets(); }} style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>🔄 Refresh</button>
//         </div>

//         {error && <div style={{ background: "#ffebee", border: "1px solid #ef9a9a", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#c62828" }}>⚠️ {error}</div>}

//         <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4, flexWrap: "wrap" }}>
//           {tabs.map(t => (
//             <button key={t.key} onClick={() => { setTab(t.key); setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }}
//               style={{ flex: 1, minWidth: 80, padding: "8px 10px", borderRadius: 8, border: "none", background: tab === t.key ? "#fff" : "transparent", boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none", fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? (t.key === "escalated" ? "#6a1b9a" : "#1976d2") : "#64748b", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
//               <span>{t.icon}</span><span>{t.label}</span>
//               {t.count > 0 && <span style={{ background: tab === t.key ? (t.key === "escalated" ? "#8e24aa" : "#1976d2") : "#94a3b8", color: "#fff", borderRadius: 50, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px" }}>{t.count}</span>}
//             </button>
//           ))}
//         </div>

//         {tab === "escalated" && !activeTicket && (
//           <div style={{ background: "#fdf6ff", border: "1px solid #e1bee7", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#6a1b9a", display: "flex", alignItems: "center", gap: 8 }}>
//             <span style={{ fontSize: 18 }}>⬆️</span><span>These are the tickets that you have escalated. They are for viewing history only.</span>
//           </div>
//         )}

//         {activeTicket ? (
//           <div style={{ border: `1.5px solid ${isActiveEscalated ? "#e1bee7" : "#e2e8f0"}`, borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
//             <div style={{ padding: "14px 18px", background: isActiveEscalated ? "#fdf6ff" : "#f8fafc", borderBottom: `1px solid ${isActiveEscalated ? "#e1bee7" : "#e2e8f0"}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <button onClick={() => { setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }} style={{ background: "#f1f5f9", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: "50%", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
//                 <div>
//                   <div style={{ fontWeight: 700, fontSize: 14 }}>#{activeTicket.ticketId} — {activeTicket.subject === "Other" ? activeTicket.customSubject : activeTicket.subject}</div>
//                   <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>👤 {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}</div>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
//                 <Badge label={activeTicket.status} colorMap={STATUS_COLORS} />
//                 <Badge label={activeTicket.priority} colorMap={PRIORITY_COLORS} />
//                 {isTicketActive && <button onClick={handleResolve} disabled={resolving} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: resolving ? "#a5d6a7" : "#2e7d32", color: "#fff", fontWeight: 600, fontSize: 12, cursor: resolving ? "wait" : "pointer" }}>{resolving ? "⏳..." : "✅ Mark Resolved"}</button>}
//                 {isTicketActive && <button onClick={() => setShowEscalate(!showEscalate)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: showEscalate ? "#ffe0b2" : "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>⬆️ Escalate</button>}
//                 {isActiveEscalated && <span style={{ padding: "4px 12px", borderRadius: 50, background: "#f3e5f5", color: "#6a1b9a", fontSize: 11, fontWeight: 600 }}>⬆️ Escalated by You</span>}
//               </div>
//             </div>

//             {!isActiveEscalated && activeTicket.status === "resolved" && <div style={{ padding: "10px 18px", background: "#e8f5e9", borderBottom: "1px solid #c8e6c9", fontSize: 13, color: "#2e7d32" }}>✅ You have resolved this ticket. The admin will close it finally.</div>}
//             {isActiveEscalated && <EscalationLog log={activeTicket.escalationLog} />}

//             {showEscalate && !isActiveEscalated && (
//               <div style={{ padding: 16, background: "#fffde7", borderBottom: "1px solid #ffe082" }}>
//                 <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>⬆️ Escalate Ticket</div>
//                 <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Escalate To</label>
//                     <select value={escalateForm.toRole} onChange={e => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })} style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                       {staffRole === "staff" && adminAssistantList.length > 0 && <option value="admin-assistant">Admin Assistant</option>}
//                       <option value="admin">Back to Admin</option>
//                     </select>
//                   </div>
//                   {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
//                     <div>
//                       <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Select Assistant</label>
//                       <select value={escalateForm.toId} onChange={e => { const a = adminAssistantList.find(x => x._id === e.target.value); setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" }); }} style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fff" }}>
//                         <option value="">-- Select Assistant --</option>
//                         {adminAssistantList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
//                       </select>
//                     </div>
//                   )}
//                   <div style={{ flex: 1, minWidth: 200 }}>
//                     <label style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>Reason *</label>
//                     <input type="text" placeholder="Enter the reason for escalation..." value={escalateForm.reason} onChange={e => setEscalateForm({ ...escalateForm, reason: e.target.value })} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid #e2e8f0", fontSize: 13, boxSizing: "border-box", outline: "none", background: "#fff" }} />
//                   </div>
//                   <button onClick={handleEscalate} disabled={escalating || !escalateForm.reason.trim()} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: escalating ? "#ffa726" : "#f57c00", color: "#fff", fontWeight: 700, fontSize: 13, cursor: escalating ? "wait" : "pointer" }}>{escalating ? "Escalating..." : "⬆️ Confirm"}</button>
//                   <button onClick={() => setShowEscalate(false)} style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13 }}>Cancel</button>
//                 </div>
//               </div>
//             )}

//             <TicketChat ticket={activeTicket} staffId={staffId} staffName={staffName} readOnly={isActiveEscalated} onMarkRead={markRead}
//               onUpdate={updated => { setActiveTicket(updated); setTickets(prev => prev.map(t => t._id === updated._id ? updated : t)); }} />
//           </div>

//         ) : (loading && tab !== "escalated") || (loadingEscalated && tab === "escalated") ? (
//           <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}><div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div><p>Loading tickets...</p></div>
//         ) : activeTicketsList.length === 0 ? (
//           <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
//             <div style={{ fontSize: 48, marginBottom: 10 }}>{tab === "escalated" ? "⬆️" : "🎉"}</div>
//             <p style={{ fontWeight: 600, fontSize: 15 }}>{tab === "all" ? "No ticket is assigned." : tab === "escalated" ? "You have not escalated any tickets yet." : `No ${tab} tickets.`}</p>
//             <p style={{ fontSize: 13 }}>{tab === "all" ? "Wait for assignment from the admin." : tab === "escalated" ? "When you escalate, it will appear here." : "Check the other tab."}</p>
//           </div>
//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             {activeTicketsList.map(ticket => {
//               const isEscalatedTicket = tab === "escalated";
//               const hasUnread = !isEscalatedTicket && (ticket.unreadByStaff || 0) > 0;
//               return (
//                 <div key={ticket._id} style={{ border: `1.5px solid ${hasUnread ? "#0288d1" : isEscalatedTicket ? "#e1bee7" : "#e8edf2"}`, borderRadius: 12, background: hasUnread ? "#f0f9ff" : "#fff", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden", transition: "all 0.2s" }}>
//                   <div style={{ padding: "14px 16px" }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                       <div>
//                         <div style={{ fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
//                           #{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}
//                           {hasUnread && <UnreadDot count={ticket.unreadByStaff} size={16} />}
//                         </div>
//                         <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>👤 {ticket.clientName} · {ticket.projectName || ticket.projectId} · {formatDate(ticket.createdAt)}</div>
//                       </div>
//                       <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
//                         <Badge label={ticket.status} colorMap={STATUS_COLORS} />
//                         <Badge label={ticket.priority} colorMap={PRIORITY_COLORS} />
//                         {isEscalatedTicket && ticket.assignedTo && <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: "#e3f2fd", color: "#0288d1" }}>Now with: {ticket.assignedTo.name || ticket.assignedTo.role}</span>}
//                       </div>
//                     </div>
//                     {isEscalatedTicket && (() => { const myLog = [...(ticket.escalationLog || [])].reverse().find(e => e.from === staffId); return myLog ? <div style={{ marginTop: 8, padding: "6px 10px", background: "#fdf6ff", borderRadius: 6, fontSize: 12, color: "#6a1b9a" }}>📝 Reason: <b>{myLog.reason}</b><span style={{ color: "#94a3b8", marginLeft: 8 }}>→ {myLog.toName}</span></div> : null; })()}
//                     {!isEscalatedTicket && ticket.messages?.length > 0 && <p style={{ margin: "8px 0 0", fontSize: 12, color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ticket.messages[ticket.messages.length - 1]?.message}</p>}
//                   </div>
//                   <div style={{ borderTop: "1px solid #f0f4f8", padding: "10px 16px", background: isEscalatedTicket ? "#fdf6ff" : "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <span style={{ fontSize: 11, color: "#94a3b8" }}>💬 {ticket.messages?.length || 0} messages</span>
//                     <button onClick={() => { setActiveTicket(ticket); setIsActiveEscalated(isEscalatedTicket); setShowEscalate(false); if (!isEscalatedTicket) markRead(ticket._id); }}
//                       style={{ background: isEscalatedTicket ? "#8e24aa" : "#0288d1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
//                       {isEscalatedTicket ? "📋 View History" : "💬 Open Chat"}
//                       {hasUnread && <UnreadDot count={ticket.unreadByStaff} size={15} />}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StaffHelpSupport;






// working code management ticket starting here without look good
// working code management ticket starting here without look good
// working code management ticket starting here without look good
// working code management ticket starting here without look good



// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

// /* ─── Design tokens ──────────────────────────────────────────────────────── */
// const T = {
//   blue:   { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6" },
//   amber:  { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A", dot: "#F59E0B" },
//   green:  { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0", dot: "#22C55E" },
//   gray:   { bg: "#F9FAFB", text: "#374151", border: "#E5E7EB", dot: "#9CA3AF" },
//   violet: { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE", dot: "#8B5CF6" },
//   red:    { bg: "#FEF2F2", text: "#B91C1C", border: "#FECACA", dot: "#EF4444" },
//   orange: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA", dot: "#F97316" },
// };

// const STATUS = {
//   open:          T.amber,
//   "in-progress": T.blue,
//   resolved:      T.green,
//   closed:        T.gray,
//   escalated:     T.violet,
// };

// const PRIORITY = {
//   high:   T.red,
//   medium: T.orange,
//   low:    T.green,
// };

// /* ─── Tiny atoms ─────────────────────────────────────────────────────────── */
// const Badge = ({ label, map }) => {
//   const c = map?.[label] || T.gray;
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       padding: "3px 9px", borderRadius: 20,
//       fontSize: 11, fontWeight: 600, letterSpacing: 0.2,
//       background: c.bg, color: c.text,
//       border: `1px solid ${c.border}`,
//     }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
//       {label}
//     </span>
//   );
// };

// const Pill = ({ count, size = 17 }) => {
//   if (!count || count <= 0) return null;
//   return (
//     <span style={{
//       background: "#EF4444", color: "#fff",
//       borderRadius: 99, minWidth: size, height: size,
//       fontSize: 10, display: "inline-flex", alignItems: "center",
//       justifyContent: "center", fontWeight: 700, padding: "0 4px",
//     }}>
//       {count > 99 ? "99+" : count}
//     </span>
//   );
// };

// const Avatar = ({ name, color = "#6366F1", size = 30 }) => (
//   <div style={{
//     width: size, height: size, borderRadius: "50%",
//     background: color + "22", border: `1.5px solid ${color}44`,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontSize: size * 0.38, fontWeight: 700, color, flexShrink: 0,
//   }}>
//     {(name || "?").charAt(0).toUpperCase()}
//   </div>
// );

// const Divider = ({ style }) => (
//   <div style={{ height: 1, background: "#F1F5F9", ...style }} />
// );

// /* ─── Helpers ─────────────────────────────────────────────────────────────── */
// const getStaffFromSession = () => {
//   try { const raw = sessionStorage.getItem("management_staff"); return raw ? JSON.parse(raw) : null; }
//   catch { return null; }
// };
// const getTokenFromSession = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
// const fmtTime = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
// const fmtFull = (d) => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

// /* ─── TicketChat ─────────────────────────────────────────────────────────── */
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
//   const [text, setText] = useState("");
//   const [sending, setSending] = useState(false);
//   const chatEnd = useRef(null);

//   useEffect(() => {
//     setTimeout(() => chatEnd.current?.scrollIntoView({ behavior: "smooth" }), 80);
//   }, [ticket?.messages?.length]);

//   useEffect(() => {
//     if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id);
//   }, [ticket?._id]);

//   const sendReply = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sender: "staff", senderId: staffId, senderName: staffName, message: text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon: "error", title: "Error", text: data.message || "Send failed." });
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Could not send message." });
//     } finally { setSending(false); }
//   };

//   const isClosed = ticket?.status === "closed" || ticket?.status === "resolved";

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       {/* Messages */}
//       <div style={{
//         overflowY: "auto", padding: "20px 20px 12px",
//         background: "#FAFBFC", display: "flex",
//         flexDirection: "column", gap: 14,
//         minHeight: 300, maxHeight: 400,
//       }}>
//         {!(ticket?.messages?.length) && (
//           <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, paddingTop: 60, color: "#9CA3AF" }}>
//             <span style={{ fontSize: 28 }}>💬</span>
//             <span style={{ fontSize: 13 }}>No messages yet</span>
//           </div>
//         )}

//         {(ticket?.messages || []).map((msg, i) => {
//           const isMe = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";

//           if (isSystem) return (
//             <div key={i} style={{ textAlign: "center" }}>
//               <span style={{ fontSize: 11, color: "#9CA3AF", background: "#F1F5F9", padding: "3px 14px", borderRadius: 20 }}>
//                 {msg.message}
//               </span>
//             </div>
//           );

//           const isClient = msg.sender === "client";

//           return (
//             <div key={i} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", gap: 8 }}>
//               {!isMe && (
//                 <Avatar
//                   name={msg.senderName}
//                   color={isClient ? "#3B82F6" : "#8B5CF6"}
//                   size={28}
//                 />
//               )}
//               <div style={{ maxWidth: "68%" }}>
//                 {!isMe && (
//                   <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>
//                     {msg.senderName} · {isClient ? "Client" : "Staff"}
//                   </div>
//                 )}
//                 <div style={{
//                   padding: "9px 13px",
//                   borderRadius: isMe ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
//                   background: isMe ? "#3B82F6" : "#fff",
//                   color: isMe ? "#fff" : "#111827",
//                   fontSize: 13, lineHeight: 1.55,
//                   border: isMe ? "none" : "1px solid #E5E7EB",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//                 }}>
//                   {msg.message}
//                 </div>
//                 <div style={{ fontSize: 10, color: "#C4CAD4", textAlign: isMe ? "right" : "left", marginTop: 4 }}>
//                   {fmtDate(msg.createdAt)} · {fmtTime(msg.createdAt)}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={chatEnd} />
//       </div>

//       {/* Input bar */}
//       {readOnly ? (
//         <div style={{
//           padding: "12px 20px", textAlign: "center", fontSize: 12,
//           color: "#7C3AED", borderTop: "1px solid #EDE9FE",
//           background: "#F5F3FF",
//         }}>
//           This ticket was escalated. View-only mode.
//         </div>
//       ) : isClosed ? (
//         <div style={{
//           padding: "12px 20px", textAlign: "center", fontSize: 12,
//           color: "#9CA3AF", borderTop: "1px solid #F1F5F9",
//         }}>
//           Ticket is {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{
//           display: "flex", gap: 10, padding: "12px 16px",
//           alignItems: "center", borderTop: "1px solid #F1F5F9",
//           background: "#fff",
//         }}>
//           <input
//             type="text"
//             placeholder="Reply to client…"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendReply()}
//             style={{
//               flex: 1, padding: "9px 15px", borderRadius: 24,
//               border: "1.5px solid #E5E7EB", fontSize: 13,
//               outline: "none", background: "#F9FAFB",
//               fontFamily: "inherit", transition: "border-color 0.15s",
//             }}
//             onFocus={e => e.target.style.borderColor = "#3B82F6"}
//             onBlur={e => e.target.style.borderColor = "#E5E7EB"}
//           />
//           <button
//             onClick={sendReply}
//             disabled={!text.trim() || sending}
//             style={{
//               width: 38, height: 38, borderRadius: "50%",
//               background: text.trim() ? "#3B82F6" : "#E5E7EB",
//               border: "none", color: "#fff",
//               cursor: text.trim() ? "pointer" : "default",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               flexShrink: 0, fontSize: 15, transition: "background 0.2s",
//             }}
//           >
//             {sending ? "…" : "↑"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─── EscalationLog ──────────────────────────────────────────────────────── */
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding: "16px 20px", background: "#F5F3FF", borderTop: "1px solid #EDE9FE" }}>
//       <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: "#6D28D9", textTransform: "uppercase", letterSpacing: 0.8 }}>
//         Escalation history
//       </p>
//       <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//         {log.map((entry, i) => (
//           <div key={i} style={{
//             background: "#fff", border: "1px solid #EDE9FE",
//             borderRadius: 10, padding: "10px 14px", fontSize: 12,
//           }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
//               <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                 <span style={{ fontWeight: 600, color: "#6D28D9" }}>{entry.fromName || entry.from}</span>
//                 <span style={{ color: "#C4CAD4", fontSize: 14 }}>→</span>
//                 <span style={{ fontWeight: 600, color: "#3B82F6" }}>{entry.toName || entry.to}</span>
//               </span>
//               <span style={{ color: "#9CA3AF", fontSize: 11 }}>{fmtFull(entry.escalatedAt)}</span>
//             </div>
//             {entry.reason && (
//               <p style={{ margin: "6px 0 0", color: "#6B7280", fontSize: 11 }}>
//                 Reason: {entry.reason}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ─── Main Component ─────────────────────────────────────────────────────── */
// const StaffHelpSupport = ({
//   staffId: propStaffId,
//   staffName: propStaffName,
//   staffRole: propStaffRole,
//   adminAssistantList: propAdminAssistantList,
// }) => {
//   const [staffId, setStaffId] = useState(propStaffId || "");
//   const [staffName, setStaffName] = useState(propStaffName || "");
//   const [staffRole, setStaffRole] = useState(propStaffRole || "staff");
//   const [adminAssistantList, setAdminAssistantList] = useState(propAdminAssistantList || []);

//   useEffect(() => {
//     if (propStaffId) return;
//     const d = getStaffFromSession();
//     if (d) {
//       setStaffId(d._id || d.id || "");
//       setStaffName(d.name || d.firstName || "");
//       const slug = d.slug || d.roleName || "";
//       setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [propStaffId]);

//   useEffect(() => {
//     if (propAdminAssistantList?.length) return;
//     fetch(`${Url}/management-staff`)
//       .then(r => r.json())
//       .then(data => {
//         const list = Array.isArray(data) ? data : (data.staff || data.data || []);
//         setAdminAssistantList(list.filter(s => {
//           const slug = (s.slug || s.roleName || "").toLowerCase();
//           return slug.includes("admin-assistant") || slug.includes("admin assistant");
//         }));
//       })
//       .catch(() => {});
//   }, [propAdminAssistantList]);

//   const [tickets, setTickets] = useState([]);
//   const [escalatedTickets, setEscalatedTickets] = useState([]);
//   const [activeTicket, setActiveTicket] = useState(null);
//   const [isActiveEscalated, setIsActiveEscalated] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingEscalated, setLoadingEscalated] = useState(false);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState("all");
//   const [showEscalate, setShowEscalate] = useState(false);
//   const [escalateForm, setEscalateForm] = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
//   const [escalating, setEscalating] = useState(false);
//   const [resolving, setResolving] = useState(false);

//   const socketRef = useRef(null);
//   const activeTicketRef = useRef(null);
//   useEffect(() => { activeTicketRef.current = activeTicket; }, [activeTicket]);
//   useEffect(() => {
//     setEscalateForm(f => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" }));
//   }, [staffRole]);

//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const data = await res.json();
//       if (res.ok) setTickets(data.tickets || []);
//       else setError(data.message || "Failed.");
//     } catch { setError("Network error."); }
//     finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalatedTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoadingEscalated(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const data = await res.json();
//       setEscalatedTickets(res.ok ? (data.tickets || []) : []);
//     } catch { setEscalatedTickets([]); }
//     finally { setLoadingEscalated(false); }
//   }, [staffId]);

//   const fetchSingleTicket = useCallback(async (id) => {
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${id}`);
//       const data = await res.json();
//       if (!res.ok || !data.ticket) return;
//       setTickets(prev => prev.map(t => t._id === data.ticket._id ? data.ticket : t));
//       if (activeTicketRef.current?._id === data.ticket._id) setActiveTicket(data.ticket);
//     } catch {}
//   }, []);

//   const markRead = useCallback(async (ticketId) => {
//     try {
//       await fetch(`${Url}/api/support/tickets/${ticketId}/mark-read`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: "staff" }),
//       });
//       setTickets(prev => prev.map(t => t._id === ticketId ? { ...t, unreadByStaff: 0 } : t));
//       setActiveTicket(prev => prev?._id === ticketId ? { ...prev, unreadByStaff: 0 } : prev);
//     } catch {}
//   }, []);

//   useEffect(() => {
//     if (staffId) { fetchTickets(); fetchEscalatedTickets(); }
//   }, [staffId, fetchTickets, fetchEscalatedTickets]);

//   useEffect(() => {
//     if (tab === "escalated" && staffId) fetchEscalatedTickets();
//   }, [tab, staffId, fetchEscalatedTickets]);

//   useEffect(() => {
//     if (!staffId) return;
//     const socket = socketIo(Url, { transports: ["websocket"], reconnectionAttempts: 5 });
//     socketRef.current = socket;
//     socket.on("connect", () => {
//       const token = getTokenFromSession();
//       if (token) socket.emit("join", token);
//     });
//     socket.on("support:assigned_to_you", (data) => {
//       Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 5000, title: `New Ticket: #${data.ticketCode}`, text: `${data.subject} — ${data.clientName}` });
//       fetchTickets();
//     });
//     socket.on("support:ticket_updated", (updated) => {
//       if (updated.assignedTo?.id !== staffId) {
//         setTickets(prev => prev.filter(t => t._id !== updated._id));
//         if (activeTicketRef.current?._id === updated._id) setActiveTicket(null);
//         fetchEscalatedTickets(); return;
//       }
//       setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
//       if (activeTicketRef.current?._id === updated._id) setActiveTicket(updated);
//     });
//     socket.on("support:new_message", ({ ticketId: tid }) => {
//       if (activeTicketRef.current?._id === tid) fetchSingleTicket(tid);
//       else fetchTickets();
//     });
//     socket.on("support:unread_update", ({ ticketId: tid, unreadByStaff }) => {
//       if (unreadByStaff === undefined || activeTicketRef.current?._id === tid) return;
//       setTickets(prev => prev.map(t => t._id === tid ? { ...t, unreadByStaff } : t));
//     });
//     return () => { socket.disconnect(); socketRef.current = null; };
//   }, [staffId, fetchTickets, fetchEscalatedTickets, fetchSingleTicket]);

//   const handleResolve = async () => {
//     if (!activeTicket || resolving) return;
//     const confirm = await Swal.fire({
//       title: "Mark as Resolved?", text: "This will notify the client.",
//       icon: "question", showCancelButton: true,
//       confirmButtonText: "Yes, resolve", cancelButtonText: "Cancel",
//       confirmButtonColor: "#15803D",
//     });
//     if (!confirm.isConfirmed) return;
//     setResolving(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/status`, {
//         method: "PATCH", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "resolved" }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Resolved!", timer: 2000, showConfirmButton: false });
//         setActiveTicket(data.ticket);
//         setTickets(prev => prev.map(t => t._id === data.ticket._id ? data.ticket : t));
//         setShowEscalate(false);
//       } else Swal.fire({ icon: "error", title: "Error", text: data.message });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Network error." }); }
//     finally { setResolving(false); }
//   };

//   const handleEscalate = async () => {
//     if (!activeTicket || !escalateForm.reason.trim()) {
//       Swal.fire({ icon: "warning", title: "Reason required", text: "Please enter escalation reason." }); return;
//     }
//     if (escalateForm.toRole === "admin-assistant" && !escalateForm.toId) {
//       if (adminAssistantList.length === 0) {
//         setEscalateForm(f => ({ ...f, toRole: "admin", toId: "", toName: "Admin" }));
//         Swal.fire({ icon: "info", title: "No Admin Assistant available", timer: 2500, showConfirmButton: false }); return;
//       }
//       Swal.fire({ icon: "warning", title: "Select an Assistant", text: "Please choose an admin assistant." }); return;
//     }
//     setEscalating(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/escalate`, {
//         method: "PATCH", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromId: staffId, fromName: staffName,
//           toRole: escalateForm.toRole,
//           toId: escalateForm.toRole === "admin" ? null : escalateForm.toId,
//           toName: escalateForm.toRole === "admin" ? "Admin" : escalateForm.toName,
//           reason: escalateForm.reason,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         Swal.fire({ icon: "success", title: "Escalated!", timer: 2000, showConfirmButton: false });
//         setTickets(prev => prev.filter(t => t._id !== activeTicket._id));
//         setEscalatedTickets(prev => [data.ticket, ...prev.filter(t => t._id !== data.ticket._id)]);
//         setActiveTicket(null);
//         setShowEscalate(false);
//         setEscalateForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
//         fetchEscalatedTickets();
//       } else Swal.fire({ icon: "error", title: "Error", text: data.message });
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   const activeList = tab === "all" ? tickets : tab === "escalated" ? escalatedTickets : tickets.filter(t => t.status === tab);
//   const isTicketActive = activeTicket && activeTicket.status !== "closed" && activeTicket.status !== "resolved" && !isActiveEscalated;
//   const totalUnread = tickets.reduce((sum, t) => sum + (t.unreadByStaff || 0), 0);

//   const TABS = [
//     { key: "all", label: "All", count: tickets.length },
//     { key: "open", label: "Open", count: tickets.filter(t => t.status === "open").length },
//     { key: "in-progress", label: "In Progress", count: tickets.filter(t => t.status === "in-progress").length },
//     { key: "resolved", label: "Resolved", count: tickets.filter(t => t.status === "resolved").length },
//     { key: "escalated", label: "Escalated", count: escalatedTickets.length },
//   ];

//   if (!staffId) return (
//     <div style={{
//       display: "flex", flexDirection: "column", alignItems: "center",
//       justifyContent: "center", gap: 10, padding: 80,
//       fontFamily: "'Inter', 'Segoe UI', sans-serif", color: "#9CA3AF",
//     }}>
//       <div style={{ fontSize: 36 }}>🔐</div>
//       <p style={{ fontWeight: 600, fontSize: 15, color: "#374151", margin: 0 }}>Staff identity not found</p>
//       <p style={{ fontSize: 13, margin: 0 }}>Please login or refresh the page.</p>
//     </div>
//   );

//   return (
//     <div style={{ fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif", padding: "28px 24px", maxWidth: 1080, margin: "0 auto" }}>

//       {/* ── Header ── */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
//         <div>
//           <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 10 }}>
//             Support Tickets
//             {totalUnread > 0 && (
//               <span style={{
//                 background: "#EF4444", color: "#fff",
//                 borderRadius: 20, padding: "2px 10px",
//                 fontSize: 11, fontWeight: 700,
//               }}>
//                 {totalUnread} unread
//               </span>
//             )}
//           </h2>
//           <p style={{ margin: "5px 0 0", fontSize: 12.5, color: "#9CA3AF" }}>
//             Assigned to <strong style={{ color: "#374151" }}>{staffName}</strong>
//             <span style={{ marginLeft: 6, color: "#D1D5DB" }}>·</span>
//             <span style={{ marginLeft: 6, color: "#6B7280" }}>{staffRole}</span>
//             {adminAssistantList.length > 0 && (
//               <><span style={{ marginLeft: 6, color: "#D1D5DB" }}>·</span>
//               <span style={{ marginLeft: 6, color: "#8B5CF6" }}>{adminAssistantList.length} assistant(s)</span></>
//             )}
//           </p>
//         </div>
//         <button
//           onClick={() => { fetchTickets(); fetchEscalatedTickets(); }}
//           style={{
//             padding: "7px 14px", borderRadius: 8,
//             border: "1px solid #E5E7EB", background: "#fff",
//             fontSize: 12, cursor: "pointer", fontWeight: 500,
//             color: "#374151", display: "flex", alignItems: "center", gap: 6,
//           }}
//           onMouseOver={e => e.currentTarget.style.background = "#F9FAFB"}
//           onMouseOut={e => e.currentTarget.style.background = "#fff"}
//         >
//           ↻ Refresh
//         </button>
//       </div>

//       {/* ── Error Banner ── */}
//       {error && (
//         <div style={{
//           background: "#FEF2F2", border: "1px solid #FECACA",
//           borderRadius: 10, padding: "10px 16px", marginBottom: 18,
//           fontSize: 13, color: "#B91C1C",
//         }}>
//           {error}
//         </div>
//       )}

//       {/* ── Tabs ── */}
//       <div style={{
//         display: "flex", gap: 2, marginBottom: 22,
//         background: "#F3F4F6", borderRadius: 10, padding: 3,
//         flexWrap: "wrap",
//       }}>
//         {TABS.map(t => {
//           const active = tab === t.key;
//           return (
//             <button
//               key={t.key}
//               onClick={() => { setTab(t.key); setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }}
//               style={{
//                 flex: 1, minWidth: 80, padding: "7px 10px",
//                 borderRadius: 8, border: "none",
//                 background: active ? "#fff" : "transparent",
//                 boxShadow: active ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
//                 fontWeight: active ? 600 : 500,
//                 color: active
//                   ? (t.key === "escalated" ? "#7C3AED" : t.key === "resolved" ? "#15803D" : "#111827")
//                   : "#6B7280",
//                 cursor: "pointer", fontSize: 12.5,
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
//                 transition: "all 0.15s", fontFamily: "inherit",
//               }}
//             >
//               {t.label}
//               {t.count > 0 && (
//                 <span style={{
//                   background: active
//                     ? (t.key === "escalated" ? "#7C3AED" : t.key === "resolved" ? "#22C55E" : "#3B82F6")
//                     : "#D1D5DB",
//                   color: active ? "#fff" : "#6B7280",
//                   borderRadius: 99, minWidth: 18, height: 18,
//                   display: "inline-flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 10, padding: "0 4px", fontWeight: 700,
//                 }}>
//                   {t.count}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* ── Escalated hint ── */}
//       {tab === "escalated" && !activeTicket && (
//         <div style={{
//           background: "#F5F3FF", border: "1px solid #EDE9FE",
//           borderRadius: 10, padding: "10px 16px", marginBottom: 18,
//           fontSize: 12.5, color: "#6D28D9", display: "flex", alignItems: "center", gap: 8,
//         }}>
//           <span>↑</span>
//           Tickets you've escalated. View-only history.
//         </div>
//       )}

//       {/* ══════════════════════════════════════════════════════════
//           ACTIVE TICKET VIEW
//       ══════════════════════════════════════════════════════════ */}
//       {activeTicket ? (
//         <div style={{
//           border: "1px solid #E5E7EB", borderRadius: 16,
//           overflow: "hidden", background: "#fff",
//           boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
//         }}>
//           {/* Ticket header */}
//           <div style={{
//             padding: "14px 18px",
//             background: isActiveEscalated ? "#F5F3FF" : "#FAFBFC",
//             borderBottom: `1px solid ${isActiveEscalated ? "#EDE9FE" : "#F1F5F9"}`,
//             display: "flex", alignItems: "center",
//             justifyContent: "space-between", flexWrap: "wrap", gap: 10,
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <button
//                 onClick={() => { setActiveTicket(null); setIsActiveEscalated(false); setShowEscalate(false); }}
//                 style={{
//                   width: 30, height: 30, borderRadius: 8,
//                   background: "#F3F4F6", border: "1px solid #E5E7EB",
//                   cursor: "pointer", fontSize: 14, color: "#374151",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                 }}
//               >
//                 ←
//               </button>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 13.5, color: "#111827" }}>
//                   #{activeTicket.ticketId} — {activeTicket.subject === "Other" ? activeTicket.customSubject : activeTicket.subject}
//                 </div>
//                 <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>
//                   {activeTicket.clientName} · {activeTicket.projectName || activeTicket.projectId}
//                 </div>
//               </div>
//             </div>

//             <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
//               <Badge label={activeTicket.status} map={STATUS} />
//               <Badge label={activeTicket.priority} map={PRIORITY} />

//               {isTicketActive && (
//                 <button
//                   onClick={handleResolve}
//                   disabled={resolving}
//                   style={{
//                     padding: "6px 13px", borderRadius: 8, border: "none",
//                     background: resolving ? "#BBF7D0" : "#15803D",
//                     color: "#fff", fontWeight: 600, fontSize: 12,
//                     cursor: resolving ? "wait" : "pointer", fontFamily: "inherit",
//                   }}
//                 >
//                   {resolving ? "Resolving…" : "✓ Resolve"}
//                 </button>
//               )}

//               {isTicketActive && (
//                 <button
//                   onClick={() => setShowEscalate(!showEscalate)}
//                   style={{
//                     padding: "6px 13px", borderRadius: 8,
//                     border: `1px solid ${showEscalate ? "#DDD6FE" : "#E5E7EB"}`,
//                     background: showEscalate ? "#F5F3FF" : "#fff",
//                     color: showEscalate ? "#7C3AED" : "#374151",
//                     fontWeight: 600, fontSize: 12,
//                     cursor: "pointer", fontFamily: "inherit",
//                   }}
//                 >
//                   ↑ Escalate
//                 </button>
//               )}

//               {isActiveEscalated && (
//                 <span style={{
//                   padding: "4px 11px", borderRadius: 20,
//                   background: "#F5F3FF", color: "#6D28D9",
//                   fontSize: 11, fontWeight: 600,
//                   border: "1px solid #EDE9FE",
//                 }}>
//                   Escalated by you
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Resolved notice */}
//           {!isActiveEscalated && activeTicket.status === "resolved" && (
//             <div style={{
//               padding: "10px 18px",
//               background: "#F0FDF4", borderBottom: "1px solid #BBF7D0",
//               fontSize: 12.5, color: "#15803D",
//             }}>
//               ✓ You resolved this ticket. Admin will close it.
//             </div>
//           )}

//           {/* Escalation history */}
//           {isActiveEscalated && <EscalationLog log={activeTicket.escalationLog} />}

//           {/* Escalate form */}
//           {showEscalate && !isActiveEscalated && (
//             <div style={{
//               padding: 18, background: "#FFFBEB",
//               borderBottom: "1px solid #FDE68A",
//             }}>
//               <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 13, color: "#92400E" }}>
//                 Escalate ticket
//               </p>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//                 <div>
//                   <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", display: "block", marginBottom: 4 }}>
//                     Escalate to
//                   </label>
//                   <select
//                     value={escalateForm.toRole}
//                     onChange={e => setEscalateForm({ ...escalateForm, toRole: e.target.value, toId: "", toName: "" })}
//                     style={{
//                       padding: "8px 12px", borderRadius: 8,
//                       border: "1px solid #E5E7EB", fontSize: 12.5,
//                       background: "#fff", fontFamily: "inherit", color: "#111827",
//                     }}
//                   >
//                     {staffRole === "staff" && adminAssistantList.length > 0 && (
//                       <option value="admin-assistant">Admin Assistant</option>
//                     )}
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>

//                 {escalateForm.toRole === "admin-assistant" && adminAssistantList.length > 0 && (
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", display: "block", marginBottom: 4 }}>
//                       Select assistant
//                     </label>
//                     <select
//                       value={escalateForm.toId}
//                       onChange={e => {
//                         const a = adminAssistantList.find(x => x._id === e.target.value);
//                         setEscalateForm({ ...escalateForm, toId: e.target.value, toName: a?.name || "" });
//                       }}
//                       style={{
//                         padding: "8px 12px", borderRadius: 8,
//                         border: "1px solid #E5E7EB", fontSize: 12.5,
//                         background: "#fff", fontFamily: "inherit", color: "#111827",
//                       }}
//                     >
//                       <option value="">— Select —</option>
//                       {adminAssistantList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
//                     </select>
//                   </div>
//                 )}

//                 <div style={{ flex: 1, minWidth: 200 }}>
//                   <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", display: "block", marginBottom: 4 }}>
//                     Reason *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter reason for escalation…"
//                     value={escalateForm.reason}
//                     onChange={e => setEscalateForm({ ...escalateForm, reason: e.target.value })}
//                     style={{
//                       width: "100%", padding: "8px 12px",
//                       borderRadius: 8, border: "1px solid #E5E7EB",
//                       fontSize: 12.5, boxSizing: "border-box",
//                       outline: "none", fontFamily: "inherit", color: "#111827",
//                     }}
//                   />
//                 </div>

//                 <button
//                   onClick={handleEscalate}
//                   disabled={escalating || !escalateForm.reason.trim()}
//                   style={{
//                     padding: "8px 16px", borderRadius: 8, border: "none",
//                     background: escalating ? "#FDE68A" : "#D97706",
//                     color: "#fff", fontWeight: 600, fontSize: 12.5,
//                     cursor: escalating ? "wait" : "pointer", fontFamily: "inherit",
//                   }}
//                 >
//                   {escalating ? "Escalating…" : "↑ Confirm"}
//                 </button>

//                 <button
//                   onClick={() => setShowEscalate(false)}
//                   style={{
//                     padding: "8px 14px", borderRadius: 8,
//                     border: "1px solid #E5E7EB", background: "#fff",
//                     cursor: "pointer", fontSize: 12.5, fontFamily: "inherit", color: "#374151",
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
//             readOnly={isActiveEscalated}
//             onMarkRead={markRead}
//             onUpdate={updated => {
//               setActiveTicket(updated);
//               setTickets(prev => prev.map(t => t._id === updated._id ? updated : t));
//             }}
//           />
//         </div>

//       /* ══════════════════════════════════════════════════════════
//           LOADING
//       ══════════════════════════════════════════════════════════ */
//       ) : (loading && tab !== "escalated") || (loadingEscalated && tab === "escalated") ? (
//         <div style={{ textAlign: "center", padding: 80, color: "#9CA3AF" }}>
//           <div style={{ fontSize: 24, marginBottom: 10 }}>⏳</div>
//           <p style={{ fontSize: 13 }}>Loading tickets…</p>
//         </div>

//       /* ══════════════════════════════════════════════════════════
//           EMPTY STATE
//       ══════════════════════════════════════════════════════════ */
//       ) : activeList.length === 0 ? (
//         <div style={{
//           textAlign: "center", padding: 80, color: "#9CA3AF",
//           border: "1px dashed #E5E7EB", borderRadius: 16, background: "#FAFBFC",
//         }}>
//           <div style={{ fontSize: 36, marginBottom: 12 }}>
//             {tab === "escalated" ? "↑" : "🎉"}
//           </div>
//           <p style={{ fontWeight: 600, fontSize: 14.5, color: "#374151", margin: "0 0 6px" }}>
//             {tab === "all" ? "No tickets assigned" : tab === "escalated" ? "No escalated tickets yet" : `No ${tab} tickets`}
//           </p>
//           <p style={{ fontSize: 12.5, margin: 0 }}>
//             {tab === "all" ? "Tickets assigned to you will appear here." : tab === "escalated" ? "Tickets you escalate will appear here." : "Check another tab."}
//           </p>
//         </div>

//       /* ══════════════════════════════════════════════════════════
//           TICKET LIST
//       ══════════════════════════════════════════════════════════ */
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//           {activeList.map(ticket => {
//             const isEsc = tab === "escalated";
//             const hasUnread = !isEsc && (ticket.unreadByStaff || 0) > 0;
//             const lastMsg = ticket.messages?.[ticket.messages.length - 1];

//             return (
//               <div
//                 key={ticket._id}
//                 style={{
//                   border: `1px solid ${hasUnread ? "#BFDBFE" : isEsc ? "#EDE9FE" : "#E5E7EB"}`,
//                   borderRadius: 12, background: hasUnread ? "#EFF6FF" : "#fff",
//                   overflow: "hidden", transition: "box-shadow 0.15s",
//                   boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
//                 }}
//                 onMouseOver={e => e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.08)"}
//                 onMouseOut={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"}
//               >
//                 <div style={{ padding: "14px 16px" }}>
//                   {/* Row 1: title + badges */}
//                   <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                       <span style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>
//                         #{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}
//                       </span>
//                       <Pill count={ticket.unreadByStaff} />
//                     </div>
//                     <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
//                       <Badge label={ticket.status} map={STATUS} />
//                       <Badge label={ticket.priority} map={PRIORITY} />
//                       {isEsc && ticket.assignedTo && (
//                         <span style={{
//                           padding: "3px 9px", borderRadius: 20, fontSize: 11,
//                           fontWeight: 600, background: "#EFF6FF", color: "#1D4ED8",
//                           border: "1px solid #BFDBFE",
//                         }}>
//                           With: {ticket.assignedTo.name || ticket.assignedTo.role}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Row 2: meta */}
//                   <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 5 }}>
//                     {ticket.clientName} · {ticket.projectName || ticket.projectId} · {fmtFull(ticket.createdAt)}
//                   </div>

//                   {/* Escalation reason */}
//                   {isEsc && (() => {
//                     const entry = [...(ticket.escalationLog || [])].reverse().find(e => e.from === staffId);
//                     return entry ? (
//                       <div style={{
//                         marginTop: 8, padding: "6px 10px",
//                         background: "#F5F3FF", borderRadius: 7,
//                         fontSize: 11.5, color: "#6D28D9",
//                       }}>
//                         Reason: <strong>{entry.reason}</strong>
//                         <span style={{ color: "#9CA3AF", marginLeft: 6 }}>→ {entry.toName}</span>
//                       </div>
//                     ) : null;
//                   })()}

//                   {/* Last message preview */}
//                   {!isEsc && lastMsg && (
//                     <p style={{
//                       margin: "8px 0 0", fontSize: 12, color: "#6B7280",
//                       display: "-webkit-box", WebkitLineClamp: 1,
//                       WebkitBoxOrient: "vertical", overflow: "hidden",
//                     }}>
//                       {lastMsg.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Card footer */}
//                 <div style={{
//                   borderTop: "1px solid #F1F5F9",
//                   padding: "10px 16px", background: "#FAFBFC",
//                   display: "flex", justifyContent: "space-between", alignItems: "center",
//                 }}>
//                   <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>
//                     {ticket.messages?.length || 0} messages
//                   </span>
//                   <button
//                     onClick={() => {
//                       setActiveTicket(ticket);
//                       setIsActiveEscalated(isEsc);
//                       setShowEscalate(false);
//                       if (!isEsc) markRead(ticket._id);
//                     }}
//                     style={{
//                       background: isEsc ? "#7C3AED" : "#3B82F6",
//                       color: "#fff", border: "none", borderRadius: 8,
//                       padding: "6px 14px", fontSize: 12, fontWeight: 600,
//                       cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
//                       fontFamily: "inherit",
//                     }}
//                     onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
//                     onMouseOut={e => e.currentTarget.style.opacity = "1"}
//                   >
//                     {isEsc ? "View History" : "Open Chat"}
//                     {hasUnread && <Pill count={ticket.unreadByStaff} size={15} />}
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StaffHelpSupport;




// admin support code ending here without looks good 
// admin support code ending here without looks good 
// admin support code ending here without looks good 
// admin support code ending here without looks good 
























// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

// /* ─────────────────────────────────────────────────────────────────
//    GLOBAL STYLES
// ───────────────────────────────────────────────────────────────── */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

//   .shs-root *, .shs-root *::before, .shs-root *::after { box-sizing: border-box; font-family: 'DM Sans', system-ui, sans-serif; }

//   .shs-root {
//     --blue:        #2563EB;
//     --blue-bg:     #EFF6FF;
//     --blue-border: #BFDBFE;
//     --green:       #16A34A;
//     --green-bg:    #F0FDF4;
//     --green-border:#BBF7D0;
//     --amber:       #D97706;
//     --amber-bg:    #FFFBEB;
//     --amber-border:#FDE68A;
//     --red:         #DC2626;
//     --red-bg:      #FEF2F2;
//     --red-border:  #FECACA;
//     --violet:      #7C3AED;
//     --violet-bg:   #F5F3FF;
//     --violet-border:#DDD6FE;
//     --border:      #E5E7EB;
//     --border-light:#F1F5F9;
//     --surface:     #F8FAFC;
//     --bg-subtle:   #F9FAFB;
//     --text:        #111827;
//     --text-2:      #374151;
//     --text-3:      #6B7280;
//     --text-4:      #9CA3AF;
//     --text-5:      #C4CAD4;
//   }

//   .shs-card        { transition: box-shadow 0.18s ease, transform 0.12s ease; }
//   .shs-card:hover  { box-shadow: 0 6px 28px rgba(0,0,0,0.1) !important; transform: translateY(-1px); }

//   .shs-btn         { transition: opacity 0.14s, transform 0.1s; cursor: pointer; }
//   .shs-btn:hover:not(:disabled)  { opacity: 0.85; }
//   .shs-btn:active:not(:disabled) { transform: scale(0.97); }

//   .shs-tab { transition: all 0.15s ease; }
//   .shs-tab:hover { background: rgba(255,255,255,0.7) !important; }

//   .shs-input:focus {
//     border-color: var(--blue) !important;
//     outline: none;
//     box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
//   }

//   .shs-msg { animation: msgSlide 0.18s ease; }
//   @keyframes msgSlide { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }

//   .shs-pulse { animation: pulse 2s ease infinite; }
//   @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

//   @keyframes spin { to { transform: rotate(360deg); } }

//   .shs-root ::-webkit-scrollbar       { width: 4px; }
//   .shs-root ::-webkit-scrollbar-track { background: transparent; }
//   .shs-root ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
// `;

// /* ─────────────────────────────────────────────────────────────────
//    CONFIG
// ───────────────────────────────────────────────────────────────── */
// const STATUS_MAP = {
//   open:          { dot:"#F59E0B", text:"#B45309", bg:"#FFFBEB", border:"#FDE68A" },
//   "in-progress": { dot:"#3B82F6", text:"#1D4ED8", bg:"#EFF6FF", border:"#BFDBFE" },
//   resolved:      { dot:"#22C55E", text:"#15803D", bg:"#F0FDF4", border:"#BBF7D0" },
//   closed:        { dot:"#9CA3AF", text:"#4B5563", bg:"#F9FAFB", border:"#E5E7EB" },
//   escalated:     { dot:"#8B5CF6", text:"#6D28D9", bg:"#F5F3FF", border:"#DDD6FE" },
// };
// const PRIORITY_MAP = {
//   high:   { dot:"#EF4444", text:"#991B1B", bg:"#FEF2F2", border:"#FECACA" },
//   medium: { dot:"#F59E0B", text:"#92400E", bg:"#FFFBEB", border:"#FDE68A" },
//   low:    { dot:"#22C55E", text:"#14532D", bg:"#F0FDF4", border:"#BBF7D0" },
// };

// /* ─────────────────────────────────────────────────────────────────
//    TINY ATOMS
// ───────────────────────────────────────────────────────────────── */
// const Badge = ({ label, map }) => {
//   const c = map?.[label] || { dot:"#9CA3AF", text:"#4B5563", bg:"#F9FAFB", border:"#E5E7EB" };
//   return (
//     <span style={{
//       display:"inline-flex", alignItems:"center", gap:5,
//       padding:"3px 10px", borderRadius:99,
//       fontSize:11, fontWeight:600, letterSpacing:0.1, whiteSpace:"nowrap",
//       background:c.bg, color:c.text, border:`1px solid ${c.border}`,
//     }}>
//       <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot, flexShrink:0 }} />
//       {label}
//     </span>
//   );
// };

// const UnreadPill = ({ count, size = 17 }) => {
//   if (!count || count <= 0) return null;
//   return (
//     <span className="shs-pulse" style={{
//       background:"#EF4444", color:"#fff", borderRadius:99,
//       minWidth:size, height:size, padding:"0 4px",
//       fontSize:9.5, fontWeight:700,
//       display:"inline-flex", alignItems:"center", justifyContent:"center",
//     }}>
//       {count > 99 ? "99+" : count}
//     </span>
//   );
// };

// const Avatar = ({ name="?", color="#2563EB", size=30 }) => (
//   <div style={{
//     width:size, height:size, borderRadius:"50%", flexShrink:0,
//     background:`${color}18`, border:`1.5px solid ${color}30`,
//     display:"flex", alignItems:"center", justifyContent:"center",
//     fontSize:size * 0.37, fontWeight:700, color,
//   }}>
//     {name.charAt(0).toUpperCase()}
//   </div>
// );

// /* SVG icons */
// const Icon = {
//   back:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
//   check:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="20 6 9 17 4 12"/></svg>,
//   send:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
//   refresh: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
//   chat:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
//   up:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="18 15 12 9 6 15"/></svg>,
//   lock:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
//   spin:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{animation:"spin 1s linear infinite"}}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
//   empty:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
// };

// /* ─────────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────────── */
// const getStaff = () => {
//   try { const r = sessionStorage.getItem("management_staff"); return r ? JSON.parse(r) : null; } catch { return null; }
// };
// const getToken = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// const dt = {
//   time: d => new Date(d).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" }),
//   date: d => new Date(d).toLocaleDateString("en-IN", { day:"numeric", month:"short" }),
//   full: d => new Date(d).toLocaleString("en-IN", { dateStyle:"medium", timeStyle:"short" }),
// };

// /* ─────────────────────────────────────────────────────────────────
//    ESCALATION LOG
// ───────────────────────────────────────────────────────────────── */
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding:"16px 20px", borderBottom:"1px solid #EDE9FE", background:"#FDFCFF" }}>
//       <p style={{ margin:"0 0 10px", fontSize:10.5, fontWeight:700, color:"#7C3AED", textTransform:"uppercase", letterSpacing:0.9 }}>
//         Escalation History
//       </p>
//       <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
//         {log.map((e, i) => (
//           <div key={i} style={{ background:"#fff", border:"1px solid #EDE9FE", borderRadius:9, padding:"9px 13px", fontSize:12 }}>
//             <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, alignItems:"center" }}>
//               <span style={{ display:"flex", alignItems:"center", gap:6 }}>
//                 <span style={{ fontWeight:600, color:"#6D28D9" }}>{e.fromName || e.from}</span>
//                 <span style={{ color:"#CBD5E1", fontSize:12 }}>→</span>
//                 <span style={{ fontWeight:600, color:"#2563EB" }}>{e.toName || e.to}</span>
//               </span>
//               <span style={{ fontSize:10.5, color:"#9CA3AF" }}>{dt.full(e.escalatedAt)}</span>
//             </div>
//             {e.reason && <p style={{ margin:"5px 0 0", color:"#6B7280", fontSize:11 }}>Reason: {e.reason}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    TICKET CHAT
// ───────────────────────────────────────────────────────────────── */
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
//   const [text, setText] = useState("");
//   const [sending, setSending] = useState(false);
//   const endRef = useRef(null);
//   const msgs = ticket?.messages || [];

//   useEffect(() => { setTimeout(() => endRef.current?.scrollIntoView({ behavior:"smooth" }), 80); }, [msgs.length]);
//   useEffect(() => { if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id); }, [ticket?._id]);

//   const send = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method:"POST", headers:{"Content-Type":"application/json"},
//         body: JSON.stringify({ sender:"staff", senderId:staffId, senderName:staffName, message:text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon:"error", title:"Error", text: data.message || "Failed." });
//     } catch { Swal.fire({ icon:"error", title:"Error", text:"Network error." }); }
//     finally { setSending(false); }
//   };

//   const closed = ["closed","resolved"].includes(ticket?.status);

//   return (
//     <div style={{ display:"flex", flexDirection:"column" }}>

//       {/* Messages */}
//       <div style={{ overflowY:"auto", padding:"20px 24px", display:"flex", flexDirection:"column", gap:4, background:"#F8FAFC", minHeight:320, maxHeight:440 }}>
//         {!msgs.length && (
//           <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, paddingTop:64, color:"#C4CAD4" }}>
//             {Icon.empty}
//             <span style={{ fontSize:13 }}>No messages yet</span>
//           </div>
//         )}
//         {msgs.map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           const isClient = msg.sender === "client";
//           const prevDate = i > 0 ? dt.date(msgs[i-1].createdAt) : null;
//           const thisDate = dt.date(msg.createdAt);

//           return (
//             <React.Fragment key={i}>
//               {thisDate !== prevDate && (
//                 <div style={{ display:"flex", alignItems:"center", gap:10, margin:"12px 0 6px" }}>
//                   <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
//                   <span style={{ fontSize:10.5, color:"#9CA3AF", fontWeight:500 }}>{thisDate}</span>
//                   <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
//                 </div>
//               )}
//               {isSystem ? (
//                 <div style={{ textAlign:"center", margin:"4px 0" }}>
//                   <span style={{ fontSize:11, color:"#9CA3AF", background:"#F1F5F9", padding:"3px 14px", borderRadius:20 }}>{msg.message}</span>
//                 </div>
//               ) : (
//                 <div className="shs-msg" style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start", gap:8, alignItems:"flex-end", marginBottom:2 }}>
//                   {!isMe && <Avatar name={msg.senderName} size={28} color={isClient?"#2563EB":"#7C3AED"} />}
//                   <div style={{ maxWidth:"65%", display:"flex", flexDirection:"column", alignItems:isMe?"flex-end":"flex-start" }}>
//                     {!isMe && (
//                       <span style={{ fontSize:10.5, color:"#9CA3AF", marginBottom:3, paddingLeft:2 }}>
//                         {msg.senderName} · {isClient ? "Client" : "Staff"}
//                       </span>
//                     )}
//                     <div style={{
//                       padding:"9px 13px", fontSize:13, lineHeight:1.55,
//                       borderRadius: isMe ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
//                       background: isMe ? "#2563EB" : "#fff",
//                       color: isMe ? "#fff" : "#111827",
//                       border: isMe ? "none" : "1px solid #E5E7EB",
//                       boxShadow: isMe ? "0 2px 10px rgba(37,99,235,0.2)" : "0 1px 3px rgba(0,0,0,0.05)",
//                     }}>
//                       {msg.message}
//                     </div>
//                     <span style={{ fontSize:10, color:"#CBD5E1", marginTop:3, paddingRight:2, paddingLeft:2 }}>
//                       {dt.time(msg.createdAt)}
//                     </span>
//                   </div>
//                   {isMe && <Avatar name={staffName} size={28} color="#2563EB" />}
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//         <div ref={endRef} />
//       </div>

//       {/* Footer */}
//       {readOnly ? (
//         <div style={{ padding:"12px 20px", textAlign:"center", fontSize:12.5, color:"#7C3AED", background:"#FDFCFF", borderTop:"1px solid #EDE9FE" }}>
//           This ticket has been escalated — view only.
//         </div>
//       ) : closed ? (
//         <div style={{ padding:"12px 20px", textAlign:"center", fontSize:12.5, color:"#9CA3AF", borderTop:"1px solid #F1F5F9" }}>
//           Ticket is {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display:"flex", gap:10, padding:"12px 20px", borderTop:"1px solid #F1F5F9", background:"#fff", alignItems:"center" }}>
//           <Avatar name={staffName} size={32} color="#2563EB" />
//           <input
//             className="shs-input"
//             type="text"
//             placeholder="Write a reply…"
//             value={text}
//             onChange={e => setText(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && send()}
//             style={{
//               flex:1, padding:"9px 16px", borderRadius:24,
//               border:"1.5px solid #E5E7EB", fontSize:13,
//               background:"#F9FAFB", fontFamily:"inherit", color:"#111827",
//               transition:"border-color 0.15s, box-shadow 0.15s",
//             }}
//           />
//           <button onClick={send} disabled={!text.trim() || sending} className="shs-btn"
//             style={{
//               width:38, height:38, borderRadius:"50%", border:"none",
//               background: text.trim() ? "#2563EB" : "#E5E7EB",
//               color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
//             }}>
//             {sending ? <span style={{ fontSize:16 }}>…</span> : Icon.send}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    ESCALATE PANEL
// ───────────────────────────────────────────────────────────────── */
// const EscalatePanel = ({ staffRole, adminList, form, setForm, onConfirm, onCancel, loading }) => (
//   <div style={{ padding:"16px 20px", background:"#FFFBEB", borderTop:"1px solid #FDE68A", borderBottom:"1px solid #FDE68A" }}>
//     <p style={{ margin:"0 0 12px", fontWeight:700, fontSize:12.5, color:"#92400E" }}>Escalate this ticket</p>
//     <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end" }}>
//       <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
//         <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>To</label>
//         <select value={form.toRole} onChange={e => setForm({...form, toRole:e.target.value, toId:"", toName:""})}
//           style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827" }}>
//           {staffRole === "staff" && adminList.length > 0 && <option value="admin-assistant">Admin Assistant</option>}
//           <option value="admin">Admin</option>
//         </select>
//       </div>
//       {form.toRole === "admin-assistant" && adminList.length > 0 && (
//         <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
//           <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>Select assistant</label>
//           <select value={form.toId} onChange={e => { const a=adminList.find(x=>x._id===e.target.value); setForm({...form, toId:e.target.value, toName:a?.name||""}); }}
//             style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827" }}>
//             <option value="">— Select —</option>
//             {adminList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
//           </select>
//         </div>
//       )}
//       <div style={{ flex:1, minWidth:200, display:"flex", flexDirection:"column", gap:4 }}>
//         <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>Reason <span style={{ color:"#EF4444" }}>*</span></label>
//         <input className="shs-input" type="text" placeholder="Enter reason…" value={form.reason} onChange={e => setForm({...form, reason:e.target.value})}
//           style={{ padding:"8px 12px", borderRadius:8, border:"1.5px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827", transition:"border-color 0.15s, box-shadow 0.15s" }} />
//       </div>
//       <button onClick={onConfirm} disabled={loading||!form.reason.trim()} className="shs-btn"
//         style={{ padding:"8px 16px", borderRadius:8, border:"none", background:loading?"#FCD34D":"#D97706", color:"#fff", fontWeight:600, fontSize:12.5, fontFamily:"inherit", height:36, display:"flex", alignItems:"center", gap:5 }}>
//         {Icon.up} {loading?"Escalating…":"Confirm Escalation"}
//       </button>
//       <button onClick={onCancel} className="shs-btn"
//         style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:12.5, fontFamily:"inherit", color:"#374151", height:36 }}>
//         Cancel
//       </button>
//     </div>
//   </div>
// );

// /* ─────────────────────────────────────────────────────────────────
//    TICKET CARD
// ───────────────────────────────────────────────────────────────── */
// const TicketCard = ({ ticket, isEsc, staffId, onOpen }) => {
//   const unread   = !isEsc && (ticket.unreadByStaff || 0);
//   const lastMsg  = ticket.messages?.[ticket.messages.length - 1];
//   const escEntry = isEsc ? [...(ticket.escalationLog||[])].reverse().find(e=>e.from===staffId) : null;

//   return (
//     <div className="shs-card" style={{
//       border:`1px solid ${unread?"#BFDBFE":isEsc?"#EDE9FE":"#E5E7EB"}`,
//       borderRadius:12, background:unread?"#F0F7FF":"#fff",
//       boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden",
//     }}>
//       <div style={{ padding:"14px 16px" }}>
//         <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, alignItems:"flex-start" }}>
//           <div>
//             <div style={{ display:"flex", alignItems:"center", gap:7 }}>
//               <span style={{ fontWeight:700, fontSize:13, color:"#111827" }}>
//                 #{ticket.ticketId} — {ticket.subject==="Other" ? ticket.customSubject : ticket.subject}
//               </span>
//               <UnreadPill count={ticket.unreadByStaff} />
//             </div>
//             <p style={{ margin:"4px 0 0", fontSize:11.5, color:"#9CA3AF" }}>
//               {ticket.clientName} · {ticket.projectName||ticket.projectId} · {dt.full(ticket.createdAt)}
//             </p>
//           </div>
//           <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
//             <Badge label={ticket.status} map={STATUS_MAP} />
//             <Badge label={ticket.priority} map={PRIORITY_MAP} />
//             {isEsc && ticket.assignedTo && (
//               <span style={{ padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:600, background:"#EFF6FF", color:"#1D4ED8", border:"1px solid #BFDBFE" }}>
//                 With: {ticket.assignedTo.name||ticket.assignedTo.role}
//               </span>
//             )}
//           </div>
//         </div>

//         {escEntry && (
//           <div style={{ marginTop:9, padding:"7px 11px", background:"#F5F3FF", borderRadius:8, fontSize:11.5, color:"#6D28D9", border:"1px solid #EDE9FE" }}>
//             Reason: <strong>{escEntry.reason}</strong>
//             <span style={{ color:"#9CA3AF", marginLeft:8 }}>→ {escEntry.toName}</span>
//           </div>
//         )}

//         {!isEsc && lastMsg && (
//           <p style={{ margin:"8px 0 0", fontSize:12, color:"#6B7280", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden", lineHeight:1.5 }}>
//             {lastMsg.message}
//           </p>
//         )}
//       </div>

//       <div style={{ borderTop:"1px solid #F1F5F9", padding:"9px 16px", background:"#FAFBFC", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <span style={{ fontSize:11.5, color:"#9CA3AF", display:"flex", alignItems:"center", gap:5 }}>
//           {Icon.chat} {ticket.messages?.length||0} messages
//         </span>
//         <button onClick={onOpen} className="shs-btn" style={{
//           padding:"6px 14px", borderRadius:8, border:"none",
//           background:isEsc?"#7C3AED":"#2563EB",
//           color:"#fff", fontWeight:600, fontSize:12,
//           display:"flex", alignItems:"center", gap:6, fontFamily:"inherit",
//         }}>
//           {isEsc ? "View History" : "Open Chat"}
//           <UnreadPill count={ticket.unreadByStaff} />
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────────── */
// const StaffHelpSupport = ({ staffId:pId, staffName:pName, staffRole:pRole, adminAssistantList:pAdmins }) => {
//   const [staffId,   setStaffId]   = useState(pId   || "");
//   const [staffName, setStaffName] = useState(pName || "");
//   const [staffRole, setStaffRole] = useState(pRole || "staff");
//   const [adminList, setAdminList] = useState(pAdmins || []);

//   const [tickets,  setTickets]  = useState([]);
//   const [escalated, setEscalated] = useState([]);
//   const [active,   setActive]   = useState(null);
//   const [isEscActive, setIsEscActive] = useState(false);
//   const [loading,  setLoading]  = useState(false);
//   const [loadEsc,  setLoadEsc]  = useState(false);
//   const [error,    setError]    = useState("");
//   const [tab,      setTab]      = useState("all");
//   const [showEsc,  setShowEsc]  = useState(false);
//   const [escForm,  setEscForm]  = useState({ toRole:"admin", toId:"", toName:"", reason:"" });
//   const [escalating, setEscalating] = useState(false);
//   const [resolving,  setResolving]  = useState(false);

//   const sockRef  = useRef(null);
//   const activeRef = useRef(null);
//   useEffect(() => { activeRef.current = active; }, [active]);
//   useEffect(() => { setEscForm(f => ({...f, toRole: staffRole==="staff" ? "admin-assistant" : "admin"})); }, [staffRole]);

//   /* Init session */
//   useEffect(() => {
//     if (pId) return;
//     const d = getStaff();
//     if (d) {
//       setStaffId(d._id||d.id||"");
//       setStaffName(d.name||d.firstName||"");
//       const slug = (d.slug||d.roleName||"").toLowerCase();
//       setStaffRole(slug.includes("admin-assistant")||slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [pId]);

//   useEffect(() => {
//     if (pAdmins?.length) return;
//     fetch(`${Url}/management-staff`).then(r=>r.json()).then(data=>{
//       const list = Array.isArray(data)?data:(data.staff||data.data||[]);
//       setAdminList(list.filter(s=>{const sl=(s.slug||s.roleName||"").toLowerCase();return sl.includes("admin-assistant")||sl.includes("admin assistant");}));
//     }).catch(()=>{});
//   }, [pAdmins]);

//   /* Fetchers */
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const d = await r.json();
//       if (r.ok) setTickets(d.tickets||[]); else setError(d.message||"Failed.");
//     } catch { setError("Network error."); } finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalated = useCallback(async () => {
//     if (!staffId) return;
//     setLoadEsc(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const d = await r.json();
//       setEscalated(r.ok?(d.tickets||[]):[]);
//     } catch { setEscalated([]); } finally { setLoadEsc(false); }
//   }, [staffId]);

//   const fetchOne = useCallback(async id => {
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${id}`);
//       const d = await r.json();
//       if (!r.ok||!d.ticket) return;
//       setTickets(prev=>prev.map(t=>t._id===d.ticket._id?d.ticket:t));
//       if (activeRef.current?._id===d.ticket._id) setActive(d.ticket);
//     } catch {}
//   }, []);

//   const markRead = useCallback(async id => {
//     try {
//       await fetch(`${Url}/api/support/tickets/${id}/mark-read`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:"staff"})});
//       setTickets(prev=>prev.map(t=>t._id===id?{...t,unreadByStaff:0}:t));
//       setActive(prev=>prev?._id===id?{...prev,unreadByStaff:0}:prev);
//     } catch {}
//   }, []);

//   useEffect(() => { if (staffId){fetchTickets();fetchEscalated();} }, [staffId]);
//   useEffect(() => { if (tab==="escalated"&&staffId) fetchEscalated(); }, [tab,staffId]);

//   /* Socket */
//   useEffect(() => {
//     if (!staffId) return;
//     const s = socketIo(Url,{transports:["websocket"],reconnectionAttempts:5});
//     sockRef.current = s;
//     s.on("connect", () => { const t=getToken(); if(t) s.emit("join",t); });
//     s.on("support:assigned_to_you", d => { Swal.fire({toast:true,position:"top-end",icon:"info",showConfirmButton:false,timer:4500,title:`New: #${d.ticketCode}`,text:d.subject}); fetchTickets(); });
//     s.on("support:ticket_updated", u => {
//       if (u.assignedTo?.id!==staffId){setTickets(prev=>prev.filter(t=>t._id!==u._id));if(activeRef.current?._id===u._id)setActive(null);fetchEscalated();return;}
//       setTickets(prev=>prev.map(t=>t._id===u._id?u:t));
//       if(activeRef.current?._id===u._id)setActive(u);
//     });
//     s.on("support:new_message", ({ticketId:tid}) => { if(activeRef.current?._id===tid)fetchOne(tid);else fetchTickets(); });
//     s.on("support:unread_update", ({ticketId:tid,unreadByStaff}) => {
//       if(unreadByStaff===undefined||activeRef.current?._id===tid)return;
//       setTickets(prev=>prev.map(t=>t._id===tid?{...t,unreadByStaff}:t));
//     });
//     return () => { s.disconnect(); sockRef.current=null; };
//   }, [staffId]);

//   /* Actions */
//   const handleResolve = async () => {
//     if (!active||resolving) return;
//     const ok = await Swal.fire({title:"Mark as Resolved?",icon:"question",showCancelButton:true,confirmButtonText:"Yes, resolve",confirmButtonColor:"#16A34A"});
//     if (!ok.isConfirmed) return;
//     setResolving(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"resolved"})});
//       const d = await r.json();
//       if (r.ok){Swal.fire({icon:"success",title:"Resolved!",timer:2000,showConfirmButton:false});setActive(d.ticket);setTickets(prev=>prev.map(t=>t._id===d.ticket._id?d.ticket:t));setShowEsc(false);}
//       else Swal.fire({icon:"error",title:"Error",text:d.message});
//     } catch { Swal.fire({icon:"error",title:"Error",text:"Network error."}); } finally { setResolving(false); }
//   };

//   const handleEscalate = async () => {
//     if (!active||!escForm.reason.trim()){Swal.fire({icon:"warning",title:"Reason required"});return;}
//     if (escForm.toRole==="admin-assistant"&&!escForm.toId){
//       if(!adminList.length){setEscForm(f=>({...f,toRole:"admin",toId:"",toName:"Admin"}));return;}
//       Swal.fire({icon:"warning",title:"Select an assistant"});return;
//     }
//     setEscalating(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/escalate`,{method:"PATCH",headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({fromId:staffId,fromName:staffName,toRole:escForm.toRole,toId:escForm.toRole==="admin"?null:escForm.toId,toName:escForm.toRole==="admin"?"Admin":escForm.toName,reason:escForm.reason})});
//       const d = await r.json();
//       if (r.ok){
//         Swal.fire({icon:"success",title:"Escalated!",timer:2000,showConfirmButton:false});
//         setTickets(prev=>prev.filter(t=>t._id!==active._id));
//         setEscalated(prev=>[d.ticket,...prev.filter(t=>t._id!==d.ticket._id)]);
//         setActive(null);setShowEsc(false);
//         setEscForm({toRole:staffRole==="staff"?"admin-assistant":"admin",toId:"",toName:"",reason:""});
//         fetchEscalated();
//       } else Swal.fire({icon:"error",title:"Error",text:d.message});
//     } catch { Swal.fire({icon:"error",title:"Error",text:"Escalation failed."}); } finally { setEscalating(false); }
//   };

//   /* Derived */
//   const list = tab==="all"?tickets:tab==="escalated"?escalated:tickets.filter(t=>t.status===tab);
//   const actionable = active && !["closed","resolved"].includes(active.status) && !isEscActive;
//   const totalUnread = tickets.reduce((s,t)=>s+(t.unreadByStaff||0),0);

//   const TABS = [
//     {key:"all",        label:"All",         cnt:tickets.length},
//     {key:"open",       label:"Open",        cnt:tickets.filter(t=>t.status==="open").length},
//     {key:"in-progress",label:"In Progress", cnt:tickets.filter(t=>t.status==="in-progress").length},
//     {key:"resolved",   label:"Resolved",    cnt:tickets.filter(t=>t.status==="resolved").length},
//     {key:"escalated",  label:"Escalated",   cnt:escalated.length},
//   ];

//   /* ── No session ── */
//   if (!staffId) return (
//     <div className="shs-root" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:80,color:"#9CA3AF"}}>
//       {Icon.lock}
//       <p style={{fontWeight:600,fontSize:15,color:"#374151",margin:0}}>Staff identity not found</p>
//       <p style={{fontSize:13,margin:0}}>Please login or refresh the page.</p>
//     </div>
//   );

//   return (
//     <>
//       <style>{GLOBAL_CSS}</style>
//       <div className="shs-root" style={{ padding:"28px 24px", maxWidth:1080, margin:"0 auto" }}>

//         {/* ─── HEADER ─── */}
//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:26 }}>
//           <div>
//             <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:-0.3, display:"flex", alignItems:"center", gap:10 }}>
//               Support Tickets
//               {totalUnread>0 && (
//                 <span style={{ background:"#EF4444", color:"#fff", borderRadius:99, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
//                   {totalUnread} unread
//                 </span>
//               )}
//             </h2>
//             <p style={{ margin:"5px 0 0", fontSize:12.5, color:"#9CA3AF" }}>
//               Assigned to <strong style={{ color:"#374151" }}>{staffName}</strong>
//               <span style={{ margin:"0 6px", color:"#E5E7EB" }}>·</span>
//               {staffRole}
//               {adminList.length>0 && (<><span style={{ margin:"0 6px", color:"#E5E7EB" }}>·</span><span style={{ color:"#7C3AED" }}>{adminList.length} assistant(s)</span></>)}
//             </p>
//           </div>
//           <button onClick={()=>{fetchTickets();fetchEscalated();}} className="shs-btn"
//             style={{ padding:"7px 14px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:12.5, color:"#374151", fontWeight:500, display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}>
//             {Icon.refresh} Refresh
//           </button>
//         </div>

//         {/* Error */}
//         {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 16px", marginBottom:18, fontSize:13, color:"#991B1B" }}>{error}</div>}

//         {/* ─── TABS ─── */}
//         <div style={{ display:"flex", gap:2, marginBottom:20, background:"#F3F4F6", borderRadius:11, padding:3, flexWrap:"wrap" }}>
//           {TABS.map(t => {
//             const on = tab===t.key;
//             const ac = t.key==="escalated"?"#7C3AED":t.key==="resolved"?"#16A34A":"#2563EB";
//             return (
//               <button key={t.key} className="shs-tab" onClick={()=>{setTab(t.key);setActive(null);setIsEscActive(false);setShowEsc(false);}}
//                 style={{ flex:1, minWidth:80, padding:"7px 10px", borderRadius:8, border:"none", background:on?"#fff":"transparent", boxShadow:on?"0 1px 4px rgba(0,0,0,0.09)":"none", fontWeight:on?600:500, color:on?ac:"#6B7280", cursor:"pointer", fontSize:12.5, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
//                 {t.label}
//                 {t.cnt>0 && <span style={{ background:on?ac:"#D1D5DB", color:on?"#fff":"#6B7280", borderRadius:99, minWidth:18, height:18, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, padding:"0 4px", fontWeight:700 }}>{t.cnt}</span>}
//               </button>
//             );
//           })}
//         </div>

//         {/* Escalated banner */}
//         {tab==="escalated"&&!active && (
//           <div style={{ background:"#F5F3FF", border:"1px solid #EDE9FE", borderRadius:10, padding:"10px 16px", marginBottom:16, fontSize:12.5, color:"#6D28D9", display:"flex", alignItems:"center", gap:8 }}>
//             {Icon.info} Tickets you've escalated — view only.
//           </div>
//         )}

//         {/* ════════════ DETAIL VIEW ════════════ */}
//         {active ? (
//           <div style={{ border:"1px solid #E5E7EB", borderRadius:16, overflow:"hidden", background:"#fff", boxShadow:"0 4px 24px rgba(0,0,0,0.07)" }}>

//             {/* Detail header */}
//             <div style={{
//               padding:"14px 20px", borderBottom:`1px solid ${isEscActive?"#EDE9FE":"#F1F5F9"}`,
//               background:isEscActive?"#FDFCFF":"#FAFBFC",
//               display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10,
//             }}>
//               <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                 <button onClick={()=>{setActive(null);setIsEscActive(false);setShowEsc(false);}} className="shs-btn"
//                   style={{ width:32, height:32, borderRadius:8, border:"1px solid #E5E7EB", background:"#F3F4F6", color:"#374151", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
//                   {Icon.back}
//                 </button>
//                 <div>
//                   <p style={{ margin:0, fontWeight:700, fontSize:13.5, color:"#111827" }}>
//                     #{active.ticketId} — {active.subject==="Other"?active.customSubject:active.subject}
//                   </p>
//                   <p style={{ margin:"3px 0 0", fontSize:11.5, color:"#9CA3AF" }}>
//                     {active.clientName} · {active.projectName||active.projectId}
//                   </p>
//                 </div>
//               </div>

//               <div style={{ display:"flex", gap:7, alignItems:"center", flexWrap:"wrap" }}>
//                 <Badge label={active.status} map={STATUS_MAP} />
//                 <Badge label={active.priority} map={PRIORITY_MAP} />

//                 {actionable && (
//                   <button onClick={handleResolve} disabled={resolving} className="shs-btn"
//                     style={{ padding:"6px 14px", borderRadius:8, border:"none", background:resolving?"#BBF7D0":"#16A34A", color:"#fff", fontWeight:600, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
//                     {Icon.check} {resolving?"Resolving…":"Resolve"}
//                   </button>
//                 )}

//                 {actionable && (
//                   <button onClick={()=>setShowEsc(v=>!v)} className="shs-btn"
//                     style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${showEsc?"#FDE68A":"#E5E7EB"}`, background:showEsc?"#FFFBEB":"#fff", color:showEsc?"#92400E":"#374151", fontWeight:600, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
//                     {Icon.up} Escalate
//                   </button>
//                 )}

//                 {isEscActive && (
//                   <span style={{ padding:"4px 11px", borderRadius:99, background:"#F5F3FF", color:"#6D28D9", fontSize:11, fontWeight:600, border:"1px solid #EDE9FE" }}>
//                     Escalated by you
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Resolved notice */}
//             {!isEscActive&&active.status==="resolved" && (
//               <div style={{ padding:"10px 20px", background:"#F0FDF4", borderBottom:"1px solid #BBF7D0", fontSize:12.5, color:"#15803D", display:"flex", alignItems:"center", gap:6 }}>
//                 {Icon.check} You've resolved this ticket. Admin will close it.
//               </div>
//             )}

//             {/* Escalation log */}
//             {isEscActive && <EscalationLog log={active.escalationLog} />}

//             {/* Escalate panel */}
//             {showEsc&&!isEscActive && (
//               <EscalatePanel staffRole={staffRole} adminList={adminList} form={escForm} setForm={setEscForm}
//                 onConfirm={handleEscalate} onCancel={()=>setShowEsc(false)} loading={escalating} />
//             )}

//             {/* Chat */}
//             <TicketChat ticket={active} staffId={staffId} staffName={staffName} readOnly={isEscActive} onMarkRead={markRead}
//               onUpdate={u=>{setActive(u);setTickets(prev=>prev.map(t=>t._id===u._id?u:t));}} />
//           </div>

//         /* ════ LOADING ════ */
//         ) : (loading&&tab!=="escalated")||(loadEsc&&tab==="escalated") ? (
//           <div style={{ textAlign:"center", padding:80, color:"#C4CAD4" }}>
//             {Icon.spin}
//             <p style={{ fontSize:13, marginTop:12, color:"#9CA3AF" }}>Loading tickets…</p>
//           </div>

//         /* ════ EMPTY ════ */
//         ) : list.length===0 ? (
//           <div style={{ textAlign:"center", padding:"64px 40px", border:"1px dashed #E5E7EB", borderRadius:14, background:"#FAFBFC" }}>
//             <div style={{ width:52, height:52, borderRadius:"50%", background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
//               {Icon.empty}
//             </div>
//             <p style={{ fontWeight:600, fontSize:14.5, color:"#374151", margin:"0 0 6px" }}>
//               {tab==="all"?"No tickets assigned":tab==="escalated"?"No escalated tickets":`No ${tab} tickets`}
//             </p>
//             <p style={{ fontSize:12.5, color:"#9CA3AF", margin:0 }}>
//               {tab==="all"?"Tickets assigned to you will appear here.":tab==="escalated"?"Tickets you escalate will appear here.":"Check another tab."}
//             </p>
//           </div>

//         /* ════ LIST ════ */
//         ) : (
//           <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//             {list.map(ticket => (
//               <TicketCard key={ticket._id} ticket={ticket} isEsc={tab==="escalated"} staffId={staffId}
//                 onOpen={()=>{setActive(ticket);setIsEscActive(tab==="escalated");setShowEsc(false);if(tab!=="escalated")markRead(ticket._id);}} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StaffHelpSupport;


















// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

// /* ─────────────────────────────────────────────────────────────────
//    GLOBAL STYLES
// ───────────────────────────────────────────────────────────────── */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

//   .shs-root *, .shs-root *::before, .shs-root *::after { box-sizing: border-box; font-family: 'DM Sans', system-ui, sans-serif; }

//   .shs-root {
//     --blue:        #2563EB;
//     --blue-bg:     #EFF6FF;
//     --blue-border: #BFDBFE;
//     --green:       #16A34A;
//     --green-bg:    #F0FDF4;
//     --green-border:#BBF7D0;
//     --amber:       #D97706;
//     --amber-bg:    #FFFBEB;
//     --amber-border:#FDE68A;
//     --red:         #DC2626;
//     --red-bg:      #FEF2F2;
//     --red-border:  #FECACA;
//     --violet:      #7C3AED;
//     --violet-bg:   #F5F3FF;
//     --violet-border:#DDD6FE;
//     --border:      #E5E7EB;
//     --border-light:#F1F5F9;
//     --surface:     #F8FAFC;
//     --bg-subtle:   #F9FAFB;
//     --text:        #111827;
//     --text-2:      #374151;
//     --text-3:      #6B7280;
//     --text-4:      #9CA3AF;
//     --text-5:      #C4CAD4;
//   }

//   .shs-card        { transition: box-shadow 0.18s ease, transform 0.12s ease; }
//   .shs-card:hover  { box-shadow: 0 6px 28px rgba(0,0,0,0.1) !important; transform: translateY(-1px); }

//   .shs-btn         { transition: opacity 0.14s, transform 0.1s; cursor: pointer; }
//   .shs-btn:hover:not(:disabled)  { opacity: 0.85; }
//   .shs-btn:active:not(:disabled) { transform: scale(0.97); }

//   .shs-tab { transition: all 0.15s ease; }
//   .shs-tab:hover { background: rgba(255,255,255,0.7) !important; }

//   .shs-input:focus {
//     border-color: var(--blue) !important;
//     outline: none;
//     box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
//   }

//   .shs-msg { animation: msgSlide 0.18s ease; }
//   @keyframes msgSlide { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }

//   .shs-pulse { animation: pulse 2s ease infinite; }
//   @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

//   @keyframes spin { to { transform: rotate(360deg); } }

//   .shs-related-item {
//     transition: all 0.15s ease;
//     cursor: pointer;
//   }
//   .shs-related-item:hover {
//     background: #FEF9C3 !important;
//     border-color: #FDE047 !important;
//     transform: translateX(2px);
//   }

//   .shs-root ::-webkit-scrollbar       { width: 4px; }
//   .shs-root ::-webkit-scrollbar-track { background: transparent; }
//   .shs-root ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
// `;

// /* ─────────────────────────────────────────────────────────────────
//    CONFIG
// ───────────────────────────────────────────────────────────────── */
// const STATUS_MAP = {
//   open:          { dot:"#F59E0B", text:"#B45309", bg:"#FFFBEB", border:"#FDE68A" },
//   "in-progress": { dot:"#3B82F6", text:"#1D4ED8", bg:"#EFF6FF", border:"#BFDBFE" },
//   resolved:      { dot:"#22C55E", text:"#15803D", bg:"#F0FDF4", border:"#BBF7D0" },
//   closed:        { dot:"#9CA3AF", text:"#4B5563", bg:"#F9FAFB", border:"#E5E7EB" },
//   escalated:     { dot:"#8B5CF6", text:"#6D28D9", bg:"#F5F3FF", border:"#DDD6FE" },
// };
// const PRIORITY_MAP = {
//   high:   { dot:"#EF4444", text:"#991B1B", bg:"#FEF2F2", border:"#FECACA" },
//   medium: { dot:"#F59E0B", text:"#92400E", bg:"#FFFBEB", border:"#FDE68A" },
//   low:    { dot:"#22C55E", text:"#14532D", bg:"#F0FDF4", border:"#BBF7D0" },
// };

// /* ─────────────────────────────────────────────────────────────────
//    TINY ATOMS
// ───────────────────────────────────────────────────────────────── */
// const Badge = ({ label, map }) => {
//   const c = map?.[label] || { dot:"#9CA3AF", text:"#4B5563", bg:"#F9FAFB", border:"#E5E7EB" };
//   return (
//     <span style={{
//       display:"inline-flex", alignItems:"center", gap:5,
//       padding:"3px 10px", borderRadius:99,
//       fontSize:11, fontWeight:600, letterSpacing:0.1, whiteSpace:"nowrap",
//       background:c.bg, color:c.text, border:`1px solid ${c.border}`,
//     }}>
//       <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot, flexShrink:0 }} />
//       {label}
//     </span>
//   );
// };

// const UnreadPill = ({ count, size = 17 }) => {
//   if (!count || count <= 0) return null;
//   return (
//     <span className="shs-pulse" style={{
//       background:"#EF4444", color:"#fff", borderRadius:99,
//       minWidth:size, height:size, padding:"0 4px",
//       fontSize:9.5, fontWeight:700,
//       display:"inline-flex", alignItems:"center", justifyContent:"center",
//     }}>
//       {count > 99 ? "99+" : count}
//     </span>
//   );
// };

// const Avatar = ({ name="?", color="#2563EB", size=30 }) => (
//   <div style={{
//     width:size, height:size, borderRadius:"50%", flexShrink:0,
//     background:`${color}18`, border:`1.5px solid ${color}30`,
//     display:"flex", alignItems:"center", justifyContent:"center",
//     fontSize:size * 0.37, fontWeight:700, color,
//   }}>
//     {name.charAt(0).toUpperCase()}
//   </div>
// );

// /* SVG icons */
// const Icon = {
//   back:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
//   check:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="20 6 9 17 4 12"/></svg>,
//   send:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
//   refresh: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
//   chat:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
//   up:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="18 15 12 9 6 15"/></svg>,
//   lock:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
//   spin:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{animation:"spin 1s linear infinite"}}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
//   empty:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   warning: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
//   arrow:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
// };

// /* ─────────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────────── */
// const getStaff = () => {
//   try { const r = sessionStorage.getItem("management_staff"); return r ? JSON.parse(r) : null; } catch { return null; }
// };
// const getToken = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// const dt = {
//   time: d => new Date(d).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" }),
//   date: d => new Date(d).toLocaleDateString("en-IN", { day:"numeric", month:"short" }),
//   full: d => new Date(d).toLocaleString("en-IN", { dateStyle:"medium", timeStyle:"short" }),
// };

// /* ─────────────────────────────────────────────────────────────────
//    ESCALATION LOG
// ───────────────────────────────────────────────────────────────── */
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding:"16px 20px", borderBottom:"1px solid #EDE9FE", background:"#FDFCFF" }}>
//       <p style={{ margin:"0 0 10px", fontSize:10.5, fontWeight:700, color:"#7C3AED", textTransform:"uppercase", letterSpacing:0.9 }}>
//         Escalation History
//       </p>
//       <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
//         {log.map((e, i) => (
//           <div key={i} style={{ background:"#fff", border:"1px solid #EDE9FE", borderRadius:9, padding:"9px 13px", fontSize:12 }}>
//             <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, alignItems:"center" }}>
//               <span style={{ display:"flex", alignItems:"center", gap:6 }}>
//                 <span style={{ fontWeight:600, color:"#6D28D9" }}>{e.fromName || e.from}</span>
//                 <span style={{ color:"#CBD5E1", fontSize:12 }}>→</span>
//                 <span style={{ fontWeight:600, color:"#2563EB" }}>{e.toName || e.to}</span>
//               </span>
//               <span style={{ fontSize:10.5, color:"#9CA3AF" }}>{dt.full(e.escalatedAt)}</span>
//             </div>
//             {e.reason && <p style={{ margin:"5px 0 0", color:"#6B7280", fontSize:11 }}>Reason: {e.reason}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    RELATED TICKETS BANNER (Staff version)
// ───────────────────────────────────────────────────────────────── */
// const RelatedTicketsBanner = ({ tickets, onSelect }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   if (!tickets || tickets.length === 0) return null;

//   return (
//     <div style={{
//       padding: "12px 20px",
//       background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
//       borderBottom: "1px solid #FDE68A",
//     }}>
//       {/* Header row */}
//       <div
//         style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: collapsed ? 0 : 10, cursor:"pointer" }}
//         onClick={() => setCollapsed(v => !v)}
//       >
//         <div style={{ display:"flex", alignItems:"center", gap:7 }}>
//           {Icon.warning}
//           <span style={{ fontSize:12, fontWeight:700, color:"#92400E" }}>
//             Is project pe {tickets.length} aur active ticket{tickets.length > 1 ? "s" : ""} hain (same subject)
//           </span>
//         </div>
//         <span style={{ fontSize:11, color:"#B45309", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
//           {collapsed ? "Show" : "Hide"}
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//             style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 0.2s" }}>
//             <polyline points="18 15 12 9 6 15"/>
//           </svg>
//         </span>
//       </div>

//       {/* Tickets list */}
//       {!collapsed && (
//         <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//           {tickets.map((t) => (
//             <div
//               key={t._id}
//               className="shs-related-item"
//               onClick={() => onSelect(t)}
//               style={{
//                 display:"flex", alignItems:"center", justifyContent:"space-between",
//                 background:"#fff", border:"1px solid #FDE68A", borderRadius:8,
//                 padding:"8px 12px", fontSize:12,
//               }}
//             >
//               <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, minWidth:0 }}>
//                 <span style={{ fontWeight:700, color:"#2563EB", whiteSpace:"nowrap" }}>#{t.ticketId}</span>
//                 <span style={{ color:"#6B7280", whiteSpace:"nowrap" }}>{t.clientName}</span>
//                 <span style={{ color:"#D1D5DB", fontSize:11 }}>·</span>
//                 <span style={{ color:"#9CA3AF", fontSize:11, whiteSpace:"nowrap" }}>
//                   {t.messages?.length || 0} msg(s)
//                 </span>
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
//                 <Badge label={t.status} map={STATUS_MAP} />
//                 <span style={{ fontSize:10.5, color:"#9CA3AF", whiteSpace:"nowrap" }}>
//                   {dt.date(t.createdAt)}
//                 </span>
//                 <span style={{ color:"#D97706" }}>{Icon.arrow}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    TICKET CHAT
// ───────────────────────────────────────────────────────────────── */
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
//   const [text, setText] = useState("");
//   const [sending, setSending] = useState(false);
//   const endRef = useRef(null);
//   const msgs = ticket?.messages || [];

//   useEffect(() => { setTimeout(() => endRef.current?.scrollIntoView({ behavior:"smooth" }), 80); }, [msgs.length]);
//   useEffect(() => { if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id); }, [ticket?._id]);

//   const send = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method:"POST", headers:{"Content-Type":"application/json"},
//         body: JSON.stringify({ sender:"staff", senderId:staffId, senderName:staffName, message:text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon:"error", title:"Error", text: data.message || "Failed." });
//     } catch { Swal.fire({ icon:"error", title:"Error", text:"Network error." }); }
//     finally { setSending(false); }
//   };

//   const closed = ["closed","resolved"].includes(ticket?.status);

//   return (
//     <div style={{ display:"flex", flexDirection:"column" }}>

//       {/* Messages */}
//       <div style={{ overflowY:"auto", padding:"20px 24px", display:"flex", flexDirection:"column", gap:4, background:"#F8FAFC", minHeight:320, maxHeight:440 }}>
//         {!msgs.length && (
//           <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, paddingTop:64, color:"#C4CAD4" }}>
//             {Icon.empty}
//             <span style={{ fontSize:13 }}>No messages yet</span>
//           </div>
//         )}
//         {msgs.map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           const isClient = msg.sender === "client";
//           const prevDate = i > 0 ? dt.date(msgs[i-1].createdAt) : null;
//           const thisDate = dt.date(msg.createdAt);

//           return (
//             <React.Fragment key={i}>
//               {thisDate !== prevDate && (
//                 <div style={{ display:"flex", alignItems:"center", gap:10, margin:"12px 0 6px" }}>
//                   <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
//                   <span style={{ fontSize:10.5, color:"#9CA3AF", fontWeight:500 }}>{thisDate}</span>
//                   <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
//                 </div>
//               )}
//               {isSystem ? (
//                 <div style={{ textAlign:"center", margin:"4px 0" }}>
//                   <span style={{ fontSize:11, color:"#9CA3AF", background:"#F1F5F9", padding:"3px 14px", borderRadius:20 }}>{msg.message}</span>
//                 </div>
//               ) : (
//                 <div className="shs-msg" style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start", gap:8, alignItems:"flex-end", marginBottom:2 }}>
//                   {!isMe && <Avatar name={msg.senderName} size={28} color={isClient?"#2563EB":"#7C3AED"} />}
//                   <div style={{ maxWidth:"65%", display:"flex", flexDirection:"column", alignItems:isMe?"flex-end":"flex-start" }}>
//                     {!isMe && (
//                       <span style={{ fontSize:10.5, color:"#9CA3AF", marginBottom:3, paddingLeft:2 }}>
//                         {msg.senderName} · {isClient ? "Client" : "Staff"}
//                       </span>
//                     )}
//                     <div style={{
//                       padding:"9px 13px", fontSize:13, lineHeight:1.55,
//                       borderRadius: isMe ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
//                       background: isMe ? "#2563EB" : "#fff",
//                       color: isMe ? "#fff" : "#111827",
//                       border: isMe ? "none" : "1px solid #E5E7EB",
//                       boxShadow: isMe ? "0 2px 10px rgba(37,99,235,0.2)" : "0 1px 3px rgba(0,0,0,0.05)",
//                     }}>
//                       {msg.message}
//                     </div>
//                     <span style={{ fontSize:10, color:"#CBD5E1", marginTop:3, paddingRight:2, paddingLeft:2 }}>
//                       {dt.time(msg.createdAt)}
//                     </span>
//                   </div>
//                   {isMe && <Avatar name={staffName} size={28} color="#2563EB" />}
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//         <div ref={endRef} />
//       </div>

//       {/* Footer */}
//       {readOnly ? (
//         <div style={{ padding:"12px 20px", textAlign:"center", fontSize:12.5, color:"#7C3AED", background:"#FDFCFF", borderTop:"1px solid #EDE9FE" }}>
//           This ticket has been escalated — view only.
//         </div>
//       ) : closed ? (
//         <div style={{ padding:"12px 20px", textAlign:"center", fontSize:12.5, color:"#9CA3AF", borderTop:"1px solid #F1F5F9" }}>
//           Ticket is {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display:"flex", gap:10, padding:"12px 20px", borderTop:"1px solid #F1F5F9", background:"#fff", alignItems:"center" }}>
//           <Avatar name={staffName} size={32} color="#2563EB" />
//           <input
//             className="shs-input"
//             type="text"
//             placeholder="Write a reply…"
//             value={text}
//             onChange={e => setText(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && send()}
//             style={{
//               flex:1, padding:"9px 16px", borderRadius:24,
//               border:"1.5px solid #E5E7EB", fontSize:13,
//               background:"#F9FAFB", fontFamily:"inherit", color:"#111827",
//               transition:"border-color 0.15s, box-shadow 0.15s",
//             }}
//           />
//           <button onClick={send} disabled={!text.trim() || sending} className="shs-btn"
//             style={{
//               width:38, height:38, borderRadius:"50%", border:"none",
//               background: text.trim() ? "#2563EB" : "#E5E7EB",
//               color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
//             }}>
//             {sending ? <span style={{ fontSize:16 }}>…</span> : Icon.send}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    ESCALATE PANEL
// ───────────────────────────────────────────────────────────────── */
// const EscalatePanel = ({ staffRole, adminList, form, setForm, onConfirm, onCancel, loading }) => (
//   <div style={{ padding:"16px 20px", background:"#FFFBEB", borderTop:"1px solid #FDE68A", borderBottom:"1px solid #FDE68A" }}>
//     <p style={{ margin:"0 0 12px", fontWeight:700, fontSize:12.5, color:"#92400E" }}>Escalate this ticket</p>
//     <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end" }}>
//       <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
//         <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>To</label>
//         <select value={form.toRole} onChange={e => setForm({...form, toRole:e.target.value, toId:"", toName:""})}
//           style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827" }}>
//           {staffRole === "staff" && adminList.length > 0 && <option value="admin-assistant">Admin Assistant</option>}
//           <option value="admin">Admin</option>
//         </select>
//       </div>
//       {form.toRole === "admin-assistant" && adminList.length > 0 && (
//         <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
//           <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>Select assistant</label>
//           <select value={form.toId} onChange={e => { const a=adminList.find(x=>x._id===e.target.value); setForm({...form, toId:e.target.value, toName:a?.name||""}); }}
//             style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827" }}>
//             <option value="">— Select —</option>
//             {adminList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
//           </select>
//         </div>
//       )}
//       <div style={{ flex:1, minWidth:200, display:"flex", flexDirection:"column", gap:4 }}>
//         <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>Reason <span style={{ color:"#EF4444" }}>*</span></label>
//         <input className="shs-input" type="text" placeholder="Enter reason…" value={form.reason} onChange={e => setForm({...form, reason:e.target.value})}
//           style={{ padding:"8px 12px", borderRadius:8, border:"1.5px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827", transition:"border-color 0.15s, box-shadow 0.15s" }} />
//       </div>
//       <button onClick={onConfirm} disabled={loading||!form.reason.trim()} className="shs-btn"
//         style={{ padding:"8px 16px", borderRadius:8, border:"none", background:loading?"#FCD34D":"#D97706", color:"#fff", fontWeight:600, fontSize:12.5, fontFamily:"inherit", height:36, display:"flex", alignItems:"center", gap:5 }}>
//         {Icon.up} {loading?"Escalating…":"Confirm Escalation"}
//       </button>
//       <button onClick={onCancel} className="shs-btn"
//         style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:12.5, fontFamily:"inherit", color:"#374151", height:36 }}>
//         Cancel
//       </button>
//     </div>
//   </div>
// );

// /* ─────────────────────────────────────────────────────────────────
//    TICKET CARD
// ───────────────────────────────────────────────────────────────── */
// const TicketCard = ({ ticket, isEsc, staffId, onOpen }) => {
//   const unread   = !isEsc && (ticket.unreadByStaff || 0);
//   const lastMsg  = ticket.messages?.[ticket.messages.length - 1];
//   const escEntry = isEsc ? [...(ticket.escalationLog||[])].reverse().find(e=>e.from===staffId) : null;

//   return (
//     <div className="shs-card" style={{
//       border:`1px solid ${unread?"#BFDBFE":isEsc?"#EDE9FE":"#E5E7EB"}`,
//       borderRadius:12, background:unread?"#F0F7FF":"#fff",
//       boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden",
//     }}>
//       <div style={{ padding:"14px 16px" }}>
//         <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, alignItems:"flex-start" }}>
//           <div>
//             <div style={{ display:"flex", alignItems:"center", gap:7 }}>
//               <span style={{ fontWeight:700, fontSize:13, color:"#111827" }}>
//                 #{ticket.ticketId} — {ticket.subject==="Other" ? ticket.customSubject : ticket.subject}
//               </span>
//               <UnreadPill count={ticket.unreadByStaff} />
//             </div>
//             <p style={{ margin:"4px 0 0", fontSize:11.5, color:"#9CA3AF" }}>
//               {ticket.clientName} · {ticket.projectName||ticket.projectId} · {dt.full(ticket.createdAt)}
//             </p>
//           </div>
//           <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
//             <Badge label={ticket.status} map={STATUS_MAP} />
//             <Badge label={ticket.priority} map={PRIORITY_MAP} />
//             {isEsc && ticket.assignedTo && (
//               <span style={{ padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:600, background:"#EFF6FF", color:"#1D4ED8", border:"1px solid #BFDBFE" }}>
//                 With: {ticket.assignedTo.name||ticket.assignedTo.role}
//               </span>
//             )}
//           </div>
//         </div>

//         {escEntry && (
//           <div style={{ marginTop:9, padding:"7px 11px", background:"#F5F3FF", borderRadius:8, fontSize:11.5, color:"#6D28D9", border:"1px solid #EDE9FE" }}>
//             Reason: <strong>{escEntry.reason}</strong>
//             <span style={{ color:"#9CA3AF", marginLeft:8 }}>→ {escEntry.toName}</span>
//           </div>
//         )}

//         {!isEsc && lastMsg && (
//           <p style={{ margin:"8px 0 0", fontSize:12, color:"#6B7280", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden", lineHeight:1.5 }}>
//             {lastMsg.message}
//           </p>
//         )}
//       </div>

//       <div style={{ borderTop:"1px solid #F1F5F9", padding:"9px 16px", background:"#FAFBFC", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <span style={{ fontSize:11.5, color:"#9CA3AF", display:"flex", alignItems:"center", gap:5 }}>
//           {Icon.chat} {ticket.messages?.length||0} messages
//         </span>
//         <button onClick={onOpen} className="shs-btn" style={{
//           padding:"6px 14px", borderRadius:8, border:"none",
//           background:isEsc?"#7C3AED":"#2563EB",
//           color:"#fff", fontWeight:600, fontSize:12,
//           display:"flex", alignItems:"center", gap:6, fontFamily:"inherit",
//         }}>
//           {isEsc ? "View History" : "Open Chat"}
//           <UnreadPill count={ticket.unreadByStaff} />
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────────── */
// const StaffHelpSupport = ({ staffId:pId, staffName:pName, staffRole:pRole, adminAssistantList:pAdmins }) => {
//   const [staffId,   setStaffId]   = useState(pId   || "");
//   const [staffName, setStaffName] = useState(pName || "");
//   const [staffRole, setStaffRole] = useState(pRole || "staff");
//   const [adminList, setAdminList] = useState(pAdmins || []);

//   const [tickets,   setTickets]   = useState([]);
//   const [escalated, setEscalated] = useState([]);
//   const [active,    setActive]    = useState(null);
//   const [isEscActive, setIsEscActive] = useState(false);
//   const [loading,   setLoading]   = useState(false);
//   const [loadEsc,   setLoadEsc]   = useState(false);
//   const [error,     setError]     = useState("");
//   const [tab,       setTab]       = useState("all");
//   const [showEsc,   setShowEsc]   = useState(false);
//   const [escForm,   setEscForm]   = useState({ toRole:"admin", toId:"", toName:"", reason:"" });
//   const [escalating, setEscalating] = useState(false);
//   const [resolving,  setResolving]  = useState(false);

//   // ── Related tickets ───────────────────────────────────────────────────
//   const [relatedTickets, setRelatedTickets] = useState([]);

//   const sockRef   = useRef(null);
//   const activeRef = useRef(null);
//   useEffect(() => { activeRef.current = active; }, [active]);
//   useEffect(() => { setEscForm(f => ({...f, toRole: staffRole==="staff" ? "admin-assistant" : "admin"})); }, [staffRole]);

//   /* Init session */
//   useEffect(() => {
//     if (pId) return;
//     const d = getStaff();
//     if (d) {
//       setStaffId(d._id||d.id||"");
//       setStaffName(d.name||d.firstName||"");
//       const slug = (d.slug||d.roleName||"").toLowerCase();
//       setStaffRole(slug.includes("admin-assistant")||slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [pId]);

//   useEffect(() => {
//     if (pAdmins?.length) return;
//     fetch(`${Url}/management-staff`).then(r=>r.json()).then(data=>{
//       const list = Array.isArray(data)?data:(data.staff||data.data||[]);
//       setAdminList(list.filter(s=>{const sl=(s.slug||s.roleName||"").toLowerCase();return sl.includes("admin-assistant")||sl.includes("admin assistant");}));
//     }).catch(()=>{});
//   }, [pAdmins]);

//   /* Fetchers */
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const d = await r.json();
//       if (r.ok) setTickets(d.tickets||[]); else setError(d.message||"Failed.");
//     } catch { setError("Network error."); } finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalated = useCallback(async () => {
//     if (!staffId) return;
//     setLoadEsc(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const d = await r.json();
//       setEscalated(r.ok?(d.tickets||[]):[]);
//     } catch { setEscalated([]); } finally { setLoadEsc(false); }
//   }, [staffId]);

//   const fetchOne = useCallback(async id => {
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${id}`);
//       const d = await r.json();
//       if (!r.ok||!d.ticket) return;
//       setTickets(prev=>prev.map(t=>t._id===d.ticket._id?d.ticket:t));
//       if (activeRef.current?._id===d.ticket._id) setActive(d.ticket);
//     } catch {}
//   }, []);

//   /* Fetch related tickets for active ticket */
//   const fetchRelated = useCallback(async (ticket) => {
//     if (!ticket?.projectId || !ticket?.subject) {
//       setRelatedTickets([]);
//       return;
//     }
//     try {
//       const r = await fetch(
//         `${Url}/api/support/tickets/related/${ticket.projectId}/${encodeURIComponent(ticket.subject)}?excludeId=${ticket._id}`
//       );
//       const d = await r.json();
//       setRelatedTickets(r.ok ? (d.tickets || []) : []);
//     } catch {
//       setRelatedTickets([]);
//     }
//   }, []);

//   const markRead = useCallback(async id => {
//     try {
//       await fetch(`${Url}/api/support/tickets/${id}/mark-read`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:"staff"})});
//       setTickets(prev=>prev.map(t=>t._id===id?{...t,unreadByStaff:0}:t));
//       setActive(prev=>prev?._id===id?{...prev,unreadByStaff:0}:prev);
//     } catch {}
//   }, []);

//   useEffect(() => { if (staffId){fetchTickets();fetchEscalated();} }, [staffId]);
//   useEffect(() => { if (tab==="escalated"&&staffId) fetchEscalated(); }, [tab,staffId]);

//   // Fetch related when active ticket changes
//   useEffect(() => {
//     if (active && !isEscActive) fetchRelated(active);
//     else setRelatedTickets([]);
//   }, [active, isEscActive, fetchRelated]);

//   /* Socket */
//   useEffect(() => {
//     if (!staffId) return;
//     const s = socketIo(Url,{transports:["websocket"],reconnectionAttempts:5});
//     sockRef.current = s;
//     s.on("connect", () => { const t=getToken(); if(t) s.emit("join",t); });
//     s.on("support:assigned_to_you", d => { Swal.fire({toast:true,position:"top-end",icon:"info",showConfirmButton:false,timer:4500,title:`New: #${d.ticketCode}`,text:d.subject}); fetchTickets(); });
//     s.on("support:ticket_updated", u => {
//       if (u.assignedTo?.id!==staffId){setTickets(prev=>prev.filter(t=>t._id!==u._id));if(activeRef.current?._id===u._id)setActive(null);fetchEscalated();return;}
//       setTickets(prev=>prev.map(t=>t._id===u._id?u:t));
//       if(activeRef.current?._id===u._id)setActive(u);
//     });
//     s.on("support:new_message", ({ticketId:tid}) => { if(activeRef.current?._id===tid)fetchOne(tid);else fetchTickets(); });
//     s.on("support:unread_update", ({ticketId:tid,unreadByStaff}) => {
//       if(unreadByStaff===undefined||activeRef.current?._id===tid)return;
//       setTickets(prev=>prev.map(t=>t._id===tid?{...t,unreadByStaff}:t));
//     });
//     return () => { s.disconnect(); sockRef.current=null; };
//   }, [staffId]);

//   /* Actions */
//   const handleResolve = async () => {
//     if (!active||resolving) return;
//     const ok = await Swal.fire({title:"Mark as Resolved?",icon:"question",showCancelButton:true,confirmButtonText:"Yes, resolve",confirmButtonColor:"#16A34A"});
//     if (!ok.isConfirmed) return;
//     setResolving(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"resolved"})});
//       const d = await r.json();
//       if (r.ok){Swal.fire({icon:"success",title:"Resolved!",timer:2000,showConfirmButton:false});setActive(d.ticket);setTickets(prev=>prev.map(t=>t._id===d.ticket._id?d.ticket:t));setShowEsc(false);}
//       else Swal.fire({icon:"error",title:"Error",text:d.message});
//     } catch { Swal.fire({icon:"error",title:"Error",text:"Network error."}); } finally { setResolving(false); }
//   };

//   const handleEscalate = async () => {
//     if (!active||!escForm.reason.trim()){Swal.fire({icon:"warning",title:"Reason required"});return;}
//     if (escForm.toRole==="admin-assistant"&&!escForm.toId){
//       if(!adminList.length){setEscForm(f=>({...f,toRole:"admin",toId:"",toName:"Admin"}));return;}
//       Swal.fire({icon:"warning",title:"Select an assistant"});return;
//     }
//     setEscalating(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/escalate`,{method:"PATCH",headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({fromId:staffId,fromName:staffName,toRole:escForm.toRole,toId:escForm.toRole==="admin"?null:escForm.toId,toName:escForm.toRole==="admin"?"Admin":escForm.toName,reason:escForm.reason})});
//       const d = await r.json();
//       if (r.ok){
//         Swal.fire({icon:"success",title:"Escalated!",timer:2000,showConfirmButton:false});
//         setTickets(prev=>prev.filter(t=>t._id!==active._id));
//         setEscalated(prev=>[d.ticket,...prev.filter(t=>t._id!==d.ticket._id)]);
//         setActive(null);setShowEsc(false);setRelatedTickets([]);
//         setEscForm({toRole:staffRole==="staff"?"admin-assistant":"admin",toId:"",toName:"",reason:""});
//         fetchEscalated();
//       } else Swal.fire({icon:"error",title:"Error",text:d.message});
//     } catch { Swal.fire({icon:"error",title:"Error",text:"Escalation failed."}); } finally { setEscalating(false); }
//   };

//   /* Open a ticket (from card or related banner) */
//   const openTicket = (ticket, isEsc = false) => {
//     setActive(ticket);
//     setIsEscActive(isEsc);
//     setShowEsc(false);
//     if (!isEsc) markRead(ticket._id);
//   };

//   /* Derived */
//   const list = tab==="all"?tickets:tab==="escalated"?escalated:tickets.filter(t=>t.status===tab);
//   const actionable = active && !["closed","resolved"].includes(active.status) && !isEscActive;
//   const totalUnread = tickets.reduce((s,t)=>s+(t.unreadByStaff||0),0);

//   const TABS = [
//     {key:"all",        label:"All",         cnt:tickets.length},
//     {key:"open",       label:"Open",        cnt:tickets.filter(t=>t.status==="open").length},
//     {key:"in-progress",label:"In Progress", cnt:tickets.filter(t=>t.status==="in-progress").length},
//     {key:"resolved",   label:"Resolved",    cnt:tickets.filter(t=>t.status==="resolved").length},
//     {key:"escalated",  label:"Escalated",   cnt:escalated.length},
//   ];

//   /* ── No session ── */
//   if (!staffId) return (
//     <div className="shs-root" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:80,color:"#9CA3AF"}}>
//       {Icon.lock}
//       <p style={{fontWeight:600,fontSize:15,color:"#374151",margin:0}}>Staff identity not found</p>
//       <p style={{fontSize:13,margin:0}}>Please login or refresh the page.</p>
//     </div>
//   );

//   return (
//     <>
//       <style>{GLOBAL_CSS}</style>
//       <div className="shs-root" style={{ padding:"28px 24px", maxWidth:1080, margin:"0 auto" }}>

//         {/* ─── HEADER ─── */}
//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:26 }}>
//           <div>
//             <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:-0.3, display:"flex", alignItems:"center", gap:10 }}>
//               Support Tickets
//               {totalUnread>0 && (
//                 <span style={{ background:"#EF4444", color:"#fff", borderRadius:99, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
//                   {totalUnread} unread
//                 </span>
//               )}
//             </h2>
//             <p style={{ margin:"5px 0 0", fontSize:12.5, color:"#9CA3AF" }}>
//               Assigned to <strong style={{ color:"#374151" }}>{staffName}</strong>
//               <span style={{ margin:"0 6px", color:"#E5E7EB" }}>·</span>
//               {staffRole}
//               {adminList.length>0 && (<><span style={{ margin:"0 6px", color:"#E5E7EB" }}>·</span><span style={{ color:"#7C3AED" }}>{adminList.length} assistant(s)</span></>)}
//             </p>
//           </div>
//           <button onClick={()=>{fetchTickets();fetchEscalated();}} className="shs-btn"
//             style={{ padding:"7px 14px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:12.5, color:"#374151", fontWeight:500, display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}>
//             {Icon.refresh} Refresh
//           </button>
//         </div>

//         {/* Error */}
//         {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 16px", marginBottom:18, fontSize:13, color:"#991B1B" }}>{error}</div>}

//         {/* ─── TABS ─── */}
//         <div style={{ display:"flex", gap:2, marginBottom:20, background:"#F3F4F6", borderRadius:11, padding:3, flexWrap:"wrap" }}>
//           {TABS.map(t => {
//             const on = tab===t.key;
//             const ac = t.key==="escalated"?"#7C3AED":t.key==="resolved"?"#16A34A":"#2563EB";
//             return (
//               <button key={t.key} className="shs-tab" onClick={()=>{setTab(t.key);setActive(null);setIsEscActive(false);setShowEsc(false);setRelatedTickets([]);}}
//                 style={{ flex:1, minWidth:80, padding:"7px 10px", borderRadius:8, border:"none", background:on?"#fff":"transparent", boxShadow:on?"0 1px 4px rgba(0,0,0,0.09)":"none", fontWeight:on?600:500, color:on?ac:"#6B7280", cursor:"pointer", fontSize:12.5, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
//                 {t.label}
//                 {t.cnt>0 && <span style={{ background:on?ac:"#D1D5DB", color:on?"#fff":"#6B7280", borderRadius:99, minWidth:18, height:18, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, padding:"0 4px", fontWeight:700 }}>{t.cnt}</span>}
//               </button>
//             );
//           })}
//         </div>

//         {/* Escalated banner */}
//         {tab==="escalated"&&!active && (
//           <div style={{ background:"#F5F3FF", border:"1px solid #EDE9FE", borderRadius:10, padding:"10px 16px", marginBottom:16, fontSize:12.5, color:"#6D28D9", display:"flex", alignItems:"center", gap:8 }}>
//             {Icon.info} Tickets you've escalated — view only.
//           </div>
//         )}

//         {/* ════════════ DETAIL VIEW ════════════ */}
//         {active ? (
//           <div style={{ border:"1px solid #E5E7EB", borderRadius:16, overflow:"hidden", background:"#fff", boxShadow:"0 4px 24px rgba(0,0,0,0.07)" }}>

//             {/* Detail header */}
//             <div style={{
//               padding:"14px 20px", borderBottom:`1px solid ${isEscActive?"#EDE9FE":"#F1F5F9"}`,
//               background:isEscActive?"#FDFCFF":"#FAFBFC",
//               display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10,
//             }}>
//               <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                 <button onClick={()=>{setActive(null);setIsEscActive(false);setShowEsc(false);setRelatedTickets([]);}} className="shs-btn"
//                   style={{ width:32, height:32, borderRadius:8, border:"1px solid #E5E7EB", background:"#F3F4F6", color:"#374151", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
//                   {Icon.back}
//                 </button>
//                 <div>
//                   <p style={{ margin:0, fontWeight:700, fontSize:13.5, color:"#111827" }}>
//                     #{active.ticketId} — {active.subject==="Other"?active.customSubject:active.subject}
//                   </p>
//                   <p style={{ margin:"3px 0 0", fontSize:11.5, color:"#9CA3AF" }}>
//                     {active.clientName} · {active.projectName||active.projectId}
//                   </p>
//                 </div>
//               </div>

//               <div style={{ display:"flex", gap:7, alignItems:"center", flexWrap:"wrap" }}>
//                 <Badge label={active.status} map={STATUS_MAP} />
//                 <Badge label={active.priority} map={PRIORITY_MAP} />

//                 {actionable && (
//                   <button onClick={handleResolve} disabled={resolving} className="shs-btn"
//                     style={{ padding:"6px 14px", borderRadius:8, border:"none", background:resolving?"#BBF7D0":"#16A34A", color:"#fff", fontWeight:600, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
//                     {Icon.check} {resolving?"Resolving…":"Resolve"}
//                   </button>
//                 )}

//                 {actionable && (
//                   <button onClick={()=>setShowEsc(v=>!v)} className="shs-btn"
//                     style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${showEsc?"#FDE68A":"#E5E7EB"}`, background:showEsc?"#FFFBEB":"#fff", color:showEsc?"#92400E":"#374151", fontWeight:600, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
//                     {Icon.up} Escalate
//                   </button>
//                 )}

//                 {isEscActive && (
//                   <span style={{ padding:"4px 11px", borderRadius:99, background:"#F5F3FF", color:"#6D28D9", fontSize:11, fontWeight:600, border:"1px solid #EDE9FE" }}>
//                     Escalated by you
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Resolved notice */}
//             {!isEscActive&&active.status==="resolved" && (
//               <div style={{ padding:"10px 20px", background:"#F0FDF4", borderBottom:"1px solid #BBF7D0", fontSize:12.5, color:"#15803D", display:"flex", alignItems:"center", gap:6 }}>
//                 {Icon.check} You've resolved this ticket. Admin will close it.
//               </div>
//             )}

//             {/* ── Related Tickets Banner ────────────────────────────── */}
//             {!isEscActive && (
//               <RelatedTicketsBanner
//                 tickets={relatedTickets}
//                 onSelect={(t) => openTicket(t, false)}
//               />
//             )}

//             {/* Escalation log */}
//             {isEscActive && <EscalationLog log={active.escalationLog} />}

//             {/* Escalate panel */}
//             {showEsc&&!isEscActive && (
//               <EscalatePanel staffRole={staffRole} adminList={adminList} form={escForm} setForm={setEscForm}
//                 onConfirm={handleEscalate} onCancel={()=>setShowEsc(false)} loading={escalating} />
//             )}

//             {/* Chat */}
//             <TicketChat ticket={active} staffId={staffId} staffName={staffName} readOnly={isEscActive} onMarkRead={markRead}
//               onUpdate={u=>{setActive(u);setTickets(prev=>prev.map(t=>t._id===u._id?u:t));}} />
//           </div>

//         /* ════ LOADING ════ */
//         ) : (loading&&tab!=="escalated")||(loadEsc&&tab==="escalated") ? (
//           <div style={{ textAlign:"center", padding:80, color:"#C4CAD4" }}>
//             {Icon.spin}
//             <p style={{ fontSize:13, marginTop:12, color:"#9CA3AF" }}>Loading tickets…</p>
//           </div>

//         /* ════ EMPTY ════ */
//         ) : list.length===0 ? (
//           <div style={{ textAlign:"center", padding:"64px 40px", border:"1px dashed #E5E7EB", borderRadius:14, background:"#FAFBFC" }}>
//             <div style={{ width:52, height:52, borderRadius:"50%", background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
//               {Icon.empty}
//             </div>
//             <p style={{ fontWeight:600, fontSize:14.5, color:"#374151", margin:"0 0 6px" }}>
//               {tab==="all"?"No tickets assigned":tab==="escalated"?"No escalated tickets":`No ${tab} tickets`}
//             </p>
//             <p style={{ fontSize:12.5, color:"#9CA3AF", margin:0 }}>
//               {tab==="all"?"Tickets assigned to you will appear here.":tab==="escalated"?"Tickets you escalate will appear here.":"Check another tab."}
//             </p>
//           </div>

//         /* ════ LIST ════ */
//         ) : (
//           <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//             {list.map(ticket => (
//               <TicketCard key={ticket._id} ticket={ticket} isEsc={tab==="escalated"} staffId={staffId}
//                 onOpen={()=>openTicket(ticket, tab==="escalated")} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StaffHelpSupport;



















// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

// /* ─────────────────────────────────────────────────────────────────
//    NOTIFICATION SOUND
// ───────────────────────────────────────────────────────────────── */
// const playNotifSound = () => {
//   try {
//     const audio = new Audio("/assets/notification.mp3");
//     audio.volume = 0.6;
//     audio.play().catch(() => {});
//   } catch {}
// };

// /* ─────────────────────────────────────────────────────────────────
//    GLOBAL STYLES
// ───────────────────────────────────────────────────────────────── */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

//   .shs-root *, .shs-root *::before, .shs-root *::after { box-sizing: border-box; font-family: 'DM Sans', system-ui, sans-serif; }

//   .shs-root {
//     --blue:        #2563EB;
//     --blue-bg:     #EFF6FF;
//     --blue-border: #BFDBFE;
//     --green:       #16A34A;
//     --green-bg:    #F0FDF4;
//     --green-border:#BBF7D0;
//     --amber:       #D97706;
//     --amber-bg:    #FFFBEB;
//     --amber-border:#FDE68A;
//     --red:         #DC2626;
//     --red-bg:      #FEF2F2;
//     --red-border:  #FECACA;
//     --violet:      #7C3AED;
//     --violet-bg:   #F5F3FF;
//     --violet-border:#DDD6FE;
//     --border:      #E5E7EB;
//     --border-light:#F1F5F9;
//     --surface:     #F8FAFC;
//     --bg-subtle:   #F9FAFB;
//     --text:        #111827;
//     --text-2:      #374151;
//     --text-3:      #6B7280;
//     --text-4:      #9CA3AF;
//     --text-5:      #C4CAD4;
//   }

//   .shs-card        { transition: box-shadow 0.18s ease, transform 0.12s ease; }
//   .shs-card:hover  { box-shadow: 0 6px 28px rgba(0,0,0,0.1) !important; transform: translateY(-1px); }

//   .shs-btn         { transition: opacity 0.14s, transform 0.1s; cursor: pointer; }
//   .shs-btn:hover:not(:disabled)  { opacity: 0.85; }
//   .shs-btn:active:not(:disabled) { transform: scale(0.97); }

//   .shs-tab { transition: all 0.15s ease; }
//   .shs-tab:hover { background: rgba(255,255,255,0.7) !important; }

//   .shs-input:focus {
//     border-color: var(--blue) !important;
//     outline: none;
//     box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
//   }

//   .shs-msg { animation: msgSlide 0.18s ease; }
//   @keyframes msgSlide { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }

//   .shs-pulse { animation: pulse 2s ease infinite; }
//   @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

//   @keyframes spin { to { transform: rotate(360deg); } }

//   .shs-related-item { transition: all 0.15s ease; cursor: pointer; }
//   .shs-related-item:hover {
//     background: #FEF9C3 !important;
//     border-color: #FDE047 !important;
//     transform: translateX(2px);
//   }

//   .shs-root ::-webkit-scrollbar       { width: 4px; }
//   .shs-root ::-webkit-scrollbar-track { background: transparent; }
//   .shs-root ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
// `;

// /* ─────────────────────────────────────────────────────────────────
//    CONFIG
// ───────────────────────────────────────────────────────────────── */
// const STATUS_MAP = {
//   open:          { dot:"#F59E0B", text:"#B45309", bg:"#FFFBEB", border:"#FDE68A" },
//   "in-progress": { dot:"#3B82F6", text:"#1D4ED8", bg:"#EFF6FF", border:"#BFDBFE" },
//   resolved:      { dot:"#22C55E", text:"#15803D", bg:"#F0FDF4", border:"#BBF7D0" },
//   closed:        { dot:"#9CA3AF", text:"#4B5563", bg:"#F9FAFB", border:"#E5E7EB" },
//   escalated:     { dot:"#8B5CF6", text:"#6D28D9", bg:"#F5F3FF", border:"#DDD6FE" },
// };
// const PRIORITY_MAP = {
//   high:   { dot:"#EF4444", text:"#991B1B", bg:"#FEF2F2", border:"#FECACA" },
//   medium: { dot:"#F59E0B", text:"#92400E", bg:"#FFFBEB", border:"#FDE68A" },
//   low:    { dot:"#22C55E", text:"#14532D", bg:"#F0FDF4", border:"#BBF7D0" },
// };

// /* ─────────────────────────────────────────────────────────────────
//    TINY ATOMS
// ───────────────────────────────────────────────────────────────── */
// const Badge = ({ label, map }) => {
//   const c = map?.[label] || { dot:"#9CA3AF", text:"#4B5563", bg:"#F9FAFB", border:"#E5E7EB" };
//   return (
//     <span style={{
//       display:"inline-flex", alignItems:"center", gap:5,
//       padding:"3px 10px", borderRadius:99,
//       fontSize:11, fontWeight:600, letterSpacing:0.1, whiteSpace:"nowrap",
//       background:c.bg, color:c.text, border:`1px solid ${c.border}`,
//     }}>
//       <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot, flexShrink:0 }} />
//       {label}
//     </span>
//   );
// };

// const UnreadPill = ({ count, size = 17 }) => {
//   if (!count || count <= 0) return null;
//   return (
//     <span className="shs-pulse" style={{
//       background:"#EF4444", color:"#fff", borderRadius:99,
//       minWidth:size, height:size, padding:"0 4px",
//       fontSize:9.5, fontWeight:700,
//       display:"inline-flex", alignItems:"center", justifyContent:"center",
//     }}>
//       {count > 99 ? "99+" : count}
//     </span>
//   );
// };

// const Avatar = ({ name="?", color="#2563EB", size=30 }) => (
//   <div style={{
//     width:size, height:size, borderRadius:"50%", flexShrink:0,
//     background:`${color}18`, border:`1.5px solid ${color}30`,
//     display:"flex", alignItems:"center", justifyContent:"center",
//     fontSize:size * 0.37, fontWeight:700, color,
//   }}>
//     {name.charAt(0).toUpperCase()}
//   </div>
// );

// const Icon = {
//   back:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
//   check:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="20 6 9 17 4 12"/></svg>,
//   send:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
//   refresh: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
//   chat:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
//   up:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="18 15 12 9 6 15"/></svg>,
//   lock:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
//   spin:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{animation:"spin 1s linear infinite"}}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
//   empty:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   warning: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
//   arrow:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
// };

// /* ─────────────────────────────────────────────────────────────────
//    HELPERS
// ───────────────────────────────────────────────────────────────── */
// const getStaff = () => {
//   try { const r = sessionStorage.getItem("management_staff"); return r ? JSON.parse(r) : null; } catch { return null; }
// };
// const getToken = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// const dt = {
//   time: d => new Date(d).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" }),
//   date: d => new Date(d).toLocaleDateString("en-IN", { day:"numeric", month:"short" }),
//   full: d => new Date(d).toLocaleString("en-IN", { dateStyle:"medium", timeStyle:"short" }),
// };

// /* ─────────────────────────────────────────────────────────────────
//    ESCALATION LOG
// ───────────────────────────────────────────────────────────────── */
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding:"16px 20px", borderBottom:"1px solid #EDE9FE", background:"#FDFCFF" }}>
//       <p style={{ margin:"0 0 10px", fontSize:10.5, fontWeight:700, color:"#7C3AED", textTransform:"uppercase", letterSpacing:0.9 }}>
//         Escalation History
//       </p>
//       <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
//         {log.map((e, i) => (
//           <div key={i} style={{ background:"#fff", border:"1px solid #EDE9FE", borderRadius:9, padding:"9px 13px", fontSize:12 }}>
//             <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, alignItems:"center" }}>
//               <span style={{ display:"flex", alignItems:"center", gap:6 }}>
//                 <span style={{ fontWeight:600, color:"#6D28D9" }}>{e.fromName || e.from}</span>
//                 <span style={{ color:"#CBD5E1", fontSize:12 }}>→</span>
//                 <span style={{ fontWeight:600, color:"#2563EB" }}>{e.toName || e.to}</span>
//               </span>
//               <span style={{ fontSize:10.5, color:"#9CA3AF" }}>{dt.full(e.escalatedAt)}</span>
//             </div>
//             {e.reason && <p style={{ margin:"5px 0 0", color:"#6B7280", fontSize:11 }}>Reason: {e.reason}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    RELATED TICKETS BANNER
// ───────────────────────────────────────────────────────────────── */
// const RelatedTicketsBanner = ({ tickets, onSelect }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   if (!tickets || tickets.length === 0) return null;
//   return (
//     <div style={{ padding:"12px 20px", background:"linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)", borderBottom:"1px solid #FDE68A" }}>
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: collapsed ? 0 : 10, cursor:"pointer" }}
//         onClick={() => setCollapsed(v => !v)}>
//         <div style={{ display:"flex", alignItems:"center", gap:7 }}>
//           {Icon.warning}
//           <span style={{ fontSize:12, fontWeight:700, color:"#92400E" }}>
//             Is project pe {tickets.length} aur active ticket{tickets.length > 1 ? "s" : ""} hain (same subject)
//           </span>
//         </div>
//         <span style={{ fontSize:11, color:"#B45309", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
//           {collapsed ? "Show" : "Hide"}
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//             style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 0.2s" }}>
//             <polyline points="18 15 12 9 6 15"/>
//           </svg>
//         </span>
//       </div>
//       {!collapsed && (
//         <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//           {tickets.map((t) => (
//             <div key={t._id} className="shs-related-item" onClick={() => onSelect(t)}
//               style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#fff", border:"1px solid #FDE68A", borderRadius:8, padding:"8px 12px", fontSize:12 }}>
//               <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, minWidth:0 }}>
//                 <span style={{ fontWeight:700, color:"#2563EB", whiteSpace:"nowrap" }}>#{t.ticketId}</span>
//                 <span style={{ color:"#6B7280", whiteSpace:"nowrap" }}>{t.clientName}</span>
//                 <span style={{ color:"#D1D5DB", fontSize:11 }}>·</span>
//                 <span style={{ color:"#9CA3AF", fontSize:11, whiteSpace:"nowrap" }}>{t.messages?.length || 0} msg(s)</span>
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
//                 <Badge label={t.status} map={STATUS_MAP} />
//                 <span style={{ fontSize:10.5, color:"#9CA3AF", whiteSpace:"nowrap" }}>{dt.date(t.createdAt)}</span>
//                 <span style={{ color:"#D97706" }}>{Icon.arrow}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    TICKET CHAT
// ───────────────────────────────────────────────────────────────── */
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
//   const [text, setText] = useState("");
//   const [sending, setSending] = useState(false);
//   const endRef = useRef(null);
//   const msgs = ticket?.messages || [];

//   useEffect(() => { setTimeout(() => endRef.current?.scrollIntoView({ behavior:"smooth" }), 80); }, [msgs.length]);
//   useEffect(() => { if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id); }, [ticket?._id]);

//   const send = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method:"POST", headers:{"Content-Type":"application/json"},
//         body: JSON.stringify({ sender:"staff", senderId:staffId, senderName:staffName, message:text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon:"error", title:"Error", text: data.message || "Failed." });
//     } catch { Swal.fire({ icon:"error", title:"Error", text:"Network error." }); }
//     finally { setSending(false); }
//   };

//   const closed = ["closed","resolved"].includes(ticket?.status);

//   return (
//     <div style={{ display:"flex", flexDirection:"column" }}>
//       <div style={{ overflowY:"auto", padding:"20px 24px", display:"flex", flexDirection:"column", gap:4, background:"#F8FAFC", minHeight:320, maxHeight:440 }}>
//         {!msgs.length && (
//           <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, paddingTop:64, color:"#C4CAD4" }}>
//             {Icon.empty}
//             <span style={{ fontSize:13 }}>No messages yet</span>
//           </div>
//         )}
//         {msgs.map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           const isClient = msg.sender === "client";
//           const prevDate = i > 0 ? dt.date(msgs[i-1].createdAt) : null;
//           const thisDate = dt.date(msg.createdAt);
//           return (
//             <React.Fragment key={i}>
//               {thisDate !== prevDate && (
//                 <div style={{ display:"flex", alignItems:"center", gap:10, margin:"12px 0 6px" }}>
//                   <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
//                   <span style={{ fontSize:10.5, color:"#9CA3AF", fontWeight:500 }}>{thisDate}</span>
//                   <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
//                 </div>
//               )}
//               {isSystem ? (
//                 <div style={{ textAlign:"center", margin:"4px 0" }}>
//                   <span style={{ fontSize:11, color:"#9CA3AF", background:"#F1F5F9", padding:"3px 14px", borderRadius:20 }}>{msg.message}</span>
//                 </div>
//               ) : (
//                 <div className="shs-msg" style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start", gap:8, alignItems:"flex-end", marginBottom:2 }}>
//                   {!isMe && <Avatar name={msg.senderName} size={28} color={isClient?"#2563EB":"#7C3AED"} />}
//                   <div style={{ maxWidth:"65%", display:"flex", flexDirection:"column", alignItems:isMe?"flex-end":"flex-start" }}>
//                     {!isMe && (
//                       <span style={{ fontSize:10.5, color:"#9CA3AF", marginBottom:3, paddingLeft:2 }}>
//                         {msg.senderName} · {isClient ? "Client" : "Staff"}
//                       </span>
//                     )}
//                     <div style={{
//                       padding:"9px 13px", fontSize:13, lineHeight:1.55,
//                       borderRadius: isMe ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
//                       background: isMe ? "#2563EB" : "#fff",
//                       color: isMe ? "#fff" : "#111827",
//                       border: isMe ? "none" : "1px solid #E5E7EB",
//                       boxShadow: isMe ? "0 2px 10px rgba(37,99,235,0.2)" : "0 1px 3px rgba(0,0,0,0.05)",
//                     }}>
//                       {msg.message}
//                     </div>
//                     <span style={{ fontSize:10, color:"#CBD5E1", marginTop:3, paddingRight:2, paddingLeft:2 }}>
//                       {dt.time(msg.createdAt)}
//                     </span>
//                   </div>
//                   {isMe && <Avatar name={staffName} size={28} color="#2563EB" />}
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//         <div ref={endRef} />
//       </div>

//       {readOnly ? (
//         <div style={{ padding:"12px 20px", textAlign:"center", fontSize:12.5, color:"#7C3AED", background:"#FDFCFF", borderTop:"1px solid #EDE9FE" }}>
//           This ticket has been escalated — view only.
//         </div>
//       ) : closed ? (
//         <div style={{ padding:"12px 20px", textAlign:"center", fontSize:12.5, color:"#9CA3AF", borderTop:"1px solid #F1F5F9" }}>
//           Ticket is {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display:"flex", gap:10, padding:"12px 20px", borderTop:"1px solid #F1F5F9", background:"#fff", alignItems:"center" }}>
//           <Avatar name={staffName} size={32} color="#2563EB" />
//           <input className="shs-input" type="text" placeholder="Write a reply…" value={text}
//             onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
//             style={{ flex:1, padding:"9px 16px", borderRadius:24, border:"1.5px solid #E5E7EB", fontSize:13, background:"#F9FAFB", fontFamily:"inherit", color:"#111827", transition:"border-color 0.15s, box-shadow 0.15s" }}
//           />
//           <button onClick={send} disabled={!text.trim() || sending} className="shs-btn"
//             style={{ width:38, height:38, borderRadius:"50%", border:"none", background: text.trim() ? "#2563EB" : "#E5E7EB", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//             {sending ? <span style={{ fontSize:16 }}>…</span> : Icon.send}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    ESCALATE PANEL
// ───────────────────────────────────────────────────────────────── */
// const EscalatePanel = ({ staffRole, adminList, form, setForm, onConfirm, onCancel, loading }) => (
//   <div style={{ padding:"16px 20px", background:"#FFFBEB", borderTop:"1px solid #FDE68A", borderBottom:"1px solid #FDE68A" }}>
//     <p style={{ margin:"0 0 12px", fontWeight:700, fontSize:12.5, color:"#92400E" }}>Escalate this ticket</p>
//     <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end" }}>
//       <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
//         <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>To</label>
//         <select value={form.toRole} onChange={e => setForm({...form, toRole:e.target.value, toId:"", toName:""})}
//           style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827" }}>
//           {staffRole === "staff" && adminList.length > 0 && <option value="admin-assistant">Admin Assistant</option>}
//           <option value="admin">Admin</option>
//         </select>
//       </div>
//       {form.toRole === "admin-assistant" && adminList.length > 0 && (
//         <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
//           <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>Select assistant</label>
//           <select value={form.toId} onChange={e => { const a=adminList.find(x=>x._id===e.target.value); setForm({...form, toId:e.target.value, toName:a?.name||""}); }}
//             style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827" }}>
//             <option value="">— Select —</option>
//             {adminList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
//           </select>
//         </div>
//       )}
//       <div style={{ flex:1, minWidth:200, display:"flex", flexDirection:"column", gap:4 }}>
//         <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>Reason <span style={{ color:"#EF4444" }}>*</span></label>
//         <input className="shs-input" type="text" placeholder="Enter reason…" value={form.reason}
//           onChange={e => setForm({...form, reason:e.target.value})}
//           style={{ padding:"8px 12px", borderRadius:8, border:"1.5px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827", transition:"border-color 0.15s, box-shadow 0.15s" }} />
//       </div>
//       <button onClick={onConfirm} disabled={loading||!form.reason.trim()} className="shs-btn"
//         style={{ padding:"8px 16px", borderRadius:8, border:"none", background:loading?"#FCD34D":"#D97706", color:"#fff", fontWeight:600, fontSize:12.5, fontFamily:"inherit", height:36, display:"flex", alignItems:"center", gap:5 }}>
//         {Icon.up} {loading?"Escalating…":"Confirm Escalation"}
//       </button>
//       <button onClick={onCancel} className="shs-btn"
//         style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:12.5, fontFamily:"inherit", color:"#374151", height:36 }}>
//         Cancel
//       </button>
//     </div>
//   </div>
// );

// /* ─────────────────────────────────────────────────────────────────
//    TICKET CARD
// ───────────────────────────────────────────────────────────────── */
// const TicketCard = ({ ticket, isEsc, staffId, onOpen }) => {
//   const unread   = !isEsc && (ticket.unreadByStaff || 0);
//   const lastMsg  = ticket.messages?.[ticket.messages.length - 1];
//   const escEntry = isEsc ? [...(ticket.escalationLog||[])].reverse().find(e=>e.from===staffId) : null;

//   return (
//     <div className="shs-card" style={{
//       border:`1px solid ${unread?"#BFDBFE":isEsc?"#EDE9FE":"#E5E7EB"}`,
//       borderRadius:12, background:unread?"#F0F7FF":"#fff",
//       boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden",
//     }}>
//       <div style={{ padding:"14px 16px" }}>
//         <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, alignItems:"flex-start" }}>
//           <div>
//             <div style={{ display:"flex", alignItems:"center", gap:7 }}>
//               <span style={{ fontWeight:700, fontSize:13, color:"#111827" }}>
//                 #{ticket.ticketId} — {ticket.subject==="Other" ? ticket.customSubject : ticket.subject}
//               </span>
//               <UnreadPill count={ticket.unreadByStaff} />
//             </div>
//             <p style={{ margin:"4px 0 0", fontSize:11.5, color:"#9CA3AF" }}>
//               {ticket.clientName} · {ticket.projectName||ticket.projectId} · {dt.full(ticket.createdAt)}
//             </p>
//           </div>
//           <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
//             <Badge label={ticket.status} map={STATUS_MAP} />
//             <Badge label={ticket.priority} map={PRIORITY_MAP} />
//             {isEsc && ticket.assignedTo && (
//               <span style={{ padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:600, background:"#EFF6FF", color:"#1D4ED8", border:"1px solid #BFDBFE" }}>
//                 With: {ticket.assignedTo.name||ticket.assignedTo.role}
//               </span>
//             )}
//           </div>
//         </div>
//         {escEntry && (
//           <div style={{ marginTop:9, padding:"7px 11px", background:"#F5F3FF", borderRadius:8, fontSize:11.5, color:"#6D28D9", border:"1px solid #EDE9FE" }}>
//             Reason: <strong>{escEntry.reason}</strong>
//             <span style={{ color:"#9CA3AF", marginLeft:8 }}>→ {escEntry.toName}</span>
//           </div>
//         )}
//         {!isEsc && lastMsg && (
//           <p style={{ margin:"8px 0 0", fontSize:12, color:"#6B7280", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden", lineHeight:1.5 }}>
//             {lastMsg.message}
//           </p>
//         )}
//       </div>
//       <div style={{ borderTop:"1px solid #F1F5F9", padding:"9px 16px", background:"#FAFBFC", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <span style={{ fontSize:11.5, color:"#9CA3AF", display:"flex", alignItems:"center", gap:5 }}>
//           {Icon.chat} {ticket.messages?.length||0} messages
//         </span>
//         <button onClick={onOpen} className="shs-btn" style={{
//           padding:"6px 14px", borderRadius:8, border:"none",
//           background:isEsc?"#7C3AED":"#2563EB", color:"#fff", fontWeight:600, fontSize:12,
//           display:"flex", alignItems:"center", gap:6, fontFamily:"inherit",
//         }}>
//           {isEsc ? "View History" : "Open Chat"}
//           <UnreadPill count={ticket.unreadByStaff} />
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────────────────────────
//    MAIN COMPONENT
// ───────────────────────────────────────────────────────────────── */
// const StaffHelpSupport = ({ staffId:pId, staffName:pName, staffRole:pRole, adminAssistantList:pAdmins }) => {
//   const [staffId,   setStaffId]   = useState(pId   || "");
//   const [staffName, setStaffName] = useState(pName || "");
//   const [staffRole, setStaffRole] = useState(pRole || "staff");
//   const [adminList, setAdminList] = useState(pAdmins || []);

//   const [tickets,     setTickets]     = useState([]);
//   const [escalated,   setEscalated]   = useState([]);
//   const [active,      setActive]      = useState(null);
//   const [isEscActive, setIsEscActive] = useState(false);
//   const [loading,     setLoading]     = useState(false);
//   const [loadEsc,     setLoadEsc]     = useState(false);
//   const [error,       setError]       = useState("");
//   const [tab,         setTab]         = useState("all");
//   const [showEsc,     setShowEsc]     = useState(false);
//   const [escForm,     setEscForm]     = useState({ toRole:"admin", toId:"", toName:"", reason:"" });
//   const [escalating,  setEscalating]  = useState(false);
//   const [resolving,   setResolving]   = useState(false);
//   const [relatedTickets, setRelatedTickets] = useState([]);

//   const sockRef   = useRef(null);
//   const activeRef = useRef(null);   // always points to latest active ticket
//   useEffect(() => { activeRef.current = active; }, [active]);
//   useEffect(() => { setEscForm(f => ({...f, toRole: staffRole==="staff" ? "admin-assistant" : "admin"})); }, [staffRole]);

//   /* ── Init session from sessionStorage ── */
//   useEffect(() => {
//     if (pId) return;
//     const d = getStaff();
//     if (d) {
//       setStaffId(d._id||d.id||"");
//       setStaffName(d.name||d.firstName||"");
//       const slug = (d.slug||d.roleName||"").toLowerCase();
//       setStaffRole(slug.includes("admin-assistant")||slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [pId]);

//   useEffect(() => {
//     if (pAdmins?.length) return;
//     fetch(`${Url}/management-staff`).then(r=>r.json()).then(data=>{
//       const list = Array.isArray(data)?data:(data.staff||data.data||[]);
//       setAdminList(list.filter(s=>{const sl=(s.slug||s.roleName||"").toLowerCase();return sl.includes("admin-assistant")||sl.includes("admin assistant");}));
//     }).catch(()=>{});
//   }, [pAdmins]);

//   /* ── Fetchers ── */
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const d = await r.json();
//       if (r.ok) setTickets(d.tickets||[]); else setError(d.message||"Failed.");
//     } catch { setError("Network error."); } finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalated = useCallback(async () => {
//     if (!staffId) return;
//     setLoadEsc(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const d = await r.json();
//       setEscalated(r.ok?(d.tickets||[]):[]);
//     } catch { setEscalated([]); } finally { setLoadEsc(false); }
//   }, [staffId]);

//   /* Fetch single ticket and patch it into state (for active chat) */
//   const fetchOne = useCallback(async id => {
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${id}`);
//       const d = await r.json();
//       if (!r.ok||!d.ticket) return;
//       setTickets(prev => prev.map(t => t._id===d.ticket._id ? d.ticket : t));
//       if (activeRef.current?._id === d.ticket._id) setActive(d.ticket);
//     } catch {}
//   }, []);

//   const fetchRelated = useCallback(async (ticket) => {
//     if (!ticket?.projectId || !ticket?.subject) { setRelatedTickets([]); return; }
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/related/${ticket.projectId}/${encodeURIComponent(ticket.subject)}?excludeId=${ticket._id}`);
//       const d = await r.json();
//       setRelatedTickets(r.ok ? (d.tickets || []) : []);
//     } catch { setRelatedTickets([]); }
//   }, []);

//   const markRead = useCallback(async id => {
//     try {
//       await fetch(`${Url}/api/support/tickets/${id}/mark-read`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:"staff"})});
//       setTickets(prev => prev.map(t => t._id===id ? {...t, unreadByStaff:0} : t));
//       setActive(prev => prev?._id===id ? {...prev, unreadByStaff:0} : prev);
//     } catch {}
//   }, []);

//   useEffect(() => { if (staffId) { fetchTickets(); fetchEscalated(); } }, [staffId]);
//   useEffect(() => { if (tab==="escalated" && staffId) fetchEscalated(); }, [tab, staffId]);
//   useEffect(() => {
//     if (active && !isEscActive) fetchRelated(active);
//     else setRelatedTickets([]);
//   }, [active, isEscActive, fetchRelated]);

//   /* ── Socket (bind once, functional setState to avoid stale closures) ── */
//   useEffect(() => {
//     if (!staffId) return;
//     const s = socketIo(Url, {
//       transports:           ["websocket"],
//       reconnectionAttempts: 10,
//       reconnectionDelay:    1000,
//     });
//     sockRef.current = s;

//     /* Authenticated join — re-runs on every (re)connect */
//     const joinRoom = () => {
//       const token = getToken();
//       if (token) s.emit("join", token);
//     };
//     s.on("connect",   joinRoom);
//     s.on("reconnect", joinRoom);

//     /* ── New ticket assigned to this staff ── */
//     s.on("support:assigned_to_you", d => {
//       playNotifSound();
//       Swal.fire({ toast:true, position:"top-end", icon:"info", showConfirmButton:false, timer:4500, title:`New: #${d.ticketCode}`, text:d.subject });
//       /* Add to ticket list directly — no full refetch needed */
//       setTickets(prev => {
//         if (prev.some(t => t._id === d._id)) return prev; // already there
//         return [d, ...prev];
//       });
//     });

//     /* ── Ticket updated (status / reassignment / etc.) ── */
//     s.on("support:ticket_updated", u => {
//       if (u.assignedTo?.id !== staffId) {
//         /* Removed from this staff */
//         setTickets(prev => prev.filter(t => t._id !== u._id));
//         if (activeRef.current?._id === u._id) setActive(null);
//         fetchEscalated();
//         return;
//       }
//       playNotifSound();
//       /* Patch ticket in-place */
//       setTickets(prev => {
//         const exists = prev.some(t => t._id === u._id);
//         return exists ? prev.map(t => t._id === u._id ? u : t) : [u, ...prev];
//       });
//       if (activeRef.current?._id === u._id) setActive(u);
//     });

//     /* ── New message on a ticket ── */
//     s.on("support:new_message", ({ ticketId: tid, message, senderName, sender }) => {
//       const isActiveTicket = activeRef.current?._id === tid;

//       if (isActiveTicket) {
//         /* User is viewing this ticket — fetch fresh copy to get the new message */
//         fetchOne(tid);
//       } else {
//         /* Ticket is in the list — increment unread count and update preview */
//         playNotifSound();
//         setTickets(prev => prev.map(t => {
//           if (t._id !== tid) return t;
//           const newMsg = { message, senderName, sender, createdAt: new Date().toISOString() };
//           return {
//             ...t,
//             unreadByStaff: (t.unreadByStaff || 0) + 1,
//             messages:      [...(t.messages || []), newMsg],
//           };
//         }));
//       }
//     });

//     /* ── Server-pushed unread count (batch sync) ── */
//     s.on("support:unread_update", ({ ticketId: tid, unreadByStaff }) => {
//       if (unreadByStaff === undefined || activeRef.current?._id === tid) return;
//       setTickets(prev => prev.map(t => t._id === tid ? { ...t, unreadByStaff } : t));
//     });

//     return () => {
//       s.off("connect",   joinRoom);
//       s.off("reconnect", joinRoom);
//       s.disconnect();
//       sockRef.current = null;
//     };
//   }, [staffId, fetchOne, fetchEscalated]);

//   /* ── Actions ── */
//   const handleResolve = async () => {
//     if (!active || resolving) return;
//     const ok = await Swal.fire({ title:"Mark as Resolved?", icon:"question", showCancelButton:true, confirmButtonText:"Yes, resolve", confirmButtonColor:"#16A34A" });
//     if (!ok.isConfirmed) return;
//     setResolving(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"resolved"})});
//       const d = await r.json();
//       if (r.ok) {
//         Swal.fire({ icon:"success", title:"Resolved!", timer:2000, showConfirmButton:false });
//         setActive(d.ticket);
//         setTickets(prev => prev.map(t => t._id===d.ticket._id ? d.ticket : t));
//         setShowEsc(false);
//       } else Swal.fire({ icon:"error", title:"Error", text:d.message });
//     } catch { Swal.fire({ icon:"error", title:"Error", text:"Network error." }); }
//     finally { setResolving(false); }
//   };

//   const handleEscalate = async () => {
//     if (!active || !escForm.reason.trim()) { Swal.fire({ icon:"warning", title:"Reason required" }); return; }
//     if (escForm.toRole==="admin-assistant" && !escForm.toId) {
//       if (!adminList.length) { setEscForm(f=>({...f, toRole:"admin", toId:"", toName:"Admin"})); return; }
//       Swal.fire({ icon:"warning", title:"Select an assistant" }); return;
//     }
//     setEscalating(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/escalate`,{method:"PATCH",headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({fromId:staffId,fromName:staffName,toRole:escForm.toRole,toId:escForm.toRole==="admin"?null:escForm.toId,toName:escForm.toRole==="admin"?"Admin":escForm.toName,reason:escForm.reason})});
//       const d = await r.json();
//       if (r.ok) {
//         Swal.fire({ icon:"success", title:"Escalated!", timer:2000, showConfirmButton:false });
//         setTickets(prev => prev.filter(t => t._id !== active._id));
//         setEscalated(prev => [d.ticket, ...prev.filter(t => t._id !== d.ticket._id)]);
//         setActive(null); setShowEsc(false); setRelatedTickets([]);
//         setEscForm({ toRole:staffRole==="staff"?"admin-assistant":"admin", toId:"", toName:"", reason:"" });
//         fetchEscalated();
//       } else Swal.fire({ icon:"error", title:"Error", text:d.message });
//     } catch { Swal.fire({ icon:"error", title:"Error", text:"Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   const openTicket = (ticket, isEsc = false) => {
//     setActive(ticket);
//     setIsEscActive(isEsc);
//     setShowEsc(false);
//     if (!isEsc) markRead(ticket._id);
//   };

//   /* ── Derived ── */
//   const list        = tab==="all" ? tickets : tab==="escalated" ? escalated : tickets.filter(t => t.status===tab);
//   const actionable  = active && !["closed","resolved"].includes(active.status) && !isEscActive;
//   const totalUnread = tickets.reduce((s, t) => s + (t.unreadByStaff || 0), 0);

//   const TABS = [
//     { key:"all",         label:"All",         cnt:tickets.length },
//     { key:"open",        label:"Open",        cnt:tickets.filter(t=>t.status==="open").length },
//     { key:"in-progress", label:"In Progress", cnt:tickets.filter(t=>t.status==="in-progress").length },
//     { key:"resolved",    label:"Resolved",    cnt:tickets.filter(t=>t.status==="resolved").length },
//     { key:"escalated",   label:"Escalated",   cnt:escalated.length },
//   ];

//   /* ── No session ── */
//   if (!staffId) return (
//     <div className="shs-root" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, padding:80, color:"#9CA3AF" }}>
//       {Icon.lock}
//       <p style={{ fontWeight:600, fontSize:15, color:"#374151", margin:0 }}>Staff identity not found</p>
//       <p style={{ fontSize:13, margin:0 }}>Please login or refresh the page.</p>
//     </div>
//   );

//   return (
//     <>
//       <style>{GLOBAL_CSS}</style>
//       <div className="shs-root" style={{ padding:"28px 24px", maxWidth:1080, margin:"0 auto" }}>

//         {/* HEADER */}
//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:26 }}>
//           <div>
//             <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:-0.3, display:"flex", alignItems:"center", gap:10 }}>
//               Support Tickets
//               {totalUnread > 0 && (
//                 <span style={{ background:"#EF4444", color:"#fff", borderRadius:99, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
//                   {totalUnread} unread
//                 </span>
//               )}
//             </h2>
//             <p style={{ margin:"5px 0 0", fontSize:12.5, color:"#9CA3AF" }}>
//               Assigned to <strong style={{ color:"#374151" }}>{staffName}</strong>
//               <span style={{ margin:"0 6px", color:"#E5E7EB" }}>·</span>
//               {staffRole}
//               {adminList.length > 0 && (<><span style={{ margin:"0 6px", color:"#E5E7EB" }}>·</span><span style={{ color:"#7C3AED" }}>{adminList.length} assistant(s)</span></>)}
//             </p>
//           </div>
//           <button onClick={()=>{fetchTickets();fetchEscalated();}} className="shs-btn"
//             style={{ padding:"7px 14px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:12.5, color:"#374151", fontWeight:500, display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}>
//             {Icon.refresh} Refresh
//           </button>
//         </div>

//         {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 16px", marginBottom:18, fontSize:13, color:"#991B1B" }}>{error}</div>}

//         {/* TABS */}
//         <div style={{ display:"flex", gap:2, marginBottom:20, background:"#F3F4F6", borderRadius:11, padding:3, flexWrap:"wrap" }}>
//           {TABS.map(t => {
//             const on = tab === t.key;
//             const ac = t.key==="escalated"?"#7C3AED":t.key==="resolved"?"#16A34A":"#2563EB";
//             return (
//               <button key={t.key} className="shs-tab"
//                 onClick={()=>{ setTab(t.key); setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }}
//                 style={{ flex:1, minWidth:80, padding:"7px 10px", borderRadius:8, border:"none", background:on?"#fff":"transparent", boxShadow:on?"0 1px 4px rgba(0,0,0,0.09)":"none", fontWeight:on?600:500, color:on?ac:"#6B7280", cursor:"pointer", fontSize:12.5, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
//                 {t.label}
//                 {t.cnt > 0 && <span style={{ background:on?ac:"#D1D5DB", color:on?"#fff":"#6B7280", borderRadius:99, minWidth:18, height:18, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, padding:"0 4px", fontWeight:700 }}>{t.cnt}</span>}
//               </button>
//             );
//           })}
//         </div>

//         {tab==="escalated" && !active && (
//           <div style={{ background:"#F5F3FF", border:"1px solid #EDE9FE", borderRadius:10, padding:"10px 16px", marginBottom:16, fontSize:12.5, color:"#6D28D9", display:"flex", alignItems:"center", gap:8 }}>
//             {Icon.info} Tickets you've escalated — view only.
//           </div>
//         )}

//         {/* DETAIL VIEW */}
//         {active ? (
//           <div style={{ border:"1px solid #E5E7EB", borderRadius:16, overflow:"hidden", background:"#fff", boxShadow:"0 4px 24px rgba(0,0,0,0.07)" }}>
//             <div style={{ padding:"14px 20px", borderBottom:`1px solid ${isEscActive?"#EDE9FE":"#F1F5F9"}`, background:isEscActive?"#FDFCFF":"#FAFBFC", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
//               <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                 <button onClick={()=>{ setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }} className="shs-btn"
//                   style={{ width:32, height:32, borderRadius:8, border:"1px solid #E5E7EB", background:"#F3F4F6", color:"#374151", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
//                   {Icon.back}
//                 </button>
//                 <div>
//                   <p style={{ margin:0, fontWeight:700, fontSize:13.5, color:"#111827" }}>
//                     #{active.ticketId} — {active.subject==="Other" ? active.customSubject : active.subject}
//                   </p>
//                   <p style={{ margin:"3px 0 0", fontSize:11.5, color:"#9CA3AF" }}>
//                     {active.clientName} · {active.projectName||active.projectId}
//                   </p>
//                 </div>
//               </div>
//               <div style={{ display:"flex", gap:7, alignItems:"center", flexWrap:"wrap" }}>
//                 <Badge label={active.status} map={STATUS_MAP} />
//                 <Badge label={active.priority} map={PRIORITY_MAP} />
//                 {actionable && (
//                   <button onClick={handleResolve} disabled={resolving} className="shs-btn"
//                     style={{ padding:"6px 14px", borderRadius:8, border:"none", background:resolving?"#BBF7D0":"#16A34A", color:"#fff", fontWeight:600, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
//                     {Icon.check} {resolving?"Resolving…":"Resolve"}
//                   </button>
//                 )}
//                 {actionable && (
//                   <button onClick={()=>setShowEsc(v=>!v)} className="shs-btn"
//                     style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${showEsc?"#FDE68A":"#E5E7EB"}`, background:showEsc?"#FFFBEB":"#fff", color:showEsc?"#92400E":"#374151", fontWeight:600, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
//                     {Icon.up} Escalate
//                   </button>
//                 )}
//                 {isEscActive && (
//                   <span style={{ padding:"4px 11px", borderRadius:99, background:"#F5F3FF", color:"#6D28D9", fontSize:11, fontWeight:600, border:"1px solid #EDE9FE" }}>
//                     Escalated by you
//                   </span>
//                 )}
//               </div>
//             </div>

//             {!isEscActive && active.status==="resolved" && (
//               <div style={{ padding:"10px 20px", background:"#F0FDF4", borderBottom:"1px solid #BBF7D0", fontSize:12.5, color:"#15803D", display:"flex", alignItems:"center", gap:6 }}>
//                 {Icon.check} You've resolved this ticket. Admin will close it.
//               </div>
//             )}

//             {!isEscActive && <RelatedTicketsBanner tickets={relatedTickets} onSelect={(t) => openTicket(t, false)} />}
//             {isEscActive && <EscalationLog log={active.escalationLog} />}
//             {showEsc && !isEscActive && (
//               <EscalatePanel staffRole={staffRole} adminList={adminList} form={escForm} setForm={setEscForm}
//                 onConfirm={handleEscalate} onCancel={()=>setShowEsc(false)} loading={escalating} />
//             )}

//             <TicketChat ticket={active} staffId={staffId} staffName={staffName} readOnly={isEscActive} onMarkRead={markRead}
//               onUpdate={u => { setActive(u); setTickets(prev => prev.map(t => t._id===u._id ? u : t)); }} />
//           </div>

//         ) : (loading && tab!=="escalated") || (loadEsc && tab==="escalated") ? (
//           <div style={{ textAlign:"center", padding:80, color:"#C4CAD4" }}>
//             {Icon.spin}
//             <p style={{ fontSize:13, marginTop:12, color:"#9CA3AF" }}>Loading tickets…</p>
//           </div>

//         ) : list.length === 0 ? (
//           <div style={{ textAlign:"center", padding:"64px 40px", border:"1px dashed #E5E7EB", borderRadius:14, background:"#FAFBFC" }}>
//             <div style={{ width:52, height:52, borderRadius:"50%", background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
//               {Icon.empty}
//             </div>
//             <p style={{ fontWeight:600, fontSize:14.5, color:"#374151", margin:"0 0 6px" }}>
//               {tab==="all"?"No tickets assigned":tab==="escalated"?"No escalated tickets":`No ${tab} tickets`}
//             </p>
//             <p style={{ fontSize:12.5, color:"#9CA3AF", margin:0 }}>
//               {tab==="all"?"Tickets assigned to you will appear here.":tab==="escalated"?"Tickets you escalate will appear here.":"Check another tab."}
//             </p>
//           </div>

//         ) : (
//           <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//             {list.map(ticket => (
//               <TicketCard key={ticket._id} ticket={ticket} isEsc={tab==="escalated"} staffId={staffId}
//                 onOpen={()=>openTicket(ticket, tab==="escalated")} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StaffHelpSupport;

















// sound working code but sound is also run in this code own chatbox there is some bugs here 


// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

// const playNotifSound = () => {
//   try { const a = new Audio("/assets/notification.mp3"); a.volume = 0.6; a.play().catch(() => {}); } catch {}
// };

// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
//   .shs-root *, .shs-root *::before, .shs-root *::after { box-sizing: border-box; font-family: 'DM Sans', system-ui, sans-serif; }
//   .shs-root {
//     --blue:#2563EB; --blue-bg:#EFF6FF; --blue-border:#BFDBFE;
//     --green:#16A34A; --green-bg:#F0FDF4; --green-border:#BBF7D0;
//     --amber:#D97706; --amber-bg:#FFFBEB; --amber-border:#FDE68A;
//     --red:#DC2626; --red-bg:#FEF2F2; --red-border:#FECACA;
//     --violet:#7C3AED; --violet-bg:#F5F3FF; --violet-border:#DDD6FE;
//     --border:#E5E7EB; --border-light:#F1F5F9; --surface:#F8FAFC;
//     --bg-subtle:#F9FAFB; --text:#111827; --text-2:#374151;
//     --text-3:#6B7280; --text-4:#9CA3AF; --text-5:#C4CAD4;
//   }
//   .shs-card { transition: box-shadow 0.18s ease, transform 0.12s ease; }
//   .shs-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.1) !important; transform: translateY(-1px); }
//   .shs-btn { transition: opacity 0.14s, transform 0.1s; cursor: pointer; }
//   .shs-btn:hover:not(:disabled) { opacity: 0.85; }
//   .shs-btn:active:not(:disabled) { transform: scale(0.97); }
//   .shs-tab { transition: all 0.15s ease; }
//   .shs-tab:hover { background: rgba(255,255,255,0.7) !important; }
//   .shs-input:focus { border-color: var(--blue) !important; outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
//   .shs-msg { animation: msgSlide 0.18s ease; }
//   @keyframes msgSlide { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }
//   .shs-pulse { animation: pulse 2s ease infinite; }
//   @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
//   @keyframes spin { to { transform: rotate(360deg); } }
//   .shs-related-item { transition: all 0.15s ease; cursor: pointer; }
//   .shs-related-item:hover { background: #FEF9C3 !important; border-color: #FDE047 !important; transform: translateX(2px); }
//   .shs-root ::-webkit-scrollbar { width: 4px; }
//   .shs-root ::-webkit-scrollbar-track { background: transparent; }
//   .shs-root ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
// `;

// const STATUS_MAP = {
//   open:          { dot:"#F59E0B", text:"#B45309", bg:"#FFFBEB", border:"#FDE68A" },
//   "in-progress": { dot:"#3B82F6", text:"#1D4ED8", bg:"#EFF6FF", border:"#BFDBFE" },
//   resolved:      { dot:"#22C55E", text:"#15803D", bg:"#F0FDF4", border:"#BBF7D0" },
//   closed:        { dot:"#9CA3AF", text:"#4B5563", bg:"#F9FAFB", border:"#E5E7EB" },
//   escalated:     { dot:"#8B5CF6", text:"#6D28D9", bg:"#F5F3FF", border:"#DDD6FE" },
// };
// const PRIORITY_MAP = {
//   high:   { dot:"#EF4444", text:"#991B1B", bg:"#FEF2F2", border:"#FECACA" },
//   medium: { dot:"#F59E0B", text:"#92400E", bg:"#FFFBEB", border:"#FDE68A" },
//   low:    { dot:"#22C55E", text:"#14532D", bg:"#F0FDF4", border:"#BBF7D0" },
// };

// const Badge = ({ label, map }) => {
//   const c = map?.[label] || { dot:"#9CA3AF", text:"#4B5563", bg:"#F9FAFB", border:"#E5E7EB" };
//   return (
//     <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:600, letterSpacing:0.1, whiteSpace:"nowrap", background:c.bg, color:c.text, border:`1px solid ${c.border}` }}>
//       <span style={{ width:5, height:5, borderRadius:"50%", background:c.dot, flexShrink:0 }} />
//       {label}
//     </span>
//   );
// };

// const UnreadPill = ({ count, size = 17 }) => {
//   if (!count || count <= 0) return null;
//   return (
//     <span className="shs-pulse" style={{ background:"#EF4444", color:"#fff", borderRadius:99, minWidth:size, height:size, padding:"0 4px", fontSize:9.5, fontWeight:700, display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
//       {count > 99 ? "99+" : count}
//     </span>
//   );
// };

// const Avatar = ({ name="?", color="#2563EB", size=30 }) => (
//   <div style={{ width:size, height:size, borderRadius:"50%", flexShrink:0, background:`${color}18`, border:`1.5px solid ${color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size * 0.37, fontWeight:700, color }}>
//     {name.charAt(0).toUpperCase()}
//   </div>
// );

// const Icon = {
//   back:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
//   check:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="20 6 9 17 4 12"/></svg>,
//   send:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
//   refresh: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
//   chat:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
//   up:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="18 15 12 9 6 15"/></svg>,
//   lock:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
//   spin:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{animation:"spin 1s linear infinite"}}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
//   empty:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   warning: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
//   arrow:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
// };

// const getStaff = () => {
//   try { const r = sessionStorage.getItem("management_staff"); return r ? JSON.parse(r) : null; } catch { return null; }
// };
// const getToken = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// const dt = {
//   time: d => new Date(d).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" }),
//   date: d => new Date(d).toLocaleDateString("en-IN", { day:"numeric", month:"short" }),
//   full: d => new Date(d).toLocaleString("en-IN", { dateStyle:"medium", timeStyle:"short" }),
// };

// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding:"16px 20px", borderBottom:"1px solid #EDE9FE", background:"#FDFCFF" }}>
//       <p style={{ margin:"0 0 10px", fontSize:10.5, fontWeight:700, color:"#7C3AED", textTransform:"uppercase", letterSpacing:0.9 }}>Escalation History</p>
//       <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
//         {log.map((e, i) => (
//           <div key={i} style={{ background:"#fff", border:"1px solid #EDE9FE", borderRadius:9, padding:"9px 13px", fontSize:12 }}>
//             <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, alignItems:"center" }}>
//               <span style={{ display:"flex", alignItems:"center", gap:6 }}>
//                 <span style={{ fontWeight:600, color:"#6D28D9" }}>{e.fromName || e.from}</span>
//                 <span style={{ color:"#CBD5E1", fontSize:12 }}>→</span>
//                 <span style={{ fontWeight:600, color:"#2563EB" }}>{e.toName || e.to}</span>
//               </span>
//               <span style={{ fontSize:10.5, color:"#9CA3AF" }}>{dt.full(e.escalatedAt)}</span>
//             </div>
//             {e.reason && <p style={{ margin:"5px 0 0", color:"#6B7280", fontSize:11 }}>Reason: {e.reason}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const RelatedTicketsBanner = ({ tickets, onSelect }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   if (!tickets || tickets.length === 0) return null;
//   return (
//     <div style={{ padding:"12px 20px", background:"linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)", borderBottom:"1px solid #FDE68A" }}>
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: collapsed ? 0 : 10, cursor:"pointer" }} onClick={() => setCollapsed(v => !v)}>
//         <div style={{ display:"flex", alignItems:"center", gap:7 }}>
//           {Icon.warning}
//           <span style={{ fontSize:12, fontWeight:700, color:"#92400E" }}>
//             Is project pe {tickets.length} aur active ticket{tickets.length > 1 ? "s" : ""} hain (same subject)
//           </span>
//         </div>
//         <span style={{ fontSize:11, color:"#B45309", fontWeight:600, display:"flex", alignItems:"center", gap:4 }}>
//           {collapsed ? "Show" : "Hide"}
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 0.2s" }}>
//             <polyline points="18 15 12 9 6 15"/>
//           </svg>
//         </span>
//       </div>
//       {!collapsed && (
//         <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//           {tickets.map((t) => (
//             <div key={t._id} className="shs-related-item" onClick={() => onSelect(t)}
//               style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#fff", border:"1px solid #FDE68A", borderRadius:8, padding:"8px 12px", fontSize:12 }}>
//               <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, minWidth:0 }}>
//                 <span style={{ fontWeight:700, color:"#2563EB", whiteSpace:"nowrap" }}>#{t.ticketId}</span>
//                 <span style={{ color:"#6B7280", whiteSpace:"nowrap" }}>{t.clientName}</span>
//                 <span style={{ color:"#D1D5DB", fontSize:11 }}>·</span>
//                 <span style={{ color:"#9CA3AF", fontSize:11, whiteSpace:"nowrap" }}>{t.messages?.length || 0} msg(s)</span>
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
//                 <Badge label={t.status} map={STATUS_MAP} />
//                 <span style={{ fontSize:10.5, color:"#9CA3AF", whiteSpace:"nowrap" }}>{dt.date(t.createdAt)}</span>
//                 <span style={{ color:"#D97706" }}>{Icon.arrow}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
//   const [text, setText] = useState("");
//   const [sending, setSending] = useState(false);
//   const endRef = useRef(null);
//   const msgs = ticket?.messages || [];

//   useEffect(() => { setTimeout(() => endRef.current?.scrollIntoView({ behavior:"smooth" }), 80); }, [msgs.length]);
//   useEffect(() => { if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id); }, [ticket?._id]);

//   const send = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method:"POST", headers:{"Content-Type":"application/json"},
//         body: JSON.stringify({ sender:"staff", senderId:staffId, senderName:staffName, message:text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) { setText(""); onUpdate(data.ticket); }
//       else Swal.fire({ icon:"error", title:"Error", text: data.message || "Failed." });
//     } catch { Swal.fire({ icon:"error", title:"Error", text:"Network error." }); }
//     finally { setSending(false); }
//   };

//   const closed = ["closed","resolved"].includes(ticket?.status);

//   return (
//     <div style={{ display:"flex", flexDirection:"column" }}>
//       <div style={{ overflowY:"auto", padding:"20px 24px", display:"flex", flexDirection:"column", gap:4, background:"#F8FAFC", minHeight:320, maxHeight:440 }}>
//         {!msgs.length && (
//           <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, paddingTop:64, color:"#C4CAD4" }}>
//             {Icon.empty}
//             <span style={{ fontSize:13 }}>No messages yet</span>
//           </div>
//         )}
//         {msgs.map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           const isClient = msg.sender === "client";
//           const prevDate = i > 0 ? dt.date(msgs[i-1].createdAt) : null;
//           const thisDate = dt.date(msg.createdAt);
//           return (
//             <React.Fragment key={i}>
//               {thisDate !== prevDate && (
//                 <div style={{ display:"flex", alignItems:"center", gap:10, margin:"12px 0 6px" }}>
//                   <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
//                   <span style={{ fontSize:10.5, color:"#9CA3AF", fontWeight:500 }}>{thisDate}</span>
//                   <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
//                 </div>
//               )}
//               {isSystem ? (
//                 <div style={{ textAlign:"center", margin:"4px 0" }}>
//                   <span style={{ fontSize:11, color:"#9CA3AF", background:"#F1F5F9", padding:"3px 14px", borderRadius:20 }}>{msg.message}</span>
//                 </div>
//               ) : (
//                 <div className="shs-msg" style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start", gap:8, alignItems:"flex-end", marginBottom:2 }}>
//                   {!isMe && <Avatar name={msg.senderName} size={28} color={isClient?"#2563EB":"#7C3AED"} />}
//                   <div style={{ maxWidth:"65%", display:"flex", flexDirection:"column", alignItems:isMe?"flex-end":"flex-start" }}>
//                     {!isMe && <span style={{ fontSize:10.5, color:"#9CA3AF", marginBottom:3, paddingLeft:2 }}>{msg.senderName} · {isClient ? "Client" : "Staff"}</span>}
//                     <div style={{ padding:"9px 13px", fontSize:13, lineHeight:1.55, borderRadius: isMe ? "14px 14px 3px 14px" : "14px 14px 14px 3px", background: isMe ? "#2563EB" : "#fff", color: isMe ? "#fff" : "#111827", border: isMe ? "none" : "1px solid #E5E7EB", boxShadow: isMe ? "0 2px 10px rgba(37,99,235,0.2)" : "0 1px 3px rgba(0,0,0,0.05)" }}>
//                       {msg.message}
//                     </div>
//                     <span style={{ fontSize:10, color:"#CBD5E1", marginTop:3, paddingRight:2, paddingLeft:2 }}>{dt.time(msg.createdAt)}</span>
//                   </div>
//                   {isMe && <Avatar name={staffName} size={28} color="#2563EB" />}
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//         <div ref={endRef} />
//       </div>

//       {readOnly ? (
//         <div style={{ padding:"12px 20px", textAlign:"center", fontSize:12.5, color:"#7C3AED", background:"#FDFCFF", borderTop:"1px solid #EDE9FE" }}>
//           This ticket has been escalated — view only.
//         </div>
//       ) : closed ? (
//         <div style={{ padding:"12px 20px", textAlign:"center", fontSize:12.5, color:"#9CA3AF", borderTop:"1px solid #F1F5F9" }}>
//           Ticket is {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display:"flex", gap:10, padding:"12px 20px", borderTop:"1px solid #F1F5F9", background:"#fff", alignItems:"center" }}>
//           <Avatar name={staffName} size={32} color="#2563EB" />
//           <input className="shs-input" type="text" placeholder="Write a reply…" value={text}
//             onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
//             style={{ flex:1, padding:"9px 16px", borderRadius:24, border:"1.5px solid #E5E7EB", fontSize:13, background:"#F9FAFB", fontFamily:"inherit", color:"#111827", transition:"border-color 0.15s, box-shadow 0.15s" }}
//           />
//           <button onClick={send} disabled={!text.trim() || sending} className="shs-btn"
//             style={{ width:38, height:38, borderRadius:"50%", border:"none", background: text.trim() ? "#2563EB" : "#E5E7EB", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//             {sending ? <span style={{ fontSize:16 }}>…</span> : Icon.send}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const EscalatePanel = ({ staffRole, adminList, form, setForm, onConfirm, onCancel, loading }) => (
//   <div style={{ padding:"16px 20px", background:"#FFFBEB", borderTop:"1px solid #FDE68A", borderBottom:"1px solid #FDE68A" }}>
//     <p style={{ margin:"0 0 12px", fontWeight:700, fontSize:12.5, color:"#92400E" }}>Escalate this ticket</p>
//     <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end" }}>
//       <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
//         <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>To</label>
//         <select value={form.toRole} onChange={e => setForm({...form, toRole:e.target.value, toId:"", toName:""})}
//           style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827" }}>
//           {staffRole === "staff" && adminList.length > 0 && <option value="admin-assistant">Admin Assistant</option>}
//           <option value="admin">Admin</option>
//         </select>
//       </div>
//       {form.toRole === "admin-assistant" && adminList.length > 0 && (
//         <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
//           <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>Select assistant</label>
//           <select value={form.toId} onChange={e => { const a=adminList.find(x=>x._id===e.target.value); setForm({...form, toId:e.target.value, toName:a?.name||""}); }}
//             style={{ padding:"8px 12px", borderRadius:8, border:"1px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827" }}>
//             <option value="">— Select —</option>
//             {adminList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
//           </select>
//         </div>
//       )}
//       <div style={{ flex:1, minWidth:200, display:"flex", flexDirection:"column", gap:4 }}>
//         <label style={{ fontSize:11, fontWeight:600, color:"#6B7280" }}>Reason <span style={{ color:"#EF4444" }}>*</span></label>
//         <input className="shs-input" type="text" placeholder="Enter reason…" value={form.reason}
//           onChange={e => setForm({...form, reason:e.target.value})}
//           style={{ padding:"8px 12px", borderRadius:8, border:"1.5px solid #E5E7EB", fontSize:12.5, background:"#fff", fontFamily:"inherit", color:"#111827", transition:"border-color 0.15s, box-shadow 0.15s" }} />
//       </div>
//       <button onClick={onConfirm} disabled={loading||!form.reason.trim()} className="shs-btn"
//         style={{ padding:"8px 16px", borderRadius:8, border:"none", background:loading?"#FCD34D":"#D97706", color:"#fff", fontWeight:600, fontSize:12.5, fontFamily:"inherit", height:36, display:"flex", alignItems:"center", gap:5 }}>
//         {Icon.up} {loading?"Escalating…":"Confirm Escalation"}
//       </button>
//       <button onClick={onCancel} className="shs-btn"
//         style={{ padding:"8px 14px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:12.5, fontFamily:"inherit", color:"#374151", height:36 }}>
//         Cancel
//       </button>
//     </div>
//   </div>
// );

// const TicketCard = ({ ticket, isEsc, staffId, onOpen }) => {
//   const unread   = !isEsc && (ticket.unreadByStaff || 0);
//   const lastMsg  = ticket.messages?.[ticket.messages.length - 1];
//   const escEntry = isEsc ? [...(ticket.escalationLog||[])].reverse().find(e=>e.from===staffId) : null;

//   return (
//     <div className="shs-card" style={{ border:`1px solid ${unread?"#BFDBFE":isEsc?"#EDE9FE":"#E5E7EB"}`, borderRadius:12, background:unread?"#F0F7FF":"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden" }}>
//       <div style={{ padding:"14px 16px" }}>
//         <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, alignItems:"flex-start" }}>
//           <div>
//             <div style={{ display:"flex", alignItems:"center", gap:7 }}>
//               <span style={{ fontWeight:700, fontSize:13, color:"#111827" }}>#{ticket.ticketId} — {ticket.subject==="Other" ? ticket.customSubject : ticket.subject}</span>
//               <UnreadPill count={ticket.unreadByStaff} />
//             </div>
//             <p style={{ margin:"4px 0 0", fontSize:11.5, color:"#9CA3AF" }}>{ticket.clientName} · {ticket.projectName||ticket.projectId} · {dt.full(ticket.createdAt)}</p>
//           </div>
//           <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
//             <Badge label={ticket.status} map={STATUS_MAP} />
//             <Badge label={ticket.priority} map={PRIORITY_MAP} />
//             {isEsc && ticket.assignedTo && (
//               <span style={{ padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:600, background:"#EFF6FF", color:"#1D4ED8", border:"1px solid #BFDBFE" }}>
//                 With: {ticket.assignedTo.name||ticket.assignedTo.role}
//               </span>
//             )}
//           </div>
//         </div>
//         {escEntry && (
//           <div style={{ marginTop:9, padding:"7px 11px", background:"#F5F3FF", borderRadius:8, fontSize:11.5, color:"#6D28D9", border:"1px solid #EDE9FE" }}>
//             Reason: <strong>{escEntry.reason}</strong>
//             <span style={{ color:"#9CA3AF", marginLeft:8 }}>→ {escEntry.toName}</span>
//           </div>
//         )}
//         {!isEsc && lastMsg && (
//           <p style={{ margin:"8px 0 0", fontSize:12, color:"#6B7280", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden", lineHeight:1.5 }}>
//             {lastMsg.message}
//           </p>
//         )}
//       </div>
//       <div style={{ borderTop:"1px solid #F1F5F9", padding:"9px 16px", background:"#FAFBFC", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <span style={{ fontSize:11.5, color:"#9CA3AF", display:"flex", alignItems:"center", gap:5 }}>
//           {Icon.chat} {ticket.messages?.length||0} messages
//         </span>
//         <button onClick={onOpen} className="shs-btn" style={{ padding:"6px 14px", borderRadius:8, border:"none", background:isEsc?"#7C3AED":"#2563EB", color:"#fff", fontWeight:600, fontSize:12, display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}>
//           {isEsc ? "View History" : "Open Chat"}
//           <UnreadPill count={ticket.unreadByStaff} />
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════ */
// const StaffHelpSupport = ({ staffId:pId, staffName:pName, staffRole:pRole, adminAssistantList:pAdmins }) => {
//   const [staffId,   setStaffId]   = useState(pId   || "");
//   const [staffName, setStaffName] = useState(pName || "");
//   const [staffRole, setStaffRole] = useState(pRole || "staff");
//   const [adminList, setAdminList] = useState(pAdmins || []);

//   const [tickets,     setTickets]     = useState([]);
//   const [escalated,   setEscalated]   = useState([]);
//   const [active,      setActive]      = useState(null);
//   const [isEscActive, setIsEscActive] = useState(false);
//   const [loading,     setLoading]     = useState(false);
//   const [loadEsc,     setLoadEsc]     = useState(false);
//   const [error,       setError]       = useState("");
//   const [tab,         setTab]         = useState("all");
//   const [showEsc,     setShowEsc]     = useState(false);
//   const [escForm,     setEscForm]     = useState({ toRole:"admin", toId:"", toName:"", reason:"" });
//   const [escalating,  setEscalating]  = useState(false);
//   const [resolving,   setResolving]   = useState(false);
//   const [relatedTickets, setRelatedTickets] = useState([]);

//   const sockRef   = useRef(null);
//   const activeRef = useRef(null);
//   useEffect(() => { activeRef.current = active; }, [active]);
//   useEffect(() => { setEscForm(f => ({...f, toRole: staffRole==="staff" ? "admin-assistant" : "admin"})); }, [staffRole]);

//   useEffect(() => {
//     if (pId) return;
//     const d = getStaff();
//     if (d) {
//       setStaffId(d._id||d.id||"");
//       setStaffName(d.name||d.firstName||"");
//       const slug = (d.slug||d.roleName||"").toLowerCase();
//       setStaffRole(slug.includes("admin-assistant")||slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [pId]);

//   useEffect(() => {
//     if (pAdmins?.length) return;
//     fetch(`${Url}/management-staff`).then(r=>r.json()).then(data=>{
//       const list = Array.isArray(data)?data:(data.staff||data.data||[]);
//       setAdminList(list.filter(s=>{const sl=(s.slug||s.roleName||"").toLowerCase();return sl.includes("admin-assistant")||sl.includes("admin assistant");}));
//     }).catch(()=>{});
//   }, [pAdmins]);

//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const d = await r.json();
//       if (r.ok) setTickets(d.tickets||[]); else setError(d.message||"Failed.");
//     } catch { setError("Network error."); } finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalated = useCallback(async () => {
//     if (!staffId) return;
//     setLoadEsc(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const d = await r.json();
//       setEscalated(r.ok?(d.tickets||[]):[]);
//     } catch { setEscalated([]); } finally { setLoadEsc(false); }
//   }, [staffId]);

//   const fetchOne = useCallback(async id => {
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${id}`);
//       const d = await r.json();
//       if (!r.ok||!d.ticket) return;
//       setTickets(prev => prev.map(t => t._id===d.ticket._id ? d.ticket : t));
//       if (activeRef.current?._id === d.ticket._id) setActive(d.ticket);
//     } catch {}
//   }, []);

//   const fetchRelated = useCallback(async (ticket) => {
//     if (!ticket?.projectId || !ticket?.subject) { setRelatedTickets([]); return; }
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/related/${ticket.projectId}/${encodeURIComponent(ticket.subject)}?excludeId=${ticket._id}`);
//       const d = await r.json();
//       setRelatedTickets(r.ok ? (d.tickets || []) : []);
//     } catch { setRelatedTickets([]); }
//   }, []);

//   const markRead = useCallback(async id => {
//     try {
//       await fetch(`${Url}/api/support/tickets/${id}/mark-read`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:"staff"})});
//       setTickets(prev => prev.map(t => t._id===id ? {...t, unreadByStaff:0} : t));
//       setActive(prev => prev?._id===id ? {...prev, unreadByStaff:0} : prev);
//     } catch {}
//   }, []);

//   useEffect(() => { if (staffId) { fetchTickets(); fetchEscalated(); } }, [staffId]);
//   useEffect(() => { if (tab==="escalated" && staffId) fetchEscalated(); }, [tab, staffId]);
//   useEffect(() => {
//     if (active && !isEscActive) fetchRelated(active);
//     else setRelatedTickets([]);
//   }, [active, isEscActive, fetchRelated]);

//   /* ── ✅ FIXED Socket — join with BOTH token AND staffId ── */
//   useEffect(() => {
//     if (!staffId) return;
//     const s = socketIo(Url, {
//       transports:           ["websocket"],
//       reconnectionAttempts: 10,
//       reconnectionDelay:    1000,
//     });
//     sockRef.current = s;

//     // ✅ KEY FIX: emit both 'join' (token) AND 'joinStaff' (staffId)
//     // Server must handle 'joinStaff' to add socket to room: user_<staffId>
//     const joinRoom = () => {
//       const token = getToken();
//       if (token) s.emit("join", token);
//       s.emit("joinStaff", staffId); // ✅ explicit room join
//     };
//     s.on("connect",   joinRoom);
//     s.on("reconnect", joinRoom);

//     /* ── New ticket assigned ── */
//     s.on("support:assigned_to_you", d => {
//       playNotifSound();
//       Swal.fire({ toast:true, position:"top-end", icon:"info", showConfirmButton:false, timer:4500, title:`New: #${d.ticketCode}`, text:d.subject });
//       setTickets(prev => {
//         if (prev.some(t => t._id === d._id)) return prev;
//         return [d, ...prev];
//       });
//     });

//     /* ── Ticket updated ── */
//     s.on("support:ticket_updated", u => {
//       if (u.assignedTo?.id !== staffId) {
//         setTickets(prev => prev.filter(t => t._id !== u._id));
//         if (activeRef.current?._id === u._id) setActive(null);
//         fetchEscalated();
//         return;
//       }
//       playNotifSound();
//       setTickets(prev => {
//         const exists = prev.some(t => t._id === u._id);
//         return exists ? prev.map(t => t._id === u._id ? u : t) : [u, ...prev];
//       });
//       if (activeRef.current?._id === u._id) setActive(u);
//     });

//     /* ── ✅ New message — increment count OR fetch if chat is open ── */
//     s.on("support:new_message", (d) => {
//       // d = { ticketId, ticketCode, message: { sender, senderName, message, ... } }
//       const tid    = d.ticketId
//       const sender = d.message?.sender || ""

//       const isActiveTicket = activeRef.current?._id === tid;

//       if (isActiveTicket) {
//         // Chat is open — fetch fresh to render new message
//         fetchOne(tid);
//       } else {
//         // Not viewing — only increment if message is from client
//         if (sender === "staff") return; // our own message, ignore
//         playNotifSound();
//         setTickets(prev => prev.map(t => {
//           if (t._id !== tid) return t;
//           const newMsg = {
//             message:    d.message?.message    || "",
//             senderName: d.message?.senderName || "",
//             sender,
//             createdAt:  new Date().toISOString(),
//           };
//           return {
//             ...t,
//             unreadByStaff: (t.unreadByStaff || 0) + 1,
//             messages:      [...(t.messages || []), newMsg],
//           };
//         }));
//       }
//     });

//     /* ── ✅ Server unread sync — direct authoritative count ── */
//     s.on("support:unread_update", ({ ticketId: tid, unreadByStaff }) => {
//       if (unreadByStaff === undefined || activeRef.current?._id === tid) return;
//       setTickets(prev => prev.map(t =>
//         t._id === tid ? { ...t, unreadByStaff } : t
//       ));
//     });

//     return () => {
//       s.off("connect",   joinRoom);
//       s.off("reconnect", joinRoom);
//       s.disconnect();
//       sockRef.current = null;
//     };
//   }, [staffId, fetchOne, fetchEscalated]);

//   const handleResolve = async () => {
//     if (!active || resolving) return;
//     const ok = await Swal.fire({ title:"Mark as Resolved?", icon:"question", showCancelButton:true, confirmButtonText:"Yes, resolve", confirmButtonColor:"#16A34A" });
//     if (!ok.isConfirmed) return;
//     setResolving(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"resolved"})});
//       const d = await r.json();
//       if (r.ok) {
//         Swal.fire({ icon:"success", title:"Resolved!", timer:2000, showConfirmButton:false });
//         setActive(d.ticket);
//         setTickets(prev => prev.map(t => t._id===d.ticket._id ? d.ticket : t));
//         setShowEsc(false);
//       } else Swal.fire({ icon:"error", title:"Error", text:d.message });
//     } catch { Swal.fire({ icon:"error", title:"Error", text:"Network error." }); }
//     finally { setResolving(false); }
//   };

//   const handleEscalate = async () => {
//     if (!active || !escForm.reason.trim()) { Swal.fire({ icon:"warning", title:"Reason required" }); return; }
//     if (escForm.toRole==="admin-assistant" && !escForm.toId) {
//       if (!adminList.length) { setEscForm(f=>({...f, toRole:"admin", toId:"", toName:"Admin"})); return; }
//       Swal.fire({ icon:"warning", title:"Select an assistant" }); return;
//     }
//     setEscalating(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/escalate`,{method:"PATCH",headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({fromId:staffId,fromName:staffName,toRole:escForm.toRole,toId:escForm.toRole==="admin"?null:escForm.toId,toName:escForm.toRole==="admin"?"Admin":escForm.toName,reason:escForm.reason})});
//       const d = await r.json();
//       if (r.ok) {
//         Swal.fire({ icon:"success", title:"Escalated!", timer:2000, showConfirmButton:false });
//         setTickets(prev => prev.filter(t => t._id !== active._id));
//         setEscalated(prev => [d.ticket, ...prev.filter(t => t._id !== d.ticket._id)]);
//         setActive(null); setShowEsc(false); setRelatedTickets([]);
//         setEscForm({ toRole:staffRole==="staff"?"admin-assistant":"admin", toId:"", toName:"", reason:"" });
//         fetchEscalated();
//       } else Swal.fire({ icon:"error", title:"Error", text:d.message });
//     } catch { Swal.fire({ icon:"error", title:"Error", text:"Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   const openTicket = (ticket, isEsc = false) => {
//     setActive(ticket);
//     setIsEscActive(isEsc);
//     setShowEsc(false);
//     if (!isEsc) markRead(ticket._id);
//   };

//   const list        = tab==="all" ? tickets : tab==="escalated" ? escalated : tickets.filter(t => t.status===tab);
//   const actionable  = active && !["closed","resolved"].includes(active.status) && !isEscActive;
//   const totalUnread = tickets.reduce((s, t) => s + (t.unreadByStaff || 0), 0);

//   const TABS = [
//     { key:"all",         label:"All",         cnt:tickets.length },
//     { key:"open",        label:"Open",        cnt:tickets.filter(t=>t.status==="open").length },
//     { key:"in-progress", label:"In Progress", cnt:tickets.filter(t=>t.status==="in-progress").length },
//     { key:"resolved",    label:"Resolved",    cnt:tickets.filter(t=>t.status==="resolved").length },
//     { key:"escalated",   label:"Escalated",   cnt:escalated.length },
//   ];

//   if (!staffId) return (
//     <div className="shs-root" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, padding:80, color:"#9CA3AF" }}>
//       {Icon.lock}
//       <p style={{ fontWeight:600, fontSize:15, color:"#374151", margin:0 }}>Staff identity not found</p>
//       <p style={{ fontSize:13, margin:0 }}>Please login or refresh the page.</p>
//     </div>
//   );

//   return (
//     <>
//       <style>{GLOBAL_CSS}</style>
//       <div className="shs-root" style={{ padding:"28px 24px", maxWidth:1080, margin:"0 auto" }}>

//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:26 }}>
//           <div>
//             <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:"#111827", letterSpacing:-0.3, display:"flex", alignItems:"center", gap:10 }}>
//               Support Tickets
//               {totalUnread > 0 && (
//                 <span style={{ background:"#EF4444", color:"#fff", borderRadius:99, padding:"2px 10px", fontSize:11, fontWeight:700 }}>
//                   {totalUnread} unread
//                 </span>
//               )}
//             </h2>
//             <p style={{ margin:"5px 0 0", fontSize:12.5, color:"#9CA3AF" }}>
//               Assigned to <strong style={{ color:"#374151" }}>{staffName}</strong>
//               <span style={{ margin:"0 6px", color:"#E5E7EB" }}>·</span>
//               {staffRole}
//               {adminList.length > 0 && (<><span style={{ margin:"0 6px", color:"#E5E7EB" }}>·</span><span style={{ color:"#7C3AED" }}>{adminList.length} assistant(s)</span></>)}
//             </p>
//           </div>
//           <button onClick={()=>{fetchTickets();fetchEscalated();}} className="shs-btn"
//             style={{ padding:"7px 14px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:12.5, color:"#374151", fontWeight:500, display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}>
//             {Icon.refresh} Refresh
//           </button>
//         </div>

//         {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 16px", marginBottom:18, fontSize:13, color:"#991B1B" }}>{error}</div>}

//         <div style={{ display:"flex", gap:2, marginBottom:20, background:"#F3F4F6", borderRadius:11, padding:3, flexWrap:"wrap" }}>
//           {TABS.map(t => {
//             const on = tab === t.key;
//             const ac = t.key==="escalated"?"#7C3AED":t.key==="resolved"?"#16A34A":"#2563EB";
//             return (
//               <button key={t.key} className="shs-tab"
//                 onClick={()=>{ setTab(t.key); setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }}
//                 style={{ flex:1, minWidth:80, padding:"7px 10px", borderRadius:8, border:"none", background:on?"#fff":"transparent", boxShadow:on?"0 1px 4px rgba(0,0,0,0.09)":"none", fontWeight:on?600:500, color:on?ac:"#6B7280", cursor:"pointer", fontSize:12.5, fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
//                 {t.label}
//                 {t.cnt > 0 && <span style={{ background:on?ac:"#D1D5DB", color:on?"#fff":"#6B7280", borderRadius:99, minWidth:18, height:18, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, padding:"0 4px", fontWeight:700 }}>{t.cnt}</span>}
//               </button>
//             );
//           })}
//         </div>

//         {tab==="escalated" && !active && (
//           <div style={{ background:"#F5F3FF", border:"1px solid #EDE9FE", borderRadius:10, padding:"10px 16px", marginBottom:16, fontSize:12.5, color:"#6D28D9", display:"flex", alignItems:"center", gap:8 }}>
//             {Icon.info} Tickets you've escalated — view only.
//           </div>
//         )}

//         {active ? (
//           <div style={{ border:"1px solid #E5E7EB", borderRadius:16, overflow:"hidden", background:"#fff", boxShadow:"0 4px 24px rgba(0,0,0,0.07)" }}>
//             <div style={{ padding:"14px 20px", borderBottom:`1px solid ${isEscActive?"#EDE9FE":"#F1F5F9"}`, background:isEscActive?"#FDFCFF":"#FAFBFC", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
//               <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                 <button onClick={()=>{ setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }} className="shs-btn"
//                   style={{ width:32, height:32, borderRadius:8, border:"1px solid #E5E7EB", background:"#F3F4F6", color:"#374151", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
//                   {Icon.back}
//                 </button>
//                 <div>
//                   <p style={{ margin:0, fontWeight:700, fontSize:13.5, color:"#111827" }}>
//                     #{active.ticketId} — {active.subject==="Other" ? active.customSubject : active.subject}
//                   </p>
//                   <p style={{ margin:"3px 0 0", fontSize:11.5, color:"#9CA3AF" }}>{active.clientName} · {active.projectName||active.projectId}</p>
//                 </div>
//               </div>
//               <div style={{ display:"flex", gap:7, alignItems:"center", flexWrap:"wrap" }}>
//                 <Badge label={active.status} map={STATUS_MAP} />
//                 <Badge label={active.priority} map={PRIORITY_MAP} />
//                 {actionable && (
//                   <button onClick={handleResolve} disabled={resolving} className="shs-btn"
//                     style={{ padding:"6px 14px", borderRadius:8, border:"none", background:resolving?"#BBF7D0":"#16A34A", color:"#fff", fontWeight:600, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
//                     {Icon.check} {resolving?"Resolving…":"Resolve"}
//                   </button>
//                 )}
//                 {actionable && (
//                   <button onClick={()=>setShowEsc(v=>!v)} className="shs-btn"
//                     style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${showEsc?"#FDE68A":"#E5E7EB"}`, background:showEsc?"#FFFBEB":"#fff", color:showEsc?"#92400E":"#374151", fontWeight:600, fontSize:12, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5 }}>
//                     {Icon.up} Escalate
//                   </button>
//                 )}
//                 {isEscActive && (
//                   <span style={{ padding:"4px 11px", borderRadius:99, background:"#F5F3FF", color:"#6D28D9", fontSize:11, fontWeight:600, border:"1px solid #EDE9FE" }}>Escalated by you</span>
//                 )}
//               </div>
//             </div>

//             {!isEscActive && active.status==="resolved" && (
//               <div style={{ padding:"10px 20px", background:"#F0FDF4", borderBottom:"1px solid #BBF7D0", fontSize:12.5, color:"#15803D", display:"flex", alignItems:"center", gap:6 }}>
//                 {Icon.check} You've resolved this ticket. Admin will close it.
//               </div>
//             )}

//             {!isEscActive && <RelatedTicketsBanner tickets={relatedTickets} onSelect={(t) => openTicket(t, false)} />}
//             {isEscActive && <EscalationLog log={active.escalationLog} />}
//             {showEsc && !isEscActive && (
//               <EscalatePanel staffRole={staffRole} adminList={adminList} form={escForm} setForm={setEscForm}
//                 onConfirm={handleEscalate} onCancel={()=>setShowEsc(false)} loading={escalating} />
//             )}

//             <TicketChat ticket={active} staffId={staffId} staffName={staffName} readOnly={isEscActive} onMarkRead={markRead}
//               onUpdate={u => { setActive(u); setTickets(prev => prev.map(t => t._id===u._id ? u : t)); }} />
//           </div>

//         ) : (loading && tab!=="escalated") || (loadEsc && tab==="escalated") ? (
//           <div style={{ textAlign:"center", padding:80, color:"#C4CAD4" }}>
//             {Icon.spin}
//             <p style={{ fontSize:13, marginTop:12, color:"#9CA3AF" }}>Loading tickets…</p>
//           </div>

//         ) : list.length === 0 ? (
//           <div style={{ textAlign:"center", padding:"64px 40px", border:"1px dashed #E5E7EB", borderRadius:14, background:"#FAFBFC" }}>
//             <div style={{ width:52, height:52, borderRadius:"50%", background:"#F3F4F6", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>{Icon.empty}</div>
//             <p style={{ fontWeight:600, fontSize:14.5, color:"#374151", margin:"0 0 6px" }}>
//               {tab==="all"?"No tickets assigned":tab==="escalated"?"No escalated tickets":`No ${tab} tickets`}
//             </p>
//             <p style={{ fontSize:12.5, color:"#9CA3AF", margin:0 }}>
//               {tab==="all"?"Tickets assigned to you will appear here.":tab==="escalated"?"Tickets you escalate will appear here.":"Check another tab."}
//             </p>
//           </div>

//         ) : (
//           <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//             {list.map(ticket => (
//               <TicketCard key={ticket._id} ticket={ticket} isEsc={tab==="escalated"} staffId={staffId}
//                 onOpen={()=>openTicket(ticket, tab==="escalated")} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StaffHelpSupport;













// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

// // ─── Sound ────────────────────────────────────────────────────────────────────
// const playNotifSound = () => {
//   try {
//     const a = new Audio("/assets/notification.mp3");
//     a.volume = 0.6;
//     a.play().catch(() => {});
//   } catch {}
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
//   .shs-root *, .shs-root *::before, .shs-root *::after { box-sizing: border-box; font-family: 'DM Sans', system-ui, sans-serif; }
//   .shs-root {
//     --blue:#2563EB; --blue-bg:#EFF6FF; --blue-border:#BFDBFE;
//     --green:#16A34A; --green-bg:#F0FDF4; --green-border:#BBF7D0;
//     --amber:#D97706; --amber-bg:#FFFBEB; --amber-border:#FDE68A;
//     --red:#DC2626; --red-bg:#FEF2F2; --red-border:#FECACA;
//     --violet:#7C3AED; --violet-bg:#F5F3FF; --violet-border:#DDD6FE;
//     --border:#E5E7EB; --border-light:#F1F5F9; --surface:#F8FAFC;
//     --bg-subtle:#F9FAFB; --text:#111827; --text-2:#374151;
//     --text-3:#6B7280; --text-4:#9CA3AF; --text-5:#C4CAD4;
//   }
//   .shs-card { transition: box-shadow 0.18s ease, transform 0.12s ease; }
//   .shs-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.1) !important; transform: translateY(-1px); }
//   .shs-btn { transition: opacity 0.14s, transform 0.1s; cursor: pointer; }
//   .shs-btn:hover:not(:disabled) { opacity: 0.85; }
//   .shs-btn:active:not(:disabled) { transform: scale(0.97); }
//   .shs-tab { transition: all 0.15s ease; }
//   .shs-tab:hover { background: rgba(255,255,255,0.7) !important; }
//   .shs-input:focus { border-color: var(--blue) !important; outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
//   .shs-msg { animation: msgSlide 0.18s ease; }
//   @keyframes msgSlide { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }
//   .shs-pulse { animation: pulse 2s ease infinite; }
//   @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
//   @keyframes spin { to { transform: rotate(360deg); } }
//   .shs-related-item { transition: all 0.15s ease; cursor: pointer; }
//   .shs-related-item:hover { background: #FEF9C3 !important; border-color: #FDE047 !important; transform: translateX(2px); }
//   .shs-root ::-webkit-scrollbar { width: 4px; }
//   .shs-root ::-webkit-scrollbar-track { background: transparent; }
//   .shs-root ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
// `;

// // ─── Constants ────────────────────────────────────────────────────────────────
// const STATUS_MAP = {
//   open:          { dot: "#F59E0B", text: "#B45309",  bg: "#FFFBEB", border: "#FDE68A" },
//   "in-progress": { dot: "#3B82F6", text: "#1D4ED8",  bg: "#EFF6FF", border: "#BFDBFE" },
//   resolved:      { dot: "#22C55E", text: "#15803D",  bg: "#F0FDF4", border: "#BBF7D0" },
//   closed:        { dot: "#9CA3AF", text: "#4B5563",  bg: "#F9FAFB", border: "#E5E7EB" },
//   escalated:     { dot: "#8B5CF6", text: "#6D28D9",  bg: "#F5F3FF", border: "#DDD6FE" },
// };

// const PRIORITY_MAP = {
//   high:   { dot: "#EF4444", text: "#991B1B", bg: "#FEF2F2", border: "#FECACA" },
//   medium: { dot: "#F59E0B", text: "#92400E", bg: "#FFFBEB", border: "#FDE68A" },
//   low:    { dot: "#22C55E", text: "#14532D", bg: "#F0FDF4", border: "#BBF7D0" },
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const getStaff = () => {
//   try {
//     const r = sessionStorage.getItem("management_staff");
//     return r ? JSON.parse(r) : null;
//   } catch { return null; }
// };

// const getToken = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// const dt = {
//   time: d => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
//   date: d => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
//   full: d => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
// };

// // ─── Small Components ─────────────────────────────────────────────────────────
// const Badge = ({ label, map }) => {
//   const c = map?.[label] || { dot: "#9CA3AF", text: "#4B5563", bg: "#F9FAFB", border: "#E5E7EB" };
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, letterSpacing: 0.1, whiteSpace: "nowrap", background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
//       {label}
//     </span>
//   );
// };

// const UnreadPill = ({ count, size = 17 }) => {
//   if (!count || count <= 0) return null;
//   return (
//     <span className="shs-pulse" style={{ background: "#EF4444", color: "#fff", borderRadius: 99, minWidth: size, height: size, padding: "0 4px", fontSize: 9.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
//       {count > 99 ? "99+" : count}
//     </span>
//   );
// };

// const Avatar = ({ name = "?", color = "#2563EB", size = 30 }) => (
//   <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, background: `${color}18`, border: `1.5px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.37, fontWeight: 700, color }}>
//     {name.charAt(0).toUpperCase()}
//   </div>
// );

// const Icon = {
//   back:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
//   check:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="20 6 9 17 4 12"/></svg>,
//   send:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
//   refresh: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
//   chat:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
//   up:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="18 15 12 9 6 15"/></svg>,
//   lock:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
//   spin:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animation: "spin 1s linear infinite" }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
//   empty:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   warning: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
//   arrow:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
// };

// // ─── EscalationLog ────────────────────────────────────────────────────────────
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding: "16px 20px", borderBottom: "1px solid #EDE9FE", background: "#FDFCFF" }}>
//       <p style={{ margin: "0 0 10px", fontSize: 10.5, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 0.9 }}>Escalation History</p>
//       <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
//         {log.map((e, i) => (
//           <div key={i} style={{ background: "#fff", border: "1px solid #EDE9FE", borderRadius: 9, padding: "9px 13px", fontSize: 12 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
//               <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                 <span style={{ fontWeight: 600, color: "#6D28D9" }}>{e.fromName || e.from}</span>
//                 <span style={{ color: "#CBD5E1", fontSize: 12 }}>→</span>
//                 <span style={{ fontWeight: 600, color: "#2563EB" }}>{e.toName || e.to}</span>
//               </span>
//               <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>{dt.full(e.escalatedAt)}</span>
//             </div>
//             {e.reason && <p style={{ margin: "5px 0 0", color: "#6B7280", fontSize: 11 }}>Reason: {e.reason}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ─── RelatedTicketsBanner ─────────────────────────────────────────────────────
// const RelatedTicketsBanner = ({ tickets, onSelect }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   if (!tickets || tickets.length === 0) return null;
//   return (
//     <div style={{ padding: "12px 20px", background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)", borderBottom: "1px solid #FDE68A" }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: collapsed ? 0 : 10, cursor: "pointer" }} onClick={() => setCollapsed(v => !v)}>
//         <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//           {Icon.warning}
//           <span style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>
//             Is project pe {tickets.length} aur active ticket{tickets.length > 1 ? "s" : ""} hain (same subject)
//           </span>
//         </div>
//         <span style={{ fontSize: 11, color: "#B45309", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
//           {collapsed ? "Show" : "Hide"}
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
//             <polyline points="18 15 12 9 6 15" />
//           </svg>
//         </span>
//       </div>
//       {!collapsed && (
//         <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//           {tickets.map((t) => (
//             <div key={t._id} className="shs-related-item" onClick={() => onSelect(t)}
//               style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #FDE68A", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
//                 <span style={{ fontWeight: 700, color: "#2563EB", whiteSpace: "nowrap" }}>#{t.ticketId}</span>
//                 <span style={{ color: "#6B7280", whiteSpace: "nowrap" }}>{t.clientName}</span>
//                 <span style={{ color: "#D1D5DB", fontSize: 11 }}>·</span>
//                 <span style={{ color: "#9CA3AF", fontSize: 11, whiteSpace: "nowrap" }}>{t.messages?.length || 0} msg(s)</span>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
//                 <Badge label={t.status} map={STATUS_MAP} />
//                 <span style={{ fontSize: 10.5, color: "#9CA3AF", whiteSpace: "nowrap" }}>{dt.date(t.createdAt)}</span>
//                 <span style={{ color: "#D97706" }}>{Icon.arrow}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── TicketChat ───────────────────────────────────────────────────────────────
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
//   const [text, setText] = useState("");
//   const [sending, setSending] = useState(false);
//   const endRef = useRef(null);
//   const msgs = ticket?.messages || [];

//   useEffect(() => {
//     setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
//   }, [msgs.length]);

//   useEffect(() => {
//     if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id);
//   }, [ticket?._id]);

//   const send = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sender: "staff",
//           senderId: staffId,
//           senderName: staffName,
//           message: text.trim(),
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setText("");
//         onUpdate(data.ticket);
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed." });
//       }
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Network error." });
//     } finally {
//       setSending(false);
//     }
//   };

//   const closed = ["closed", "resolved"].includes(ticket?.status);

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 4, background: "#F8FAFC", minHeight: 320, maxHeight: 440 }}>
//         {!msgs.length && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, paddingTop: 64, color: "#C4CAD4" }}>
//             {Icon.empty}
//             <span style={{ fontSize: 13 }}>No messages yet</span>
//           </div>
//         )}
//         {msgs.map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           const isClient = msg.sender === "client";
//           const prevDate = i > 0 ? dt.date(msgs[i - 1].createdAt) : null;
//           const thisDate = dt.date(msg.createdAt);
//           return (
//             <React.Fragment key={i}>
//               {thisDate !== prevDate && (
//                 <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0 6px" }}>
//                   <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
//                   <span style={{ fontSize: 10.5, color: "#9CA3AF", fontWeight: 500 }}>{thisDate}</span>
//                   <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
//                 </div>
//               )}
//               {isSystem ? (
//                 <div style={{ textAlign: "center", margin: "4px 0" }}>
//                   <span style={{ fontSize: 11, color: "#9CA3AF", background: "#F1F5F9", padding: "3px 14px", borderRadius: 20 }}>{msg.message}</span>
//                 </div>
//               ) : (
//                 <div className="shs-msg" style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end", marginBottom: 2 }}>
//                   {!isMe && <Avatar name={msg.senderName} size={28} color={isClient ? "#2563EB" : "#7C3AED"} />}
//                   <div style={{ maxWidth: "65%", display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
//                     {!isMe && <span style={{ fontSize: 10.5, color: "#9CA3AF", marginBottom: 3, paddingLeft: 2 }}>{msg.senderName} · {isClient ? "Client" : "Staff"}</span>}
//                     <div style={{ padding: "9px 13px", fontSize: 13, lineHeight: 1.55, borderRadius: isMe ? "14px 14px 3px 14px" : "14px 14px 14px 3px", background: isMe ? "#2563EB" : "#fff", color: isMe ? "#fff" : "#111827", border: isMe ? "none" : "1px solid #E5E7EB", boxShadow: isMe ? "0 2px 10px rgba(37,99,235,0.2)" : "0 1px 3px rgba(0,0,0,0.05)" }}>
//                       {msg.message}
//                     </div>
//                     <span style={{ fontSize: 10, color: "#CBD5E1", marginTop: 3, paddingRight: 2, paddingLeft: 2 }}>{dt.time(msg.createdAt)}</span>
//                   </div>
//                   {isMe && <Avatar name={staffName} size={28} color="#2563EB" />}
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//         <div ref={endRef} />
//       </div>

//       {readOnly ? (
//         <div style={{ padding: "12px 20px", textAlign: "center", fontSize: 12.5, color: "#7C3AED", background: "#FDFCFF", borderTop: "1px solid #EDE9FE" }}>
//           This ticket has been escalated — view only.
//         </div>
//       ) : closed ? (
//         <div style={{ padding: "12px 20px", textAlign: "center", fontSize: 12.5, color: "#9CA3AF", borderTop: "1px solid #F1F5F9" }}>
//           Ticket is {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display: "flex", gap: 10, padding: "12px 20px", borderTop: "1px solid #F1F5F9", background: "#fff", alignItems: "center" }}>
//           <Avatar name={staffName} size={32} color="#2563EB" />
//           <input
//             className="shs-input"
//             type="text"
//             placeholder="Write a reply…"
//             value={text}
//             onChange={e => setText(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && send()}
//             style={{ flex: 1, padding: "9px 16px", borderRadius: 24, border: "1.5px solid #E5E7EB", fontSize: 13, background: "#F9FAFB", fontFamily: "inherit", color: "#111827", transition: "border-color 0.15s, box-shadow 0.15s" }}
//           />
//           <button onClick={send} disabled={!text.trim() || sending} className="shs-btn"
//             style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: text.trim() ? "#2563EB" : "#E5E7EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//             {sending ? <span style={{ fontSize: 16 }}>…</span> : Icon.send}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── EscalatePanel ────────────────────────────────────────────────────────────
// const EscalatePanel = ({ staffRole, adminList, form, setForm, onConfirm, onCancel, loading }) => (
//   <div style={{ padding: "16px 20px", background: "#FFFBEB", borderTop: "1px solid #FDE68A", borderBottom: "1px solid #FDE68A" }}>
//     <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 12.5, color: "#92400E" }}>Escalate this ticket</p>
//     <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//       <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//         <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>To</label>
//         <select value={form.toRole} onChange={e => setForm({ ...form, toRole: e.target.value, toId: "", toName: "" })}
//           style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827" }}>
//           {staffRole === "staff" && adminList.length > 0 && <option value="admin-assistant">Admin Assistant</option>}
//           <option value="admin">Admin</option>
//         </select>
//       </div>
//       {form.toRole === "admin-assistant" && adminList.length > 0 && (
//         <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//           <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>Select assistant</label>
//           <select value={form.toId} onChange={e => { const a = adminList.find(x => x._id === e.target.value); setForm({ ...form, toId: e.target.value, toName: a?.name || "" }); }}
//             style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827" }}>
//             <option value="">— Select —</option>
//             {adminList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
//           </select>
//         </div>
//       )}
//       <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 4 }}>
//         <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>Reason <span style={{ color: "#EF4444" }}>*</span></label>
//         <input className="shs-input" type="text" placeholder="Enter reason…" value={form.reason}
//           onChange={e => setForm({ ...form, reason: e.target.value })}
//           style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827", transition: "border-color 0.15s, box-shadow 0.15s" }} />
//       </div>
//       <button onClick={onConfirm} disabled={loading || !form.reason.trim()} className="shs-btn"
//         style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: loading ? "#FCD34D" : "#D97706", color: "#fff", fontWeight: 600, fontSize: 12.5, fontFamily: "inherit", height: 36, display: "flex", alignItems: "center", gap: 5 }}>
//         {Icon.up} {loading ? "Escalating…" : "Confirm Escalation"}
//       </button>
//       <button onClick={onCancel} className="shs-btn"
//         style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 12.5, fontFamily: "inherit", color: "#374151", height: 36 }}>
//         Cancel
//       </button>
//     </div>
//   </div>
// );

// // ─── TicketCard ───────────────────────────────────────────────────────────────
// const TicketCard = ({ ticket, isEsc, staffId, onOpen }) => {
//   const unread   = !isEsc && (ticket.unreadByStaff || 0);
//   const lastMsg  = ticket.messages?.[ticket.messages.length - 1];
//   const escEntry = isEsc ? [...(ticket.escalationLog || [])].reverse().find(e => e.from === staffId) : null;

//   return (
//     <div className="shs-card" style={{ border: `1px solid ${unread ? "#BFDBFE" : isEsc ? "#EDE9FE" : "#E5E7EB"}`, borderRadius: 12, background: unread ? "#F0F7FF" : "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
//       <div style={{ padding: "14px 16px" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//               <span style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>#{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}</span>
//               <UnreadPill count={ticket.unreadByStaff} />
//             </div>
//             <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#9CA3AF" }}>{ticket.clientName} · {ticket.projectName || ticket.projectId} · {dt.full(ticket.createdAt)}</p>
//           </div>
//           <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
//             <Badge label={ticket.status} map={STATUS_MAP} />
//             <Badge label={ticket.priority} map={PRIORITY_MAP} />
//             {isEsc && ticket.assignedTo && (
//               <span style={{ padding: "3px 9px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#EFF6FF", color: "#1D4ED8", border: "1px solid #BFDBFE" }}>
//                 With: {ticket.assignedTo.name || ticket.assignedTo.role}
//               </span>
//             )}
//           </div>
//         </div>
//         {escEntry && (
//           <div style={{ marginTop: 9, padding: "7px 11px", background: "#F5F3FF", borderRadius: 8, fontSize: 11.5, color: "#6D28D9", border: "1px solid #EDE9FE" }}>
//             Reason: <strong>{escEntry.reason}</strong>
//             <span style={{ color: "#9CA3AF", marginLeft: 8 }}>→ {escEntry.toName}</span>
//           </div>
//         )}
//         {!isEsc && lastMsg && (
//           <p style={{ margin: "8px 0 0", fontSize: 12, color: "#6B7280", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5 }}>
//             {lastMsg.message}
//           </p>
//         )}
//       </div>
//       <div style={{ borderTop: "1px solid #F1F5F9", padding: "9px 16px", background: "#FAFBFC", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <span style={{ fontSize: 11.5, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 5 }}>
//           {Icon.chat} {ticket.messages?.length || 0} messages
//         </span>
//         <button onClick={onOpen} className="shs-btn"
//           style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: isEsc ? "#7C3AED" : "#2563EB", color: "#fff", fontWeight: 600, fontSize: 12, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
//           {isEsc ? "View History" : "Open Chat"}
//           <UnreadPill count={ticket.unreadByStaff} />
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════ */
// const StaffHelpSupport = ({ staffId: pId, staffName: pName, staffRole: pRole, adminAssistantList: pAdmins }) => {
//   const [staffId,   setStaffId]   = useState(pId   || "");
//   const [staffName, setStaffName] = useState(pName || "");
//   const [staffRole, setStaffRole] = useState(pRole || "staff");
//   const [adminList, setAdminList] = useState(pAdmins || []);

//   const [tickets,       setTickets]       = useState([]);
//   const [escalated,     setEscalated]     = useState([]);
//   const [active,        setActive]        = useState(null);
//   const [isEscActive,   setIsEscActive]   = useState(false);
//   const [loading,       setLoading]       = useState(false);
//   const [loadEsc,       setLoadEsc]       = useState(false);
//   const [error,         setError]         = useState("");
//   const [tab,           setTab]           = useState("all");
//   const [showEsc,       setShowEsc]       = useState(false);
//   const [escForm,       setEscForm]       = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
//   const [escalating,    setEscalating]    = useState(false);
//   const [resolving,     setResolving]     = useState(false);
//   const [relatedTickets, setRelatedTickets] = useState([]);

//   const sockRef   = useRef(null);
//   const activeRef = useRef(null);
//   useEffect(() => { activeRef.current = active; }, [active]);
//   useEffect(() => { setEscForm(f => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" })); }, [staffRole]);

//   // ─── Staff identity from session ─────────────────────────────────────────
//   useEffect(() => {
//     if (pId) return;
//     const d = getStaff();
//     if (d) {
//       setStaffId(d._id || d.id || "");
//       setStaffName(d.name || d.firstName || "");
//       const slug = (d.slug || d.roleName || "").toLowerCase();
//       setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [pId]);

//   // ─── Admin assistant list ─────────────────────────────────────────────────
//   useEffect(() => {
//     if (pAdmins?.length) return;
//     fetch(`${Url}/management-staff`)
//       .then(r => r.json())
//       .then(data => {
//         const list = Array.isArray(data) ? data : (data.staff || data.data || []);
//         setAdminList(list.filter(s => {
//           const sl = (s.slug || s.roleName || "").toLowerCase();
//           return sl.includes("admin-assistant") || sl.includes("admin assistant");
//         }));
//       })
//       .catch(() => {});
//   }, [pAdmins]);

//   // ─── Fetch helpers ────────────────────────────────────────────────────────
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const d = await r.json();
//       if (r.ok) setTickets(d.tickets || []);
//       else setError(d.message || "Failed.");
//     } catch { setError("Network error."); }
//     finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalated = useCallback(async () => {
//     if (!staffId) return;
//     setLoadEsc(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const d = await r.json();
//       setEscalated(r.ok ? (d.tickets || []) : []);
//     } catch { setEscalated([]); }
//     finally { setLoadEsc(false); }
//   }, [staffId]);

//   const fetchOne = useCallback(async (id) => {
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${id}`);
//       const d = await r.json();
//       if (!r.ok || !d.ticket) return;
//       setTickets(prev => prev.map(t => t._id === d.ticket._id ? d.ticket : t));
//       if (activeRef.current?._id === d.ticket._id) setActive(d.ticket);
//     } catch {}
//   }, []);

//   const fetchRelated = useCallback(async (ticket) => {
//     if (!ticket?.projectId || !ticket?.subject) { setRelatedTickets([]); return; }
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/related/${ticket.projectId}/${encodeURIComponent(ticket.subject)}?excludeId=${ticket._id}`);
//       const d = await r.json();
//       setRelatedTickets(r.ok ? (d.tickets || []) : []);
//     } catch { setRelatedTickets([]); }
//   }, []);

//   const markRead = useCallback(async (id) => {
//     try {
//       await fetch(`${Url}/api/support/tickets/${id}/mark-read`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: "staff" }),
//       });
//       setTickets(prev => prev.map(t => t._id === id ? { ...t, unreadByStaff: 0 } : t));
//       setActive(prev => prev?._id === id ? { ...prev, unreadByStaff: 0 } : prev);
//     } catch {}
//   }, []);

//   // ─── Initial load ─────────────────────────────────────────────────────────
//   useEffect(() => { if (staffId) { fetchTickets(); fetchEscalated(); } }, [staffId]);
//   useEffect(() => { if (tab === "escalated" && staffId) fetchEscalated(); }, [tab, staffId]);
//   useEffect(() => {
//     if (active && !isEscActive) fetchRelated(active);
//     else setRelatedTickets([]);
//   }, [active, isEscActive, fetchRelated]);

//   // ─── Socket ───────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!staffId) return;

//     const s = socketIo(Url, {
//       transports: ["websocket"],
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });
//     sockRef.current = s;

//     const joinRoom = () => {
//       const token = getToken();
//       if (token) s.emit("join", token);
//       s.emit("joinStaff", staffId);
//     };
//     s.on("connect",   joinRoom);
//     s.on("reconnect", joinRoom);

//     s.on("support:assigned_to_you", (d) => {
//       playNotifSound();
//       Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 4500, title: `New: #${d.ticketCode}`, text: d.subject });
//       setTickets(prev => prev.some(t => t._id === d._id) ? prev : [d, ...prev]);
//     });

//     s.on("support:ticket_updated", (u) => {
//       if (u.assignedTo?.id !== staffId) {
//         setTickets(prev => prev.filter(t => t._id !== u._id));
//         if (activeRef.current?._id === u._id) setActive(null);
//         fetchEscalated();
//         return;
//       }
//       playNotifSound();
//       setTickets(prev => {
//         const exists = prev.some(t => t._id === u._id);
//         return exists ? prev.map(t => t._id === u._id ? u : t) : [u, ...prev];
//       });
//       if (activeRef.current?._id === u._id) setActive(u);
//     });

//     s.on("support:new_message", (d) => {
//       const tid        = d.ticketId;
//       const sender     = d.message?.sender   || "";
//       const senderId   = String(d.message?.senderId || "");
//       const myId       = String(staffId || "");

//       // ✅ FIX 1: Apna message — bilkul ignore karo (sender + non-empty ID match)
//       if (sender === "staff" && senderId && myId && senderId === myId) return;

//       // ✅ FIX 2: Active ticket open hai — sirf data refresh karo, NO SOUND
//       const isActiveTicket = activeRef.current?._id === tid;
//       if (isActiveTicket) {
//         fetchOne(tid);
//         return; // ← return lagana zaroori hai — sound mat bajne do
//       }

//       // ✅ FIX 3: Doosre staff ka message — sound nahi, sirf ticket list update
//       if (sender === "staff") return;

//       // ✅ Sirf client message par sound bajao (aur ticket list me dikhao)
//       playNotifSound();
//       setTickets(prev => prev.map(t => {
//         if (t._id !== tid) return t;
//         const newMsg = {
//           message:    d.message?.message    || "",
//           senderName: d.message?.senderName || "",
//           sender,
//           createdAt:  new Date().toISOString(),
//         };
//         return {
//           ...t,
//           unreadByStaff: (t.unreadByStaff || 0) + 1,
//           messages:      [...(t.messages || []), newMsg],
//         };
//       }));
//     });

//     s.on("support:unread_update", ({ ticketId: tid, unreadByStaff }) => {
//       if (unreadByStaff === undefined || activeRef.current?._id === tid) return;
//       setTickets(prev => prev.map(t => t._id === tid ? { ...t, unreadByStaff } : t));
//     });

//     return () => {
//       s.off("connect",   joinRoom);
//       s.off("reconnect", joinRoom);
//       s.disconnect();
//       sockRef.current = null;
//     };
//   }, [staffId, fetchOne, fetchEscalated]);

//   // ─── Actions ──────────────────────────────────────────────────────────────
//   const handleResolve = async () => {
//     if (!active || resolving) return;
//     const ok = await Swal.fire({ title: "Mark as Resolved?", icon: "question", showCancelButton: true, confirmButtonText: "Yes, resolve", confirmButtonColor: "#16A34A" });
//     if (!ok.isConfirmed) return;
//     setResolving(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "resolved" }),
//       });
//       const d = await r.json();
//       if (r.ok) {
//         Swal.fire({ icon: "success", title: "Resolved!", timer: 2000, showConfirmButton: false });
//         setActive(d.ticket);
//         setTickets(prev => prev.map(t => t._id === d.ticket._id ? d.ticket : t));
//         setShowEsc(false);
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: d.message });
//       }
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Network error." }); }
//     finally { setResolving(false); }
//   };

//   const handleEscalate = async () => {
//     if (!active || !escForm.reason.trim()) { Swal.fire({ icon: "warning", title: "Reason required" }); return; }
//     if (escForm.toRole === "admin-assistant" && !escForm.toId) {
//       if (!adminList.length) { setEscForm(f => ({ ...f, toRole: "admin", toId: "", toName: "Admin" })); return; }
//       Swal.fire({ icon: "warning", title: "Select an assistant" }); return;
//     }
//     setEscalating(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/escalate`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromId: staffId, fromName: staffName,
//           toRole: escForm.toRole,
//           toId: escForm.toRole === "admin" ? null : escForm.toId,
//           toName: escForm.toRole === "admin" ? "Admin" : escForm.toName,
//           reason: escForm.reason,
//         }),
//       });
//       const d = await r.json();
//       if (r.ok) {
//         Swal.fire({ icon: "success", title: "Escalated!", timer: 2000, showConfirmButton: false });
//         setTickets(prev => prev.filter(t => t._id !== active._id));
//         setEscalated(prev => [d.ticket, ...prev.filter(t => t._id !== d.ticket._id)]);
//         setActive(null); setShowEsc(false); setRelatedTickets([]);
//         setEscForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
//         fetchEscalated();
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: d.message });
//       }
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   const openTicket = (ticket, isEsc = false) => {
//     setActive(ticket);
//     setIsEscActive(isEsc);
//     setShowEsc(false);
//     if (!isEsc) markRead(ticket._id);
//   };

//   // ─── Derived ──────────────────────────────────────────────────────────────
//   const list       = tab === "all" ? tickets : tab === "escalated" ? escalated : tickets.filter(t => t.status === tab);
//   const actionable = active && !["closed", "resolved"].includes(active.status) && !isEscActive;
//   const totalUnread = tickets.reduce((s, t) => s + (t.unreadByStaff || 0), 0);

//   const TABS = [
//     { key: "all",         label: "All",         cnt: tickets.length },
//     { key: "open",        label: "Open",        cnt: tickets.filter(t => t.status === "open").length },
//     { key: "in-progress", label: "In Progress", cnt: tickets.filter(t => t.status === "in-progress").length },
//     { key: "resolved",    label: "Resolved",    cnt: tickets.filter(t => t.status === "resolved").length },
//     { key: "escalated",   label: "Escalated",   cnt: escalated.length },
//   ];

//   if (!staffId) return (
//     <div className="shs-root" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 80, color: "#9CA3AF" }}>
//       {Icon.lock}
//       <p style={{ fontWeight: 600, fontSize: 15, color: "#374151", margin: 0 }}>Staff identity not found</p>
//       <p style={{ fontSize: 13, margin: 0 }}>Please login or refresh the page.</p>
//     </div>
//   );

//   return (
//     <>
//       <style>{GLOBAL_CSS}</style>
//       <div className="shs-root" style={{ padding: "28px 24px", maxWidth: 1080, margin: "0 auto" }}>

//         {/* Header */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 26 }}>
//           <div>
//             <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: -0.3, display: "flex", alignItems: "center", gap: 10 }}>
//               Support Tickets
//               {totalUnread > 0 && (
//                 <span style={{ background: "#EF4444", color: "#fff", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
//                   {totalUnread} unread
//                 </span>
//               )}
//             </h2>
//             <p style={{ margin: "5px 0 0", fontSize: 12.5, color: "#9CA3AF" }}>
//               Assigned to <strong style={{ color: "#374151" }}>{staffName}</strong>
//               <span style={{ margin: "0 6px", color: "#E5E7EB" }}>·</span>
//               {staffRole}
//               {adminList.length > 0 && (<><span style={{ margin: "0 6px", color: "#E5E7EB" }}>·</span><span style={{ color: "#7C3AED" }}>{adminList.length} assistant(s)</span></>)}
//             </p>
//           </div>
//           <button onClick={() => { fetchTickets(); fetchEscalated(); }} className="shs-btn"
//             style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 12.5, color: "#374151", fontWeight: 500, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
//             {Icon.refresh} Refresh
//           </button>
//         </div>

//         {error && (
//           <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 16px", marginBottom: 18, fontSize: 13, color: "#991B1B" }}>
//             {error}
//           </div>
//         )}

//         {/* Tabs */}
//         <div style={{ display: "flex", gap: 2, marginBottom: 20, background: "#F3F4F6", borderRadius: 11, padding: 3, flexWrap: "wrap" }}>
//           {TABS.map(t => {
//             const on = tab === t.key;
//             const ac = t.key === "escalated" ? "#7C3AED" : t.key === "resolved" ? "#16A34A" : "#2563EB";
//             return (
//               <button key={t.key} className="shs-tab"
//                 onClick={() => { setTab(t.key); setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }}
//                 style={{ flex: 1, minWidth: 80, padding: "7px 10px", borderRadius: 8, border: "none", background: on ? "#fff" : "transparent", boxShadow: on ? "0 1px 4px rgba(0,0,0,0.09)" : "none", fontWeight: on ? 600 : 500, color: on ? ac : "#6B7280", cursor: "pointer", fontSize: 12.5, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
//                 {t.label}
//                 {t.cnt > 0 && <span style={{ background: on ? ac : "#D1D5DB", color: on ? "#fff" : "#6B7280", borderRadius: 99, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px", fontWeight: 700 }}>{t.cnt}</span>}
//               </button>
//             );
//           })}
//         </div>

//         {tab === "escalated" && !active && (
//           <div style={{ background: "#F5F3FF", border: "1px solid #EDE9FE", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 12.5, color: "#6D28D9", display: "flex", alignItems: "center", gap: 8 }}>
//             {Icon.info} Tickets you've escalated — view only.
//           </div>
//         )}

//         {/* Active Ticket View */}
//         {active ? (
//           <div style={{ border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
//             <div style={{ padding: "14px 20px", borderBottom: `1px solid ${isEscActive ? "#EDE9FE" : "#F1F5F9"}`, background: isEscActive ? "#FDFCFF" : "#FAFBFC", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <button onClick={() => { setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }} className="shs-btn"
//                   style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E5E7EB", background: "#F3F4F6", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
//                   {Icon.back}
//                 </button>
//                 <div>
//                   <p style={{ margin: 0, fontWeight: 700, fontSize: 13.5, color: "#111827" }}>
//                     #{active.ticketId} — {active.subject === "Other" ? active.customSubject : active.subject}
//                   </p>
//                   <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#9CA3AF" }}>{active.clientName} · {active.projectName || active.projectId}</p>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
//                 <Badge label={active.status} map={STATUS_MAP} />
//                 <Badge label={active.priority} map={PRIORITY_MAP} />
//                 {actionable && (
//                   <button onClick={handleResolve} disabled={resolving} className="shs-btn"
//                     style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: resolving ? "#BBF7D0" : "#16A34A", color: "#fff", fontWeight: 600, fontSize: 12, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
//                     {Icon.check} {resolving ? "Resolving…" : "Resolve"}
//                   </button>
//                 )}
//                 {actionable && (
//                   <button onClick={() => setShowEsc(v => !v)} className="shs-btn"
//                     style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${showEsc ? "#FDE68A" : "#E5E7EB"}`, background: showEsc ? "#FFFBEB" : "#fff", color: showEsc ? "#92400E" : "#374151", fontWeight: 600, fontSize: 12, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
//                     {Icon.up} Escalate
//                   </button>
//                 )}
//                 {isEscActive && (
//                   <span style={{ padding: "4px 11px", borderRadius: 99, background: "#F5F3FF", color: "#6D28D9", fontSize: 11, fontWeight: 600, border: "1px solid #EDE9FE" }}>Escalated by you</span>
//                 )}
//               </div>
//             </div>

//             {!isEscActive && active.status === "resolved" && (
//               <div style={{ padding: "10px 20px", background: "#F0FDF4", borderBottom: "1px solid #BBF7D0", fontSize: 12.5, color: "#15803D", display: "flex", alignItems: "center", gap: 6 }}>
//                 {Icon.check} You've resolved this ticket. Admin will close it.
//               </div>
//             )}

//             {!isEscActive && <RelatedTicketsBanner tickets={relatedTickets} onSelect={(t) => openTicket(t, false)} />}
//             {isEscActive && <EscalationLog log={active.escalationLog} />}
//             {showEsc && !isEscActive && (
//               <EscalatePanel staffRole={staffRole} adminList={adminList} form={escForm} setForm={setEscForm}
//                 onConfirm={handleEscalate} onCancel={() => setShowEsc(false)} loading={escalating} />
//             )}

//             <TicketChat ticket={active} staffId={staffId} staffName={staffName} readOnly={isEscActive} onMarkRead={markRead}
//               onUpdate={u => { setActive(u); setTickets(prev => prev.map(t => t._id === u._id ? u : t)); }} />
//           </div>

//         ) : (loading && tab !== "escalated") || (loadEsc && tab === "escalated") ? (
//           <div style={{ textAlign: "center", padding: 80, color: "#C4CAD4" }}>
//             {Icon.spin}
//             <p style={{ fontSize: 13, marginTop: 12, color: "#9CA3AF" }}>Loading tickets…</p>
//           </div>

//         ) : list.length === 0 ? (
//           <div style={{ textAlign: "center", padding: "64px 40px", border: "1px dashed #E5E7EB", borderRadius: 14, background: "#FAFBFC" }}>
//             <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{Icon.empty}</div>
//             <p style={{ fontWeight: 600, fontSize: 14.5, color: "#374151", margin: "0 0 6px" }}>
//               {tab === "all" ? "No tickets assigned" : tab === "escalated" ? "No escalated tickets" : `No ${tab} tickets`}
//             </p>
//             <p style={{ fontSize: 12.5, color: "#9CA3AF", margin: 0 }}>
//               {tab === "all" ? "Tickets assigned to you will appear here." : tab === "escalated" ? "Tickets you escalate will appear here." : "Check another tab."}
//             </p>
//           </div>

//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {list.map(ticket => (
//               <TicketCard key={ticket._id} ticket={ticket} isEsc={tab === "escalated"} staffId={staffId}
//                 onOpen={() => openTicket(ticket, tab === "escalated")} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StaffHelpSupport;

























// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Swal from "sweetalert2";
// import { io as socketIo } from "socket.io-client";
// import { Url } from "src/url/url";

// // ─── Sound ────────────────────────────────────────────────────────────────────
// const playNotifSound = () => {
//   try {
//     const a = new Audio("/assets/notification.mp3");
//     a.volume = 0.6;
//     a.play().catch(() => {});
//   } catch {}
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
//   .shs-root *, .shs-root *::before, .shs-root *::after { box-sizing: border-box; font-family: 'DM Sans', system-ui, sans-serif; }
//   .shs-root {
//     --blue:#2563EB; --blue-bg:#EFF6FF; --blue-border:#BFDBFE;
//     --green:#16A34A; --green-bg:#F0FDF4; --green-border:#BBF7D0;
//     --amber:#D97706; --amber-bg:#FFFBEB; --amber-border:#FDE68A;
//     --red:#DC2626; --red-bg:#FEF2F2; --red-border:#FECACA;
//     --violet:#7C3AED; --violet-bg:#F5F3FF; --violet-border:#DDD6FE;
//     --border:#E5E7EB; --border-light:#F1F5F9; --surface:#F8FAFC;
//     --bg-subtle:#F9FAFB; --text:#111827; --text-2:#374151;
//     --text-3:#6B7280; --text-4:#9CA3AF; --text-5:#C4CAD4;
//   }
//   .shs-card { transition: box-shadow 0.18s ease, transform 0.12s ease; }
//   .shs-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.1) !important; transform: translateY(-1px); }
//   .shs-btn { transition: opacity 0.14s, transform 0.1s; cursor: pointer; }
//   .shs-btn:hover:not(:disabled) { opacity: 0.85; }
//   .shs-btn:active:not(:disabled) { transform: scale(0.97); }
//   .shs-tab { transition: all 0.15s ease; }
//   .shs-tab:hover { background: rgba(255,255,255,0.7) !important; }
//   .shs-input:focus { border-color: var(--blue) !important; outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
//   .shs-msg { animation: msgSlide 0.18s ease; }
//   @keyframes msgSlide { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }
//   .shs-pulse { animation: pulse 2s ease infinite; }
//   @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
//   @keyframes spin { to { transform: rotate(360deg); } }
//   .shs-related-item { transition: all 0.15s ease; cursor: pointer; }
//   .shs-related-item:hover { background: #FEF9C3 !important; border-color: #FDE047 !important; transform: translateX(2px); }
//   .shs-root ::-webkit-scrollbar { width: 4px; }
//   .shs-root ::-webkit-scrollbar-track { background: transparent; }
//   .shs-root ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
// `;

// // ─── Constants ────────────────────────────────────────────────────────────────
// const STATUS_MAP = {
//   open:          { dot: "#F59E0B", text: "#B45309",  bg: "#FFFBEB", border: "#FDE68A" },
//   "in-progress": { dot: "#3B82F6", text: "#1D4ED8",  bg: "#EFF6FF", border: "#BFDBFE" },
//   resolved:      { dot: "#22C55E", text: "#15803D",  bg: "#F0FDF4", border: "#BBF7D0" },
//   closed:        { dot: "#9CA3AF", text: "#4B5563",  bg: "#F9FAFB", border: "#E5E7EB" },
//   escalated:     { dot: "#8B5CF6", text: "#6D28D9",  bg: "#F5F3FF", border: "#DDD6FE" },
// };

// const PRIORITY_MAP = {
//   high:   { dot: "#EF4444", text: "#991B1B", bg: "#FEF2F2", border: "#FECACA" },
//   medium: { dot: "#F59E0B", text: "#92400E", bg: "#FFFBEB", border: "#FDE68A" },
//   low:    { dot: "#22C55E", text: "#14532D", bg: "#F0FDF4", border: "#BBF7D0" },
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const getStaff = () => {
//   try {
//     const r = sessionStorage.getItem("management_staff");
//     return r ? JSON.parse(r) : null;
//   } catch { return null; }
// };

// const getToken = () =>
//   sessionStorage.getItem("management_token") ||
//   localStorage.getItem("management_token") ||
//   localStorage.getItem("staffToken") || "";

// const dt = {
//   time: d => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
//   date: d => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
//   full: d => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
// };

// // ─── Small Components ─────────────────────────────────────────────────────────
// const Badge = ({ label, map }) => {
//   const c = map?.[label] || { dot: "#9CA3AF", text: "#4B5563", bg: "#F9FAFB", border: "#E5E7EB" };
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, letterSpacing: 0.1, whiteSpace: "nowrap", background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
//       {label}
//     </span>
//   );
// };

// const UnreadPill = ({ count, size = 17 }) => {
//   if (!count || count <= 0) return null;
//   return (
//     <span className="shs-pulse" style={{ background: "#EF4444", color: "#fff", borderRadius: 99, minWidth: size, height: size, padding: "0 4px", fontSize: 9.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
//       {count > 99 ? "99+" : count}
//     </span>
//   );
// };

// const Avatar = ({ name = "?", color = "#2563EB", size = 30 }) => (
//   <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, background: `${color}18`, border: `1.5px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.37, fontWeight: 700, color }}>
//     {name.charAt(0).toUpperCase()}
//   </div>
// );

// const Icon = {
//   back:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
//   check:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="20 6 9 17 4 12"/></svg>,
//   send:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
//   refresh: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
//   chat:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
//   up:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="18 15 12 9 6 15"/></svg>,
//   lock:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
//   spin:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animation: "spin 1s linear infinite" }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
//   empty:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
//   warning: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
//   arrow:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
// };

// // ─── EscalationLog ────────────────────────────────────────────────────────────
// const EscalationLog = ({ log }) => {
//   if (!log?.length) return null;
//   return (
//     <div style={{ padding: "16px 20px", borderBottom: "1px solid #EDE9FE", background: "#FDFCFF" }}>
//       <p style={{ margin: "0 0 10px", fontSize: 10.5, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 0.9 }}>Escalation History</p>
//       <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
//         {log.map((e, i) => (
//           <div key={i} style={{ background: "#fff", border: "1px solid #EDE9FE", borderRadius: 9, padding: "9px 13px", fontSize: 12 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
//               <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                 <span style={{ fontWeight: 600, color: "#6D28D9" }}>{e.fromName || e.from}</span>
//                 <span style={{ color: "#CBD5E1", fontSize: 12 }}>→</span>
//                 <span style={{ fontWeight: 600, color: "#2563EB" }}>{e.toName || e.to}</span>
//               </span>
//               <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>{dt.full(e.escalatedAt)}</span>
//             </div>
//             {e.reason && <p style={{ margin: "5px 0 0", color: "#6B7280", fontSize: 11 }}>Reason: {e.reason}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ─── RelatedTicketsBanner ─────────────────────────────────────────────────────
// const RelatedTicketsBanner = ({ tickets, onSelect }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   if (!tickets || tickets.length === 0) return null;
//   return (
//     <div style={{ padding: "12px 20px", background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)", borderBottom: "1px solid #FDE68A" }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: collapsed ? 0 : 10, cursor: "pointer" }} onClick={() => setCollapsed(v => !v)}>
//         <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//           {Icon.warning}
//           <span style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>
//             Is project pe {tickets.length} aur active ticket{tickets.length > 1 ? "s" : ""} hain (same subject)
//           </span>
//         </div>
//         <span style={{ fontSize: 11, color: "#B45309", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
//           {collapsed ? "Show" : "Hide"}
//           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
//             <polyline points="18 15 12 9 6 15" />
//           </svg>
//         </span>
//       </div>
//       {!collapsed && (
//         <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//           {tickets.map((t) => (
//             <div key={t._id} className="shs-related-item" onClick={() => onSelect(t)}
//               style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #FDE68A", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
//                 <span style={{ fontWeight: 700, color: "#2563EB", whiteSpace: "nowrap" }}>#{t.ticketId}</span>
//                 <span style={{ color: "#6B7280", whiteSpace: "nowrap" }}>{t.clientName}</span>
//                 <span style={{ color: "#D1D5DB", fontSize: 11 }}>·</span>
//                 <span style={{ color: "#9CA3AF", fontSize: 11, whiteSpace: "nowrap" }}>{t.messages?.length || 0} msg(s)</span>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
//                 <Badge label={t.status} map={STATUS_MAP} />
//                 <span style={{ fontSize: 10.5, color: "#9CA3AF", whiteSpace: "nowrap" }}>{dt.date(t.createdAt)}</span>
//                 <span style={{ color: "#D97706" }}>{Icon.arrow}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── TicketChat ───────────────────────────────────────────────────────────────
// const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
//   const [text, setText] = useState("");
//   const [sending, setSending] = useState(false);
//   const endRef = useRef(null);
//   const msgs = ticket?.messages || [];

//   useEffect(() => {
//     setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
//   }, [msgs.length]);

//   useEffect(() => {
//     if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id);
//   }, [ticket?._id]);

//   const send = async () => {
//     if (!text.trim() || sending) return;
//     setSending(true);
//     try {
//       const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sender: "staff",
//           senderId: staffId,
//           senderName: staffName,
//           message: text.trim(),
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setText("");
//         onUpdate(data.ticket);
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed." });
//       }
//     } catch {
//       Swal.fire({ icon: "error", title: "Error", text: "Network error." });
//     } finally {
//       setSending(false);
//     }
//   };

//   const closed = ["closed", "resolved"].includes(ticket?.status);

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 4, background: "#F8FAFC", minHeight: 320, maxHeight: 440 }}>
//         {!msgs.length && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, paddingTop: 64, color: "#C4CAD4" }}>
//             {Icon.empty}
//             <span style={{ fontSize: 13 }}>No messages yet</span>
//           </div>
//         )}
//         {msgs.map((msg, i) => {
//           const isMe     = msg.senderId === staffId;
//           const isSystem = msg.senderName === "System";
//           const isClient = msg.sender === "client";
//           const prevDate = i > 0 ? dt.date(msgs[i - 1].createdAt) : null;
//           const thisDate = dt.date(msg.createdAt);
//           return (
//             <React.Fragment key={i}>
//               {thisDate !== prevDate && (
//                 <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0 6px" }}>
//                   <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
//                   <span style={{ fontSize: 10.5, color: "#9CA3AF", fontWeight: 500 }}>{thisDate}</span>
//                   <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
//                 </div>
//               )}
//               {isSystem ? (
//                 <div style={{ textAlign: "center", margin: "4px 0" }}>
//                   <span style={{ fontSize: 11, color: "#9CA3AF", background: "#F1F5F9", padding: "3px 14px", borderRadius: 20 }}>{msg.message}</span>
//                 </div>
//               ) : (
//                 <div className="shs-msg" style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end", marginBottom: 2 }}>
//                   {!isMe && <Avatar name={msg.senderName} size={28} color={isClient ? "#2563EB" : "#7C3AED"} />}
//                   <div style={{ maxWidth: "65%", display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
//                     {!isMe && <span style={{ fontSize: 10.5, color: "#9CA3AF", marginBottom: 3, paddingLeft: 2 }}>{msg.senderName} · {isClient ? "Client" : "Staff"}</span>}
//                     <div style={{ padding: "9px 13px", fontSize: 13, lineHeight: 1.55, borderRadius: isMe ? "14px 14px 3px 14px" : "14px 14px 14px 3px", background: isMe ? "#2563EB" : "#fff", color: isMe ? "#fff" : "#111827", border: isMe ? "none" : "1px solid #E5E7EB", boxShadow: isMe ? "0 2px 10px rgba(37,99,235,0.2)" : "0 1px 3px rgba(0,0,0,0.05)" }}>
//                       {msg.message}
//                     </div>
//                     <span style={{ fontSize: 10, color: "#CBD5E1", marginTop: 3, paddingRight: 2, paddingLeft: 2 }}>{dt.time(msg.createdAt)}</span>
//                   </div>
//                   {isMe && <Avatar name={staffName} size={28} color="#2563EB" />}
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//         <div ref={endRef} />
//       </div>

//       {readOnly ? (
//         <div style={{ padding: "12px 20px", textAlign: "center", fontSize: 12.5, color: "#7C3AED", background: "#FDFCFF", borderTop: "1px solid #EDE9FE" }}>
//           This ticket has been escalated — view only.
//         </div>
//       ) : closed ? (
//         <div style={{ padding: "12px 20px", textAlign: "center", fontSize: 12.5, color: "#9CA3AF", borderTop: "1px solid #F1F5F9" }}>
//           Ticket is {ticket?.status}.
//         </div>
//       ) : (
//         <div style={{ display: "flex", gap: 10, padding: "12px 20px", borderTop: "1px solid #F1F5F9", background: "#fff", alignItems: "center" }}>
//           <Avatar name={staffName} size={32} color="#2563EB" />
//           <input
//             className="shs-input"
//             type="text"
//             placeholder="Write a reply…"
//             value={text}
//             onChange={e => setText(e.target.value)}
//             onKeyDown={e => e.key === "Enter" && send()}
//             style={{ flex: 1, padding: "9px 16px", borderRadius: 24, border: "1.5px solid #E5E7EB", fontSize: 13, background: "#F9FAFB", fontFamily: "inherit", color: "#111827", transition: "border-color 0.15s, box-shadow 0.15s" }}
//           />
//           <button onClick={send} disabled={!text.trim() || sending} className="shs-btn"
//             style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: text.trim() ? "#2563EB" : "#E5E7EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//             {sending ? <span style={{ fontSize: 16 }}>…</span> : Icon.send}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ─── EscalatePanel ────────────────────────────────────────────────────────────
// const EscalatePanel = ({ staffRole, adminList, form, setForm, onConfirm, onCancel, loading }) => (
//   <div style={{ padding: "16px 20px", background: "#FFFBEB", borderTop: "1px solid #FDE68A", borderBottom: "1px solid #FDE68A" }}>
//     <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 12.5, color: "#92400E" }}>Escalate this ticket</p>
//     <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
//       <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//         <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>To</label>
//         <select value={form.toRole} onChange={e => setForm({ ...form, toRole: e.target.value, toId: "", toName: "" })}
//           style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827" }}>
//           {staffRole === "staff" && adminList.length > 0 && <option value="admin-assistant">Admin Assistant</option>}
//           <option value="admin">Admin</option>
//         </select>
//       </div>
//       {form.toRole === "admin-assistant" && adminList.length > 0 && (
//         <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//           <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>Select assistant</label>
//           <select value={form.toId} onChange={e => { const a = adminList.find(x => x._id === e.target.value); setForm({ ...form, toId: e.target.value, toName: a?.name || "" }); }}
//             style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827" }}>
//             <option value="">— Select —</option>
//             {adminList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
//           </select>
//         </div>
//       )}
//       <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 4 }}>
//         <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>Reason <span style={{ color: "#EF4444" }}>*</span></label>
//         <input className="shs-input" type="text" placeholder="Enter reason…" value={form.reason}
//           onChange={e => setForm({ ...form, reason: e.target.value })}
//           style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827", transition: "border-color 0.15s, box-shadow 0.15s" }} />
//       </div>
//       <button onClick={onConfirm} disabled={loading || !form.reason.trim()} className="shs-btn"
//         style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: loading ? "#FCD34D" : "#D97706", color: "#fff", fontWeight: 600, fontSize: 12.5, fontFamily: "inherit", height: 36, display: "flex", alignItems: "center", gap: 5 }}>
//         {Icon.up} {loading ? "Escalating…" : "Confirm Escalation"}
//       </button>
//       <button onClick={onCancel} className="shs-btn"
//         style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 12.5, fontFamily: "inherit", color: "#374151", height: 36 }}>
//         Cancel
//       </button>
//     </div>
//   </div>
// );

// // ─── TicketCard ───────────────────────────────────────────────────────────────
// const TicketCard = ({ ticket, isEsc, staffId, onOpen }) => {
//   const unread   = !isEsc && (ticket.unreadByStaff || 0);
//   const lastMsg  = ticket.messages?.[ticket.messages.length - 1];
//   const escEntry = isEsc ? [...(ticket.escalationLog || [])].reverse().find(e => e.from === staffId) : null;

//   return (
//     <div className="shs-card" style={{ border: `1px solid ${unread ? "#BFDBFE" : isEsc ? "#EDE9FE" : "#E5E7EB"}`, borderRadius: 12, background: unread ? "#F0F7FF" : "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
//       <div style={{ padding: "14px 16px" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//               <span style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>#{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}</span>
//               <UnreadPill count={ticket.unreadByStaff} />
//             </div>
//             <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#9CA3AF" }}>{ticket.clientName} · {ticket.projectName || ticket.projectId} · {dt.full(ticket.createdAt)}</p>
//           </div>
//           <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
//             <Badge label={ticket.status} map={STATUS_MAP} />
//             <Badge label={ticket.priority} map={PRIORITY_MAP} />
//             {isEsc && ticket.assignedTo && (
//               <span style={{ padding: "3px 9px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#EFF6FF", color: "#1D4ED8", border: "1px solid #BFDBFE" }}>
//                 With: {ticket.assignedTo.name || ticket.assignedTo.role}
//               </span>
//             )}
//           </div>
//         </div>
//         {escEntry && (
//           <div style={{ marginTop: 9, padding: "7px 11px", background: "#F5F3FF", borderRadius: 8, fontSize: 11.5, color: "#6D28D9", border: "1px solid #EDE9FE" }}>
//             Reason: <strong>{escEntry.reason}</strong>
//             <span style={{ color: "#9CA3AF", marginLeft: 8 }}>→ {escEntry.toName}</span>
//           </div>
//         )}
//         {!isEsc && lastMsg && (
//           <p style={{ margin: "8px 0 0", fontSize: 12, color: "#6B7280", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5 }}>
//             {lastMsg.message}
//           </p>
//         )}
//       </div>
//       <div style={{ borderTop: "1px solid #F1F5F9", padding: "9px 16px", background: "#FAFBFC", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <span style={{ fontSize: 11.5, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 5 }}>
//           {Icon.chat} {ticket.messages?.length || 0} messages
//         </span>
//         <button onClick={onOpen} className="shs-btn"
//           style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: isEsc ? "#7C3AED" : "#2563EB", color: "#fff", fontWeight: 600, fontSize: 12, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
//           {isEsc ? "View History" : "Open Chat"}
//           <UnreadPill count={ticket.unreadByStaff} />
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════ */
// const StaffHelpSupport = ({ staffId: pId, staffName: pName, staffRole: pRole, adminAssistantList: pAdmins }) => {
//   const [staffId,   setStaffId]   = useState(pId   || "");
//   const [staffName, setStaffName] = useState(pName || "");
//   const [staffRole, setStaffRole] = useState(pRole || "staff");
//   const [adminList, setAdminList] = useState(pAdmins || []);

//   const [tickets,       setTickets]       = useState([]);
//   const [escalated,     setEscalated]     = useState([]);
//   const [active,        setActive]        = useState(null);
//   const [isEscActive,   setIsEscActive]   = useState(false);
//   const [loading,       setLoading]       = useState(false);
//   const [loadEsc,       setLoadEsc]       = useState(false);
//   const [error,         setError]         = useState("");
//   const [tab,           setTab]           = useState("all");
//   const [showEsc,       setShowEsc]       = useState(false);
//   const [escForm,       setEscForm]       = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
//   const [escalating,    setEscalating]    = useState(false);
//   const [resolving,     setResolving]     = useState(false);
//   const [relatedTickets, setRelatedTickets] = useState([]);

//   const sockRef   = useRef(null);
//   const activeRef = useRef(null);
//   useEffect(() => { activeRef.current = active; }, [active]);
//   useEffect(() => { setEscForm(f => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" })); }, [staffRole]);

//   // ─── Staff identity from session ─────────────────────────────────────────
//   useEffect(() => {
//     if (pId) return;
//     const d = getStaff();
//     if (d) {
//       setStaffId(d._id || d.id || "");
//       setStaffName(d.name || d.firstName || "");
//       const slug = (d.slug || d.roleName || "").toLowerCase();
//       setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
//     }
//   }, [pId]);

//   // ─── Admin assistant list ─────────────────────────────────────────────────
//   useEffect(() => {
//     if (pAdmins?.length) return;
//     fetch(`${Url}/management-staff`)
//       .then(r => r.json())
//       .then(data => {
//         const list = Array.isArray(data) ? data : (data.staff || data.data || []);
//         setAdminList(list.filter(s => {
//           const sl = (s.slug || s.roleName || "").toLowerCase();
//           return sl.includes("admin-assistant") || sl.includes("admin assistant");
//         }));
//       })
//       .catch(() => {});
//   }, [pAdmins]);

//   // ─── Fetch helpers ────────────────────────────────────────────────────────
//   const fetchTickets = useCallback(async () => {
//     if (!staffId) return;
//     setLoading(true); setError("");
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
//       const d = await r.json();
//       if (r.ok) setTickets(d.tickets || []);
//       else setError(d.message || "Failed.");
//     } catch { setError("Network error."); }
//     finally { setLoading(false); }
//   }, [staffId]);

//   const fetchEscalated = useCallback(async () => {
//     if (!staffId) return;
//     setLoadEsc(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
//       const d = await r.json();
//       setEscalated(r.ok ? (d.tickets || []) : []);
//     } catch { setEscalated([]); }
//     finally { setLoadEsc(false); }
//   }, [staffId]);

//   const fetchOne = useCallback(async (id) => {
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${id}`);
//       const d = await r.json();
//       if (!r.ok || !d.ticket) return;
//       setTickets(prev => prev.map(t => t._id === d.ticket._id ? d.ticket : t));
//       if (activeRef.current?._id === d.ticket._id) setActive(d.ticket);
//     } catch {}
//   }, []);

//   const fetchRelated = useCallback(async (ticket) => {
//     if (!ticket?.projectId || !ticket?.subject) { setRelatedTickets([]); return; }
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/related/${ticket.projectId}/${encodeURIComponent(ticket.subject)}?excludeId=${ticket._id}`);
//       const d = await r.json();
//       setRelatedTickets(r.ok ? (d.tickets || []) : []);
//     } catch { setRelatedTickets([]); }
//   }, []);

//   const markRead = useCallback(async (id) => {
//     try {
//       await fetch(`${Url}/api/support/tickets/${id}/mark-read`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: "staff" }),
//       });
//       setTickets(prev => prev.map(t => t._id === id ? { ...t, unreadByStaff: 0 } : t));
//       setActive(prev => prev?._id === id ? { ...prev, unreadByStaff: 0 } : prev);
//     } catch {}
//   }, []);

//   // ─── Initial load ─────────────────────────────────────────────────────────
//   useEffect(() => { if (staffId) { fetchTickets(); fetchEscalated(); } }, [staffId]);
//   useEffect(() => { if (tab === "escalated" && staffId) fetchEscalated(); }, [tab, staffId]);
//   useEffect(() => {
//     if (active && !isEscActive) fetchRelated(active);
//     else setRelatedTickets([]);
//   }, [active, isEscActive, fetchRelated]);

//   // ─── Socket ───────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!staffId) return;

//     const s = socketIo(Url, {
//       transports: ["websocket"],
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });
//     sockRef.current = s;

//     const joinRoom = () => {
//       const token = getToken();
//       if (token) s.emit("join", token);
//       s.emit("joinStaff", staffId);
//     };
//     s.on("connect",   joinRoom);
//     s.on("reconnect", joinRoom);

//     // ── New ticket assigned ──────────────────────────────────────────────
//     s.on("support:assigned_to_you", (d) => {
//       playNotifSound();
//       Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 4500, title: `New: #${d.ticketCode}`, text: d.subject });
//       setTickets(prev => prev.some(t => t._id === d._id) ? prev : [d, ...prev]);
//     });

//     // ── Ticket updated ───────────────────────────────────────────────────
//     s.on("support:ticket_updated", (u) => {
//       if (u.assignedTo?.id !== staffId) {
//         setTickets(prev => prev.filter(t => t._id !== u._id));
//         if (activeRef.current?._id === u._id) setActive(null);
//         fetchEscalated();
//         return;
//       }
//       playNotifSound();
//       setTickets(prev => {
//         const exists = prev.some(t => t._id === u._id);
//         return exists ? prev.map(t => t._id === u._id ? u : t) : [u, ...prev];
//       });
//       if (activeRef.current?._id === u._id) setActive(u);
//     });

//     // ── ✅ FIX: New message — sound sirf tab baje jab message apna na ho ──
//     s.on("support:new_message", (d) => {
//       const tid      = d.ticketId;
//       const sender   = d.message?.sender   || "";
//       const senderId = d.message?.senderId || "";

//       // ✅ Apna message ignore karo (sound mat bajao, UI already update ho chuka hai)
//       if (sender === "staff" && senderId === staffId) return;

//       const isActiveTicket = activeRef.current?._id === tid;

//       if (isActiveTicket) {
//         // Chat open hai — fresh data fetch karo
//         fetchOne(tid);
//       } else {
//         // ✅ Doosre staff ka message bhi sound nahi bajayega — sirf client ka bajega
//         if (sender === "staff") return;

//         playNotifSound();
//         setTickets(prev => prev.map(t => {
//           if (t._id !== tid) return t;
//           const newMsg = {
//             message:    d.message?.message    || "",
//             senderName: d.message?.senderName || "",
//             sender,
//             createdAt:  new Date().toISOString(),
//           };
//           return {
//             ...t,
//             unreadByStaff: (t.unreadByStaff || 0) + 1,
//             messages:      [...(t.messages || []), newMsg],
//           };
//         }));
//       }
//     });

//     // ── Server unread sync ───────────────────────────────────────────────
//     s.on("support:unread_update", ({ ticketId: tid, unreadByStaff }) => {
//       if (unreadByStaff === undefined || activeRef.current?._id === tid) return;
//       setTickets(prev => prev.map(t => t._id === tid ? { ...t, unreadByStaff } : t));
//     });

//     return () => {
//       s.off("connect",   joinRoom);
//       s.off("reconnect", joinRoom);
//       s.disconnect();
//       sockRef.current = null;
//     };
//   }, [staffId, fetchOne, fetchEscalated]);

//   // ─── Actions ──────────────────────────────────────────────────────────────
//   const handleResolve = async () => {
//     if (!active || resolving) return;
//     const ok = await Swal.fire({ title: "Mark as Resolved?", icon: "question", showCancelButton: true, confirmButtonText: "Yes, resolve", confirmButtonColor: "#16A34A" });
//     if (!ok.isConfirmed) return;
//     setResolving(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "resolved" }),
//       });
//       const d = await r.json();
//       if (r.ok) {
//         Swal.fire({ icon: "success", title: "Resolved!", timer: 2000, showConfirmButton: false });
//         setActive(d.ticket);
//         setTickets(prev => prev.map(t => t._id === d.ticket._id ? d.ticket : t));
//         setShowEsc(false);
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: d.message });
//       }
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Network error." }); }
//     finally { setResolving(false); }
//   };

//   const handleEscalate = async () => {
//     if (!active || !escForm.reason.trim()) { Swal.fire({ icon: "warning", title: "Reason required" }); return; }
//     if (escForm.toRole === "admin-assistant" && !escForm.toId) {
//       if (!adminList.length) { setEscForm(f => ({ ...f, toRole: "admin", toId: "", toName: "Admin" })); return; }
//       Swal.fire({ icon: "warning", title: "Select an assistant" }); return;
//     }
//     setEscalating(true);
//     try {
//       const r = await fetch(`${Url}/api/support/tickets/${active._id}/escalate`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fromId: staffId, fromName: staffName,
//           toRole: escForm.toRole,
//           toId: escForm.toRole === "admin" ? null : escForm.toId,
//           toName: escForm.toRole === "admin" ? "Admin" : escForm.toName,
//           reason: escForm.reason,
//         }),
//       });
//       const d = await r.json();
//       if (r.ok) {
//         Swal.fire({ icon: "success", title: "Escalated!", timer: 2000, showConfirmButton: false });
//         setTickets(prev => prev.filter(t => t._id !== active._id));
//         setEscalated(prev => [d.ticket, ...prev.filter(t => t._id !== d.ticket._id)]);
//         setActive(null); setShowEsc(false); setRelatedTickets([]);
//         setEscForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
//         fetchEscalated();
//       } else {
//         Swal.fire({ icon: "error", title: "Error", text: d.message });
//       }
//     } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
//     finally { setEscalating(false); }
//   };

//   const openTicket = (ticket, isEsc = false) => {
//     setActive(ticket);
//     setIsEscActive(isEsc);
//     setShowEsc(false);
//     if (!isEsc) markRead(ticket._id);
//   };

//   // ─── Derived ──────────────────────────────────────────────────────────────
//   const list       = tab === "all" ? tickets : tab === "escalated" ? escalated : tickets.filter(t => t.status === tab);
//   const actionable = active && !["closed", "resolved"].includes(active.status) && !isEscActive;
//   const totalUnread = tickets.reduce((s, t) => s + (t.unreadByStaff || 0), 0);

//   const TABS = [
//     { key: "all",         label: "All",         cnt: tickets.length },
//     { key: "open",        label: "Open",        cnt: tickets.filter(t => t.status === "open").length },
//     { key: "in-progress", label: "In Progress", cnt: tickets.filter(t => t.status === "in-progress").length },
//     { key: "resolved",    label: "Resolved",    cnt: tickets.filter(t => t.status === "resolved").length },
//     { key: "escalated",   label: "Escalated",   cnt: escalated.length },
//   ];

//   if (!staffId) return (
//     <div className="shs-root" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 80, color: "#9CA3AF" }}>
//       {Icon.lock}
//       <p style={{ fontWeight: 600, fontSize: 15, color: "#374151", margin: 0 }}>Staff identity not found</p>
//       <p style={{ fontSize: 13, margin: 0 }}>Please login or refresh the page.</p>
//     </div>
//   );

//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{GLOBAL_CSS}</style>
//       <div className="shs-root" style={{ padding: "28px 24px", maxWidth: 1080, margin: "0 auto" }}>

//         {/* Header */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 26 }}>
//           <div>
//             <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: -0.3, display: "flex", alignItems: "center", gap: 10 }}>
//               Support Tickets
//               {totalUnread > 0 && (
//                 <span style={{ background: "#EF4444", color: "#fff", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
//                   {totalUnread} unread
//                 </span>
//               )}
//             </h2>
//             <p style={{ margin: "5px 0 0", fontSize: 12.5, color: "#9CA3AF" }}>
//               Assigned to <strong style={{ color: "#374151" }}>{staffName}</strong>
//               <span style={{ margin: "0 6px", color: "#E5E7EB" }}>·</span>
//               {staffRole}
//               {adminList.length > 0 && (<><span style={{ margin: "0 6px", color: "#E5E7EB" }}>·</span><span style={{ color: "#7C3AED" }}>{adminList.length} assistant(s)</span></>)}
//             </p>
//           </div>
//           <button onClick={() => { fetchTickets(); fetchEscalated(); }} className="shs-btn"
//             style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 12.5, color: "#374151", fontWeight: 500, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
//             {Icon.refresh} Refresh
//           </button>
//         </div>

//         {/* Error */}
//         {error && (
//           <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 16px", marginBottom: 18, fontSize: 13, color: "#991B1B" }}>
//             {error}
//           </div>
//         )}

//         {/* Tabs */}
//         <div style={{ display: "flex", gap: 2, marginBottom: 20, background: "#F3F4F6", borderRadius: 11, padding: 3, flexWrap: "wrap" }}>
//           {TABS.map(t => {
//             const on = tab === t.key;
//             const ac = t.key === "escalated" ? "#7C3AED" : t.key === "resolved" ? "#16A34A" : "#2563EB";
//             return (
//               <button key={t.key} className="shs-tab"
//                 onClick={() => { setTab(t.key); setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }}
//                 style={{ flex: 1, minWidth: 80, padding: "7px 10px", borderRadius: 8, border: "none", background: on ? "#fff" : "transparent", boxShadow: on ? "0 1px 4px rgba(0,0,0,0.09)" : "none", fontWeight: on ? 600 : 500, color: on ? ac : "#6B7280", cursor: "pointer", fontSize: 12.5, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
//                 {t.label}
//                 {t.cnt > 0 && <span style={{ background: on ? ac : "#D1D5DB", color: on ? "#fff" : "#6B7280", borderRadius: 99, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px", fontWeight: 700 }}>{t.cnt}</span>}
//               </button>
//             );
//           })}
//         </div>

//         {tab === "escalated" && !active && (
//           <div style={{ background: "#F5F3FF", border: "1px solid #EDE9FE", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 12.5, color: "#6D28D9", display: "flex", alignItems: "center", gap: 8 }}>
//             {Icon.info} Tickets you've escalated — view only.
//           </div>
//         )}

//         {/* Active Ticket View */}
//         {active ? (
//           <div style={{ border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
//             {/* Ticket Header */}
//             <div style={{ padding: "14px 20px", borderBottom: `1px solid ${isEscActive ? "#EDE9FE" : "#F1F5F9"}`, background: isEscActive ? "#FDFCFF" : "#FAFBFC", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                 <button onClick={() => { setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }} className="shs-btn"
//                   style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E5E7EB", background: "#F3F4F6", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
//                   {Icon.back}
//                 </button>
//                 <div>
//                   <p style={{ margin: 0, fontWeight: 700, fontSize: 13.5, color: "#111827" }}>
//                     #{active.ticketId} — {active.subject === "Other" ? active.customSubject : active.subject}
//                   </p>
//                   <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#9CA3AF" }}>{active.clientName} · {active.projectName || active.projectId}</p>
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
//                 <Badge label={active.status} map={STATUS_MAP} />
//                 <Badge label={active.priority} map={PRIORITY_MAP} />
//                 {actionable && (
//                   <button onClick={handleResolve} disabled={resolving} className="shs-btn"
//                     style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: resolving ? "#BBF7D0" : "#16A34A", color: "#fff", fontWeight: 600, fontSize: 12, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
//                     {Icon.check} {resolving ? "Resolving…" : "Resolve"}
//                   </button>
//                 )}
//                 {actionable && (
//                   <button onClick={() => setShowEsc(v => !v)} className="shs-btn"
//                     style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${showEsc ? "#FDE68A" : "#E5E7EB"}`, background: showEsc ? "#FFFBEB" : "#fff", color: showEsc ? "#92400E" : "#374151", fontWeight: 600, fontSize: 12, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
//                     {Icon.up} Escalate
//                   </button>
//                 )}
//                 {isEscActive && (
//                   <span style={{ padding: "4px 11px", borderRadius: 99, background: "#F5F3FF", color: "#6D28D9", fontSize: 11, fontWeight: 600, border: "1px solid #EDE9FE" }}>Escalated by you</span>
//                 )}
//               </div>
//             </div>

//             {!isEscActive && active.status === "resolved" && (
//               <div style={{ padding: "10px 20px", background: "#F0FDF4", borderBottom: "1px solid #BBF7D0", fontSize: 12.5, color: "#15803D", display: "flex", alignItems: "center", gap: 6 }}>
//                 {Icon.check} You've resolved this ticket. Admin will close it.
//               </div>
//             )}

//             {!isEscActive && <RelatedTicketsBanner tickets={relatedTickets} onSelect={(t) => openTicket(t, false)} />}
//             {isEscActive && <EscalationLog log={active.escalationLog} />}
//             {showEsc && !isEscActive && (
//               <EscalatePanel staffRole={staffRole} adminList={adminList} form={escForm} setForm={setEscForm}
//                 onConfirm={handleEscalate} onCancel={() => setShowEsc(false)} loading={escalating} />
//             )}

//             <TicketChat ticket={active} staffId={staffId} staffName={staffName} readOnly={isEscActive} onMarkRead={markRead}
//               onUpdate={u => { setActive(u); setTickets(prev => prev.map(t => t._id === u._id ? u : t)); }} />
//           </div>

//         ) : (loading && tab !== "escalated") || (loadEsc && tab === "escalated") ? (
//           <div style={{ textAlign: "center", padding: 80, color: "#C4CAD4" }}>
//             {Icon.spin}
//             <p style={{ fontSize: 13, marginTop: 12, color: "#9CA3AF" }}>Loading tickets…</p>
//           </div>

//         ) : list.length === 0 ? (
//           <div style={{ textAlign: "center", padding: "64px 40px", border: "1px dashed #E5E7EB", borderRadius: 14, background: "#FAFBFC" }}>
//             <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{Icon.empty}</div>
//             <p style={{ fontWeight: 600, fontSize: 14.5, color: "#374151", margin: "0 0 6px" }}>
//               {tab === "all" ? "No tickets assigned" : tab === "escalated" ? "No escalated tickets" : `No ${tab} tickets`}
//             </p>
//             <p style={{ fontSize: 12.5, color: "#9CA3AF", margin: 0 }}>
//               {tab === "all" ? "Tickets assigned to you will appear here." : tab === "escalated" ? "Tickets you escalate will appear here." : "Check another tab."}
//             </p>
//           </div>

//         ) : (
//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {list.map(ticket => (
//               <TicketCard key={ticket._id} ticket={ticket} isEsc={tab === "escalated"} staffId={staffId}
//                 onOpen={() => openTicket(ticket, tab === "escalated")} />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StaffHelpSupport;












"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import { io as socketIo } from "socket.io-client";
import { Url } from "src/url/url";

// ─── Sound ────────────────────────────────────────────────────────────────────
const playNotifSound = () => {
  try {
    const a = new Audio("/assets/notification.mp3");
    a.volume = 0.6;
    a.play().catch(() => {});
  } catch {}
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
  .shs-root *, .shs-root *::before, .shs-root *::after { box-sizing: border-box; font-family: 'DM Sans', system-ui, sans-serif; }
  .shs-root {
    --blue:#2563EB; --blue-bg:#EFF6FF; --blue-border:#BFDBFE;
    --green:#16A34A; --green-bg:#F0FDF4; --green-border:#BBF7D0;
    --amber:#D97706; --amber-bg:#FFFBEB; --amber-border:#FDE68A;
    --red:#DC2626; --red-bg:#FEF2F2; --red-border:#FECACA;
    --violet:#7C3AED; --violet-bg:#F5F3FF; --violet-border:#DDD6FE;
    --border:#E5E7EB; --border-light:#F1F5F9; --surface:#F8FAFC;
    --bg-subtle:#F9FAFB; --text:#111827; --text-2:#374151;
    --text-3:#6B7280; --text-4:#9CA3AF; --text-5:#C4CAD4;
  }
  .shs-card { transition: box-shadow 0.18s ease, transform 0.12s ease; }
  .shs-card:hover { box-shadow: 0 6px 28px rgba(0,0,0,0.1) !important; transform: translateY(-1px); }
  .shs-btn { transition: opacity 0.14s, transform 0.1s; cursor: pointer; }
  .shs-btn:hover:not(:disabled) { opacity: 0.85; }
  .shs-btn:active:not(:disabled) { transform: scale(0.97); }
  .shs-tab { transition: all 0.15s ease; }
  .shs-tab:hover { background: rgba(255,255,255,0.7) !important; }
  .shs-input:focus { border-color: var(--blue) !important; outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
  .shs-msg { animation: msgSlide 0.18s ease; }
  @keyframes msgSlide { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }
  .shs-pulse { animation: pulse 2s ease infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  .shs-related-item { transition: all 0.15s ease; cursor: pointer; }
  .shs-related-item:hover { background: #FEF9C3 !important; border-color: #FDE047 !important; transform: translateX(2px); }
  .shs-root ::-webkit-scrollbar { width: 4px; }
  .shs-root ::-webkit-scrollbar-track { background: transparent; }
  .shs-root ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
`;

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_MAP = {
  open:          { dot: "#F59E0B", text: "#B45309",  bg: "#FFFBEB", border: "#FDE68A" },
  "in-progress": { dot: "#3B82F6", text: "#1D4ED8",  bg: "#EFF6FF", border: "#BFDBFE" },
  resolved:      { dot: "#22C55E", text: "#15803D",  bg: "#F0FDF4", border: "#BBF7D0" },
  closed:        { dot: "#9CA3AF", text: "#4B5563",  bg: "#F9FAFB", border: "#E5E7EB" },
  escalated:     { dot: "#8B5CF6", text: "#6D28D9",  bg: "#F5F3FF", border: "#DDD6FE" },
};

const PRIORITY_MAP = {
  high:   { dot: "#EF4444", text: "#991B1B", bg: "#FEF2F2", border: "#FECACA" },
  medium: { dot: "#F59E0B", text: "#92400E", bg: "#FFFBEB", border: "#FDE68A" },
  low:    { dot: "#22C55E", text: "#14532D", bg: "#F0FDF4", border: "#BBF7D0" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getStaff = () => {
  try {
    const r = sessionStorage.getItem("management_staff");
    return r ? JSON.parse(r) : null;
  } catch { return null; }
};

const getToken = () =>
  sessionStorage.getItem("management_token") ||
  localStorage.getItem("management_token") ||
  localStorage.getItem("staffToken") || "";

const dt = {
  time: d => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  date: d => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  full: d => new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
};

// ─── Small Components ─────────────────────────────────────────────────────────
const Badge = ({ label, map }) => {
  const c = map?.[label] || { dot: "#9CA3AF", text: "#4B5563", bg: "#F9FAFB", border: "#E5E7EB" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, letterSpacing: 0.1, whiteSpace: "nowrap", background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {label}
    </span>
  );
};

const UnreadPill = ({ count, size = 17 }) => {
  if (!count || count <= 0) return null;
  return (
    <span className="shs-pulse" style={{ background: "#EF4444", color: "#fff", borderRadius: 99, minWidth: size, height: size, padding: "0 4px", fontSize: 9.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {count > 99 ? "99+" : count}
    </span>
  );
};

const Avatar = ({ name = "?", color = "#2563EB", size = 30 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, background: `${color}18`, border: `1.5px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.37, fontWeight: 700, color }}>
    {name.charAt(0).toUpperCase()}
  </div>
);

const Icon = {
  back:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  check:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="20 6 9 17 4 12"/></svg>,
  send:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>,
  refresh: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
  chat:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  up:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="18 15 12 9 6 15"/></svg>,
  lock:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  spin:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animation: "spin 1s linear infinite" }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  empty:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  warning: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  arrow:   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
};

// ─── EscalationLog ────────────────────────────────────────────────────────────
const EscalationLog = ({ log }) => {
  if (!log?.length) return null;
  return (
    <div style={{ padding: "16px 20px", borderBottom: "1px solid #EDE9FE", background: "#FDFCFF" }}>
      <p style={{ margin: "0 0 10px", fontSize: 10.5, fontWeight: 700, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 0.9 }}>Escalation History</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {log.map((e, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #EDE9FE", borderRadius: 9, padding: "9px 13px", fontSize: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 600, color: "#6D28D9" }}>{e.fromName || e.from}</span>
                <span style={{ color: "#CBD5E1", fontSize: 12 }}>→</span>
                <span style={{ fontWeight: 600, color: "#2563EB" }}>{e.toName || e.to}</span>
              </span>
              <span style={{ fontSize: 10.5, color: "#9CA3AF" }}>{dt.full(e.escalatedAt)}</span>
            </div>
            {e.reason && <p style={{ margin: "5px 0 0", color: "#6B7280", fontSize: 11 }}>Reason: {e.reason}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── RelatedTicketsBanner ─────────────────────────────────────────────────────
const RelatedTicketsBanner = ({ tickets, onSelect }) => {
  const [collapsed, setCollapsed] = useState(false);
  if (!tickets || tickets.length === 0) return null;
  return (
    <div style={{ padding: "12px 20px", background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)", borderBottom: "1px solid #FDE68A" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: collapsed ? 0 : 10, cursor: "pointer" }} onClick={() => setCollapsed(v => !v)}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {Icon.warning}
          <span style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>
            Is project pe {tickets.length} aur active ticket{tickets.length > 1 ? "s" : ""} hain (same subject)
          </span>
        </div>
        <span style={{ fontSize: 11, color: "#B45309", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          {collapsed ? "Show" : "Hide"}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </span>
      </div>
      {!collapsed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {tickets.map((t) => (
            <div key={t._id} className="shs-related-item" onClick={() => onSelect(t)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #FDE68A", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 700, color: "#2563EB", whiteSpace: "nowrap" }}>#{t.ticketId}</span>
                <span style={{ color: "#6B7280", whiteSpace: "nowrap" }}>{t.clientName}</span>
                <span style={{ color: "#D1D5DB", fontSize: 11 }}>·</span>
                <span style={{ color: "#9CA3AF", fontSize: 11, whiteSpace: "nowrap" }}>{t.messages?.length || 0} msg(s)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
                <Badge label={t.status} map={STATUS_MAP} />
                <span style={{ fontSize: 10.5, color: "#9CA3AF", whiteSpace: "nowrap" }}>{dt.date(t.createdAt)}</span>
                <span style={{ color: "#D97706" }}>{Icon.arrow}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── TicketChat ───────────────────────────────────────────────────────────────
const TicketChat = ({ ticket, staffId, staffName, onUpdate, onMarkRead, readOnly }) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);
  const msgs = ticket?.messages || [];

  useEffect(() => {
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }, [msgs.length]);

  useEffect(() => {
    if (ticket?._id && (ticket?.unreadByStaff || 0) > 0) onMarkRead?.(ticket._id);
  }, [ticket?._id]);

  const send = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch(`${Url}/api/support/tickets/${ticket._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "staff",
          senderId: staffId,
          senderName: staffName,
          message: text.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setText("");
        onUpdate(data.ticket);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed." });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Network error." });
    } finally {
      setSending(false);
    }
  };

  const closed = ["closed", "resolved"].includes(ticket?.status);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 4, background: "white", minHeight: 320, maxHeight: 440 }}>
        {!msgs.length && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, paddingTop: 64, color: "#C4CAD4" }}>
            {Icon.empty}
            <span style={{ fontSize: 13 }}>No messages yet</span>
          </div>
        )}
        {msgs.map((msg, i) => {
          const isMe     = msg.senderId === staffId;
          const isSystem = msg.senderName === "System";
          const isClient = msg.sender === "client";
          const prevDate = i > 0 ? dt.date(msgs[i - 1].createdAt) : null;
          const thisDate = dt.date(msg.createdAt);
          return (
            <React.Fragment key={i}>
              {thisDate !== prevDate && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0 6px" }}>
                  <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                  <span style={{ fontSize: 10.5, color: "#9CA3AF", fontWeight: 500 }}>{thisDate}</span>
                  <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                </div>
              )}
              {isSystem ? (
                <div style={{ textAlign: "center", margin: "4px 0" }}>
                  <span style={{ fontSize: 11, color: "#9CA3AF", background: "#F1F5F9", padding: "3px 14px", borderRadius: 20 }}>{msg.message}</span>
                </div>
              ) : (
                <div className="shs-msg" style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end", marginBottom: 2 }}>
                  {!isMe && <Avatar name={msg.senderName} size={28} color={isClient ? "#2563EB" : "#7C3AED"} />}
                  <div style={{ maxWidth: "65%", display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                    {!isMe && <span style={{ fontSize: 10.5, color: "#9CA3AF", marginBottom: 3, paddingLeft: 2 }}>{msg.senderName} · {isClient ? "Client" : "Staff"}</span>}
                    <div style={{ padding: "9px 13px", fontSize: 13, lineHeight: 1.55, borderRadius: isMe ? "14px 14px 3px 14px" : "14px 14px 14px 3px", background: isMe ? "#2563EB" : "#fff", color: isMe ? "#fff" : "#111827", border: isMe ? "none" : "1px solid #E5E7EB", boxShadow: isMe ? "0 2px 10px rgba(37,99,235,0.2)" : "0 1px 3px rgba(0,0,0,0.05)" }}>
                      {msg.message}
                    </div>
                    <span style={{ fontSize: 10, color: "#CBD5E1", marginTop: 3, paddingRight: 2, paddingLeft: 2 }}>{dt.time(msg.createdAt)}</span>
                  </div>
                  {isMe && <Avatar name={staffName} size={28} color="#2563EB" />}
                </div>
              )}
            </React.Fragment>
          );
        })}
        <div ref={endRef} />
      </div>

      {readOnly ? (
        <div style={{ padding: "12px 20px", textAlign: "center", fontSize: 12.5, color: "#7C3AED", background: "#FDFCFF", borderTop: "1px solid #EDE9FE" }}>
          This ticket has been escalated — view only.
        </div>
      ) : closed ? (
        <div style={{ padding: "12px 20px", textAlign: "center", fontSize: 12.5, color: "#9CA3AF", borderTop: "1px solid #F1F5F9" }}>
          Ticket is {ticket?.status}.
        </div>
      ) : (
        <div style={{ display: "flex", gap: 10, padding: "12px 20px", borderTop: "1px solid #F1F5F9", background: "#fff", alignItems: "center" }}>
          <Avatar name={staffName} size={32} color="#2563EB" />
          <input
            className="shs-input"
            type="text"
            placeholder="Write a reply…"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            style={{ flex: 1, padding: "9px 16px", borderRadius: 24, border: "1.5px solid #E5E7EB", fontSize: 13, background: "#F9FAFB", fontFamily: "inherit", color: "#111827", transition: "border-color 0.15s, box-shadow 0.15s" }}
          />
          <button onClick={send} disabled={!text.trim() || sending} className="shs-btn"
            style={{ width: 38, height: 38, borderRadius: "50%", border: "none", background: text.trim() ? "#2563EB" : "#E5E7EB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {sending ? <span style={{ fontSize: 16 }}>…</span> : Icon.send}
          </button>
        </div>
      )}
    </div>
  );
};

// ─── EscalatePanel ────────────────────────────────────────────────────────────
const EscalatePanel = ({ staffRole, adminList, form, setForm, onConfirm, onCancel, loading }) => (
  <div style={{ padding: "16px 20px", background: "#FFFBEB", borderTop: "1px solid #FDE68A", borderBottom: "1px solid #FDE68A" }}>
    <p style={{ margin: "0 0 12px", fontWeight: 700, fontSize: 12.5, color: "#92400E" }}>Escalate this ticket</p>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>To</label>
        <select value={form.toRole} onChange={e => setForm({ ...form, toRole: e.target.value, toId: "", toName: "" })}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827" }}>
          {staffRole === "staff" && adminList.length > 0 && <option value="admin-assistant">Admin Assistant</option>}
          <option value="admin">Admin</option>
        </select>
      </div>
      {form.toRole === "admin-assistant" && adminList.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>Select assistant</label>
          <select value={form.toId} onChange={e => { const a = adminList.find(x => x._id === e.target.value); setForm({ ...form, toId: e.target.value, toName: a?.name || "" }); }}
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827" }}>
            <option value="">— Select —</option>
            {adminList.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
          </select>
        </div>
      )}
      <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>Reason <span style={{ color: "#EF4444" }}>*</span></label>
        <input className="shs-input" type="text" placeholder="Enter reason…" value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 12.5, background: "#fff", fontFamily: "inherit", color: "#111827", transition: "border-color 0.15s, box-shadow 0.15s" }} />
      </div>
      <button onClick={onConfirm} disabled={loading || !form.reason.trim()} className="shs-btn"
        style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: loading ? "#FCD34D" : "#D97706", color: "#fff", fontWeight: 600, fontSize: 12.5, fontFamily: "inherit", height: 36, display: "flex", alignItems: "center", gap: 5 }}>
        {Icon.up} {loading ? "Escalating…" : "Confirm Escalation"}
      </button>
      <button onClick={onCancel} className="shs-btn"
        style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 12.5, fontFamily: "inherit", color: "#374151", height: 36 }}>
        Cancel
      </button>
    </div>
  </div>
);

// ─── TicketCard ───────────────────────────────────────────────────────────────
const TicketCard = ({ ticket, isEsc, staffId, onOpen }) => {
  const unread   = !isEsc && (ticket.unreadByStaff || 0);
  const lastMsg  = ticket.messages?.[ticket.messages.length - 1];
  const escEntry = isEsc ? [...(ticket.escalationLog || [])].reverse().find(e => e.from === staffId) : null;

  return (
    <div className="shs-card" style={{ border: `1px solid ${unread ? "#BFDBFE" : isEsc ? "#EDE9FE" : "#E5E7EB"}`, borderRadius: 12, background: unread ? "#F0F7FF" : "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>#{ticket.ticketId} — {ticket.subject === "Other" ? ticket.customSubject : ticket.subject}</span>
              <UnreadPill count={ticket.unreadByStaff} />
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 11.5, color: "#9CA3AF" }}>{ticket.clientName} · {ticket.projectName || ticket.projectId} · {dt.full(ticket.createdAt)}</p>
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
            <Badge label={ticket.status} map={STATUS_MAP} />
            <Badge label={ticket.priority} map={PRIORITY_MAP} />
            {isEsc && ticket.assignedTo && (
              <span style={{ padding: "3px 9px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: "#EFF6FF", color: "#1D4ED8", border: "1px solid #BFDBFE" }}>
                With: {ticket.assignedTo.name || ticket.assignedTo.role}
              </span>
            )}
          </div>
        </div>
        {escEntry && (
          <div style={{ marginTop: 9, padding: "7px 11px", background: "#F5F3FF", borderRadius: 8, fontSize: 11.5, color: "#6D28D9", border: "1px solid #EDE9FE" }}>
            Reason: <strong>{escEntry.reason}</strong>
            <span style={{ color: "#9CA3AF", marginLeft: 8 }}>→ {escEntry.toName}</span>
          </div>
        )}
        {!isEsc && lastMsg && (
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#6B7280", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5 }}>
            {lastMsg.message}
          </p>
        )}
      </div>
      <div style={{ borderTop: "1px solid #F1F5F9", padding: "9px 16px", background: "#FAFBFC", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11.5, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 5 }}>
          {Icon.chat} {ticket.messages?.length || 0} messages
        </span>
        <button onClick={onOpen} className="shs-btn"
          style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: isEsc ? "#7C3AED" : "#2563EB", color: "#fff", fontWeight: 600, fontSize: 12, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
          {isEsc ? "View History" : "Open Chat"}
          <UnreadPill count={ticket.unreadByStaff} />
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const StaffHelpSupport = ({ staffId: pId, staffName: pName, staffRole: pRole, adminAssistantList: pAdmins }) => {
  const [staffId,   setStaffId]   = useState(pId   || "");
  const [staffName, setStaffName] = useState(pName || "");
  const [staffRole, setStaffRole] = useState(pRole || "staff");
  const [adminList, setAdminList] = useState(pAdmins || []);

  const [tickets,       setTickets]       = useState([]);
  const [escalated,     setEscalated]     = useState([]);
  const [active,        setActive]        = useState(null);
  const [isEscActive,   setIsEscActive]   = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [loadEsc,       setLoadEsc]       = useState(false);
  const [error,         setError]         = useState("");
  const [tab,           setTab]           = useState("all");
  const [showEsc,       setShowEsc]       = useState(false);
  const [escForm,       setEscForm]       = useState({ toRole: "admin", toId: "", toName: "", reason: "" });
  const [escalating,    setEscalating]    = useState(false);
  const [resolving,     setResolving]     = useState(false);
  const [relatedTickets, setRelatedTickets] = useState([]);

  const sockRef   = useRef(null);
  const activeRef = useRef(null);
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { setEscForm(f => ({ ...f, toRole: staffRole === "staff" ? "admin-assistant" : "admin" })); }, [staffRole]);

  // ─── Staff identity from session ─────────────────────────────────────────
  useEffect(() => {
    if (pId) return;
    const d = getStaff();
    if (d) {
      setStaffId(d._id || d.id || "");
      setStaffName(d.name || d.firstName || "");
      const slug = (d.slug || d.roleName || "").toLowerCase();
      setStaffRole(slug.includes("admin-assistant") || slug.includes("admin assistant") ? "admin-assistant" : "staff");
    }
  }, [pId]);

  // ─── Admin assistant list ─────────────────────────────────────────────────
  useEffect(() => {
    if (pAdmins?.length) return;
    fetch(`${Url}/management-staff`)
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.staff || data.data || []);
        setAdminList(list.filter(s => {
          const sl = (s.slug || s.roleName || "").toLowerCase();
          return sl.includes("admin-assistant") || sl.includes("admin assistant");
        }));
      })
      .catch(() => {});
  }, [pAdmins]);

  // ─── Fetch helpers ────────────────────────────────────────────────────────
  const fetchTickets = useCallback(async () => {
    if (!staffId) return;
    setLoading(true); setError("");
    try {
      const r = await fetch(`${Url}/api/support/tickets/assigned/${staffId}`);
      const d = await r.json();
      if (r.ok) setTickets(d.tickets || []);
      else setError(d.message || "Failed.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  }, [staffId]);

  const fetchEscalated = useCallback(async () => {
    if (!staffId) return;
    setLoadEsc(true);
    try {
      const r = await fetch(`${Url}/api/support/tickets/escalated-by/${staffId}`);
      const d = await r.json();
      setEscalated(r.ok ? (d.tickets || []) : []);
    } catch { setEscalated([]); }
    finally { setLoadEsc(false); }
  }, [staffId]);

  const fetchOne = useCallback(async (id) => {
    try {
      const r = await fetch(`${Url}/api/support/tickets/${id}`);
      const d = await r.json();
      if (!r.ok || !d.ticket) return;
      setTickets(prev => prev.map(t => t._id === d.ticket._id ? d.ticket : t));
      if (activeRef.current?._id === d.ticket._id) setActive(d.ticket);
    } catch {}
  }, []);

  const fetchRelated = useCallback(async (ticket) => {
    if (!ticket?.projectId || !ticket?.subject) { setRelatedTickets([]); return; }
    try {
      const r = await fetch(`${Url}/api/support/tickets/related/${ticket.projectId}/${encodeURIComponent(ticket.subject)}?excludeId=${ticket._id}`);
      const d = await r.json();
      setRelatedTickets(r.ok ? (d.tickets || []) : []);
    } catch { setRelatedTickets([]); }
  }, []);

  const markRead = useCallback(async (id) => {
    try {
      await fetch(`${Url}/api/support/tickets/${id}/mark-read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "staff" }),
      });
      setTickets(prev => prev.map(t => t._id === id ? { ...t, unreadByStaff: 0 } : t));
      setActive(prev => prev?._id === id ? { ...prev, unreadByStaff: 0 } : prev);
    } catch {}
  }, []);

  // ─── Initial load ─────────────────────────────────────────────────────────
  useEffect(() => { if (staffId) { fetchTickets(); fetchEscalated(); } }, [staffId]);
  useEffect(() => { if (tab === "escalated" && staffId) fetchEscalated(); }, [tab, staffId]);
  useEffect(() => {
    if (active && !isEscActive) fetchRelated(active);
    else setRelatedTickets([]);
  }, [active, isEscActive, fetchRelated]);

  // ─── Socket ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!staffId) return;

    const s = socketIo(Url, {
      transports: ["websocket"],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });
    sockRef.current = s;

    const joinRoom = () => {
      const token = getToken();
      if (token) s.emit("join", token);
      s.emit("joinStaff", staffId);
    };
    s.on("connect",   joinRoom);
    s.on("reconnect", joinRoom);

    // ── New ticket assigned ──────────────────────────────────────────────
    s.on("support:assigned_to_you", (d) => {
      playNotifSound();
      Swal.fire({ toast: true, position: "top-end", icon: "info", showConfirmButton: false, timer: 4500, title: `New: #${d.ticketCode}`, text: d.subject });
      setTickets(prev => prev.some(t => t._id === d._id) ? prev : [d, ...prev]);
    });

    // ── Ticket updated ───────────────────────────────────────────────────
    s.on("support:ticket_updated", (u) => {
      if (u.assignedTo?.id !== staffId) {
        setTickets(prev => prev.filter(t => t._id !== u._id));
        if (activeRef.current?._id === u._id) setActive(null);
        fetchEscalated();
        return;
      }
      playNotifSound();
      setTickets(prev => {
        const exists = prev.some(t => t._id === u._id);
        return exists ? prev.map(t => t._id === u._id ? u : t) : [u, ...prev];
      });
      if (activeRef.current?._id === u._id) setActive(u);
    });

    // ✅ FIX: String() comparison use karo — ObjectId vs string mismatch fix
    s.on("support:new_message", (d) => {
      const tid      = d.ticketId;
      const sender   = d.message?.sender   || "";
      const senderId = d.message?.senderId || "";

      // ✅ Apna message ignore karo — String() se compare karo taaki ObjectId match ho
      if (sender === "staff" && String(senderId) === String(staffId)) return;

      const isActiveTicket = activeRef.current?._id === tid;

      if (isActiveTicket) {
        // Chat open hai — fresh data fetch karo
        fetchOne(tid);
      } else {
        // ✅ Doosre staff ka message — sound nahi bajao
        if (sender === "staff") return;

        // Sirf client message par sound bajao
        playNotifSound();
        setTickets(prev => prev.map(t => {
          if (t._id !== tid) return t;
          const newMsg = {
            message:    d.message?.message    || "",
            senderName: d.message?.senderName || "",
            sender,
            createdAt:  new Date().toISOString(),
          };
          return {
            ...t,
            unreadByStaff: (t.unreadByStaff || 0) + 1,
            messages:      [...(t.messages || []), newMsg],
          };
        }));
      }
    });

    // ── Server unread sync ───────────────────────────────────────────────
    s.on("support:unread_update", ({ ticketId: tid, unreadByStaff }) => {
      if (unreadByStaff === undefined || activeRef.current?._id === tid) return;
      setTickets(prev => prev.map(t => t._id === tid ? { ...t, unreadByStaff } : t));
    });

    return () => {
      s.off("connect",   joinRoom);
      s.off("reconnect", joinRoom);
      s.disconnect();
      sockRef.current = null;
    };
  }, [staffId, fetchOne, fetchEscalated]);

  // ─── Actions ──────────────────────────────────────────────────────────────
  const handleResolve = async () => {
    if (!active || resolving) return;
    const ok = await Swal.fire({ title: "Mark as Resolved?", icon: "question", showCancelButton: true, confirmButtonText: "Yes, resolve", confirmButtonColor: "#16A34A" });
    if (!ok.isConfirmed) return;
    setResolving(true);
    try {
      const r = await fetch(`${Url}/api/support/tickets/${active._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "resolved" }),
      });
      const d = await r.json();
      if (r.ok) {
        Swal.fire({ icon: "success", title: "Resolved!", timer: 2000, showConfirmButton: false });
        setActive(d.ticket);
        setTickets(prev => prev.map(t => t._id === d.ticket._id ? d.ticket : t));
        setShowEsc(false);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: d.message });
      }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Network error." }); }
    finally { setResolving(false); }
  };

  const handleEscalate = async () => {
    if (!active || !escForm.reason.trim()) { Swal.fire({ icon: "warning", title: "Reason required" }); return; }
    if (escForm.toRole === "admin-assistant" && !escForm.toId) {
      if (!adminList.length) { setEscForm(f => ({ ...f, toRole: "admin", toId: "", toName: "Admin" })); return; }
      Swal.fire({ icon: "warning", title: "Select an assistant" }); return;
    }
    setEscalating(true);
    try {
      const r = await fetch(`${Url}/api/support/tickets/${active._id}/escalate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromId: staffId, fromName: staffName,
          toRole: escForm.toRole,
          toId: escForm.toRole === "admin" ? null : escForm.toId,
          toName: escForm.toRole === "admin" ? "Admin" : escForm.toName,
          reason: escForm.reason,
        }),
      });
      const d = await r.json();
      if (r.ok) {
        Swal.fire({ icon: "success", title: "Escalated!", timer: 2000, showConfirmButton: false });
        setTickets(prev => prev.filter(t => t._id !== active._id));
        setEscalated(prev => [d.ticket, ...prev.filter(t => t._id !== d.ticket._id)]);
        setActive(null); setShowEsc(false); setRelatedTickets([]);
        setEscForm({ toRole: staffRole === "staff" ? "admin-assistant" : "admin", toId: "", toName: "", reason: "" });
        fetchEscalated();
      } else {
        Swal.fire({ icon: "error", title: "Error", text: d.message });
      }
    } catch { Swal.fire({ icon: "error", title: "Error", text: "Escalation failed." }); }
    finally { setEscalating(false); }
  };

  const openTicket = (ticket, isEsc = false) => {
    setActive(ticket);
    setIsEscActive(isEsc);
    setShowEsc(false);
    if (!isEsc) markRead(ticket._id);
  };

  // ─── Derived ──────────────────────────────────────────────────────────────
  const list       = tab === "all" ? tickets : tab === "escalated" ? escalated : tickets.filter(t => t.status === tab);
  const actionable = active && !["closed", "resolved"].includes(active.status) && !isEscActive;
  const totalUnread = tickets.reduce((s, t) => s + (t.unreadByStaff || 0), 0);

  const TABS = [
    { key: "all",         label: "All",         cnt: tickets.length },
    { key: "open",        label: "Open",        cnt: tickets.filter(t => t.status === "open").length },
    { key: "in-progress", label: "In Progress", cnt: tickets.filter(t => t.status === "in-progress").length },
    { key: "resolved",    label: "Resolved",    cnt: tickets.filter(t => t.status === "resolved").length },
    { key: "escalated",   label: "Escalated",   cnt: escalated.length },
  ];

  if (!staffId) return (
    <div className="shs-root" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 80, color: "#9CA3AF" }}>
      {Icon.lock}
      <p style={{ fontWeight: 600, fontSize: 15, color: "#374151", margin: 0 }}>Staff identity not found</p>
      <p style={{ fontSize: 13, margin: 0 }}>Please login or refresh the page.</p>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="shs-root" style={{ padding: "28px 24px", maxWidth: 1080, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 26 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827", letterSpacing: -0.3, display: "flex", alignItems: "center", gap: 10 }}>
              Support Tickets
              {totalUnread > 0 && (
                <span style={{ background: "#EF4444", color: "#fff", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
                  {totalUnread} unread
                </span>
              )}
            </h2>
            <p style={{ margin: "5px 0 0", fontSize: 12.5, color: "#9CA3AF" }}>
              Assigned to <strong style={{ color: "#374151" }}>{staffName}</strong>
              <span style={{ margin: "0 6px", color: "#E5E7EB" }}>·</span>
              {staffRole}
              {adminList.length > 0 && (<><span style={{ margin: "0 6px", color: "#E5E7EB" }}>·</span><span style={{ color: "#7C3AED" }}>{adminList.length} assistant(s)</span></>)}
            </p>
          </div>
          <button onClick={() => { fetchTickets(); fetchEscalated(); }} className="shs-btn"
            style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", fontSize: 12.5, color: "#374151", fontWeight: 500, display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
            {Icon.refresh} Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 16px", marginBottom: 18, fontSize: 13, color: "#991B1B" }}>
            {error}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, marginBottom: 20, background: "#F3F4F6", borderRadius: 11, padding: 3, flexWrap: "wrap" }}>
          {TABS.map(t => {
            const on = tab === t.key;
            const ac = t.key === "escalated" ? "#7C3AED" : t.key === "resolved" ? "#16A34A" : "#2563EB";
            return (
              <button key={t.key} className="shs-tab"
                onClick={() => { setTab(t.key); setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }}
                style={{ flex: 1, minWidth: 80, padding: "7px 10px", borderRadius: 8, border: "none", background: on ? "#fff" : "transparent", boxShadow: on ? "0 1px 4px rgba(0,0,0,0.09)" : "none", fontWeight: on ? 600 : 500, color: on ? ac : "#6B7280", cursor: "pointer", fontSize: 12.5, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                {t.label}
                {t.cnt > 0 && <span style={{ background: on ? ac : "#D1D5DB", color: on ? "#fff" : "#6B7280", borderRadius: 99, minWidth: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, padding: "0 4px", fontWeight: 700 }}>{t.cnt}</span>}
              </button>
            );
          })}
        </div>

        {tab === "escalated" && !active && (
          <div style={{ background: "#F5F3FF", border: "1px solid #EDE9FE", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 12.5, color: "#6D28D9", display: "flex", alignItems: "center", gap: 8 }}>
            {Icon.info} Tickets you've escalated — view only.
          </div>
        )}

        {/* Active Ticket View */}
        {active ? (
          <div style={{ border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            {/* Ticket Header */}
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${isEscActive ? "#EDE9FE" : "#F1F5F9"}`, background: isEscActive ? "#FDFCFF" : "#FAFBFC", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => { setActive(null); setIsEscActive(false); setShowEsc(false); setRelatedTickets([]); }} className="shs-btn"
                  style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #E5E7EB", background: "#F3F4F6", color: "#374151", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                  {Icon.back}
                </button>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 13.5, color: "#111827" }}>
                    #{active.ticketId} — {active.subject === "Other" ? active.customSubject : active.subject}
                  </p>
                  <p style={{ margin: "3px 0 0", fontSize: 11.5, color: "#9CA3AF" }}>{active.clientName} · {active.projectName || active.projectId}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                <Badge label={active.status} map={STATUS_MAP} />
                <Badge label={active.priority} map={PRIORITY_MAP} />
                {actionable && (
                  <button onClick={handleResolve} disabled={resolving} className="shs-btn"
                    style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: resolving ? "#BBF7D0" : "#16A34A", color: "#fff", fontWeight: 600, fontSize: 12, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                    {Icon.check} {resolving ? "Resolving…" : "Resolve"}
                  </button>
                )}
                {actionable && (
                  <button onClick={() => setShowEsc(v => !v)} className="shs-btn"
                    style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${showEsc ? "#FDE68A" : "#E5E7EB"}`, background: showEsc ? "#FFFBEB" : "#fff", color: showEsc ? "#92400E" : "#374151", fontWeight: 600, fontSize: 12, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                    {Icon.up} Escalate
                  </button>
                )}
                {isEscActive && (
                  <span style={{ padding: "4px 11px", borderRadius: 99, background: "#F5F3FF", color: "#6D28D9", fontSize: 11, fontWeight: 600, border: "1px solid #EDE9FE" }}>Escalated by you</span>
                )}
              </div>
            </div>

            {!isEscActive && active.status === "resolved" && (
              <div style={{ padding: "10px 20px", background: "#F0FDF4", borderBottom: "1px solid #BBF7D0", fontSize: 12.5, color: "#15803D", display: "flex", alignItems: "center", gap: 6 }}>
                {Icon.check} You've resolved this ticket. Admin will close it.
              </div>
            )}

            {!isEscActive && <RelatedTicketsBanner tickets={relatedTickets} onSelect={(t) => openTicket(t, false)} />}
            {isEscActive && <EscalationLog log={active.escalationLog} />}
            {showEsc && !isEscActive && (
              <EscalatePanel staffRole={staffRole} adminList={adminList} form={escForm} setForm={setEscForm}
                onConfirm={handleEscalate} onCancel={() => setShowEsc(false)} loading={escalating} />
            )}

            <TicketChat ticket={active} staffId={staffId} staffName={staffName} readOnly={isEscActive} onMarkRead={markRead}
              onUpdate={u => { setActive(u); setTickets(prev => prev.map(t => t._id === u._id ? u : t)); }} />
          </div>

        ) : (loading && tab !== "escalated") || (loadEsc && tab === "escalated") ? (
          <div style={{ textAlign: "center", padding: 80, color: "#C4CAD4" }}>
            {Icon.spin}
            <p style={{ fontSize: 13, marginTop: 12, color: "#9CA3AF" }}>Loading tickets…</p>
          </div>

        ) : list.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 40px", border: "1px dashed #E5E7EB", borderRadius: 14, background: "#FAFBFC" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{Icon.empty}</div>
            <p style={{ fontWeight: 600, fontSize: 14.5, color: "#374151", margin: "0 0 6px" }}>
              {tab === "all" ? "No tickets assigned" : tab === "escalated" ? "No escalated tickets" : `No ${tab} tickets`}
            </p>
            <p style={{ fontSize: 12.5, color: "#9CA3AF", margin: 0 }}>
              {tab === "all" ? "Tickets assigned to you will appear here." : tab === "escalated" ? "Tickets you escalate will appear here." : "Check another tab."}
            </p>
          </div>

        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {list.map(ticket => (
              <TicketCard key={ticket._id} ticket={ticket} isEsc={tab === "escalated"} staffId={staffId}
                onOpen={() => openTicket(ticket, tab === "escalated")} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StaffHelpSupport;