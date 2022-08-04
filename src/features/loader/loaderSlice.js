import {createSlice} from '@reduxjs/toolkit'

const initialState = { 
    isLoading: false
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        activateLoader: (state) => {
             state.isLoading = true;
        },
        deactivateLoader: (state) => {
            state.isLoading = false;
        }
    }
})

export const {activateLoader, deactivateLoader} = loaderSlice.actions
export default loaderSlice.reducer;