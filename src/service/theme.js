import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
    themes: 'dark'
}
async function ssrFetch(path) {
    console.log(path)
    return new Promise((resolve,rejects)=>{
        fetch(`https://www.bibooo.cn/api/commt?pathname=${path}`, {
        method: 'GET'
    }).then(res=>{resolve(res.json())})
    .catch(err=>{rejects(err)})
    })
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
