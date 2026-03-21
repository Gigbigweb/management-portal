"use client";

import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, TextField, Select, MenuItem,
  FormControl, InputLabel, Chip, IconButton, Dialog,
  DialogTitle, DialogContent, CircularProgress, Grid,
  Card, CardContent, Divider, Tooltip, InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Swal from "sweetalert2";
import { Url } from "src/url/url";



const STATUS_COLOR = {
  open: "warning",
  "in-progress": "info",
  resolved: "success",
  closed: "default",
};

const PRIORITY_COLOR = {
  high: "error",
  medium: "warning",
  low: "success",
};

const AdminHelpSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const chatEndRef = React.useRef(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${Url}/api/support/tickets`);
      const data = await res.json();
      if (res.ok) {
        setTickets(data.tickets || []);
        setFiltered(data.tickets || []);
      }
    } catch {
      console.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  // ── Filter ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    let result = [...tickets];
    if (filterStatus !== "all") result = result.filter((t) => t.status === filterStatus);
    if (filterPriority !== "all") result = result.filter((t) => t.priority === filterPriority);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.ticketId?.toLowerCase().includes(q) ||
          t.subject?.toLowerCase().includes(q) ||
          t.clientName?.toLowerCase().includes(q) ||
          t.projectId?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [filterStatus, filterPriority, search, tickets]);

  // ── Status Update ──────────────────────────────────────────────────────────
  const handleStatusChange = async (ticketId, status) => {
    try {
      const res = await fetch(`${Url}/api/support/tickets/${ticketId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setActiveTicket(data.ticket);
        fetchTickets();
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to update status." });
    }
  };

  // ── Reply ──────────────────────────────────────────────────────────────────
  const handleReply = async () => {
    if (!replyText.trim() || !activeTicket) return;
    try {
      const res = await fetch(`${Url}/api/support/tickets/${activeTicket._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "admin", senderName: "Support Team", message: replyText }),
      });
      const data = await res.json();
      if (res.ok) {
        setActiveTicket(data.ticket);
        setReplyText("");
        fetchTickets();
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to send reply." });
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  const stats = [
    { label: "Total", value: tickets.length, color: "#1976d2", bg: "#e3f2fd" },
    { label: "Open", value: tickets.filter((t) => t.status === "open").length, color: "#f57c00", bg: "#fff3e0" },
    { label: "In Progress", value: tickets.filter((t) => t.status === "in-progress").length, color: "#0288d1", bg: "#e1f5fe" },
    { label: "Resolved", value: tickets.filter((t) => t.status === "resolved").length, color: "#388e3c", bg: "#e8f5e9" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} display="flex" alignItems="center" gap={1}>
          <HeadsetMicIcon color="primary" /> Help & Support Tickets
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage all client support requests
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 3, background: s.bg }}>
              <CardContent sx={{ textAlign: "center", py: 2, "&:last-child": { pb: 2 } }}>
                <Typography variant="h4" fontWeight={700} color={s.color}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="Search ticket, client, project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 260 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Priority</InputLabel>
          <Select label="Priority" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <MenuItem value="all">All Priority</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title="Refresh">
          <IconButton onClick={fetchTickets} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Table */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress />
          <Typography mt={2} color="text.secondary">Loading tickets...</Typography>
        </Box>
      ) : filtered.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
          <FolderOpenIcon sx={{ fontSize: 48, mb: 1 }} />
          <Typography>No tickets found.</Typography>
        </Box>
      ) : (
        <Paper elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 3, overflow: "hidden" }}>
          <Box sx={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  {["Ticket ID", "Client", "Project", "Subject", "Priority", "Status", "Date", "Action"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #e0e0e0",
                        color: "#555",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((ticket, idx) => (
                  <tr
                    key={ticket._id}
                    style={{ background: idx % 2 === 0 ? "#fff" : "#fafafa" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#fafafa")}
                  >
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                      <Typography variant="caption" fontWeight={700} color="primary">
                        #{ticket.ticketId}
                      </Typography>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                      <Typography variant="body2" fontWeight={500}>{ticket.clientName}</Typography>
                      <Typography variant="caption" color="text.secondary">{ticket.clientEmail}</Typography>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                      <Typography variant="body2">{ticket.projectId}</Typography>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", maxWidth: 180 }}>
                      <Typography variant="body2" noWrap>{ticket.subject}</Typography>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                      <Chip
                        label={ticket.priority}
                        size="small"
                        color={PRIORITY_COLOR[ticket.priority] || "default"}
                        sx={{ textTransform: "capitalize", fontSize: "11px" }}
                      />
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                      <Chip
                        label={ticket.status}
                        size="small"
                        color={STATUS_COLOR[ticket.status] || "default"}
                        sx={{ textTransform: "capitalize", fontSize: "11px" }}
                      />
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap" }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(ticket.createdAt)}
                      </Typography>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: "12px" }}
                        onClick={() => { setActiveTicket(ticket); setReplyText(""); }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Paper>
      )}

      {/* ── Ticket Detail Dialog ─────────────────────────────────────────────── */}
      <Dialog open={!!activeTicket} onClose={() => setActiveTicket(null)} maxWidth="md" fullWidth>
        {activeTicket && (
          <>
            <DialogTitle
              sx={{ pb: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  #{activeTicket.ticketId}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {activeTicket.subject}
                </Typography>
              </Box>
              <IconButton onClick={() => setActiveTicket(null)} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <Divider />

            {/* Info Bar */}
            <Box
              sx={{
                px: 3,
                py: 1.5,
                background: "#f8f9fa",
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <PersonIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="caption">
                  <b>{activeTicket.clientName}</b> · {activeTicket.clientEmail}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <ConfirmationNumberIcon fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="caption">
                  Project: <b>{activeTicket.projectId}</b>
                </Typography>
              </Box>
              <Chip
                label={activeTicket.priority}
                size="small"
                color={PRIORITY_COLOR[activeTicket.priority] || "default"}
                sx={{ textTransform: "capitalize", fontSize: "10px" }}
              />
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <Select
                  value={activeTicket.status}
                  onChange={(e) => handleStatusChange(activeTicket._id, e.target.value)}
                  sx={{ fontSize: "12px", height: "28px" }}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <DialogContent sx={{ p: 0 }}>
              {/* Messages */}
              <Box
                sx={{
                  height: 350,
                  overflowY: "auto",
                  background: "#f5f7fa",
                  px: 2,
                  py: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {activeTicket.messages?.map((msg, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: msg.sender === "admin" ? "flex-end" : "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "75%",
                        px: 2,
                        py: 1.5,
                        borderRadius: 3,
                        boxShadow: 1,
                        background: msg.sender === "admin" ? "#1976d2" : "#fff",
                        color: msg.sender === "admin" ? "#fff" : "inherit",
                        border: msg.sender !== "admin" ? "1px solid #e0e0e0" : "none",
                      }}
                    >
                      {msg.sender !== "admin" && (
                        <Typography
                          sx={{ fontSize: "11px", fontWeight: 600, color: "#757575", mb: 0.5 }}
                        >
                          {msg.senderName || "Client"}
                        </Typography>
                      )}
                      <Typography variant="body2">{msg.message}</Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          textAlign: "right",
                          mt: 0.5,
                          opacity: 0.7,
                          color: msg.sender === "admin" ? "rgba(255,255,255,0.8)" : "text.secondary",
                        }}
                      >
                        {formatDate(msg.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <div ref={chatEndRef} />
              </Box>

              <Divider />

              {/* Reply Box */}
              {activeTicket.status !== "closed" ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    px: 2,
                    py: 2,
                    background: "#fff",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type your reply to client..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleReply()}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                    sx={{
                      background: "#1976d2",
                      color: "#fff",
                      "&:hover": { background: "#1565c0" },
                      "&.Mui-disabled": { background: "#e0e0e0", color: "#aaa" },
                    }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ px: 2, py: 1.5, textAlign: "center", background: "#fafafa" }}>
                  <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                    <LockIcon sx={{ fontSize: 12 }} /> Ticket is closed. Change status to reopen.
                  </Typography>
                </Box>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AdminHelpSupport;