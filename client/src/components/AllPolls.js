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
import styles from '../styles/admin.module.css';
import NavBar from './NavBar';
import Footer from './Footer'
import Karma from './Karma';
import Steps from './Steps';
import Photo from './Photo';
import PhotoWinner from './PhotoWinner';

const AllPolls = props => {
    const [activeUser, setActiveUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const [polls, setPolls] = useState();
    const [feedback, setFeedback] = useState([]);
    const [photoOneIsWinner, setPhotoOneIsWinner] = useState(true);
    const [photoTwoIsWinner, setPhotoTwoIsWinner] = useState(true);
    const [photoThreeIsWinner, setPhotoThreeIsWinner] = useState(true);

    useEffect(() => {
        // get all polls
        axios.get('http://localhost:8000/api/poll/all', { withCredentials: true })
            .then(res => {
                setPolls(res.data);
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])



    const deletePoll = pollId => {
        console.log(pollId)
        axios.delete('http://localhost:8000/api/poll/' + pollId, { withCredentials: true })
            .then(() => window.location.reload())
            .catch(err => console.log(err))
    }

    const deleteUser = userId => {
        axios.delete('http://localhost:8000/api/user/' + userId, { withCredentials: true })
            .then(() => window.location.reload())
            .catch(err => console.log(err))
        axios.delete('http://localhost:8000/api/pollByOwner/' + userId, { withCredentials: true })
            .then(() => window.location.reload())
            .catch(err => console.log(err))
        
    }

    return (
        <div>
            {isLoaded && (
                <div className={styles.white}>
                    {polls.map((poll, index) => (
                        <div key={index}>
                            <div className={styles.photos}>
                                <div className="center">
                                    <Button
                                        className={styles.deleteButton}
                                        id='btn'
                                        onClick={() => deletePoll(poll._id)}>delete</Button>
                                </div>
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
                                <div>
                                    <p>owner id: {poll.ownerId}</p>
                                    <Button onClick={() => deleteUser(poll.ownerId)}>delete owner</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllPolls;