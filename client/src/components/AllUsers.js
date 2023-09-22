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

const AllUsers = props => {
    const [activeUser, setActiveUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const [feedback, setFeedback] = useState([]);
    const [photoOneIsWinner, setPhotoOneIsWinner] = useState(true);
    const [photoTwoIsWinner, setPhotoTwoIsWinner] = useState(true);
    const [photoThreeIsWinner, setPhotoThreeIsWinner] = useState(true);

    useEffect(() => {
        // get all polls
        axios.get('http://localhost:8000/api/users', { withCredentials: true })
            .then(res => {
                setUsers(res.data);
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])



    const deleteUser = userId => {
        //delete user
        axios.delete('http://localhost:8000/api/user/' + userId, { withCredentials: true })
            .then(() => window.location.reload())
            .catch(err => console.log(err))
        //delete all polls of user
        axios.delete('http://localhost:8000/api/pollByOwner/' + userId, { withCredentials: true })
            .then(() => window.location.reload())
            .catch(err => console.log(err))
    }


    return (
        <div>
            {isLoaded && (
                <div className={styles.white}>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>email</th>
                                <th>created at</th>
                                <th>user id</th>
                                <th>first name</th>
                                <th>last name</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} style={{ fontSize: '10px' }}>
                                    <td style={{ padding: '5px' }}>{user.email}</td>
                                    <td style={{ padding: '5px' }}>{user.createAt}</td>
                                    <td style={{ padding: '5px' }}>{user._id}</td>
                                    <td style={{ padding: '5px' }}>{user.firstName}</td>
                                    <td style={{ padding: '5px' }}>{user.lastName}</td>
                                    <td><Button onClick={() => deleteUser(user._id)}>delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AllUsers;