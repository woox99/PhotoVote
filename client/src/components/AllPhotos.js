import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllPhotos = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/photo")
            .then(res => {
                setPhotos(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h2>Photo Gallery</h2>
            <div className="photo-container">
                {photos.map(photo => (
                    <div key={photo._id} className="photo-item">
                        {console.log(photo.imageData)} {/* Log the imageData */}
                        <img 
                        src={`data:${photo.imageContentType};base64,${photo.imageData}`} 
                        alt="Uploaded"
                        style={{ width: '200px' }}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPhotos;
