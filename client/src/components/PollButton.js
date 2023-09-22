import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
    Button,
} from '@mui/material';
import styles from '../styles/pollButton.module.css';
import question from '../assets/question.png';

const PollButton = props => {
    const navigate = useNavigate();
    const {karma} = props;

    const showAlert = () => {
        const alert = document.getElementById('alert');
        alert.style.display = 'block';
    }
    const hideAlert = () => {
        const alert = document.getElementById('alert');
        alert.style.display = 'none';
    }

    return(
        <div className={styles.karmaWithAlert} id='karma'>
            <div className={styles.karma}>
                <div className={styles.topLine}>
                    <p className={styles.karmaText}>Karma: {karma}</p>
                    <img id='question' 
                        className={styles.questionImg}
                        src={question}
                        alt="" 
                        onMouseEnter={showAlert}
                        onMouseLeave={hideAlert}/>
                </div>
                <Button 
                    className={styles.btn}
                    onClick={() => navigate('/myPoll')}>my poll</Button>
            </div>
            <p className={styles.alert}
                id='alert'>You don't need karma to create a poll, but users that have karma points will always get their photos voted on first.</p>
        </div>
    )
}

export default PollButton;