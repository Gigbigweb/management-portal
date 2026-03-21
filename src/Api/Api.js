import axios from "axios"; 
import { Url } from "src/url/url";
import Swal from "sweetalert2";


export const  SingleProject = async (id)=>{
    try {
        const responseData = await axios.get(`${Url}/project/projectDetail/${id}`);
        return responseData
    } catch (error) {
        console.log("single project Api error", error);
    }
} 


export const  SingleService = async (id)=>{
    try {
        const responseData = await axios.get(`${Url}/service/single-service/${id}`);
        return responseData
    } catch (error) {
        console.log("single service Api error", error);
    }
} 

// export const  CreateTeam = async(data, projectId, startDate)=>{  
//     try {
//         const responseData = await axios.post(`${Url}/team/add/${projectId}`, {...data, startDate}); 
//         Swal.fire({
//             position: 'top-end',
//             icon: 'success',
//             title: 'team created successfully',
//             showConfirmButton: false,
//             timer: 1500
//           })
//         return responseData
//     } catch (error) {
//         console.log("createTeam api error", error);
//         Swal.fire({
//             position: 'top-end',
//             icon: 'error',
//             title: 'something went wrong',
//             showConfirmButton: false,
//             timer: 1500
//           }) 
//     }
// }  
