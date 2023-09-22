import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
    Button,
} from '@mui/material';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';


const drawerWidth = 240;
const navItemsHome = [
    { label: 'login', path: '/login' },
    { label: 'sign up', path: '/signup' }
];
const navItemsActiveUser = [
    { label: 'logout', path: '/logout' },
];


const NavBar = props => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const { activeUser } = props;

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawerHome = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                {activeUser ? (
                    <>
                        <p>Hello</p>
                        <p className='bold'>{activeUser.firstName} {activeUser.lastName}</p>
                    </>
                ) : (
                    'menu'
                )}
            </Typography>
            <Divider />
            { activeUser ? (
                <>
                <List>
                    {navItemsActiveUser.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <Link to={item.path} style={{ textDecoration: 'none', color: '#00a4ed' }}>
                                    <ListItemText primary={item.label} />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                </>
            ): (
                <>
                <List>
                    {navItemsHome.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <Link to={item.path} style={{ textDecoration: 'none', color: '#00a4ed' }}>
                                    <ListItemText primary={item.label} />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                </>
            )}
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div>
            <div className='deskNavBar'>
                <p className='title'>Photo<span className='vote'>Vote</span></p>
                <div className="right">
                    {activeUser ? (
                        <>
                            <p>Hello <span className='name'>{activeUser.firstName} {activeUser.lastName}</span></p>
                            {activeUser.isAdmin && (
                            <Button id='btn' variant="outlined" onClick={() => navigate('/admin')}>admin</Button>
                            )}
                            <Button id='btn' variant="outlined" onClick={() => navigate('/logout')}>logout</Button>
                        </>
                    ) : (
                        <>
                            <Button id='btn' variant="outlined" onClick={() => navigate('/signup')}>sign up</Button>
                            <Button id='btn' variant="outlined" onClick={() => navigate('/login')}>login</Button>
                        </>
                    )}
                </div>
            </div>


            <div className="mobileNavBar">
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar component="nav" sx={{ backgroundColor: '#333' }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { md: 'none' } }}
                            >
                                <MenuIcon />
                                <p className='title'>Photo<span className='vote'>Vote</span></p>
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
                            >
                                MUI
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav>
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            {drawerHome}
                        </Drawer>
                    </nav>
                </Box>
            </div>
        </div>
    )
}

export default NavBar;