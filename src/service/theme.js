import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { rejects } from "assert";
import { resolve } from "path";


const initialState = {
    themes: 'dark'
}
async function ssrFetch() {
    return new Promise((resolve,rejects)=>{
        fetch('http://localhost:3000/api/commt', {
        method: 'GET'
    }).then(res=>{resolve(res.json())})
    .catch(err=>{rejects(err)})
    })
}



export const CommitQuery = createAsyncThunk(
    "api/commit",
    async () => {
        return await ssrFetch()
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
