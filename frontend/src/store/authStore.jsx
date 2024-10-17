import { create } from "zustand"
//We'll use axios instead of fetch to make an API call to the backend 
import axios from 'axios'
const API_URL = "http://localhost:5000/api/auth/"
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(API_URL + 'SignUp', { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })

        }
        catch (error) {
            set({ error: error.response.data.message || "Error Signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            });
            console.log("In Login auth Store")
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null })
        try {
            await axios.post(API_URL + 'LogOut')
            set({ user: null, isAuthenticated: false, isLoading: false, error: null })
        }
        catch (error) {
            set({ error: error.response.data.message || "Error Logging Out", isLoading: false });
            throw error;
        }
    },

    EmailVerification: async (verificationCode) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(API_URL + 'Verify-email', { verificationCode });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response.data;

        }
        catch (error) {
            set({ error: error.response.data.message || "Error Verifying the mail", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(API_URL + 'CheckAuth');
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        }
        catch (error) {
            set({ isCheckingAuth: false, error: error.response.data.message || "Error Checking Auth", isAuthenticated: false });
            throw error;
        }
    }
}))