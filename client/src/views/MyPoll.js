import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
//mui imports
import {
    Button,
} from '@mui/material';
//img imports
import test from '../assets/farm.jpg';
//component imports
import styles from '../styles/myPoll.module.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import Karma from '../components/Karma';
import Steps from '../components/Steps';
import Photo from '../components/Photo';
import PhotoWinner from '../components/PhotoWinner';

const MyPoll = props => {
    const [activeUser, setActiveUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const [poll, setPoll] = useState();
    const [feedback, setFeedback] = useState([]);
    const [photoOneIsWinner, setPhotoOneIsWinner] = useState(true);
    const [photoTwoIsWinner, setPhotoTwoIsWinner] = useState(true);
    const [photoThreeIsWinner, setPhotoThreeIsWinner] = useState(true);

    useEffect(() => {
        //get activeUser by usertoken
        axios.get('http://localhost:8000/api/getActiveUser', { withCredentials: true })
            .then(res => {
                // console.log(res.data.user); //debug
                setActiveUser(res.data.user);

                // getPollByOwnerId
                axios.get('http://localhost:8000/api/poll/' + res.data.user._id, { withCredentials: true })
                    .then(res => {
                        //if no poll was found then redirect to createPoll
                        if (!res.data) {
                            navigate('/createPoll')
                        }
                        // setActiveUser(res.data.user);
                        setIsLoaded(true);
                        setPoll(res.data.poll);
                        setFeedback(res.data.feedback);

                        // console.log(res.data.photoOneVoteCount);
                        const v1 = res.data.poll.photoOneVoteCount;
                        const v2 = res.data.poll.photoTwoVoteCount;
                        const v3 = res.data.poll.photoThreeVoteCount;
                        if (v1 < v2 || v1 < v3 || v1 == 0) {
                            setPhotoOneIsWinner(false);
                        }
                        if (v2 < v1 || v2 < v3 || v2 == 0) {
                            setPhotoTwoIsWinner(false);
                        }
                        if (v3 < v1 || v3 < v2 || v3 == 0) {
                            setPhotoThreeIsWinner(false);
                        }
                    })
                    .catch(err => {
                        // console.log(err);
                        navigate('/createPoll');
                    })
            })
            .catch(err => {
                console.log(err);
                //if usertoken is not present, redirect home page
                navigate('/');
            })
    }, [])

    const showConfirm = () => {
        const confirmAlert = document.getElementById('confirmAlert');
        confirmAlert.style.display = 'block';
    }
    const hideConfirm = () => {
        const confirmAlert = document.getElementById('confirmAlert');
        confirmAlert.style.display = 'none';
    }
    const deletePoll = () => {
        axios.delete('http://localhost:8000/api/poll/' + poll._id, { withCredentials: true })
            .then(() => navigate('/createPoll'))
            .catch(err => console.log(err))

    }


    return (
        <div>
            {isLoaded && (
                <div className='dashBoard'>
                    <div className="container">
                        <NavBar activeUser={activeUser} />
                        <Karma karma={activeUser.karma} />
                        <div className="center">
                            <div className={styles.white}>
                                <div className={styles.header}>
                                    <p className={styles.activePollText}>ACTIVE POLL</p>
                                    <p className={styles.categoryText}>{poll.category}</p>
                                    <p className={styles.captionText}>"{poll.caption}"</p>
                                </div>
                                <div className={styles.photos}>
                                    <Photo
                                        imageType={poll.photoOneContentType}
                                        imageData={poll.photoOneData}
                                        voteCount={poll.photoOneVoteCount}
                                        isWinner={photoOneIsWinner}></Photo>
                                    <Photo
                                        imageType={poll.photoTwoContentType}
                                        imageData={poll.photoTwoData}
                                        voteCount={poll.photoTwoVoteCount}
                                        isWinner={photoTwoIsWinner}></Photo>
                                    <Photo
                                        imageType={poll.photoThreeContentType}
                                        imageData={poll.photoThreeData}
                                        voteCount={poll.photoThreeVoteCount}
                                        isWinner={photoThreeIsWinner}></Photo>
                                </div>
                                <div className={styles.feedback}>
                                    <p className={styles.feedbackText}>Feedback ({feedback.length})</p>
                                    <div className={styles.feedbackBox}>
                                        {
                                            feedback.map((feed, index) => (
                                                <p key={index} style={index%2==0?{backgroundColor:'white'}:{backgroundColor:'#f4fbff'}} className={styles.feed}>"{feed}"</p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <Button
                                className={styles.deleteButton}
                                id='btn'
                                onClick={showConfirm}>delete</Button>
                            <div className={styles.confirmBlur} id='confirmAlert'>
                                <div className={styles.confirmBox}>
                                    <p className={styles.alertText}>Are you sure you want to delete this poll?</p>
                                    <div>
                                        <Button onClick={deletePoll}>Yes</Button>
                                        <Button onClick={hideConfirm}>No</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Steps />
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default MyPoll;