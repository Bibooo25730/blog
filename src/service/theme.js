import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    themes:'dark'
}
const themeService = createSlice({
    name:"theme",
    initialState:initialState,
    reducers:{
        ToggleTheme(state,action){
            console.log(state,action)
            state.themes = action.payload
        }
    }
})

export default themeService.reducer
export const {ToggleTheme} = themeService.actions;
