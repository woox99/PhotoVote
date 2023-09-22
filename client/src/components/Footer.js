import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Button,
} from '@mui/material';
import gitHub from '../assets/github.png'


const Footer = props => {

    return(
        <div className='footer flex'>
            <div className="left">
                <p className='title'>Photo<span className='vote'>Vote</span></p>
                <p>PhotoVote © 2023</p>
            </div>
            <div className="mid">
                <p>This is a demo project for my <a href="https://woox99.github.io/Portfolio/">portfolio</a> and you might not receive any votes.</p>
            </div>
            <div className="right center">
                <div className='button center'>
                    <img src={gitHub} alt="" />
                    <p>GitHub</p>
                </div>
                <p style={{ fontSize: '12px' }}>(or it didn't happen)</p>
            </div>
        </div>
    )
}

export default Footer;