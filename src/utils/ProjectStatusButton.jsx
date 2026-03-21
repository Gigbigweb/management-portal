 
import React, { useEffect, useState } from 'react';
import '../Css/SwitchButton.css';  
import axios from 'axios';
import { Url } from 'src/url/url';
import { projectdata } from 'src/redux/slice/project';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SwitchButton = (props) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false); 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const checkStatus = ()=>{
    if(props.status){ 
        if(props.status === "running"){
            setIsSwitchOn(false)
        }
        else{
            setIsSwitchOn(true);
        }
    }
    return false
  }

  useEffect(()=>{
    checkStatus()
  }, [props.status])

  const handleSwitchToggle = async () => {
    setIsSwitchOn(!isSwitchOn);  
    console.log('API call triggered: Switch state changed to', isSwitchOn ? 'Complete' : 'Pending');
    try { 
        if(!isSwitchOn){
            console.log("switch on");
            await axios.post(`${Url}/project/project-status/${props.projectId}`, {"projectStatus" : "complete"}) 
            dispatch(projectdata())
            navigate(`/dashboard/update-project/${props.projectId}`)

        }
        else{
            console.log("switch off");
            await axios.post(`${Url}/project/project-status/${props.projectId}`, {"projectStatus" : "running"})
            dispatch(projectdata())
            navigate(`/dashboard/update-project/${props.projectId}`)
        }
        
    } catch (error) {
        dispatch(projectdata())
        console.log("error: ", error);
    }
  };

  return (
    <div className={`switch ${isSwitchOn ? 'on' : 'off'}`} onClick={()=>handleSwitchToggle()}>
      <input type="checkbox" checked={isSwitchOn} readOnly  disabled/>
      <div className="slider"></div>
      <span className={`label ${isSwitchOn ? 'on-label' : 'off-label'}`}>{isSwitchOn ? 'Complete' : 'running'}</span>
    </div>
  );
};

export default SwitchButton;

