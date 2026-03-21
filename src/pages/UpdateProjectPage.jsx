import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import {  Container, Stack, Typography} from '@mui/material'; 
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { projectdata } from 'src/redux/slice/project'; 
import { SingleProject } from 'src/Api/Api';
import { tr } from 'date-fns/locale';
import axios from 'axios';
import { Url } from 'src/url/url';
import ProjectStatusButton from 'src/utils/ProjectStatusButton';
import SwitchButton from 'src/utils/ProjectStatusButton';

const UpdateProjectPage = () => {
    const {projectId} = useParams() 
    const navigate = useNavigate()
    const packageAllData = useSelector(store => store.package.data) 
    const projectAllData = useSelector(store => store.project.data) 
    const teamAllData = useSelector(store => store.team.data) 
    const dispatch = useDispatch() 
    const [project, setProject] = useState()  
    const [createDate, setCreateDate] = useState() 
    const [status, setStatus] = useState() 
    const [loading, setLoading] = useState(false) 
    const [teamAtDate, setTeamAtDate] = useState()
    const [startAtDate, setStartAtDate] = useState()

 
    const getProjectFunc = async () => { 
        const response = await SingleProject(projectId); 
        setProject(response.data[0]);
        const dateString = response.data[0].createdAt; 
        if(response.data[0].teamAt && response.data[0].startAt){
        const teamDateObj = new Date(response.data[0].teamAt);
        const startDateObj = new Date(response.data[0].startAt);
        setTeamAtDate(`${teamDateObj.getDate()} ${teamDateObj.toLocaleString('default', { month: 'long' })} ${teamDateObj.getFullYear()}`)
        setStartAtDate(`${startDateObj.getDate()} ${startDateObj.toLocaleString('default', { month: 'long' })} ${startDateObj.getFullYear()}`)
        }
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0"); 
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
        const month = monthNames[date.getMonth()];
        const year = String(date.getFullYear());
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const timeOfDay = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const timezone = date.toString().match(/\((.+)\)/)[1];
        setCreateDate({
          day,
          month,
          year,
          time: `${formattedHours}:${minutes} ${timeOfDay}`,
          timezone,
        }); 
      };

    const statusChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setStatus({...status, [name]:value})
    }
    const projectUpdate = async(e, index)=>{
        e.preventDefault()
        setLoading(true)
        console.log("Updated project");
        try {
            if (status) {
                setLoading(false)
                await axios.post(`${Url}/project/status-update/${projectId}/${index}`, status)
                dispatch(projectdata()) 
                getProjectFunc()
                navigate(`/dashboard/update-project/${projectId}`)
            }
            else{
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }
     

  
    useEffect(()=>{ 
        // dispatch(projectdata())
        getProjectFunc()
    }, [])

    // useEffect(()=>{
    //   dispatch(projectdata())
    // }, [project])



  return (
    <>
    <ToastContainer/>
    <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
    </Helmet> 
     <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Project
          </Typography>  
        </Stack> 
      </Container>  

    <Container className="mb-4 ">
        <div className="bg-lightgray rounded-top p-3">
        <div className='text-end mb-3 d-flex align-items-center justify-content-end'> <span className='cl-darkblue me-1'>Project Status :</span>  <SwitchButton status={project && project.projectStatus } projectId={projectId} />
        
        </div>
            <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
                <div>
                <p>
                    <span className="text-capitalize cl-darkpink">
                    client name :
                    </span>{" "}
                    <span className="text-capitalize cl-darkblue">
                    {project && project.clientName}
                    </span>
                </p>
                <p>
                    <span className="text-capitalize cl-darkpink">
                    Project Id :
                    </span>{" "}
                    <span className="text-capitalize cl-darkblue">
                    {project && project._id}
                    </span>
                </p>
                <p>
                    <span className="text-capitalize cl-darkpink">
                    client id :
                    </span>{" "}
                    <span className="text-capitalize cl-darkblue">
                    {project && project.clientId}
                    </span>
                </p>
                <p>
                    <span className="text-capitalize cl-darkpink">Pricing :</span>{" "}
                    <span className="text-capitalize cl-darkblue">
                    $ {project && project.totalPrice}
                    </span>
                </p>
                <p>
                    <span className="text-capitalize cl-darkpink">
                    Project Buy :
                    </span>{" "}
                    <span className="text-capitalize cl-darkblue">{ createDate && `${createDate.day} ${createDate.month} ${createDate.year} `}</span>
                </p>
                {/* <p className='d-flex align-item-cener'>
                    <span className="text-capitalize cl-darkpink width-max-content me-1">
                    Team Create :
                    </span>{" "}
                    <span className="text-capitalize cl-darkblue">{ createDate && project.teamAt}</span>
                </p> */}
                {teamAtDate &&
                <p className='d-flex align-item-cener'>
                    <span className="text-capitalize cl-darkpink width-max-content me-1">
                    Team Create :
                    </span>{" "}
                    <span className="text-capitalize cl-darkblue">{ teamAtDate}</span>
                </p> }
                {startAtDate && 
                <p className='d-flex align-item-cener'>
                    <span className="text-capitalize cl-darkpink width-max-content me-1">
                    Start project :
                    </span>{" "}
                    <span className="text-capitalize cl-darkblue">{ startAtDate}</span>
                </p> }
                <p>
                    <span className="text-capitalize cl-darkpink">
                    Pacakage :
                    </span>{" "}
                    <span className="text-capitalize cl-darkblue">
                    {packageAllData.length > 0 &&
                    project &&
                    project.projectType === "package" ? (
                        <>
                        {
                            packageAllData.filter(
                            (packageVal) =>
                                packageVal._id === project.packageId
                            )[0].packageName
                        }
                        </>
                    ) : (
                        <>Custom Package</>
                    )}
                    </span>
                </p>
                </div>
            </div>
            
            <div className="col-lg-6 col-md-6 col-12">
                <h6>Brief</h6>
                <p className="rounded border border-white text-muted  fs-14 p-3">
                {project && project.clientPackageBrief}
                </p>
            </div>

            <div className="col-12">
                <div>
                <div className="table-response ">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th className="cl-darkblue">s. no.</th> 
                        <th className="cl-darkblue">Service</th> 
                        <th className="cl-darkblue">Status</th> 
                        <th className="cl-darkblue">Status Update</th> 
                        <th className="cl-darkblue">Action</th>  
                        </tr>
                    </thead>
                    <tbody>
                        
                            {project &&
                                project.service.map(
                                    (serviceVal, serviceIndex) => {
                                    return (
                                        <tr key={serviceIndex}>
                                        <td >
                                            <p>{serviceIndex + 1}.</p> 
                                        </td>
                                        <td >
                                            <p>{serviceVal.serviceName}</p> 
                                        </td>
                                        <td >
                                            <p>{serviceVal.status}</p> 
                                        </td>
                                        <td >
                                            <select name="status" id="" className='form-select' onChange={e=>statusChange(e)}> 
                                                <option disabled={status}>Change</option>
                                                <option value="complete">Complete</option>
                                                <option value="pending">Pending</option>
                                            </select>
                                            {/* <p>{serviceVal.status}</p>  */}
                                        </td>
                                        <td >
                                            <div className="text-center">
                                                <button className='btn btn-sm btn-outline-primary' type='submit' onClick={e=>projectUpdate(e, serviceIndex)}>Update</button>
                                            </div> 
                                        </td> 
                                        </tr>
                                    );
                                }
                            )}
                            {/* <tr>
                        <td>
                            <div>
                            <ol type="1">
                                {project &&
                                project.service.map(
                                    (serviceVal, serviceIndex) => {
                                    return (
                                        <li key={serviceIndex}>
                                        {serviceVal.serviceName}
                                        </li>
                                    );
                                    }
                                )}
                            </ol>
                            </div>
                        </td> 
                        </tr> */}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>

            </div>
        </div>
    </Container>
      <Container className=''>
        <section className='card p-3 '>
            {project && project.team  ?
            <div className="table-responsive">
                <table className='table'>
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Profile</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {teamAllData && project && teamAllData.filter(data => data._id === project.team).map((teamValue, teamIndex)=>{  
                                return(
                                    <tr key={teamIndex}>
                                    <td>{teamValue.assistant.role}</td>
                                    <td>{teamValue.assistant.staffName}</td>
                                    <td><Link className='btn btn-primary'> Profile View</Link></td>
                                </tr>
                                )
                            })}  

                            {teamAllData && project && teamAllData.find(data => data._id === project.team).team.map((teamValue, teamIndex)=>{  
                                return(
                                    <tr key={teamIndex}>
                                    <td>{teamValue.role}</td>
                                    <td>{teamValue.staffName}</td>
                                    <td><Link className='btn btn-primary'>Profile View</Link></td>
                                </tr>
                                )
                            })} 
                            
                        </tbody>
                </table>
            </div>
            :
            <> 
            <div className="text-center">
            <p> no team is assined. </p>
            <Link className='btn btn-primary' to={`/dashboard/make-team/${projectId}`}>make a team</Link> 
            </div>
            </>
            }
        </section>
      </Container>
      {/* <Container>
        <section className='table-responsive'>
            <table className='table table-striped table-bordered text-center table-hover align-top data-sm'>
                <thead className='table-primary'>
                    <tr className='align-top'>
                        <th>S. No.</th>
                        <th>Package / service  </th> 
                        <th>Price ($)</th> 
                        <th>Client</th> 
                        <th>Client Name</th> 

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>   

                  {projectAllData && projectAllData.filter(value => value.projectStatus === "running" && value.team ).map((cv, i)=>{
                      return( 
                        <tr className='text-center' key={i}>
                              <td>{i + 1}</td>  
                              {cv.projectType === "package" ?
                              <td className='text-capitalize'>{packageAllData.filter(data => data._id === cv.packageId).map((packageVal) => packageVal.packageName)}</td> : 
                              <td className='text-capitalize'>"custom Project"</td> }
 
                              <td>$ {cv.totalPrice}</td> 
                              <td>{cv.clientId}</td>
                              <td className='text-capitalize'>{cv.clientName}</td>  
                              <td>
                                  <div className='d-flex align-items-center flex-wrap justify-content-center flex-column'>  
                                  <Link className='btn border-0 mb-1 pb-0 text-nowrap' disabled> 
                                    <i className="fa-solid fa-user-pen fa-sm text-success me-1 "></i> 
                                    <small className='fw-bold text-success'>update</small>
                                  </Link>
                                  <Link className='btn border-0 mb-1 pb-0 text-nowrap' > 
                                    <i className="fa-solid fa-eye fa-sm text-primary me-1 "></i> 
                                    <small className='fw-bold text-primary'>view</small>
                                  </Link> 
                                  </div>
                              </td>
                          </tr> 
                      )
                  })}
 
                </tbody>
            </table>
        </section>
      </Container> */}
    </>
  )
}

export default UpdateProjectPage