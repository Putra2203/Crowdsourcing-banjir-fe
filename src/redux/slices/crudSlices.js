import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Base URL backend
const API_BASE_URL = "https://web-production-6d7c3.up.railway.app/api/reports";

// Thunk untuk mengambil semua laporan
export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching reports");
    }
  }
);

// Thunk untuk mengambil laporan berdasarkan user_id
export const fetchReportsByUser = createAsyncThunk(
  "reports/fetchReportsByUser",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data);
      return response.data.reports || response.data;
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data || "Error fetching reports by user"
      );
    }
  }
);

// Thunk untuk menambahkan laporan baru
export const addReport = createAsyncThunk(
  "reports/addReport",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.report;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating report");
    }
  }
);

// Thunk untuk mengupdate laporan
export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async ({ token, reportId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${reportId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.report;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating report");
    }
  }
);

// Thunk untuk menghapus laporan
export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async ({ reportId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return reportId;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting report");
    }
  }
);

// Slice Redux untuk laporan
const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Reports
    builder.addCase(fetchReports.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    });
    builder.addCase(fetchReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Reports by User
    builder.addCase(fetchReportsByUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReportsByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    });
    builder.addCase(fetchReportsByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add Report
    builder.addCase(addReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addReport.fulfilled, (state, action) => {
      state.loading = false;
      state.reports.push(action.payload);
      toast.success("Report added successfully!");
    });
    builder.addCase(addReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Failed to add report");
    });

    // Update Report
    builder.addCase(updateReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateReport.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.reports.findIndex(
        (report) => report._id === action.payload._id
      );
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
      toast.success("Report updated successfully!");
    });
    builder.addCase(updateReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Failed to update report");
    });

    // Delete Report
    builder.addCase(deleteReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteReport.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = state.reports.filter(
        (report) => report._id !== action.payload
      );
      toast.success("Report deleted successfully!");
    });
    builder.addCase(deleteReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Failed to delete report");
    });
  },
});

export default reportsSlice.reducer;
