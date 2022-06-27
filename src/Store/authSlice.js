import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    role: "guest",
    userID : -1,
}

const authSlice = createSlice({
    name: "Auth Slice",
    initialState,
    reducers: {
        login: (state, payload) => {
            state.status = true
            state.role = payload.payload?.Role
            state.userID = payload.payload?.UserId
        },
        logout: (state) => {
            state.status = false
            state.role = "guest"
            state.userID = -1
        }
    }
})

export const authActions = authSlice.actions
export default authSlice