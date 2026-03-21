
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  Avatar,
  Rating,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { projectdata } from "src/redux/slice/project";
import { teamdata } from "src/redux/slice/team";
import { Url } from "src/url/url";
import axios from "axios";

const EditTeamPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const roleAllData = useSelector((store) => store.role.data);
  const staffAllData = useSelector((store) => store.staff.data.data);
  const packageAllData = useSelector((store) => store.package.data);
  const [singelProject, setSingleProject] = useState();
  const [createDate, setCreateDate] = useState({});
  const [assistant, setAssistant] = useState({
    role: "",
    staffId: "",
    staffName: "",
  });
  const [inputTeam, setInputTeam] = useState([
    { role: "", staffId: "", staffName: "" },
  ]);
  const [selectedDate, setSelectedDate] = useState(null); // ✅ Start Date
  const [endDate, setEndDate] = useState(null); // ✅ End Date added here
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => setSelectedDate(date);
  const handleEndDateChange = (date) => setEndDate(date); // ✅ handle end date

  const getProjectFunc = async (projectId) => {
    const response = await axios.get(`${Url}/project/projectDetail/${projectId}`);
    setSingleProject(response?.data);
    const dateString = response?.data.createdAt;
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setCreateDate({
      day: String(date.getDate()).padStart(2, "0"),
      month: monthNames[date.getMonth()],
      year: date.getFullYear(),
    });
  };

  const handleRoleChange = (e, index, selectedRole) => {
    const updatedInputTeam = [...inputTeam];
    updatedInputTeam[index].role = selectedRole;
    updatedInputTeam[index].staffId = "";
    updatedInputTeam[index].staffName = "";
    setInputTeam(updatedInputTeam);
  };

  const handleStaffChange = (e, index) => {
    const staff = JSON.parse(e.target.value);
    const updatedInputTeam = [...inputTeam];
    updatedInputTeam[index].staffId = staff._id;
    updatedInputTeam[index].staffName = `${staff.firstName} ${staff.lastName}`;
    setInputTeam(updatedInputTeam);
  };

  const handleAddMore = (e) => {
    e.preventDefault();
    setInputTeam([...inputTeam, { role: "", staffId: "", staffName: "" }]);
  };

  const handleRemovePair = (e, indexToRemove) => {
    e.preventDefault();
    setInputTeam(inputTeam.filter((_, i) => i !== indexToRemove));
  };

  // ✅ Updated CreateTeam function with endDate
  const CreateTeam = async (data, projectId, startDate, endDate) => {
    try {
      const responseData = await axios.post(`${Url}/team/add/${projectId}`, {
        ...data,
        startDate,
        endDate, // ✅ sending to backend
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Team created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      return responseData;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while creating the team.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: true,
        timer: 2000,
      });
      throw new Error(message);
    }
  };

  // ✅ Updated submit to include endDate
  const submit = async (e) => {
    e.preventDefault();
    const requiredTeamCount = singelProject?.service?.length || 0;

    if (!assistant?.staffId || !selectedDate || !endDate) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "All fields are required (including start & end date)",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (inputTeam.length < requiredTeamCount) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Please assign at least ${requiredTeamCount} team member(s)`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const data = { assistant, team: inputTeam };
    await CreateTeam(data, projectId, selectedDate, endDate); // ✅ both dates
    dispatch(projectdata());
    dispatch(teamdata());
    navigate("/dashboard/new-project");
  };

  useEffect(() => {
    getProjectFunc(projectId);
  }, []);

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Project without team</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" className="text-dark fw-bold">
            Make Your Dream Team
          </Typography>
        </Stack>

        <div className="team-form-section bg-white p-4 rounded-4 shadow-lg mb-5">
          <form>
            <h5 className="text-primary mb-4 fw-semibold">👥 Choose Your Team</h5>

            {/* === Assistant Select === */}
            <div className="row mb-4">
              <div className="col-md-4">
                <input type="text" value="assistant" className="form-control" readOnly />
              </div>
              <div className="col-md-4">
                <FormControl fullWidth size="small">
                  <InputLabel>Select Assistant</InputLabel>
                  <Select
                    value={assistant.staffId ? JSON.stringify(assistant) : ""}
                    label="Select Assistant"
                    onChange={(e) => {
                      const staff = JSON.parse(e.target.value);
                      setAssistant({
                        role: "assistant",
                        staffId: staff._id,
                        staffName: `${staff.firstName} ${staff.lastName}`,
                      });
                    }}
                    renderValue={(selected) => {
                      if (!selected) return "Select Assistant";
                      const staff = JSON.parse(selected);
                      return `${staff.staffName || staff.firstName}`;
                    }}
                  >
                    {staffAllData
                      ?.filter((s) => s.role === "assistant")
                      .map((staffVal, idx) => {
                        const running = staffVal.projectIds?.length || 0;
                        const progress = Math.min((running / 20) * 100, 100);
                        const isOverloaded = running > 20;

                        return (
                          <MenuItem
                            key={idx}
                            value={JSON.stringify(staffVal)}
                            disabled={isOverloaded}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              opacity: isOverloaded ? 0.6 : 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: "primary.main",
                                fontSize: 13,
                              }}
                            >
                              {staffVal.firstName?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Box flexGrow={1}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {staffVal.firstName} {staffVal.lastName}
                              </Typography>
                              <Rating
                                name="read-only"
                                value={Number(staffVal.avgRating || 0)}
                                precision={0.5}
                                readOnly
                                size="small"
                              />
                            </Box>

                            <Box position="relative" display="inline-flex">
                              <CircularProgress
                                variant="determinate"
                                value={progress}
                                size={28}
                                thickness={5}
                                sx={{
                                  color:
                                    progress < 50
                                      ? "success.main"
                                      : progress < 80
                                      ? "warning.main"
                                      : "error.main",
                                }}
                              />
                              <Box
                                top={0}
                                left={0}
                                bottom={0}
                                right={0}
                                position="absolute"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Typography
                                  variant="caption"
                                  component="div"
                                  color="text.secondary"
                                  fontSize={10}
                                >
                                  {running}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* === Team Members === */}
            {inputTeam.map((pair, idx) => (
              <div key={idx} className="row mb-3 align-items-center">
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={pair.role}
                    onChange={(e) => handleRoleChange(e, idx, e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {roleAllData.map((role) => (
                      <option key={role._id} value={role.role}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  {pair.role && (
                    <FormControl fullWidth size="small">
                      <InputLabel>Select Staff</InputLabel>
                      <Select
                        value={pair.staffId ? JSON.stringify(pair) : ""}
                        label="Select Staff"
                        onChange={(e) => handleStaffChange(e, idx)}
                        renderValue={(selected) => {
                          if (!selected) return "Select Staff";
                          const staff = JSON.parse(selected);
                          return `${staff.staffName || staff.firstName}`;
                        }}
                      >
                        {staffAllData
                          ?.filter((staff) => staff.role === pair.role)
                          .map((staff) => {
                            const running = staff.projectIds?.length || 0;
                            const isAssistant =
                              staff.role?.toLowerCase() === "assistant";
                            const limit = isAssistant ? 20 : 10;
                            const progress = Math.min((running / limit) * 100, 100);
                            const isOverloaded = running >= limit;

                            return (
                              <MenuItem
                                key={staff._id}
                                value={JSON.stringify(staff)}
                                disabled={isOverloaded}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                  opacity: isOverloaded ? 0.6 : 1,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: "primary.main",
                                    fontSize: 13,
                                  }}
                                >
                                  {staff.firstName?.charAt(0)?.toUpperCase()}
                                </Avatar>

                                <Box flexGrow={1}>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {staff.firstName} {staff.lastName}
                                  </Typography>
                                  <Rating
                                    name="read-only"
                                    value={Number(staff.avgRating || 0)}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                  />
                                </Box>

                                <Box position="relative" display="inline-flex">
                                  <CircularProgress
                                    variant="determinate"
                                    value={progress}
                                    size={28}
                                    thickness={5}
                                    sx={{
                                      color:
                                        progress < 50
                                          ? "success.main"
                                          : progress < 80
                                          ? "warning.main"
                                          : "error.main",
                                    }}
                                  />
                                  <Box
                                    top={0}
                                    left={0}
                                    bottom={0}
                                    right={0}
                                    position="absolute"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Typography
                                      variant="caption"
                                      component="div"
                                      color="text.secondary"
                                      fontSize={10}
                                    >
                                      {running}
                                    </Typography>
                                  </Box>
                                </Box>
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  )}
                </div>

                <div className="col-md-4">
                  {inputTeam.length > 1 && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) => handleRemovePair(e, idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="mb-3">
              <button className="btn btn-outline-primary me-2" onClick={handleAddMore}>
                Add More +
              </button>
            </div>

            {/* ✅ Start + End Date Section */}
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label text-primary fs-14">📅 Select Start Date</label>
                <DatePicker
                  ref={datePickerRef}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="dd/mm/yyyy"
                  selectsStart
                  startDate={selectedDate}
                  endDate={endDate}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label text-primary fs-14">📅 Select End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="dd/mm/yyyy"
                  selectsEnd
                  startDate={selectedDate}
                  endDate={endDate}
                  minDate={selectedDate}
                />
              </div>
            </div>

            <div>
              <button className="btn btn-success" onClick={(e) => submit(e)}>
                Create Team <i className="fa-solid fa-user-plus ms-2"></i>
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default EditTeamPage;
