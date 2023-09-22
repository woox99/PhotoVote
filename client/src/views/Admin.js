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
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import Karma from '../components/Karma';
import Steps from '../components/Steps';
import Photo from '../components/Photo';
import PhotoWinner from '../components/PhotoWinner';
import AllPolls from '../components/AllPolls';
import AllUsers from '../components/AllUsers';

const Admin = props => {
    const [activeUser, setActiveUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const [displayPollsOrUsers, setDisplayPollsOrUsers] = useState(true)
    // const [polls, setPolls] = useState();
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
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <div>
            {isLoaded && (
                <div className='dashBoard'>
                    <div className="container">
                        <NavBar activeUser={activeUser} />
                        <Karma karma={activeUser.karma} />
                        <div className="center">
                            <div className="flex">
                                <Button id='btn' onClick={() => setDisplayPollsOrUsers(true)} style={{ marginRight: '10px' }}>all polls</Button>
                                <Button id='btn' onClick={() => setDisplayPollsOrUsers(false)}>all users</Button>
                            </div>
                            <div style={{marginTop: '110px'}}>
                                {displayPollsOrUsers ? (
                                    <AllPolls></AllPolls>
                                ) : (
                                    <AllUsers></AllUsers>
                                )}
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

export default Admin;