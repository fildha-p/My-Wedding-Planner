import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice(
    {
        name : "auth",
        initialState : {
            user :{
            name : "Fildha",
            email : "fildha@gmail.com",
            password : "123456789"},
        isAuthenticated : false,
        error : null },
        reducers : {
            login : (state, action) => {
                const {email,password} = action.payload

                if (email === state.user.email && password === state.user.password){
                    state.isAuthenticated = true ,
                    state.error = null
                }
                else {
                    state.isAuthenticated = false,
                    state.error = "invalid"
                }
            },
            logout : (state) => {
                state.isAuthenticated = false
            }
        }
    }
)
export const {login,logout} = authSlice.actions
export default authSlice.reducer