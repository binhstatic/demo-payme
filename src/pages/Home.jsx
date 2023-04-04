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
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: true,
          },
          (stream) => {
            console.log(video);
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata', resolve);
            console.log('hi');
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
