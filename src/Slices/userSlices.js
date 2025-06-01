import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userLoginInfo') ? JSON.parse(localStorage.getItem('userLoginInfo')) : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginInfo: (state, action) => {
      console.log(state);
      state.userInfo = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { userLoginInfo } = userSlice.actions

export default userSlice.reducer