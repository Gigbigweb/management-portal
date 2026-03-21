
// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const scrollRef = useRef(null);
//   const [messages, setMessages] = useState([]);
// const [msgPage, setMsgPage] = useState(1);
// const [msgHasMore, setMsgHasMore] = useState(true);
// const msgBoxRef = useRef(null);


//   const userId = 1000; 

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: {
//           userId: userId,
//           page: page,
//           limit: 4,
//         },
//       });
  
//       const data = res.data;
//       console.log("conversation",data);
  
//       if (data.length < 4) setHasMore(false);
//       setProjectList((prev) => [...prev, ...data]);
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };
  

//   const fetchMessages = async () => {
//     if (!convId) return;
  
//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: {
//           convId: convId,
//           page: msgPage,
//           limit: 10
//         },
//       });
//   console.log("message",res)
//       if (res.data.length < 10) setMsgHasMore(false);
//       setMessages(prev => [...res.data.reverse(), ...prev]); 
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };
  

//   useEffect(() => {
//     fetchConversations();
//   }, [page]);

//   const handleScroll = (e) => {
//     const isBottom =
//       e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
//     if (isBottom && hasMore) {
//       setPage((prev) => prev + 1);
//     }
//   };
//   const handleMessageScroll = (e) => {
//     if (e.target.scrollTop === 0 && msgHasMore) {
//       setMsgPage(prev => prev + 1);
//     }
//   };
  
//   useEffect(() => {
//     setMessages([]);
//     setMsgPage(1);
//     setMsgHasMore(true);
//   }, [convId]);
  
//   useEffect(() => {
//     fetchMessages();
//   }, [convId, msgPage]);
//   useEffect(() => {
//     if (msgPage === 1 && msgBoxRef.current) {
//       const box = msgBoxRef.current;
//       box.scrollTop = box.scrollHeight;
//     }
//   }, [messages, msgPage]);
  

//   return (
//     <div
//       className="container-fluid p-0"
//       style={{ height: "70vh", fontFamily: "'Poppins', sans-serif" }}
//     >
//       <div className="row g-0 h-100">
       
//         <div className="col-lg-3 border-end d-flex flex-column p-3 h-100">
//           <h5 className="mb-3 fw-bold">Conversations</h5>
//           <div
//             className="flex-grow-1 overflow-auto"
//             ref={scrollRef}
//             onScroll={handleScroll}
//           >
//             {projectList.map((proj) => (
//               <a
//                 key={proj._id}
//                 href={`?convId=${proj._id}`}
//                 className={`d-flex align-items-center gap-3 p-3 mb-2 rounded-3 text-decoration-none ${
//                   convId === proj._id
//                     ? "text-white"
//                     : "text-dark bg-white shadow-sm"
//                 }`}
//                 style={{
//                   background:
//                     convId === proj._id
//                       ? "linear-gradient(to right, #4e54c8, #8f94fb)"
//                       : "#fff",
//                   transition: "0.3s",
//                   borderLeft:
//                     convId === proj._id
//                       ? "4px solid #4e54c8"
//                       : "4px solid transparent",
//                 }}
//               >
//                 <img
//                   src="/assets/images/avatars/avatar_default.jpg"
//                   alt="avatar"
//                   className="rounded-circle"
//                   width="40"
//                   height="40"
//                   style={{
//                     border:
//                       convId === proj._id
//                         ? "2px solid white"
//                         : "2px solid #ddd",
//                   }}
//                 />
//                 <div className="small">
//                   <div className="fw-semibold">ID: {proj.projectId}</div>
//                   <div className="text-muted">{proj.projectName}</div>
//                   <div className="text-muted">
//                     {new Date(proj.createdAt).toLocaleDateString()}
//                   </div>
//                 </div>
//               </a>
//             ))}
   

//             {!hasMore && (
//               <div className="text-center text-muted my-3 small">
//                 No more conversations
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ——— Middle: Chat Panel ——— */}
//         <div className="col-lg-6 d-flex flex-column p-3 h-100">
//         <div
//   className="card-body flex-grow-1 overflow-auto p-4"
//   style={{
//     background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//     height: "calc(80vh - 120px)",
//   }}
//   onScroll={handleMessageScroll}
//   ref={msgBoxRef}
// >
// {messages.map((msg, idx) => {
//   const senderRole = msg.sender?.type
//     ? msg.sender.type.charAt(0).toUpperCase() + msg.sender.type.slice(1)
//     : "Unknown";

//   return (
//     <div
//       key={idx}
//       className="d-flex flex-column mb-4 align-items-start"
//     >
//       <div
//         className="p-3 shadow-sm position-relative bg-primary text-white"
//         style={{
//           maxWidth: "75%",
//           borderRadius: "1rem 1rem 1rem 0.2rem",
//           fontSize: "0.95rem",
//           wordBreak: "break-word",
//           transition: "all 0.2s ease-in-out",
//         }}
//       >
//         <div className="mb-2" style={{ fontWeight: 600 }}>
//           {msg.sender?.id?.name}
//           <span
//             className="ms-2"
//             style={{
//               fontSize: "0.75rem",
//               fontWeight: 500,
//               color: "#ffdd99",
//             }}
//           >
//             ({senderRole})
//           </span>
//         </div>

//         <div>{msg.message}</div>

//         <div
//           className="mt-2"
//           style={{
//             fontSize: "0.75rem",
//             textAlign: "right",
//             opacity: 0.85,
//           }}
//         >
//           {new Date(msg.createdAt).toLocaleString()}
//         </div>
//       </div>
//     </div>
//   );
// })}


//   {!msgHasMore && (
//     <div className="text-center text-muted small mt-3">No more messages</div>
//   )}
// </div>


// </div>


//         {/* ——— Right: Services & Team ——— */}
//         <div className="col-lg-3 d-flex flex-column p-3 h-100 gap-4">
//           <div className="card border-0 shadow-sm rounded-4 flex-shrink-0">
//             <div
//               className="px-4 py-2 text-white fw-semibold"
//               style={{
//                 background: "linear-gradient(to right, #11998e, #38ef7d)",
//                 borderTopLeftRadius: "1rem",
//                 borderTopRightRadius: "1rem",
//               }}
//             >
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//   {projectList
//     .find((proj) => proj._id.toString() === convId)
//     ?.projectDetails?.service?.map((svc, i) => (
//       <li
//         key={i}
//         className="list-group-item d-flex align-items-center justify-content-between px-4 py-2"
//       >
//         <div>
//           <i className="bi bi-check-circle-fill text-success me-2"></i>
//           {svc.serviceName}
//         </div>
//         <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>
//           •
//         </span>
//       </li>
//     ))}
// </ul>

//           </div>

//           {/* <div className="card border-0 shadow-sm rounded-4 flex-grow-1 d-flex flex-column">
//             <div
//               className="px-4 py-2 text-white fw-semibold"
//               style={{
//                 background: "linear-gradient(to right, #00c6ff, #0072ff)",
//                 borderTopLeftRadius: "1rem",
//                 borderTopRightRadius: "1rem",
//               }}
//             >
//               Your Team
//             </div>
//             <div className="card-body flex-grow-1 overflow-auto text-center">
//               <i className="bi bi-clock-history fs-1 text-danger mb-2"></i>
//               <p className="fw-semibold text-danger mb-1">Please wait...</p>
//               <small className="text-muted">
//                 Your team will be allotted shortly.
//               </small>
//             </div>
//           </div> */}
//   <div className="card h-100">
//   <div className="card-header fw-bold fs-5">Your Team</div>
//   <div className="card-body flex-grow-1 overflow-auto">
//     {projectList
//       .find((proj) => proj._id.toString() === convId)
//       ?.members.filter((member) => member.userType === "staff")
//       .map((member, i) => (
//         <div key={i} className="d-flex align-items-center gap-3 p-2 border-bottom">
//           <img
//             src="/assets/images/avatars/avatar_default.jpg"
//             alt="avatar"
//             className="rounded-circle"
//             width="40"
//             height="40"
//           />
//           <div className="text-start">
//             <div className="fw-semibold">
//               {member.userId?.name || "Unnamed Staff"}
//             </div>
//             <div className="text-muted small text-capitalize">
//               {member.userId?.role}
//             </div>
//           </div>
//         </div>
//       ))}

//     {projectList
//       .find((proj) => proj._id.toString() === convId)
//       ?.members.filter((member) => member.userType === "staff").length === 0 && (
//       <div className="text-center text-muted mt-3">
//         No staff members assigned yet.
//       </div>
//     )}
//   </div>
// </div>


//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;





// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";


// const ProjectChat = () => {
 

//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);

//   const scrollRef = useRef(null);
//   const msgBoxRef = useRef(null);
//   const prevHeightRef = useRef(0);
//   const prevScrollTopRef = useRef(0);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { page, limit: 4 },
//       });

//       if (res.data.length < 4) setHasMore(false);
//       setProjectList((prev) => [...prev, ...res.data]);
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: {
//           convId,
//           page: msgPage,
//           limit: 5,
//         },
//       });
  
//       const { messages: fetchedMessages, totalCount } = res.data;
  
//       if ((msgPage - 1) * 5 + fetchedMessages.length >= totalCount) {
//         setMsgHasMore(false);
//       }
  
//       // Append at top, oldest first
//       setMessages(prev => [...fetchedMessages.reverse(), ...prev]);
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };
  

//   // Initial conversation fetch (pagination)
//   useEffect(() => {
//     fetchConversations();
//   }, [page]);

//   // Scroll load for conversations
//   const handleScroll = (e) => {
//     if (
//       e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
//       hasMore
//     ) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   // Reset messages on conversation change
//   useEffect(() => {
//     if (!convId) return;
  
//     // Reset on new conversation
//     setMessages([]);
//     setMsgPage(1);
//     setMsgHasMore(true);
//   }, [convId]);
  

//   // Fetch messages whenever convId or msgPage changes
//   useEffect(() => {
//     if (convId) fetchMessages();
//   }, [convId, msgPage]);
  

//   // Before loading older messages: store scroll height and scrollTop
//   useEffect(() => {
//     const box = msgBoxRef.current;
//     if (box) {
//       prevHeightRef.current = box.scrollHeight;
//       prevScrollTopRef.current = box.scrollTop;
//     }
//   }, [msgPage]);

//   // After messages load: restore scroll
//   useEffect(() => {
//     const box = msgBoxRef.current;
//     if (!box) return;

//     if (msgPage === 1) {
//       box.scrollTop = box.scrollHeight;
//     } else {
//       setTimeout(() => {
//         const newHeight = box.scrollHeight;
//         const heightDiff = newHeight - prevHeightRef.current;
//         box.scrollTop = prevScrollTopRef.current + heightDiff;
//       }, 0);
//     }
//   }, [messages]);

//   const handleMessageScroll = (e) => {
//     if (e.target.scrollTop < 50 && msgHasMore) {
//       setMsgPage(prev => prev + 1);
//     }
//   };
  
//   return (
//     <div className="container-fluid p-0" style={{ height: "73vh", fontFamily: "'Poppins', sans-serif" }}>
//       <div className="row g-0 h-100">
//         {/* Left Column - Conversations */}
//         <div className="col-lg-3 border-end d-flex flex-column p-3 h-100">
//           <h5 className="mb-3 fw-bold">Conversations</h5>
//           <div className="flex-grow-1 overflow-auto" ref={scrollRef} onScroll={handleScroll}>
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => navigate(`?convId=${proj._id}`)}
//                   className={`d-flex align-items-center gap-3 p-3 mb-2 rounded-3 cursor-pointer ${
//                     isActive ? "active-conv" : "bg-white text-dark"
//                   }`}
//                   style={{
//                     borderLeft: isActive ? "4px solid #4e54c8" : "4px solid transparent",
//                     transition: "0.3s",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                     style={{ border: isActive ? "2px solid white" : "2px solid #ddd" }}
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div className={isActive ? "text-dark" : "text-muted"}>{proj.projectName}</div>
//                     <div className={isActive ? "text-dark" : "text-muted"}>
//                       {new Date(proj.createdAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//             {!hasMore && <div className="text-center text-muted my-3 small">No more conversations</div>}
//           </div>
//         </div>

//         {/* Center - Chat Panel */}
//         <div className="col-lg-6 d-flex flex-column p-0 h-100 border-end">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{ background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)" }}
//             onScroll={handleMessageScroll}
//             ref={msgBoxRef}
//           >
//             {messages.map((msg, idx) => {
//               const senderName = msg?.sender?.id?.name || "Unknown";
//               const senderType = msg?.sender?.type || "unknown";
//               const role = msg?.sender?.id?.role;
//               const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy hh:mm a");

//               let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//               if (senderType === "staff" && role) {
//                 roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//               }

//               return (
//                 <div key={idx} className="d-flex mb-3 justify-content-start">
//                   <div
//                     className="p-3 shadow-sm"
//                     style={{
//                       maxWidth: "70%",
//                       background: "#f8f9fa",
//                       borderRadius: "1rem 1rem 1rem 0.3rem",
//                       border: "1px solid #dee2e6",
//                       boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
//                     }}
//                   >
//                     <div className="mb-2 text-warning" style={{ fontWeight: 200 }}>
//                       {senderName}
//                       <span className="ms-2 small text-muted">{roleDisplay}</span>
//                     </div>
//                     <div>{msg.message}</div>
//                     <div className="mt-2 small text-muted text-end">{formattedDate}</div>
//                   </div>
//                 </div>
//               );
//             })}

//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           {/* Input */}
//           <div className="p-3 d-flex align-items-center gap-2 border-top bg-white" style={{ position: "sticky", bottom: 0, zIndex: 100 }}>
//             <input type="text" placeholder="Type your message..." className="form-control" style={{ flex: 1 }} readOnly />
//             <input type="file" id="file-upload" style={{ display: "none" }} />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload text-secondary me-2"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         {/* Right - Services & Team */}
//         <div className="col-lg-3 d-flex flex-column p-3 h-100 gap-4">
//           {/* Services */}
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((proj) => proj._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex align-items-center justify-content-between px-4 py-2">
//                   <div>
//                     <i className="bi bi-check-circle-fill text-success me-2"></i>
//                     {svc.serviceName}
//                   </div>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Team */}
//           <div className="card h-100">
//             <div className="card-header fw-bold fs-5">Your Team</div>
//             <div className="card-body flex-grow-1 overflow-auto">
//               {projectList
//                 .find((proj) => proj._id.toString() === convId)
//                 ?.members.filter((m) => m.userType === "staff")
//                 .map((member, i) => (
//                   <div key={i} className="d-flex align-items-center gap-3 p-2 border-bottom">
//                     <img src="/assets/images/avatars/avatar_default.jpg" alt="avatar" className="rounded-circle" width="40" height="40" />
//                     <div className="text-start">
//                       <div className="fw-semibold">{member.userId?.name || "Unnamed Staff"}</div>
//                       <div className="text-muted small text-capitalize">{member.userId?.role}</div>
//                     </div>
//                   </div>
//                 ))}

//               {projectList
//                 .find((proj) => proj._id.toString() === convId)
//                 ?.members.filter((m) => m.userType === "staff").length === 0 && (
//                 <div className="text-center text-muted mt-3">No staff members assigned yet.</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;














// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);

//   const scrollRef = useRef(null);
//   const msgBoxRef = useRef(null);
//   const prevHeightRef = useRef(0);
//   const prevScrollTopRef = useRef(0);

//   useEffect(() => {
//     fetchConversations();
//   }, [page]);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { page, limit: 4 },
//       });

//       if (res.data.length < 4) setHasMore(false);
//       setProjectList((prev) => [...prev, ...res.data]);
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };


//   const fetchMessages = async () => {
//     const box = msgBoxRef.current;
  
//     // Save the scroll position before fetching new messages
//     if (box && msgPage !== 1) {
//       prevScrollTopRef.current = box.scrollTop;
//       prevHeightRef.current = box.scrollHeight;
//     }
  
//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: { convId, page: msgPage, limit: 5 },
//       });
  
//       const { messages: fetchedMessages, totalCount } = res.data;
  
//       if ((msgPage - 1) * 5 + fetchedMessages.length >= totalCount) {
//         setMsgHasMore(false);
//       }
  
//       // Add the fetched messages at the bottom (in reverse order)
//       setMessages((prev) => [...fetchedMessages.reverse(), ...prev]);
  
//       // Scroll adjustment after new messages are loaded
//       requestAnimationFrame(() => {
//         const box = msgBoxRef.current;
//         const newHeight = box.scrollHeight;
  
//         if (box.scrollHeight - box.scrollTop === box.clientHeight) {
//           // Keep at the bottom if already at the bottom
//           box.scrollTop = newHeight;
//         } else {
//           // Adjust based on previous scroll position
//           box.scrollTop = prevHeightRef.current - newHeight + prevScrollTopRef.current;
//         }
//       });
  
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };
  
  
  
  
  
   
//   useEffect(() => {
//     if (!convId) return;
//     setMessages([]);
//     setMsgPage(1);
//     setMsgHasMore(true);
//   }, [convId]);

//   useEffect(() => {
//     if (convId) fetchMessages();
//   }, [convId, msgPage]);

//   useEffect(() => {
//     const box = msgBoxRef.current;
//     if (box) {
//       prevHeightRef.current = box.scrollHeight;
//       prevScrollTopRef.current = box.scrollTop;
//     }
//   }, [msgPage]);
  

  
  
  
  
// // Handle scrolling in conversation list
// const handleScroll = (e) => {
//   if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && hasMore) {
//     setPage((prev) => prev + 1);
//   }
// };

// // Handle scrolling in message box
// const handleMessageScroll = (e) => {
//   const box = e.target;

//   // If user has scrolled to the top and there are more messages to fetch
//   if (box.scrollTop <= 0 && msgHasMore) {
//     setMsgPage((prev) => prev + 1); // Load previous messages
//   }

//   // If scroll is near the bottom, ensure it stays at the bottom for new messages
//   if (box.scrollHeight - box.scrollTop === box.clientHeight) {
//     box.scrollTop = box.scrollHeight;
//   }
// };

//   useEffect(() => {
//     const box = msgBoxRef.current;
//     if (box) {
//       if (msgPage === 1) {
//         // Automatically scroll to the bottom for the first time
//         setTimeout(() => {
//           box.scrollTop = box.scrollHeight;
//         }, 0);
//       } else {
//         // Adjust scroll position when new messages are loaded
//         setTimeout(() => {
//           const newHeight = box.scrollHeight;
//           const scrollDifference = newHeight - prevHeightRef.current;
//           box.scrollTop = prevScrollTopRef.current + scrollDifference;
//         }, 0);
//       }
//     }
//   }, [messages]);
  

//   return (
//     <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
//       <div className="row g-0 h-100">
//         {/* Conversations */}
//         <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
//           <div className="p-3 border-bottom sticky-top bg-light z-3">
//             <h5 className="mb-0 fw-bold">Chats</h5>
//           </div>
//           <div className="flex-grow-1 overflow-auto" ref={scrollRef} onScroll={handleScroll}>
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => navigate(`?convId=${proj._id}`)}
//                   className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
//                   style={{
//                     borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
//                     transition: "all 0.3s ease",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div>{proj.projectName}</div>
//                     <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               );
//             })}
//             {!hasMore && <div className="text-center text-muted py-2 small">No more conversations</div>}
//           </div>
//         </div>

//         {/* Chat Panel */}
//         <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{
//               background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//               scrollBehavior: "smooth",
//             }}
//             ref={msgBoxRef}
//             onScroll={handleMessageScroll}
//           >
//             {/* {messages.map((msg, idx) => {
//               const senderName = msg?.sender?.id?.name || "Unknown";
//               const senderType = msg?.sender?.type || "unknown";
//               const role = msg?.sender?.id?.role;
//               const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy hh:mm a");

//               let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//               if (senderType === "staff" && role) {
//                 roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//               }

//               return (
//                 <div key={idx} className="d-flex mb-3">
//                   <div
//                     className="p-3 rounded-4 shadow-sm"
//                     style={{
//                       backgroundColor: "#ffffff",
//                       border: "1px solid #dee2e6",
//                       maxWidth: "75%",
//                     }}
//                   >
//                     <div className="text-warning fw-semibold mb-2">
//                       {senderName} <span className="text-muted small ms-2">{roleDisplay}</span>
//                     </div>
//                     <div>{msg.message}</div>
//                     <div className="mt-2 small text-end text-muted">{formattedDate}</div>
//                   </div>
//                 </div>
//               );
//             })} */}
// {messages.map((msg, idx) => {
//   const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
//   const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
//   const showDateHeader = currentDate !== previousDate;

//   const senderName = msg?.sender?.id?.name || "Unknown";
//   const senderType = msg?.sender?.type || "unknown";
//   const role = msg?.sender?.id?.role;
//   const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
//   const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

//   let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//   if (senderType === "staff" && role) {
//     roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//   }

//   return (
//     <React.Fragment key={idx}>
//       {showDateHeader && (
//         <div className="text-center my-2">
//           <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
//             {formattedDate}
//           </span>
//         </div>
//       )}

//       <div className="d-flex mb-2">
//         <div
//           className="p-2 px-3 rounded-3 shadow-sm"
//           style={{
//             backgroundColor: "#ffffff",
//             border: "1px solid #dee2e6",
//             maxWidth: "65%",
//             fontSize: "0.92rem",
//             lineHeight: "1.3",
//           }}
//         >
//           <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
//             {senderName}
//             <span className="text-muted small ms-2">{roleDisplay}</span>
//           </div>
//           <div>{msg.message}</div>
//           <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
//             {formattedTime}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// })}


//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           {/* Input Box */}
//           <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
//             <input type="text" className="form-control" placeholder="Type your message..." readOnly />
//             <input type="file" id="file-upload" hidden />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
//             <div className="card-header fw-bold">Your Team</div>
//             <div className="card-body overflow-auto">
//               {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
//                 <div key={i} className="d-flex align-items-center gap-3 mb-3">
//                   <img src="/assets/images/avatars/avatar_default.jpg" alt="avatar" className="rounded-circle" width="40" height="40" />
//                   <div>
//                     <div className="fw-semibold">{m.userId?.name || "Unnamed"}</div>
//                     <div className="text-muted small">{m.userId?.role}</div>
//                   </div>
//                 </div>
//               )) || <div className="text-muted text-center">No team assigned</div>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;




// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);

//   const scrollRef = useRef(null);
//   const msgBoxRef = useRef(null);
//   const prevHeightRef = useRef(0);
//   const prevScrollTopRef = useRef(0);

//   // Fetch conversations
//   useEffect(() => {
//     fetchConversations();
//   }, [page]);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { page, limit: 4 },
//       });

//       if (res.data.length < 4) setHasMore(false);
//       setProjectList((prev) => [...prev, ...res.data]);
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };

//   // Fetch messages for selected conversation
//   const fetchMessages = async () => {
//     const box = msgBoxRef.current;
    
//     // Save the scroll position before fetching new messages
//     if (box && msgPage !== 1) {
//       prevScrollTopRef.current = box.scrollTop;
//       prevHeightRef.current = box.scrollHeight;
//     }

//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: { convId, page: msgPage, limit: 5 },
//       });

//       const { messages: fetchedMessages, totalCount } = res.data;

//       if ((msgPage - 1) * 5 + fetchedMessages.length >= totalCount) {
//         setMsgHasMore(false);
//       }

//       // Add the fetched messages at the bottom (in reverse order)
//       setMessages((prev) => [...fetchedMessages.reverse(), ...prev]);

//       // Scroll adjustment after new messages are loaded
//       requestAnimationFrame(() => {
//         const box = msgBoxRef.current;
//         const newHeight = box.scrollHeight;

//         if (box.scrollHeight - box.scrollTop === box.clientHeight) {
//           // Keep at the bottom if already at the bottom
//           box.scrollTop = newHeight;
//         } else {
//           // Adjust based on previous scroll position
//           box.scrollTop = prevHeightRef.current - newHeight + prevScrollTopRef.current;
//         }
//       });

//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };

//   // Reset messages when conversation changes
//   useEffect(() => {
//     if (!convId) return;
//     setMessages([]);
//     setMsgPage(1);
//     setMsgHasMore(true);
//   }, [convId]);

//   // Load new messages when conversation changes
//   useEffect(() => {
//     if (convId) fetchMessages();
//   }, [convId, msgPage]);

//   useEffect(() => {
//     const box = msgBoxRef.current;
//     if (box) {
//       prevHeightRef.current = box.scrollHeight;
//       prevScrollTopRef.current = box.scrollTop;
//     }
//   }, [msgPage]);

//   // Handle scrolling in conversation list
//   const handleScroll = (e) => {
//     if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight && hasMore) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   // Handle scrolling in message box
//   const handleMessageScroll = (e) => {
//     const box = e.target;

//     // If user has scrolled to the top and there are more messages to fetch
//     if (box.scrollTop <= 0 && msgHasMore) {
//       setMsgPage((prev) => prev + 1); // Load previous messages
//     }

//     // If scroll is near the bottom, ensure it stays at the bottom for new messages
//     if (box.scrollHeight - box.scrollTop === box.clientHeight) {
//       box.scrollTop = box.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     const box = msgBoxRef.current;
//     if (box) {
//       if (msgPage === 1) {
//         // Automatically scroll to the bottom for the first time
//         setTimeout(() => {
//           box.scrollTop = box.scrollHeight;
//         }, 0);
//       } else {
//         // Adjust scroll position when new messages are loaded
//         setTimeout(() => {
//           const newHeight = box.scrollHeight;
//           const scrollDifference = newHeight - prevHeightRef.current;
//           box.scrollTop = prevScrollTopRef.current + scrollDifference;
//         }, 0);
//       }
//     }
//   }, [messages]);

//   return (
//     <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
//       <div className="row g-0 h-100">
//         {/* Conversations List */}
//         <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
//           <div className="p-3 border-bottom sticky-top bg-light z-3">
//             <h5 className="mb-0 fw-bold">Chats</h5>
//           </div>
//           <div className="flex-grow-1 overflow-auto" ref={scrollRef} onScroll={handleScroll}>
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => navigate(`?convId=${proj._id}`)}
//                   className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
//                   style={{
//                     borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
//                     transition: "all 0.3s ease",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div>{proj.projectName}</div>
//                     <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               );
//             })}
//             {!hasMore && <div className="text-center text-muted py-2 small">No more conversations</div>}
//           </div>
//         </div>

//         {/* Chat Panel */}
//         <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{
//               background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//               scrollBehavior: "smooth",
//             }}
//             ref={msgBoxRef}
//             onScroll={handleMessageScroll}
//           >
//             {messages.map((msg, idx) => {
//               const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
//               const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
//               const showDateHeader = currentDate !== previousDate;

//               const senderName = msg?.sender?.id?.name || "Unknown";
//               const senderType = msg?.sender?.type || "unknown";
//               const role = msg?.sender?.id?.role;
//               const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
//               const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

//               let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//               if (senderType === "staff" && role) {
//                 roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//               }

//               return (
//                 <React.Fragment key={idx}>
//                   {showDateHeader && (
//                     <div className="text-center my-2">
//                       <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
//                         {formattedDate}
//                       </span>
//                     </div>
//                   )}

//                   <div className="d-flex mb-2">
//                     <div
//                       className="p-2 px-3 rounded-3 shadow-sm"
//                       style={{
//                         backgroundColor: "#ffffff",
//                         border: "1px solid #dee2e6",
//                         maxWidth: "65%",
//                         fontSize: "0.92rem",
//                         lineHeight: "1.3",
//                       }}
//                     >
//                       <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
//                         {senderName}
//                         <span className="text-muted small ms-2">{roleDisplay}</span>
//                       </div>
//                       <div>{msg.message}</div>
//                       <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
//                         {formattedTime}
//                       </div>
//                     </div>
//                   </div>
//                 </React.Fragment>
//               );
//             })}

//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           {/* Input Box */}
//           <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
//             <input type="text" className="form-control" placeholder="Type your message..." readOnly />
//             <input type="file" id="file-upload" hidden />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
//             <div className="card-header fw-bold">Your Team</div>
//             <div className="card-body overflow-auto">
//               {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
//                 <div key={i} className="d-flex align-items-center gap-3 mb-3">
//                   <img
//                     src={m.profilePic || "/assets/images/avatars/avatar_default.jpg"}
//                     alt="team member"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">{m.name}</div>
//                     <div className="text-muted">{m.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;




// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);

//   const scrollRef = useRef(null);
//   const msgBoxRef = useRef(null);
//   const prevHeightRef = useRef(0);

//   // Fetch conversations
//   useEffect(() => {
//     fetchConversations();
//   }, [page]);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { page, limit: 4 },
//       });

//       if (res.data.length < 4) setHasMore(false);
//       setProjectList((prev) => [...prev, ...res.data]);
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };

//   // Fetch messages for selected conversation
//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: { convId, page: msgPage, limit: 5 },
//       });
// console.log("message",res)
//       const { messages: fetchedMessages, totalCount } = res.data;

//       if ((msgPage - 1) * 5 + fetchedMessages.length >= totalCount) {
//         setMsgHasMore(false);
//       }

//       setMessages((prev) => [...fetchedMessages.reverse(), ...prev]); // Add new messages at the top

//       // Auto-scroll to the bottom after loading messages
//       if (msgPage === 1) {
//         setTimeout(() => {
//           const box = msgBoxRef.current;
//           box.scrollTop = box.scrollHeight;
//         }, 0);
//       }
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };

//   // Reset messages when conversation changes
//   useEffect(() => {
//     if (!convId) return;
//     setMessages([]);
//     setMsgPage(1);
//     setMsgHasMore(true);
//   }, [convId]);

//   // Load new messages when conversation changes
//   useEffect(() => {
//     if (convId) fetchMessages();
//   }, [convId, msgPage]);

//   // Handle scrolling in message box
//   const handleMessageScroll = (e) => {
//     const box = e.target;

//     // If user has scrolled to the top and there are more messages to fetch
//     if (box.scrollTop <= 0 && msgHasMore) {
//       setMsgPage((prev) => prev + 1); // Load previous messages
//     }

//     // If scroll is near the bottom, ensure it stays at the bottom for new messages
//     if (box.scrollHeight - box.scrollTop === box.clientHeight) {
//       box.scrollTop = box.scrollHeight;
//     }
//   };

//   return (
//     <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
//       <div className="row g-0 h-100">
//         {/* Conversations List */}
//         <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
//           <div className="p-3 border-bottom sticky-top bg-light z-3">
//             <h5 className="mb-0 fw-bold">Chats</h5>
//           </div>
//           <div className="flex-grow-1 overflow-auto" ref={scrollRef} >
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => navigate(`?convId=${proj._id}`)}
//                   className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
//                   style={{
//                     borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
//                     transition: "all 0.3s ease",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div>{proj.projectName}</div>
//                     <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               );
//             })}
//             {!hasMore && <div className="text-center text-muted py-2 small">No more conversations</div>}
//           </div>
//         </div>

//         {/* Chat Panel */}
//         <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{
//               background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//               scrollBehavior: "smooth",
//             }}
//             ref={msgBoxRef}
//             onScroll={handleMessageScroll}
//           >
//             {messages.map((msg, idx) => {
//               const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
//               const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
//               const showDateHeader = currentDate !== previousDate;

//               const senderName = msg?.sender?.id?.name || "Unknown";
//               const senderType = msg?.sender?.type || "unknown";
//               const role = msg?.sender?.id?.role;
//               const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
//               const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

//               let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//               if (senderType === "staff" && role) {
//                 roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//               }

//               return (
//                 <React.Fragment key={idx}>
//                   {showDateHeader && (
//                     <div className="text-center my-2">
//                       <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
//                         {formattedDate}
//                       </span>
//                     </div>
//                   )}

//                   <div className="d-flex mb-2">
//                     <div
//                       className="p-2 px-3 rounded-3 shadow-sm"
//                       style={{
//                         backgroundColor: "#ffffff",
//                         border: "1px solid #dee2e6",
//                         maxWidth: "65%",
//                         fontSize: "0.92rem",
//                         lineHeight: "1.3",
//                       }}
//                     >
//                       <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
//                         {senderName}
//                         <span className="text-muted small ms-2">{roleDisplay}</span>
//                       </div>
//                       <div>{msg.message}</div>
//                       <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
//                         {formattedTime}
//                       </div>
//                     </div>
//                   </div>
//                 </React.Fragment>
//               );
//             })}

//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           {/* Input Box */}
//           <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
//             <input type="text" className="form-control" placeholder="Type your message..." readOnly />
//             <input type="file" id="file-upload" hidden />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
//             <div className="card-header fw-bold">Your Team</div>
//             <div className="card-body overflow-auto">
//               {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
//                 <div key={i} className="d-flex align-items-center gap-3 mb-3">
//                   <img
//                     src={m.profilePic || "/assets/images/avatars/avatar_default.jpg"}
//                     alt="team member"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">{m.name}</div>
//                     <div className="text-muted">{m.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;





// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);

//   const scrollRef = useRef(null);
//   const msgBoxRef = useRef(null);
//   const prevHeightRef = useRef(0);

//   // Fetch conversations
//   useEffect(() => {
//     fetchConversations();
//   }, [page]);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { page, limit: 4 },
//       });
// console.log("conversation",res)
//       if (res.data.length < 4) setHasMore(false);
//       setProjectList((prev) => [...prev, ...res.data]);
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };

//   // Fetch messages for selected conversation
//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: { convId, page: msgPage, limit: 5 },
//       });
  
//       // Check the response structure
//       console.log("message", res);
  
//       // Assuming res.data is directly the array of messages
//       const fetchedMessages = res.data;
  
//       if ((msgPage - 1) * 5 + fetchedMessages.length >= fetchedMessages.length) {
//         setMsgHasMore(false); // Check if there are more messages to load
//       }
  
//       // Add new messages at the top
//       setMessages((prev) => [...fetchedMessages.reverse(), ...prev]);
  
//       // Auto-scroll to the bottom after loading messages
//       if (msgPage === 1) {
//         setTimeout(() => {
//           const box = msgBoxRef.current;
//           box.scrollTop = box.scrollHeight;
//         }, 0);
//       }
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };
  

//   // Reset messages when conversation changes
//   useEffect(() => {
//     if (!convId) return;
//     setMessages([]);
//     setMsgPage(1);
//     setMsgHasMore(true);
//   }, [convId]);

//   // Load new messages when conversation changes
//   useEffect(() => {
//     if (convId) fetchMessages();
//   }, [convId, msgPage]);

//   // Handle scrolling in message box
//   const handleMessageScroll = (e) => {
//     const box = e.target;

//     // If user has scrolled to the top and there are more messages to fetch
//     if (box.scrollTop <= 0 && msgHasMore) {
//       setMsgPage((prev) => prev + 1); // Load previous messages
//     }

//     // If scroll is near the bottom, ensure it stays at the bottom for new messages
//     if (box.scrollHeight - box.scrollTop === box.clientHeight) {
//       box.scrollTop = box.scrollHeight;
//     }
//   };

//   // Automatically scroll to the active conversation when one is selected
//   useEffect(() => {
//     if (convId) {
//       // Find the active conversation and scroll to it
//       const activeConversation = document.querySelector(`.conversation-${convId}`);
//       if (activeConversation) {
//         activeConversation.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [convId]);

//   return (
//     <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
//       <div className="row g-0 h-100">
//         {/* Conversations List */}
//         <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
//           <div className="p-3 border-bottom sticky-top bg-light z-3">
//             <h5 className="mb-0 fw-bold">Chats</h5>
//           </div>
//           <div className="flex-grow-1 overflow-auto" ref={scrollRef}>
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => navigate(`?convId=${proj._id}`)}
//                   className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer conversation-${proj._id} ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
//                   style={{
//                     borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
//                     transition: "all 0.3s ease",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div>{proj.projectName}</div>
//                     <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               );
//             })}
//             {!hasMore && <div className="text-center text-muted py-2 small">No more conversations</div>}
//           </div>
//         </div>

//         {/* Chat Panel */}
//         <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{
//               background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//               scrollBehavior: "smooth",
//             }}
//             ref={msgBoxRef}
//             onScroll={handleMessageScroll}
//           >
//           {messages.map((msg, idx) => {
//   console.log("Message", msg); // Check each message's structure and data

//   const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
//   const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
//   const showDateHeader = currentDate !== previousDate;

//   const senderName = msg?.sender?.id?.name || "Unknown";
//   const senderType = msg?.sender?.type || "unknown";
//   const role = msg?.sender?.id?.role;
//   const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
//   const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

//   let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//   if (senderType === "staff" && role) {
//     roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//   }

//   return (
//     <React.Fragment key={idx}>
//       {showDateHeader && (
//         <div className="text-center my-2">
//           <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
//             {formattedDate}
//           </span>
//         </div>
//       )}

//       <div className="d-flex mb-2">
//         <div
//           className="p-2 px-3 rounded-3 shadow-sm"
//           style={{
//             backgroundColor: "#ffffff",
//             border: "1px solid #dee2e6",
//             maxWidth: "65%",
//             fontSize: "0.92rem",
//             lineHeight: "1.3",
//           }}
//         >
//           <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
//             {senderName}
//             <span className="text-muted small ms-2">{roleDisplay}</span>
//           </div>
//           <div>{msg.message}</div>
//           <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
//             {formattedTime}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// })}


//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           {/* Input Box */}
//           <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
//             <input type="text" className="form-control" placeholder="Type your message..." readOnly />
//             <input type="file" id="file-upload" hidden />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
//             <div className="card-header fw-bold">Your Team</div>
//             <div className="card-body overflow-auto">
//               {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
//                 <div key={i} className="d-flex align-items-center gap-3 mb-3">
//                   <img
//                     src={m.profilePic || "/assets/images/avatars/avatar_default.jpg"}
//                     alt="team member"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                   <div className="fw-semibold">{m.userId.name}</div>

//                     <div className="text-muted">{m.userId.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;









// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);

//   const scrollRef = useRef(null);
//   const msgBoxRef = useRef(null);
//   const prevHeightRef = useRef(0);

//   // Fetch conversations
//   useEffect(() => {
//     fetchConversations();
//   }, [page]);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { page, limit: 4 },
//       });
// console.log("conversation",res)
//       if (res.data.length < 4) setHasMore(false);
//       setProjectList((prev) => [...prev, ...res.data]);
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };

//   // Fetch messages for selected conversation
//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: { convId, page: msgPage, limit: 5 },
//       });
  
//       // Check the response structure
//       console.log("message", res);
  
//       // Assuming res.data is directly the array of messages
//       const fetchedMessages = res.data;
  
//       if ((msgPage - 1) * 5 + fetchedMessages.length >= fetchedMessages.length) {
//         setMsgHasMore(false); // Check if there are more messages to load
//       }
  
//       // Add new messages at the top
//       setMessages((prev) => [...fetchedMessages.reverse(), ...prev]);
  
//       // Auto-scroll to the bottom after loading messages
//       if (msgPage === 1) {
//         setTimeout(() => {
//           const box = msgBoxRef.current;
//           box.scrollTop = box.scrollHeight;
//         }, 0);
//       }
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };
  

//   // Reset messages when conversation changes
//   useEffect(() => {
//     if (!convId) return;
//     setMessages([]);
//     setMsgPage(1);
//     setMsgHasMore(true);
//   }, [convId]);

//   // Load new messages when conversation changes
//   useEffect(() => {
//     if (convId) fetchMessages();
//   }, [convId, msgPage]);

//   // Handle scrolling in message box
//   const handleMessageScroll = (e) => {
//     const box = e.target;

//     // If user has scrolled to the top and there are more messages to fetch
//     if (box.scrollTop <= 0 && msgHasMore) {
//       setMsgPage((prev) => prev + 1); // Load previous messages
//     }

//     // If scroll is near the bottom, ensure it stays at the bottom for new messages
//     if (box.scrollHeight - box.scrollTop === box.clientHeight) {
//       box.scrollTop = box.scrollHeight;
//     }
//   };

//   // Automatically scroll to the active conversation when one is selected
//   useEffect(() => {
//     if (convId) {
//       // Find the active conversation and scroll to it
//       const activeConversation = document.querySelector(`.conversation-${convId}`);
//       if (activeConversation) {
//         activeConversation.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [convId]);

//   return (
//     <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
//       <div className="row g-0 h-100">
//         {/* Conversations List */}
//         <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
//           <div className="p-3 border-bottom sticky-top bg-light z-3">
//             <h5 className="mb-0 fw-bold">Chats</h5>
//           </div>
//           <div className="flex-grow-1 overflow-auto" ref={scrollRef}>
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => navigate(`?convId=${proj._id}`)}
//                   className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer conversation-${proj._id} ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
//                   style={{
//                     borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
//                     transition: "all 0.3s ease",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div>{proj.projectName}</div>
//                     <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               );
//             })}
//             {!hasMore && <div className="text-center text-muted py-2 small">No more conversations</div>}
//           </div>
//         </div>

//         {/* Chat Panel */}
//         <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{
//               background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//               scrollBehavior: "smooth",
//             }}
//             ref={msgBoxRef}
//             onScroll={handleMessageScroll}
//           >
//           {messages.map((msg, idx) => {
//   console.log("Message", msg); // Check each message's structure and data

//   const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
//   const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
//   const showDateHeader = currentDate !== previousDate;

//   const senderName = msg?.sender?.id?.name || "Unknown";
//   const senderType = msg?.sender?.type || "unknown";
//   const role = msg?.sender?.id?.role;
//   const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
//   const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

//   let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//   if (senderType === "staff" && role) {
//     roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//   }

//   return (
//     <React.Fragment key={idx}>
//       {showDateHeader && (
//         <div className="text-center my-2">
//           <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
//             {formattedDate}
//           </span>
//         </div>
//       )}

//       <div className="d-flex mb-2">
//         <div
//           className="p-2 px-3 rounded-3 shadow-sm"
//           style={{
//             backgroundColor: "#ffffff",
//             border: "1px solid #dee2e6",
//             maxWidth: "65%",
//             fontSize: "0.92rem",
//             lineHeight: "1.3",
//           }}
//         >
//           <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
//             {senderName}
//             <span className="text-muted small ms-2">{roleDisplay}</span>
//           </div>
//           <div>{msg.message}</div>
//           <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
//             {formattedTime}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// })}


//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           {/* Input Box */}
//           <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
//             <input type="text" className="form-control" placeholder="Type your message..." readOnly />
//             <input type="file" id="file-upload" hidden />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
//             <div className="card-header fw-bold">Your Team</div>
//             <div className="card-body overflow-auto">
//               {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
//                 <div key={i} className="d-flex align-items-center gap-3 mb-3">
//                   <img
//                     src={m.profilePic || "/assets/images/avatars/avatar_default.jpg"}
//                     alt="team member"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                   <div className="fw-semibold">{m.userId.name}</div>

//                     <div className="text-muted">{m.userId.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;



// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);

//   const scrollRef = useRef(null);
//   const msgBoxRef = useRef(null);

//   // Fetch conversations
//   useEffect(() => {
//     fetchConversations();
//   }, [page]);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { page, limit: 4 },
//       });
//       if (res.data.length < 4) setHasMore(false);
//       setProjectList((prev) => [...prev, ...res.data]);
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };

//   // Fetch messages for selected conversation
//   const fetchMessages = async (convId) => {
//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: { convId, page: msgPage, limit: 5 },
//       });

//       const fetchedMessages = res.data;

//       if ((msgPage - 1) * 5 + fetchedMessages.length >= fetchedMessages.length) {
//         setMsgHasMore(false); // Check if there are more messages to load
//       }

//       setMessages((prev) => [...fetchedMessages.reverse(), ...prev]);

//       setTimeout(() => {
//         const box = msgBoxRef.current;
//         box.scrollTop = box.scrollHeight;
//       }, 0);
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };

//   // Reset messages when conversation changes
//   useEffect(() => {
//     if (!convId && projectList.length > 0) {
//       // Set default conversation if none is selected
//       navigate(`?convId=${projectList[0]._id}`);
//     } else if (convId) {
//       setMessages([]);
//       setMsgPage(1);
//       setMsgHasMore(true);
//     }
//   }, [convId, projectList]);

//   // Load new messages when conversation changes
//   useEffect(() => {
//     if (convId) fetchMessages(convId);
//   }, [convId, msgPage]);

//   // Handle scrolling in message box
//   const handleMessageScroll = (e) => {
//     const box = e.target;

//     if (box.scrollTop <= 0 && msgHasMore) {
//       setMsgPage((prev) => prev + 1); // Load previous messages
//     }

//     if (box.scrollHeight - box.scrollTop === box.clientHeight) {
//       box.scrollTop = box.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     if (convId) {
//       const activeConversation = document.querySelector(`.conversation-${convId}`);
//       if (activeConversation) {
//         activeConversation.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [convId]);

//   return (
//     <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
//       <div className="row g-0 h-100">
//         {/* Conversations List */}
//         <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
//           <div className="p-3 border-bottom sticky-top bg-light z-3">
//             <h5 className="mb-0 fw-bold">Chats</h5>
//           </div>
//           <div className="flex-grow-1 overflow-auto" ref={scrollRef}>
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => navigate(`?convId=${proj._id}`)}
//                   className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer conversation-${proj._id} ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
//                   style={{
//                     borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
//                     transition: "all 0.3s ease",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div>{proj.projectName}</div>
//                     <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               );
//             })}
//             {!hasMore && <div className="text-center text-muted py-2 small">No more conversations</div>}
//           </div>
//         </div>

//         {/* Chat Panel */}
//         <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{
//               background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//               scrollBehavior: "smooth",
//             }}
//             ref={msgBoxRef}
//             onScroll={handleMessageScroll}
//           >
//             {messages.map((msg, idx) => {
//               const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
//               const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
//               const showDateHeader = currentDate !== previousDate;

//               const senderName = msg?.sender?.id?.name || "Unknown";
//               const senderType = msg?.sender?.type || "unknown";
//               const role = msg?.sender?.id?.role;
//               const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
//               const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

//               let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//               if (senderType === "staff" && role) {
//                 roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//               }

//               return (
//                 <React.Fragment key={idx}>
//                   {showDateHeader && (
//                     <div className="text-center my-2">
//                       <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
//                         {formattedDate}
//                       </span>
//                     </div>
//                   )}

//                   <div className="d-flex mb-2">
//                     <div
//                       className="p-2 px-3 rounded-3 shadow-sm"
//                       style={{
//                         backgroundColor: "#ffffff",
//                         border: "1px solid #dee2e6",
//                         maxWidth: "65%",
//                         fontSize: "0.92rem",
//                         lineHeight: "1.3",
//                       }}
//                     >
//                       <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
//                         {senderName}
//                         <span className="text-muted small ms-2">{roleDisplay}</span>
//                       </div>
//                       <div>{msg.message}</div>
//                       <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
//                         {formattedTime}
//                       </div>
//                     </div>
//                   </div>
//                 </React.Fragment>
//               );
//             })}
//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           {/* Input Box */}
//           <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
//             <input type="text" className="form-control" placeholder="Type your message..." readOnly />
//             <input type="file" id="file-upload" hidden />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
//             <div className="card-header fw-bold">Your Team</div>
//             <div className="card-body overflow-auto">
//               {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
//                 <div key={i} className="d-flex align-items-center gap-3 mb-3">
//                   <img
//                     src={m.profilePic || "/assets/images/avatars/avatar_default.jpg"}
//                     alt="team member"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">{m.userId.name}</div>
//                     <div className="text-muted">{m.userId.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;


































// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);
//   const [loadingMessages, setLoadingMessages] = useState(false);

//   const msgBoxRef = useRef(null);

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { limit: 4 },
//       });
//       setProjectList(res.data);
//       if (!convId && res.data.length > 0) {
//         navigate(`?convId=${res.data[0]._id}`, { replace: true });
//       }
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };

//   const fetchMessages = async (convId, page, scrollToBottom = false) => {
//     try {
//       setLoadingMessages(true);
  
//       const msgBox = msgBoxRef.current;
//       let previousScrollHeight = msgBox ? msgBox.scrollHeight : 0;
  
//       // 👇 Set limit dynamically
//       const limit = page === 1 ? 7 : 4;
  
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: { convId, page, limit },
//       });
  
//       const fetchedMessages = res.data.filter(msg => Object.keys(msg).length > 0);
  
//       if (fetchedMessages.length < limit) {
//         setMsgHasMore(false);
//       }
  
//       setMessages((prev) => {
//         const newMessages = fetchedMessages.reverse().filter((msg) => !prev.some((prevMsg) => prevMsg._id === msg._id));
//         return [...newMessages, ...prev];
//       });
  
//       setTimeout(() => {
//         if (msgBox) {
//           if (scrollToBottom) {
//             msgBox.scrollTop = msgBox.scrollHeight;
//           } else {
//             const newScrollHeight = msgBox.scrollHeight;
//             msgBox.scrollTop = newScrollHeight - previousScrollHeight + msgBox.scrollTop;
//           }
//         }
//       }, 50);
//       setLoadingMessages(false);
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//       setLoadingMessages(false);
//     }
//   };
  
  

//   useEffect(() => {
//     if (convId) {
//       setMessages([]);
//       setMsgPage(1);
//       setMsgHasMore(true);
//       fetchMessages(convId, 1, true); // scrollToBottom = true
//     }
//   }, [convId]);

//   useEffect(() => {
//     if (convId && msgPage > 1) {
//       fetchMessages(convId, msgPage);
//     }
//   }, [msgPage, convId]);

//   const handleMessageScroll = (e) => {
//     const box = e.target;
//     if (box.scrollTop <= 100 && msgHasMore && !loadingMessages) {
//       setMsgPage((prev) => prev + 1);
//     }
//   };
  

//   const handleConversationClick = (id) => {
//     navigate(`?convId=${id}`);
//   };

//   return (
//     <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
//       <div className="row g-0 h-100">
//         <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
//           <div className="p-3 border-bottom sticky-top bg-light z-3">
//             <h5 className="mb-0 fw-bold">Chats</h5>
//           </div>
//           <div className="flex-grow-1 overflow-auto">
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => handleConversationClick(proj._id)}
//                   className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
//                   style={{
//                     borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
//                     transition: "all 0.3s ease",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div>{proj.projectName}</div>
//                     <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{
//               background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//               scrollBehavior: "auto",
//             }}
//             ref={msgBoxRef}
//             onScroll={handleMessageScroll}
//           >
//             {messages.filter(msg => msg.createdAt && msg._id).map((msg, idx) => {
//               const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
//               const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
//               const showDateHeader = currentDate !== previousDate;

//               const senderName = msg?.sender?.id?.name || "Unknown";
//               const senderType = msg?.sender?.type || "unknown";
//               const role = msg?.sender?.id?.role;
//               const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
//               const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

//               let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//               if (senderType === "staff" && role) {
//                 roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//               }

//               return (
//                 <React.Fragment key={idx}>
//                   {showDateHeader && (
//                     <div className="text-center my-2">
//                       <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
//                         {formattedDate}
//                       </span>
//                     </div>
//                   )}
//                   <div className="d-flex mb-2">
//                     <div
//                       className="p-2 px-3 rounded-3 shadow-sm"
//                       style={{
//                         backgroundColor: "#ffffff",
//                         border: "1px solid #dee2e6",
//                         maxWidth: "65%",
//                         fontSize: "0.92rem",
//                         lineHeight: "1.3",
//                       }}
//                     >
//                       <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
//                         {senderName}
//                         <span className="text-muted small ms-2">{roleDisplay}</span>
//                       </div>
//                       <div>{msg.message}</div>
//                       <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
//                         {formattedTime}
//                       </div>
//                     </div>
//                   </div>
//                 </React.Fragment>
//               );
//             })}
//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
//             <input type="text" className="form-control" placeholder="Type your message..." readOnly />
//             <input type="file" id="file-upload" hidden />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
//             <div className="card-header fw-bold">Your Team</div>
//             <div className="card-body overflow-auto">
//               {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
//                 <div key={i} className="d-flex align-items-center gap-3 mb-3">
//                   <img
//                     src={m.profilePic || "/assets/images/avatars/avatar_default.jpg"}
//                     alt="team member"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                   <div className="fw-semibold">{m.userId.name}</div>

//                     <div className="text-muted">{m.userId.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectChat;




// yeah working hai axha but ismai kuc chzee nahi hai 
// yeah working hai axha but ismai kuc chzee nahi hai 

// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Url } from "src/url/url";
// import { format } from "date-fns";

// const ProjectChat = () => {
//   const [searchParams] = useSearchParams();
//   const convId = searchParams.get("convId");
//   const navigate = useNavigate();

//   const [projectList, setProjectList] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [msgPage, setMsgPage] = useState(1);
//   const [msgHasMore, setMsgHasMore] = useState(true);
//   const [loadingMessages, setLoadingMessages] = useState(false);

//   const msgBoxRef = useRef(null);
//   let scrollTimeout;

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   const fetchConversations = async () => {
//     try {
//       const res = await axios.get(`${Url}/client/projectconversation`, {
//         params: { limit: 4 },
//       });
//       setProjectList(res.data);
//       if (!convId && res.data.length > 0) {
//         navigate(`?convId=${res.data[0]._id}`, { replace: true });
//       }
//     } catch (err) {
//       console.error("Failed to load conversations", err);
//     }
//   };

//   const fetchMessages = async (convId, page, scrollToBottom = false) => {
//     if (loadingMessages || !msgHasMore) return;

//     setLoadingMessages(true);

//     const msgBox = msgBoxRef.current;
//     let previousScrollHeight = msgBox ? msgBox.scrollHeight : 0;

//     const limit = page === 1 ? 7 : 4; // Dynamically set limit for first page and subsequent pages

//     try {
//       const res = await axios.get(`${Url}/client/projectmessages`, {
//         params: { convId, page, limit },
//       });

//       const fetchedMessages = res.data.filter((msg) => Object.keys(msg).length > 0);

//       if (fetchedMessages.length < limit) {
//         setMsgHasMore(false); // No more messages
//       }

//       setMessages((prev) => {
//         const newMessages = fetchedMessages.reverse().filter(
//           (msg) => !prev.some((prevMsg) => prevMsg._id === msg._id)
//         );
//         return [...newMessages, ...prev];
//       });

//       setTimeout(() => {
//         if (msgBox) {
//           if (scrollToBottom) {
//             msgBox.scrollTop = msgBox.scrollHeight;
//           } else {
//             const newScrollHeight = msgBox.scrollHeight;
//             msgBox.scrollTop = newScrollHeight - previousScrollHeight + msgBox.scrollTop;
//           }
//         }
//       }, 50);
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     } finally {
//       setLoadingMessages(false);
//     }
//   };

//   const handleMessageScroll = (e) => {
//     const box = e.target;

//     if (scrollTimeout) clearTimeout(scrollTimeout); // Clear previous timeout

//     scrollTimeout = setTimeout(() => {
//       if (box.scrollTop <= 100 && msgHasMore && !loadingMessages) {
//         setMsgPage((prev) => prev + 1); // Fetch next page only if there are more messages
//       }
//     }, 200);
//   };

//   useEffect(() => {
//     if (convId) {
//       setMessages([]);
//       setMsgPage(1);
//       setMsgHasMore(true);
//       fetchMessages(convId, 1, true); // scrollToBottom = true
//     }
//   }, [convId]);

//   useEffect(() => {
//     if (convId && msgPage > 1) {
//       fetchMessages(convId, msgPage);
//     }
//   }, [msgPage, convId]);

//   const handleConversationClick = (id) => {
//     navigate(`?convId=${id}`);
//   };

//   return (
//     <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
//       <div className="row g-0 h-100">
//         <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
//           <div className="p-3 border-bottom sticky-top bg-light z-3">
//             <h5 className="mb-0 fw-bold">Chats</h5>
//           </div>
//           <div className="flex-grow-1 overflow-auto">
//             {projectList.map((proj) => {
//               const isActive = convId === String(proj._id);
//               return (
//                 <div
//                   key={proj._id}
//                   onClick={() => handleConversationClick(proj._id)}
//                   className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
//                   style={{
//                     borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
//                     transition: "all 0.3s ease",
//                   }}
//                 >
//                   <img
//                     src="/assets/images/avatars/avatar_default.jpg"
//                     alt="avatar"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                     <div className="fw-semibold">ID: {proj.projectId}</div>
//                     <div>{proj.projectName}</div>
//                     <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
//           <div
//             className="flex-grow-1 overflow-auto p-4"
//             style={{
//               background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//               scrollBehavior: "auto",
//             }}
//             ref={msgBoxRef}
//             onScroll={handleMessageScroll}
//           >
//             {messages.filter(msg => msg.createdAt && msg._id).map((msg, idx) => {
//               const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
//               const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
//               const showDateHeader = currentDate !== previousDate;

//               const senderName = msg?.sender?.id?.name || "Unknown";
//               const senderType = msg?.sender?.type || "unknown";
//               const role = msg?.sender?.id?.role;
//               const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
//               const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

//               let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
//               if (senderType === "staff" && role) {
//                 roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
//               }

//               return (
//                 <React.Fragment key={idx}>
//                   {showDateHeader && (
//                     <div className="text-center my-2">
//                       <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
//                         {formattedDate}
//                       </span>
//                     </div>
//                   )}
//                   <div className="d-flex mb-2">
//                     <div
//                       className="p-2 px-3 rounded-3 shadow-sm"
//                       style={{
//                         backgroundColor: "#ffffff",
//                         border: "1px solid #dee2e6",
//                         maxWidth: "65%",
//                         fontSize: "0.92rem",
//                         lineHeight: "1.3",
//                       }}
//                     >
//                       <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
//                         {senderName}
//                         <span className="text-muted small ms-2">{roleDisplay}</span>
//                       </div>
//                       <div>{msg.message}</div>
//                       <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
//                         {formattedTime}
//                       </div>
//                     </div>
//                   </div>
//                 </React.Fragment>
//               );
//             })}
//             {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
//           </div>

//           <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
//             <input type="text" className="form-control" placeholder="Type your message..." readOnly />
//             <input type="file" id="file-upload" hidden />
//             <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
//               <i className="fa-solid fa-upload"></i>
//             </label>
//             <button className="btn btn-primary">Send</button>
//           </div>
//         </div>

//         <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
//           <div className="card border-0 shadow-sm rounded-4">
//             <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
//               Your Services
//             </div>
//             <ul className="list-group list-group-flush">
//               {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
//                 <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
//                   <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
//                   <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
//            <div className="card-header fw-bold">Your Team</div>
//             <div className="card-body overflow-auto">
//              {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
//                 <div key={i} className="d-flex align-items-center gap-3 mb-3">
//                   <img
//                     src={m.profilePic || "/assets/images/avatars/avatar_default.jpg"}
//                     alt="team member"
//                     className="rounded-circle"
//                     width="40"
//                     height="40"
//                   />
//                   <div className="small">
//                   <div className="fw-semibold">{m.userId.name}</div>

//                     <div className="text-muted">{m.userId.role}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         </div>
//       </div>
  
//   );
// };

// export default ProjectChat;






import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Url } from "src/url/url";
import { format } from "date-fns";

const ProjectChat = () => {
  const [searchParams] = useSearchParams();
  const convId = searchParams.get("convId");
  const navigate = useNavigate();

  const [projectList, setProjectList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msgPage, setMsgPage] = useState(1);
  const [msgHasMore, setMsgHasMore] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const msgBoxRef = useRef(null);
  let scrollTimeout;

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${Url}/client/projectconversation`, {
        params: { limit: 4 },
      });
      setProjectList(res.data);
      if (!convId && res.data.length > 0) {
        navigate(`?convId=${res.data[0]._id}`, { replace: true });
      }
    } catch (err) {
      console.error("Failed to load conversations", err);
    }
  };

  const fetchMessages = async (convId, page, scrollToBottom = false) => {
    if (loadingMessages || !msgHasMore) return;
  
    setLoadingMessages(true);
  
    const msgBox = msgBoxRef.current;
    let previousScrollHeight = msgBox ? msgBox.scrollHeight : 0;
  
    const limit = page === 1 ? 7 : 4; 
  
    try {
      const res = await axios.get(`${Url}/client/projectmessages`, {
        params: { convId, page, limit },
      });
  
      const fetchedMessages = res.data.filter((msg) => Object.keys(msg).length > 0);
  
      if (fetchedMessages.length < limit) {
        setMsgHasMore(false); 
      }
  
      setMessages((prev) => {
        const newMessages = fetchedMessages.reverse().filter(
          (msg) => !prev.some((prevMsg) => prevMsg._id === msg._id)
        );
        return [...newMessages, ...prev];
      });
  
      setTimeout(() => {
        if (msgBox) {
          if (scrollToBottom) {
            msgBox.scrollTop = msgBox.scrollHeight;
          } else {
            const newScrollHeight = msgBox.scrollHeight;
            msgBox.scrollTop = newScrollHeight - previousScrollHeight + msgBox.scrollTop;
          }
        }
      }, 50);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoadingMessages(false);
    }
  };
  

  const handleMessageScroll = (e) => {
    const box = e.target;
  
    if (scrollTimeout) clearTimeout(scrollTimeout);
  
    scrollTimeout = setTimeout(() => {
      if (box.scrollTop <= 100 && msgHasMore && !loadingMessages) {
        setMsgPage((prev) => prev + 1); 
      }
    }, 200);
  };
  

  useEffect(() => {
    if (convId) {
      setMessages([]);
      setMsgPage(1);
      setMsgHasMore(true);
      fetchMessages(convId, 1, true); 
    }
  }, [convId]);

  useEffect(() => {
    if (convId && msgPage > 1) {
      fetchMessages(convId, msgPage);
    }
  }, [msgPage, convId]);

  const handleConversationClick = (id) => {
    navigate(`?convId=${id}`);
  };

  return (
    <div className="container-fluid p-0" style={{ height: "80vh", fontFamily: "Poppins, sans-serif" }}>
      <div className="row g-0 h-100">
        <div className="col-lg-3 col-md-4 col-sm-12 border-end d-flex flex-column h-100 bg-light">
          <div className="p-3 border-bottom sticky-top bg-light z-3">
            <h5 className="mb-0 fw-bold">Chats</h5>
          </div>
          <div className="flex-grow-1 overflow-auto">
            {projectList.map((proj) => {
              const isActive = convId === String(proj._id);
              return (
                <div
                  key={proj._id}
                  onClick={() => handleConversationClick(proj._id)}
                  className={`d-flex align-items-center gap-3 px-3 py-2 mb-1 rounded-3 cursor-pointer ${isActive ? "bg-primary text-white" : "bg-white text-dark"} shadow-sm`}
                  style={{
                    borderLeft: isActive ? "5px solid #4e54c8" : "5px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src="/assets/images/avatars/avatar_default.jpg"
                    alt="avatar"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <div className="small">
                    <div className="fw-semibold">ID: {proj.projectId}</div>
                    <div>{proj.projectName}</div>
                    <div className="text-muted small">{new Date(proj.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-lg-6 col-md-8 col-sm-12 d-flex flex-column border-end h-100">
          <div
            className="flex-grow-1 overflow-auto p-4"
            style={{
              background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
              scrollBehavior: "auto",
            }}
            ref={msgBoxRef}
            onScroll={handleMessageScroll}
          >
            {messages.filter(msg => msg.createdAt && msg._id).map((msg, idx) => {
              const currentDate = format(new Date(msg.createdAt), "yyyy-MM-dd");
              const previousDate = idx > 0 ? format(new Date(messages[idx - 1].createdAt), "yyyy-MM-dd") : null;
              const showDateHeader = currentDate !== previousDate;

              const senderName = msg?.sender?.id?.name || "Unknown";
              const senderType = msg?.sender?.type || "unknown";
              const role = msg?.sender?.id?.role;
              const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
              const formattedDate = format(new Date(msg.createdAt), "MMM dd, yyyy");

              let roleDisplay = `(${senderType.charAt(0).toUpperCase() + senderType.slice(1)})`;
              if (senderType === "staff" && role) {
                roleDisplay = `(${role.charAt(0).toUpperCase() + role.slice(1)})`;
              }

              return (
                <React.Fragment key={idx}>
                  {showDateHeader && (
                    <div className="text-center my-2">
                      <span className="badge bg-light text-dark px-3 py-1 shadow-sm rounded-pill">
                        {formattedDate}
                      </span>
                    </div>
                  )}
                  <div className="d-flex mb-2">
                    <div
                      className="p-2 px-3 rounded-3 shadow-sm"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #dee2e6",
                        maxWidth: "65%",
                        fontSize: "0.92rem",
                        lineHeight: "1.3",
                      }}
                    >
                      <div className="text-warning fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>
                        {senderName}
                        <span className="text-muted small ms-2">{roleDisplay}</span>
                      </div>
                      <div>{msg.message}</div>
                      <div className="mt-1 text-end text-muted" style={{ fontSize: "0.75rem" }}>
                        {formattedTime}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {!msgHasMore && <div className="text-center text-muted small mt-3">No more messages</div>}
          </div>

          <div className="p-3 d-flex gap-2 align-items-center border-top bg-white">
            <input type="text" className="form-control" placeholder="Type your message..." readOnly />
            <input type="file" id="file-upload" hidden />
            <label htmlFor="file-upload" className="btn btn-outline-secondary mb-0">
              <i className="fa-solid fa-upload"></i>
            </label>
            <button className="btn btn-primary">Send</button>
          </div>
        </div>

        <div className="col-lg-3 d-none d-lg-flex flex-column gap-4 p-3 h-100">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="px-4 py-2 text-white fw-semibold" style={{ background: "linear-gradient(to right, #11998e, #38ef7d)", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}>
              Your Services
            </div>
            <ul className="list-group list-group-flush">
              {projectList.find((p) => p._id.toString() === convId)?.projectDetails?.service?.map((svc, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-check-circle-fill text-success me-2"></i>{svc.serviceName}</span>
                  <span className={`fs-5 ${svc.status === "pending" ? "text-warning" : "text-success"}`}>•</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card flex-grow-1 border-0 shadow-sm rounded-4">
           <div className="card-header fw-bold">Your Team</div>
            <div className="card-body overflow-auto">
             {projectList.find((p) => p._id.toString() === convId)?.members?.filter((m) => m.userType === "staff")?.map((m, i) => (
                <div key={i} className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={m.profilePic || "/assets/images/avatars/avatar_default.jpg"}
                    alt="team member"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <div className="small">
                  <div className="fw-semibold">{m.userId.name}</div>

                    <div className="text-muted">{m.userId.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        </div>
      </div>
  
  );
};

export default ProjectChat;







