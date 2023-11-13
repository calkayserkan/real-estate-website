import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ilanlar:[]
    
}

const ilanlar = createSlice({
    name: 'ilanlar',
    initialState,
    reducers:{
        setIlanlar: (state,action)=>{
            state.ilanlar = action.payload;
        },
        appendIlanlar: (state,action)=>{
           state.ilanlar = [...state.customers,action.payload]; 
        }
    }
})

export const { 
    setIlanlar, 
    appendIlanlar, 
 } = ilanlar.actions
export default ilanlar.reducer