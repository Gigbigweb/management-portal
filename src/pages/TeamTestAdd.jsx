// import React, { useState } from 'react';

// function TeamTestAdd() {
//   const [inputFields, setInputFields] = useState([{ value: '' }]);

//   const handleAddInput = () => {
//     const newInputFields = [...inputFields, { value: '' }];
//     setInputFields(newInputFields);
//   };

//   const handleRemoveInput = (index) => {
//     const newInputFields = [...inputFields];
//     newInputFields.splice(index, 1);
//     setInputFields(newInputFields);
//   };

//   const handleInputChange = (index, event) => {
//     const newInputFields = [...inputFields];
//     newInputFields[index].value = event.target.value;
//     setInputFields(newInputFields);
//   };

//   return (
//     <div>
//       {inputFields.map((inputField, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={inputField.value}
//             onChange={(event) => handleInputChange(index, event)}
//           />
//           <button onClick={() => handleRemoveInput(index)}>Remove</button>
//         </div>
//       ))}
//       <button onClick={handleAddInput}>Add Input</button>
//     </div>
//   );
// }

// export default TeamTestAdd;






import React, { useState } from 'react';

const roleAllData = [
  { id: "role1", role: "freelancer" },
  { id: "role2", role: "web developer" },
  { id: "role3", role: "graphic designer" },
  { id: "role4", role: "assistant" },
  { id: "role5", role: "content writer" },
]; 
const staffAllData = [
  { id: "staff1", role: "web developer", name: "manish web 1" },
  { id: "staff2", role: "web developer", name: "manish web 2" },
  { id: "staff3", role: "graphic designer", name: "manish graphic 3" },
  { id: "staff4", role: "graphic designer", name: "manish graphic 4" },
  { id: "staff5", role: "assistant", name: "manish assistant 5" },
  { id: "staff6", role: "content writer", name: "manish content 6" },
  { id: "staff7", role: "freelancer", name: "manish freelance 7" },
];
 
// import 'bootstrap/dist/css/bootstrap.min.css'; 
 

function TeamTestAdd() {
  const [inputTeam, setInputTeam] = useState([{ role: '', staff: '' }]);

  const handleRoleChange = (index, selectedRole) => {
    const updatedInputTeam = [...inputTeam];
    updatedInputTeam[index].role = selectedRole;
    updatedInputTeam[index].staff = '';
    setInputTeam(updatedInputTeam);
  };

  const handleStaffChange = (index, selectedStaff) => {
    const updatedInputTeam = [...inputTeam];
    updatedInputTeam[index].staff = selectedStaff;
    setInputTeam(updatedInputTeam);
  };

  const handleAddMore = () => {
    setInputTeam([...inputTeam, { role: '', staff: '' }]);
  };

  const handleRemovePair = (indexToRemove) => {
    const updatedInputTeam = inputTeam.filter((_, index) => index !== indexToRemove);
    setInputTeam(updatedInputTeam);
  };

  return (
    <div className="container mt-4">
      <h1>Dynamic Input Form</h1>
      {inputTeam.map((inputPair, index) => (
        <div key={index} className="row mb-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={inputPair.role}
              onChange={(e) => handleRoleChange(index, e.target.value)}
            >
              <option value="">Select Role</option>
              {roleAllData.map((role) => (
                <option key={role.id} value={role.role}>{role.role}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            {inputPair.role && (
              <select
                className="form-select"
                value={inputPair.staff}
                onChange={(e) => handleStaffChange(index, e.target.value)}
              >
                <option value="">Select Staff</option>
                {staffAllData
                  .filter((staff) => staff.role === inputPair.role)
                  .map((staff) => (
                    <option key={staff.id} value={staff.name}>{staff.name}</option>
                  ))}
              </select>
            )}
          </div>
          <div className="col-md-4">
            {inputTeam.length > 1 && (
              <button className="btn btn-danger" onClick={() => handleRemovePair(index)}>
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleAddMore}>
          Add More
        </button>
      </div>
      <div>
        <h3>Selected Team:</h3>
        <pre>{JSON.stringify(inputTeam, null, 2)}</pre>
      </div>
    </div>
  );
}

export default TeamTestAdd;









// function TeamTestAdd() {
//   const [inputTeam, setInputTeam] = useState([{ role: '', staff: '' }]);

//   const handleRoleChange = (index, selectedRole) => {
//     const updatedInputTeam = [...inputTeam];
//     updatedInputTeam[index].role = selectedRole;
//     updatedInputTeam[index].staff = ''; // Reset staff when role changes
//     setInputTeam(updatedInputTeam);
//   };

//   const handleStaffChange = (index, selectedStaff) => {
//     const updatedInputTeam = [...inputTeam];
//     updatedInputTeam[index].staff = selectedStaff;
//     setInputTeam(updatedInputTeam);
//   };

//   const handleAddMore = () => {
//     setInputTeam([...inputTeam, { role: '', staff: '' }]);
//   };

//   const handleRemovePair = (indexToRemove) => {
//     const updatedInputTeam = inputTeam.filter((_, index) => index !== indexToRemove);
//     setInputTeam(updatedInputTeam);
//   };

//   return (
//     <div>
//       {inputTeam.map((inputPair, index) => (
//         <div key={index}>
//           <select value={inputPair.role} onChange={(e) => handleRoleChange(index, e.target.value)}>
//             <option value="">Select Role</option>
//             {roleAllData.map((role) => (
//               <option key={role.id} value={role.role}>{role.role}</option>
//             ))}
//           </select>
//           {inputPair.role && (
//             <select value={inputPair.staff} onChange={(e) => handleStaffChange(index, e.target.value)}>
//               <option value="">Select Staff</option>
//               {staffAllData
//                 .filter((staff) => staff.role === inputPair.role)
//                 .map((staff) => (
//                   <option key={staff.id} value={staff.name}>{staff.name}</option>
//                 ))}
//             </select>
//           )}
//           {inputTeam.length > 1 && (
//             <button onClick={() => handleRemovePair(index)}>Remove</button>
//           )}
//         </div>
//       ))}
//       <button onClick={handleAddMore}>Add More</button>
//       <div>
//         <h3>Selected Team:</h3>
//         <pre>{JSON.stringify(inputTeam, null, 2)}</pre>
//       </div>
//     </div>
//   );
// }

// export default TeamTestAdd;

