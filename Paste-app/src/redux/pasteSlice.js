import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast';


const initialState = {
    pastes: (() => {
      try {
        const saved = localStorage.getItem("pastes");
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error("Failed to parse pastes from localStorage:", error);
        return [];
      }
    })()
  };
  

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
        const paste = action.payload;
        state.pastes.push(paste);
        localStorage.setItem("pastes",
        JSON.stringify(state.pastes));
        toast.success("Paste created!");
      
    },

    updateToPastes: (state,action) => {
        const paste = action.payload;
        const index = state.pastes.findIndex((item) =>
             item._id === paste._id);

        if (index >=0){
            state.pastes[index] = paste;
            localStorage.setItem("pastes",
            JSON.stringify(state.pastes));

            toast.success("✏️ Paste updated!");
        }


    },

    resetAllPastes: (state, action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
        toast.success("🗑️ All pastes reset!");
    },

    removeFromPastes: (state, action) => {
        const idToRemove = action.payload; // Getting the ID
        state.pastes = state.pastes.filter((paste) => paste._id !== idToRemove);
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Save new list
        toast.success("❌ Paste removed!");
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer