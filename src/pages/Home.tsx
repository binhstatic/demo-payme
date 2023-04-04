import React, { useEffect, useRef, useState } from 'react';
import './Home.css';

const Home = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStopCapture = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
  };

  return (
    <div className='home'>
      <video ref={videoRef} className='video' autoPlay></video>
      <div className='buttons'>
        <button onClick={handleStartCapture}>Start Camera</button>
        <button onClick={handleStopCapture}>Stop Camera</button>
      </div>
    </div>
  );
};

// const Home = () => {
//   const video = useRef();

//   const init = async () => {
//     await setUpCamera();
//     console.log('setup camera success');
//   };

//   const setUpCamera = () => {
//     return new Promise((resolve, reject) => {
//       navigator.getUserMedia =
//         navigator.getUserMedia ||
//         navigator.webkitGetUserMedia ||
//         navigator.mozGetUserMedia ||
//         navigator.mstGetUserMedia;

//       if (navigator.getUserMedia) {
//         navigator.getUserMedia(
//           {
//             video: true,
//           },
//           (stream) => {
//             video.current.src = stream;
//             video.current.addEventListener('loadeddata', resolve);
//           },
//           (error) => reject(error)
//         );
//       } else {
//         reject();
//       }
//     });
//   };

//   useEffect(() => {
//     init();

//     return () => {};
//   }, []);

//   return (
//     <div className='home'>
//       <video ref={video} className='video' autoPlay></video>
//     </div>
//   );
// };

export default Home;
