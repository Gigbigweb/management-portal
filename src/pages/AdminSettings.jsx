import React, { useState, useEffect } from "react";
import {
  Container, Box, TextField, Button,
  Typography, Paper, Stack
} from "@mui/material";
import axios from "axios";
import { Url } from "src/url/url";

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  // ✅ Page load hote hi localStorage se data fill karein
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData) {
      setFormData({
        name: adminData.name || "",
        email: adminData.email || "",
        password: ""  // password blank rakhein security ke liye
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminData = JSON.parse(localStorage.getItem("admin"));
    const adminId = adminData?._id;

    if (!adminId) {
      setMessage("Admin ID nahi mili. Please login karein.");
      return;
    }

    try {
      const res = await axios.post(
        `${Url}/admin/update/${adminId}`,
        formData
      );

      // ✅ LocalStorage bhi update karein
      localStorage.setItem("admin", JSON.stringify({
        ...adminData,
        name: formData.name,
        email: formData.email
      }));

      setMessage(res.data.massege || "Update successful!");
    } catch (err) {
      setMessage(err.response?.data?.massege || "Update failed.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Admin Settings
        </Typography>

        {message && (
          <Typography color="primary" sx={{ mb: 2 }}>
            {message}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField label="Name" name="name" fullWidth
              value={formData.name} onChange={handleChange} />

            <TextField label="Email" name="email" type="email" fullWidth
              value={formData.email} onChange={handleChange} />

            <TextField label="Password" name="password" type="password" fullWidth
              value={formData.password} onChange={handleChange}
              placeholder="Enter New password" />

            <Button variant="contained" type="submit" size="large">
              Update Settings
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminSettings;