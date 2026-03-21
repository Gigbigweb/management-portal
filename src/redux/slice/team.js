import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import {Url} from '../../url/url'

export const teamdata =  createAsyncThunk('teamdata', async ()=>{ 
    const response = await axios.get(`${Url}/team/all`).then(data => data.data)
    return response 
  }) 

const TeamSlice = createSlice({
    name: "team data",
    initialState: { 
        isLoading: false,
        data: []
    },
    extraReducers: (builder)=>{
        builder.addCase(teamdata.pending, (state,action)=>{
          state.isLoading = true;
        })
      builder.addCase(teamdata.fulfilled, (state,action)=>{
        state.isLoading = false; 
        state.data = action.payload; 
      });
      builder.addCase(teamdata.rejected, (state,action)=>{ 
        state.isError=true;
      })
    }
})
 
export default TeamSlice.reducer;


 



