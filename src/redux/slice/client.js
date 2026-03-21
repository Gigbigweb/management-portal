import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const clientdata =  createAsyncThunk('clientdata', async ()=>{ 
    const response = await axios.get(`${Url}/client/show`).then(data => data.data)
    return response 
  }) 

const UserSlice = createSlice({
    name: "client data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(clientdata.pending, (state,action)=>{
          state.isLoading = true;
        })
      builder.addCase(clientdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(clientdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default UserSlice.reducer;


 



