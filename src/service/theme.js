import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosFom from "../lib/request";


const initialState = {
    themes: 'dark'
}

async function ssrFetch(path) {
    return axiosFom.onGet(`/api/commt?pathname=${path.toLowerCase()}`)
}



export const CommitQuery = createAsyncThunk(
    "api/commit",
    async (path) => {
        return await ssrFetch(path)
    }
)
const themeService = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        ToggleTheme(state, action) {
            console.log(state, action)
            state.themes = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CommitQuery.fulfilled, (state, action) => {
             state = action.payload
        })
    }
})

export default themeService.reducer
export const { ToggleTheme } = themeService.actions;
