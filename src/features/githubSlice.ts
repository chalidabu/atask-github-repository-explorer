import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const fetchUsers = createAsyncThunk('github/fetchUseres', async (username: string) => {
  const response = await axios.get(`${BASE_URL}/search/users`, {
    params: { q: username, per_page: 5 }
  });
  return response.data.items;
});

export const fetchRepos = createAsyncThunk('github/fetchRepos', async (username: string) => {
  const response = await axios.get(`${BASE_URL}/users/${username}/repos`);

  return response.data.map((repo: any) => ({
    name: repo.name,
    description: repo.descripttion,
    stargazers_count: repo.stargazers_count,
  })) 
});

const githubSlice = createSlice({
  name: 'github',
  initialState: {
    users: [],
    repos: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => [
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users.';
      })
      .addCase(fetchRepos.pending, (state) => { state.loading = true; })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch repositories.';
      })
  ]
});

export default githubSlice.reducer;