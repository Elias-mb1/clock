import React, { useState, useEffect } from "react";

const Clock = ({ city, timeZone }) => {
  const [currentTime, setCurrentTime] = useState("");

  const updateTime = () => {
    const time = new Date().toLocaleTimeString("sv", { timeZone });
    setCurrentTime(time);
  };

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="clock">
      <h1>{city}</h1>
      <p>{currentTime}</p>
    </div>
  );
};

const Timer = ({ startingTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(startingTime);

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="timer">
      <h2>Timer</h2>
      <p>
        Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Clock city="New York" timeZone="America/New_York" />
      <Clock city="London" timeZone="Europe/London" />
      <Timer startingTime={300} /> {/* 5 minutes */}
      <Timer startingTime={180} /> {/* 3 minutes */}
    </div>
  );
};

export default App;
