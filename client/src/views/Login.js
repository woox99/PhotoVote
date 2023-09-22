import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            PhotoVote 2023
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const user = {
            email: data.get('email'),
            password: data.get('password'),
        };

        axios.post('http://localhost:8000/api/login', user, { withCredentials: true })
            .then(res => {
                // console.log(res);
                navigate('/myPoll')
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.message);
            })
    };

    const createDemoAccount = async () => {
        const randomNum = Math.floor(Math.random() * (999999));
        const user = {
            firstName: 'Demo',
            lastName: 'Account#' + randomNum,
            email: randomNum + 'demoaccount@gmail.com',
            password: 'demoaccount',
            confirm: 'demoaccount'
        }

        try {
            await axios.post('http://localhost:8000/api/register', user, { withCredentials: true });
            navigate('/createPoll');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    {
                            <p className='errorMsg'>{error}</p>
                    }
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <div className="center">
                            <Button id='btn' onClick={createDemoAccount}>use demo account</Button>
                        </div>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Login;