import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const UploadCloud = ({ name_folder, checkUploadResult, text_btn = 'UPLOAD PHOTO' }) => {
  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      uploadPreset: 'no_more_waste_' + name_folder,
      cropping: true,
      maxImageWidth: 650,
      tags: ['waste'],
      publicId: process.env.NODE_ENV === 'production' ? `prod_${uuidv4()}` : `dev_${uuidv4()}`,
      thumbnails: '.uploaded',
      thumbnailTransformation: [{ width: 270, height: 180, crop: 'limit' }],
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result);
        checkUploadResult(result.info);
      }
    }
  );
  const showWidget = (widget) => {
    widget.open();
  };
  return (
    <div id="photo-form-container">
      <div className="btn btn-info" onClick={() => showWidget(widget)}>
        {text_btn}
      </div>
    </div>
  );
};

export default UploadCloud;
