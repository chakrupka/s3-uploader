import React, { useState } from 'react';
import uploadImage from '../services/s3';

const NewPost = () => {
  const [img, setImg] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg({
        fileName: file.name,
        preview: window.URL.createObjectURL(file),
        file,
      });
    }
  };

  const handleUploadImage = async () => {
    const url = await uploadImage(img.file);
    window.location.href = url;
  };

  return (
    <div className="upload-screen">
      {img && (
        <>
          <img id="preview" alt="preview" src={img.preview} />
          <div>{img.fileName}</div>
        </>
      )}
      <label htmlFor="image-upload">
        Choose file
        <input
          type="file"
          id="image-upload"
          name="image"
          onChange={handleImageSelect}
        />
      </label>
      <button
        type="button"
        className={img ? '' : 'inactive'}
        onClick={handleUploadImage}
      >
        Upload
      </button>
    </div>
  );
};

export default NewPost;
