import React, { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
  const video = useRef();

  const init = async () => {
    await setUpCamera();
    console.log('setup camera success');
  };

  const setUpCamera = () => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mediaDevices.mozGetUserMedia ||
        navigator.mediaDevices.mstGetUserMedia;

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(
          {
            video: true,
          },
          (stream) => {
            video.current.src = stream;
            video.current.addEventListener('loadeddata', resolve);
          },
          (error) => reject(error)
        );
      } else {
        reject();
      }
    });
  };

  useEffect(() => {
    init();

    return () => {};
  }, []);

  return (
    <div className='home'>
      <video ref={video} className='video' autoPlay></video>
    </div>
  );
};

export default Home;
