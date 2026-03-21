import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const staffdata =  createAsyncThunk('staffdata', async ()=>{ 
    const response = await axios.get(`${Url}/staff/all`).then(data => data.data)
    return response 
  }) 

const StaffSlice = createSlice({
    name: "client data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(staffdata.pending, (state,action)=>{
          state.isLoading = true;
        })
      builder.addCase(staffdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(staffdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default StaffSlice.reducer;


 



