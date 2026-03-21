import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const packagedata =  createAsyncThunk('packagedata', async ()=>{  
    const response = await axios.get(`${Url}/package`).then(data => data.data)
    return response 
  }) 

const PackageSlice = createSlice({
    name: "package data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(packagedata.pending, (state,action)=>{
          state.isLoading = true;
        })
      builder.addCase(packagedata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(packagedata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default PackageSlice.reducer;


 



