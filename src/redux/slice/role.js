import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const roledata =  createAsyncThunk('roledata', async ()=>{ 
    const response = await axios.get(`${Url}/role`).then(data => data.data)
    return response 
  })

const RoleSlice = createSlice({
    name: "role data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(roledata.pending, (state,action)=>{
          state.isLoading = true;
        })
      builder.addCase(roledata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(roledata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default RoleSlice.reducer;


 



