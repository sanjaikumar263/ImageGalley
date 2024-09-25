import React, { useEffect, useState } from 'react';
import './View.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdDeleteOutline } from "react-icons/md";

const View = () => {
  const [img, setImg] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:4000/get')
      .then((res) => setImg(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDelete = (id) => {
  
    axios.delete(`http://localhost:4000/delete/${id}`)
      .then((res) => {
        console.log(res.data.message);
    
        setImg(img.filter((image) => image._id !== id));
    
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        <Link to={'/upload'}>
          <p className='uld'>Upload</p>
        </Link>
      </div>
      
      <div className="image-grid">
        {img.length > 0 ? (
          img.map((data, index) => (
            <div key={index} className="image-item">
              <img
                src={`http://localhost:4000/images/${data.image}`}
                alt="Uploaded"
                width={200}
                onClick={() => handleImageClick(data)} 
              />
            </div>
          ))
        ) : (
          <p>No images to display</p>
        )}
      </div>

      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img
              src={`http://localhost:4000/images/${selectedImage.image}`}
              alt="Popup"
              width={400}
            />
            <MdDeleteOutline className='dlebtn' onClick={() => handleDelete(selectedImage._id)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default View;
