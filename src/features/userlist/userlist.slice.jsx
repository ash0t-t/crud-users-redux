import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, addUser, updateUser, deleteUser } from "../../api";

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();
  return users;
});

export const createUser = createAsyncThunk('users/create', async (user) => {
  const newUser = await addUser(user);
  return newUser;
});

export const modifyUser = createAsyncThunk('users/modify', async (user) => {
  const updatedUser = await updateUser(user);
  return updatedUser;
});

export const removeUserThunk = createAsyncThunk('users/remove', async (id) => {
  await deleteUser(id);
  return id;
});

const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(modifyUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(removeUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  }
});

export const userReducer = UserSlice.reducer;