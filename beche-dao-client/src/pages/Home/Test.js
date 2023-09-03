import React, { useState } from 'react';

const Test = () => {
    const [images, setImages] = useState([]);
    
    const handleImageUpload = (event) => {
        const newImages = Array.from(event.target.files);
        
        if (newImages.length + images.length > 3) {
            alert('You can upload a maximum of 3 images.');
            return;
        }
        
        setImages([...images, ...newImages]);
    };

    const uploadImages = ()=>{
        console.log("tested")
    }

    return (
        <div>
            <h2>Image Upload</h2>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
            />
            <div className="mt-4 flex gap-5">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-16 h-16 mr-4 mb-4"
                    />
                ))}
            </div>
            <button onClick={uploadImages}>Upload Images</button>
        </div>
    );
};

export default Test;
