//reducer
import {unixToTime} from "../../utils/unixToTime";
import {createAction, createReducer, createSlice} from "@reduxjs/toolkit";

const  timerSlice = createSlice({
    name:"timer",
    initialState: {
        currentTime:0,
        isStartTime:0
    },
    reducers: {
        tickTimer: (state)=> {
          state.currentTime=state.currentTime+1
            state.isStartTime= state.isStartTime
        },
        updateTimer:(state,action)=>{
            state.currentTime=action.payload
            state.isStartTime= state.isStartTime
        },
        startTimer:(state)=>{
            state.currentTime=state.currentTime
            state.isStartTime= new Date().toLocaleTimeString()
        },
        stopTimer:(state)=>{
            state.currentTime=0
            state.isStartTime=0
        }
    }})
;
export default timerSlice.reducer;
export const {tickTimer,updateTimer, startTimer,stopTimer}=timerSlice.actions;
