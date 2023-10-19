import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
//mui imports
import {
    Button,
    FormControl,
    InputLabel,
    Input,
    FormControlLabel,
    Checkbox,
    TextField,
    Select,
    MenuItem
} from '@mui/material';
//img imports
import uploadIcon from '../assets/upload.png';
//component imports
import styles from '../styles/createPoll.module.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import Karma from '../components/Karma';
import Steps from '../components/Steps';

const CreatePoll = props => {
    const [activeUser, setActiveUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const [photoOne, setPhotoOne] = useState(null);
    const [photoTwo, setPhotoTwo] = useState(null);
    const [photoThree, setPhotoThree] = useState(null);
    const [category, setCategory] = useState('Professional');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([]);
    const [photoCount, setPhotoCount] = useState(0);

    useEffect(() => {

        //if usertoken is not present, this route will not get athenticated
        axios.get('http://localhost:8000/api/getActiveUser', { withCredentials: true })
            .then(res => {
                // console.log(res.data.user); //debug
                setActiveUser(res.data.user);
                setIsLoaded(true);

                // // getPollByOwnerId if poll is found then redirect to myPoll page
                // axios.get('http://localhost:8000/api/poll/' + res.data.user._id, { withCredentials: true })
                //     .then(res => {
                //         if (res.data) {
                //             navigate('/myPoll')
                //         }
                //     })
                //     .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err);
                // console.log('testyy')
                //if usertoken is not present, redirect home page
                navigate('/');
            })
    }, [])

    const createPoll = () => {
        if (photoCount < 3) {
            const errorArr = [];
            errorArr.push(`Upload ${3 - photoCount} more photo(s).`)
            setErrors(errorArr);
            return null;
        }

        const poll = new FormData();
        poll.append('photos', photoOne);
        poll.append('photos', photoTwo);
        poll.append('photos', photoThree);
        poll.append('ownerId', activeUser._id);
        poll.append('category',  category);
        poll.append('caption', caption.charAt(0).toUpperCase() + caption.slice(1)); //capitalize first letter);
        poll.append('karma', activeUser.karma);

        //should probably authenticate this poll
        axios.post("http://localhost:8000/api/poll", poll)
            .then(() => {
                // setUploadStatus('File uploaded successfully.')
                // console.log("test")//debug
                navigate('/myPoll');
            })
            .catch(err => {
                // setUploadStatus('An error occurred during upload.');
                console.log(err)
                const errorArr = [];

                if(err.response.data.errors){
                    for (const key of Object.keys(err.response.data.errors)) {
                        errorArr.push(err.response.data.errors[key].message)
                        // console.log(err.response.data.errors[key].message) //debug
                    }
                }
                else(
                    errorArr.push('Files too large. Try uploading files smaller than 1MB.')
                )
                setErrors(errorArr);
            })
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
                                <p className={styles.title}>Create New Poll</p>
                                {
                                    errors.map( (error, index) => (
                                        <p className="errorMsg" style={{marginBottom:'10px', textAlign:'center'}} key={index}>{error}</p>
                                    ))
                                }
                                <div className={styles.upload}>
                                    <label htmlFor="fileInput1" className={styles.uploadLabel}>
                                        {photoOne ? (
                                            <div>
                                                <div className={styles.holder}>
                                                    <img className={styles.uploadedPhoto} src={URL.createObjectURL(photoOne)} alt="" />
                                                </div>
                                                <img className={styles.uploadedBorderPhoto} src={URL.createObjectURL(photoOne)} alt="" />
                                            </div>
                                        ) :
                                            (
                                                <div>
                                                    <img src={uploadIcon} alt="" className={styles.uploadIcon} />
                                                    <p className={styles.uploadText}>upload photo</p>
                                                </div>
                                            )}
                                    </label>
                                    <label htmlFor="fileInput2" className={styles.uploadLabel}>
                                        {photoTwo ? (
                                            <div>
                                                <div className={styles.holder}>
                                                    <img className={styles.uploadedPhoto} src={URL.createObjectURL(photoTwo)} alt="" />
                                                </div>
                                                <img className={styles.uploadedBorderPhoto} src={URL.createObjectURL(photoTwo)} alt="" />
                                            </div>
                                        ) :
                                            (
                                                <div>
                                                    <img src={uploadIcon} alt="" className={styles.uploadIcon} />
                                                    <p className={styles.uploadText}>upload photo</p>
                                                </div>
                                            )}
                                    </label>
                                    <label htmlFor="fileInput3" className={styles.uploadLabel}>
                                        {photoThree ? (
                                            <div>
                                                <div className={styles.holder}>
                                                    <img className={styles.uploadedPhoto} src={URL.createObjectURL(photoThree)} alt="" />
                                                </div>
                                                <img className={styles.uploadedBorderPhoto} src={URL.createObjectURL(photoThree)} alt="" />
                                            </div>
                                        ) :
                                            (
                                                <div>
                                                    <img src={uploadIcon} alt="" className={styles.uploadIcon} />
                                                    <p className={styles.uploadText}>upload photo</p>
                                                </div>
                                            )}
                                    </label>
                                </div>

                                <div className={styles.inputs}>
                                    <div className={styles.select}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Category *</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="select"
                                                label="Select Category"
                                                value={category}
                                                onChange={(e) => { setCategory(e.target.value) }}

                                            >
                                                <MenuItem value={'Professional'}>Professional</MenuItem>
                                                <MenuItem value={'Dating'}>Dating</MenuItem>
                                                <MenuItem value={'Social'}>Social</MenuItem>
                                                <MenuItem value={'Other Category'}>Other Category</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={styles.textField}>
                                        <TextField
                                            required
                                            label="Caption"
                                            sx={{ width: '500px' }}
                                            onChange={(e) => { setCaption(e.target.value) }}
                                            placeholder='"Which of these is best for my Linkedin profile?"'
                                        />
                                    </div>
                                </div>

                                <input type="file" accept="image/*" style={{ display: 'none' }} id="fileInput1" 
                                    onChange={(e) => { setPhotoOne(e.target.files[0]); setPhotoCount(photoCount+1); }} />
                                <input type="file" accept="image/*" style={{ display: 'none' }} id="fileInput2" 
                                    onChange={(e) => { setPhotoTwo(e.target.files[0]); setPhotoCount(photoCount+1); }} />
                                <input type="file" accept="image/*" style={{ display: 'none' }} id="fileInput3" 
                                    onChange={(e) => { setPhotoThree(e.target.files[0]); setPhotoCount(photoCount+1); }} />
                            </div>


                            <Button 
                            className={styles.createButton} 
                            id='btn' onClick={createPoll}
                            >create</Button>
                        </div>
                        <Steps />
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default CreatePoll;