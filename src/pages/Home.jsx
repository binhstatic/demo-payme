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
      console.log(
        navigator.getUserMedia,
        navigator.webkitGetUserMedia,
        navigator.mozGetUserMedia,
        navigator.mstGetUserMedia
      );
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.mstGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: true,
          },
          (stream) => {
            video.current.src = stream;
            video.current.addEventListener('loadeddata', resolve);
          }
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
