import React, { useState } from 'react';
import axios from 'axios';

const PhotoUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        // console.log(event.target.files[0])
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file.');
            return;
        }

            const formData = new FormData();
            formData.append('photo', selectedFile);
            
            formData.append('ownerId', '1')//debug
            // console.log(formData); 

            // Replace 'YOUR_UPLOAD_ENDPOINT' with the actual API endpoint to handle file upload

            axios.post("http://localhost:8000/api/photo", formData)
                .then( () => setUploadStatus('File uploaded successfully.'))
                .catch(err => {
                    setUploadStatus('An error occurred during upload.');
                    console.error(err);
                })
    };

    return (
        <div>
            <h2>Photo Upload</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{uploadStatus}</p>
        </div>
    )
}

export default PhotoUpload;
