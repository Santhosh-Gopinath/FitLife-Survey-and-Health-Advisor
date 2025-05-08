/**
 * FitNexus Authentication Module
 * Handles login, registration, and password reset functionality
 */

// Store the token in localStorage
const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('fitnexusToken', token);
    } else {
        localStorage.removeItem('fitnexusToken');
    }
};

// Check if user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem('fitnexusToken');
    return !!token;
};

// Redirect if not authenticated
const requireAuth = () => {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
};

// Redirect if already authenticated
const redirectIfAuthenticated = () => {
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
};

// Register a new user
const registerUser = async (userData) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Registration failed');
        }
        
        // Save token and redirect
        setAuthToken(data.token);
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Login user
const loginUser = async (credentials) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Login failed');
        }
        
        // Save token and redirect
        setAuthToken(data.token);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Request password reset
const forgotPassword = async (email) => {
    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Password reset request failed');
        }
        
        return data;
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
};

// Reset password with token
const resetPassword = async (token, password) => {
    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Password reset failed');
        }
        
        return data;
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
};

// Get current user data
const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('fitnexusToken');
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch('/api/auth/user', {
            headers: {
                'x-auth-token': token
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Failed to get user data');
        }
        
        return data;
    } catch (error) {
        console.error('Get user error:', error);
        throw error;
    }
};

// Logout user
const logoutUser = () => {
    setAuthToken(null);
    window.location.href = 'index.html';
};

// Save user profile
const saveProfile = async (profileData) => {
    console.log('Attempting to save profile with data:', profileData);
    try {
        const token = localStorage.getItem('fitnexusToken');
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        console.log('Token found:', token); 

        const response = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(profileData)
        });
    
        const data = await response.json();
        console.log('Server response:', data); // Log the server response
            
        if (!response.ok) {
            throw new Error(data.msg || 'Failed to save profile');
        }
            
        return data;
    } catch (error) {
        console.error('Save profile error:', error);
        throw error;
    }
};

// Get user profile
const getProfile = async () => {
    try {
        const token = localStorage.getItem('fitnexusToken');
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const response = await fetch('/api/profile', {
            headers: {
                'x-auth-token': token
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Failed to get profile');
        }
        
        return data;
    } catch (error) {
        console.error('Get profile error:', error);
        throw error;
    }
};