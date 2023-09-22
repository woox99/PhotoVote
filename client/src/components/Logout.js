import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Button,
} from '@mui/material';


const Logout = props => {
    const navigate = useNavigate();

    useEffect(() => {
        // Inside the effect, perform the logout operation
        const logout = async () => {
            try {
                await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
                // After successful logout, navigate to the desired page (e.g., '/')
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        };

        // Call the logout function when the component mounts
        logout();
    },[]);

    return null;
}

export default Logout;