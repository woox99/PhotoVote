import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Button, Step,
} from '@mui/material';
//components
import styles from '../styles/homePage.module.css'
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Steps from '../components/Steps';
// images
import leftPhoto from '../assets/sqLeft.jpg';
import rightPhoto from '../assets/sqRight.jpg';
import centerPhoto from '../assets/sqCenter.jpg';
import checkImg from '../assets/check.png'



const HomePage = props => {
    const navigate = useNavigate();

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
        <div className='homePage'>
            <div className="container">
                <NavBar />
                <div className={styles.white}>
                    <p className={styles.title}>Discover which photo represents the best you on your dating profile, or job search porfolio!</p>
                    <div className={styles.photos}>
                        <img className={styles.photo} src={leftPhoto} alt="" />
                        <div style={{ position: 'relative' }}>
                            <img className={`${styles.photo} ${styles.centerPhoto}`} src={centerPhoto} alt="" />
                            <div className={styles.checkBox}>
                            </div>
                            <img className={styles.checkImg} src={checkImg} alt="" />
                        </div>
                        <img className={`${styles.photo} ${styles.rightPhoto}`} src={rightPhoto} alt="" />
                    </div>
                </div>
                <div className={styles.demoButton}>
                <Button
                    id="btn"
                    onClick={createDemoAccount}>user demo account</Button>
                </div>
                <Steps />
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;