import React, { useState } from "react";
import VideoJS from "./component/videojs";
import "./App.css";

function App() {
  const playerRef = React.useRef(null);
  const [play, setPlay] = useState(false);
  const [PlayBackSpeed, setPlayBackSpeed] = useState(1);

  const videoJsOptions = {
    // lookup the options in the docs for more options
    //autoplay: true,
    //controls: true,
    responsive: true,
    //fluid: true,
    normalizeAutoplay: true,
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };
  return (
    <>
      <button
        onClick={() => {
          setPlay(!play);
        }}
      >
        Play
      </button>
      <input
        type="range"
        min="0.5"
        max="8"
        onChange={(e) => {
          setPlayBackSpeed(e.currentTarget.value);
        }}
        value={PlayBackSpeed}
      ></input>{" "}
      -- {`${PlayBackSpeed}`}
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 900 }}>
        <VideoJS
          options={{
            ...videoJsOptions,
            sources: [
              {
                src: "video1.mp4",
                type: "video/mp4",
              },
            ],
          }}
          play={play}
          PlayBackSpeed={PlayBackSpeed}
          onReady={handlePlayerReady}
        />
        <VideoJS
          style={{ flex: 1 }}
          play={play}
          PlayBackSpeed={PlayBackSpeed}
          options={{
            ...videoJsOptions,
            sources: [
              {
                src: "video2.mp4",
                type: "video/mp4",
              },
            ],
          }}
          onReady={handlePlayerReady}
        />
        <VideoJS
          style={{ flex: 1 }}
          play={play}
          PlayBackSpeed={PlayBackSpeed}
          options={{
            ...videoJsOptions,
            sources: [
              {
                src: "video3.mp4",
                type: "video/mp4",
              },
            ],
          }}
          onReady={handlePlayerReady}
        />
        <VideoJS
          style={{ flex: 1 }}
          play={play}
          PlayBackSpeed={PlayBackSpeed}
          options={{
            ...videoJsOptions,
            sources: [
              {
                src: "video4.mp4",
                type: "video/mp4",
              },
            ],
          }}
          onReady={handlePlayerReady}
        />
      </div>
    </>
  );
}

export default App;
