import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const projectdata =  createAsyncThunk('projectdata', async ()=>{ 
    const response = await axios.get(`${Url}/project/all`).then(data => data.data)

    return response 
  })

const ProjectSlice = createSlice({
    name: " project data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(projectdata.pending, (state,action)=>{
          state.isLoading = true;
        })
      builder.addCase(projectdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(projectdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default ProjectSlice.reducer;


 



