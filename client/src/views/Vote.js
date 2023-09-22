import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
//mui imports
import {
    Button,
    TextField
} from '@mui/material';
//img imports
import test from '../assets/farm.jpg';
//component imports
import styles from '../styles/vote.module.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import Karma from '../components/Karma';
import Steps from '../components/Steps';
import Photo from '../components/Photo';
import PollButton from '../components/PollButton';

const Vote = props => {
    const [activeUser, setActiveUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const [poll, setPoll] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState('');
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState(['Select the best photo for the purpose.']);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        //get activeUser by usertoken
        axios.get('http://localhost:8000/api/getActiveUser', { withCredentials: true })
            .then(res => {
                // console.log(res.data.user); //debug
                setActiveUser(res.data.user);

                // get poll to vote for user
                axios.get('http://localhost:8000/api/pollToVote/' + res.data.user._id, { withCredentials: true })
                    .then(res => {
                        // console.log(res.data) //debug
                        setIsLoaded(true);
                        setPoll(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
                //if usertoken is not present, redirect home page
                navigate('/');
            })
    }, [])

    const selectPhoto = photoNumber => {
        setSelectedPhoto(photoNumber);
        const errArr = [];
        setErrors(errArr);
        setDisabled(false);
    }

    const submitVote = () => {
        let voteCountOne, voteCountTwo, voteCountThree;
        switch (selectedPhoto) {
            case 'One':
                voteCountOne = (poll.photoOneVoteCount + 1)
                break;
                case 'Two':
                voteCountTwo = (poll.photoTwoVoteCount + 1)
                break;
                default:
                voteCountThree = (poll.photoThreeVoteCount + 1)
        }

        const vote = {
            voterId: activeUser._id,
            pollId: poll._id,
            feedback: feedback.charAt(0).toUpperCase() + feedback.slice(1), //capitalize first letter);
            pollOwnerId: poll.ownerId,
            pollOwnerKarma: poll.karma,
            activeUserKarma: activeUser.karma,
            photoOneVoteCount: voteCountOne,
            photoTwoVoteCount: voteCountTwo,
            photoThreeVoteCount: voteCountThree,
        }

        axios.post('http://localhost:8000/api/vote', vote, { withCredentials: true })
            .then(res => {

                //refresh page to find the next poll
                window.location.reload();
            })
            .catch(err => {
                // console.log(err);
                console.log(err)
                const errorArr = [];

                for (const key of Object.keys(err.response.data.errors)) {
                    errorArr.push(err.response.data.errors[key].message)
                    // console.log(err.response.data.errors[key].message) //debug
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            {isLoaded && (
                <div className='dashBoard'>
                    <div className="container">
                        <NavBar activeUser={activeUser} />
                        <PollButton karma={activeUser.karma} />
                        <div className="center">
                            {poll ? (
                                <div className={styles.white}>
                                    <div className={styles.header}>
                                        <p className={styles.categoryText}>{poll.category}</p>
                                        <p className={styles.captionText}>"{poll.caption}"</p>
                                    </div>
                                    <div style={{ minHeight: '25px' }}>
                                        {
                                            errors.map((error, index) => (
                                                <p
                                                    className="errorMsg"
                                                    key={index}
                                                    style={{ textAlign: 'center' }}>{error}</p>
                                            ))
                                        }
                                    </div>
                                    <div className={styles.photos}>
                                        <div className={selectedPhoto == 'One' ? styles.selectedCard : styles.card} onClick={() => selectPhoto('One')} >
                                            <div className={styles.photo}>
                                                <div className={styles.holder}>
                                                    <img
                                                        className={styles.uploadedPhoto}
                                                        src={`data:${poll.photoOneContentType}; base64,${poll.photoOneData}`}
                                                        alt="" />
                                                </div>
                                                <img
                                                    className={styles.uploadedBorderPhoto}
                                                    src={`data:${poll.photoOneContentType}; base64,${poll.photoOneData}`}
                                                    alt="" />
                                            </div>
                                        </div>
                                        <div className={selectedPhoto == 'Two' ? styles.selectedCard : styles.card} onClick={() => selectPhoto('Two')}>
                                            <div className={styles.photo}>
                                                <div className={styles.holder}>
                                                    <img
                                                        className={styles.uploadedPhoto}
                                                        src={`data:${poll.photoTwoContentType}; base64,${poll.photoTwoData}`}
                                                        alt="" />
                                                </div>
                                                <img
                                                    className={styles.uploadedBorderPhoto}
                                                    src={`data:${poll.photoTwoContentType}; base64,${poll.photoTwoData}`}
                                                    alt="" />
                                            </div>
                                        </div>
                                        <div className={selectedPhoto == 'Three' ? styles.selectedCard : styles.card} onClick={() => selectPhoto('Three')}>
                                            <div className={styles.photo}>
                                                <div className={styles.holder}>
                                                    <img
                                                        className={styles.uploadedPhoto}
                                                        src={`data:${poll.photoThreeContentType}; base64,${poll.photoThreeData}`}
                                                        alt="" />
                                                </div>
                                                <img
                                                    className={styles.uploadedBorderPhoto}
                                                    src={`data:${poll.photoThreeContentType}; base64,${poll.photoThreeData}`}
                                                    alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='center'>
                                        <TextField
                                            className={styles.textField}
                                            label="Feedback (optional)"
                                            sx={{ width: '500px' }}
                                            onChange={(e) => { setFeedback(e.target.value) }}
                                            placeholder='"The picture with the glasses makes you look confident."'
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.white}>
                                    <p>You already voted on all the polls!</p>
                                </div>
                            )}
                            <Button
                                className={disabled ? styles.disabledButton : styles.submitButton}
                                id='btn' onClick={submitVote}
                                disabled={disabled}>submit vote</Button>
                        </div>
                        <Steps />
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Vote;