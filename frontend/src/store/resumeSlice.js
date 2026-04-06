import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resumeApi } from "../services/endpoints";

const emptyResume = {
  title: "Untitled Resume",
  template: "aurora",
  accentColor: "#0ea5e9",
  visibility: "private",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    imageUrl: ""
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: []
};

export const fetchResumesThunk = createAsyncThunk("resume/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await resumeApi.list();
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch resumes");
  }
});

export const fetchResumeThunk = createAsyncThunk("resume/fetchOne", async (id, { rejectWithValue }) => {
  try {
    const { data } = await resumeApi.get(id);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch resume");
  }
});

export const createResumeThunk = createAsyncThunk("resume/create", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await resumeApi.create(payload);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to create resume");
  }
});

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    list: [],
    current: emptyResume,
    loading: false,
    error: null
  },
  reducers: {
    setCurrentResume: (state, action) => {
      state.current = { ...state.current, ...action.payload };
    },
    patchCurrentResume: (state, action) => {
      state.current = { ...state.current, ...action.payload };
    },
    resetCurrentResume: (state) => {
      state.current = emptyResume;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResumesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchResumesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchResumeThunk.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createResumeThunk.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      });
  }
});

export const { setCurrentResume, patchCurrentResume, resetCurrentResume } = resumeSlice.actions;
export default resumeSlice.reducer;