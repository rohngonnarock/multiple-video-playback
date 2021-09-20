import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady, play, PlayBackSpeed, stopAt } = props;
  const [CurrentTime, setCurrentTime] = useState(0);
  const [Duration, setDuration] = useState(0);
  const [IsVideoPaused, setIsVideoPaused] = useState(false);
  const [ShowQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, onReady]);

  useEffect(() => {
    if (!IsVideoPaused && CurrentTime < Duration) {
      if (play) {
        playVideo();
      } else {
        pauseVideo();
      }
    }
  }, [play, CurrentTime, Duration]);

  const pauseVideo = () => {
    const player = playerRef.current;
    player.pause();
  };

  const playVideo = () => {
    const player = playerRef.current;
    player.play();
  };

  useEffect(() => {
    const player = playerRef.current;
    player.playbackRate(PlayBackSpeed);
  }, [PlayBackSpeed]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    const timer = setInterval(() => {
      setCurrentTime(player.currentTime());
      setDuration(player.duration());
    }, 100);

    if (!ShowQuestion && !IsVideoPaused && stopAt && CurrentTime >= stopAt) {
      setShowQuestion(true);
      setIsVideoPaused(true);
      pauseVideo();
    }

    return () => {
      clearInterval(timer);
    };
  });

  const onButtonYes = () => {
    playVideo();
    setIsVideoPaused(false);
  };
  const onButtonNo = () => {
    playVideo();
    setIsVideoPaused(false);
  };

  return (
    <>
      <div style={{ flex: "1 1 50%" }} data-vjs-player>
        <video
          width="640"
          height="264"
          ref={videoRef}
          className="video-js vjs-big-play-centered"
        />

        {/* Only for testing purpose */}
        <div
          style={{
            fontSize: "2rem",
            color: "red",
            position: "absolute",
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          C :{CurrentTime}
          <br />D :{Duration}
          <br />
        </div>

        {IsVideoPaused && (
          <div
            style={{
              fontSize: "2rem",
              color: "red",
              position: "absolute",
              background: "rgba(0,0,0,0.75)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <main>Is this a sample question?</main>
            <footer>
              <button onClick={onButtonYes}>Yes</button>
              <button onClick={onButtonNo}>No</button>
            </footer>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoJS;
