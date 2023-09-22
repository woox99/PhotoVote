import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Button,
} from '@mui/material';
import styles from '../styles/photoWinner.module.css'
import checkMark from '../assets/check.png'


const Photo = props => {
    const { imageType, imageData, voteCount } = props;

    return (
        <div className={styles.cardWinner}>
            <div className={styles.photoWinner}>
                <div className={styles.holderWinner}>
                    <img
                        className={styles.uploadedPhotoWinner}
                        src={`data:${imageType}; base64,${imageData}`}
                        alt="" />
                </div>
                <img
                    className={styles.uploadedBorderPhotoWinner}
                    src={`data:${imageType}; base64,${imageData}`}
                    alt="" />
            </div>
            <div className={styles.checkBoxWinner}>
            </div>
            <img className={styles.checkMarkWinner} src={checkMark} alt="" />
            <div className={styles.votesWinner}>
                <p className={styles.votesTextWinner}>{voteCount} votes</p>
            </div>
        </div>
    )
}

export default Photo;