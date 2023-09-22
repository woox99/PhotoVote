import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const SignUp = props => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            confirm: data.get('confirm')
        };

        axios.post('http://localhost:8000/api/register', user, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate('/createPoll');
            })
            .catch(err => {
                console.log(err) //debug
                const errorArr = [];
                // console.log(err.response.data.errors)

                for (const key of Object.keys(err.response.data.errors)) {
                    errorArr.push(err.response.data.errors[key].message)
                    // console.log(err.response.data.errors[key])
                }
                setErrors(errorArr);
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
                        Sign up
                    </Typography>

                    {
                        errors.map((error, index) => (
                            <p className="errorMsg" key={index}>{error}</p>
                        ))
                    }
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm"
                                    label="Confirm Password"
                                    type="password"
                                    id="comfirm"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <div className="center">
                            <Button id='btn' onClick={createDemoAccount}>use demo account</Button>
                        </div>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;