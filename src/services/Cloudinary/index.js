import React from 'react'

import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import axios from 'axios';

const Cloudinary = () => {

  const getVideos = () => {
    axios.get('http://res.cloudinary.com/nitroclik/images/list/waste.json')
      .then(res => {
        console.log(res.data.resources);
        this.setState({ videos: res.data.resources });
      });
  }
  useEffect(() => {
    getVideos()
  }, [])
  return (
    <div>

    </div>
  )
}

export default Cloudinary
