import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const servicedata =  createAsyncThunk('servicedata', async ()=>{ 
    const response = await axios.get(`${Url}/service`).then(data => data.data)
    return response 
  })

const ServiceSlice = createSlice({
    name: "service data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(servicedata.pending, (state,action)=>{
          state.isLoading = true;
        })
      builder.addCase(servicedata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(servicedata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default ServiceSlice.reducer;


 



