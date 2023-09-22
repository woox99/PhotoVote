import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Button,
} from '@mui/material';
import styles from '../styles/steps.module.css'
//images
import winnerImg from '../assets/winner.png';
import voteImg from '../assets/vote.png';
import karmaImg from '../assets/karma.png';


const Steps = props => {

    return (
        <div className={styles.red}>
            <div className={styles.steps}>
                <div className={styles.step}>
                    <img src={voteImg} alt="" />
                    <p>Vote to earn karma points</p>
                </div>
                <div className={styles.step}>
                    <img src={karmaImg} alt="" />
                    <p>Use karma to get votes</p>
                </div>
                <div className={styles.step}>
                    <img src={winnerImg} alt="" />
                    <p>Find the perfect photo</p>
                </div>
            </div>
        </div>
    )
}

export default Steps;