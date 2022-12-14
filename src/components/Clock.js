import Timer from "./Timer.js";
import TimerSetter from "./TimerSetter.js";
import "../assets/styles/Clock.css";
import { useState, useEffect, useRef } from "react";
import beepSound from "../assets/sounds/alarm-beep.wav";

function Clock() {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isFocusTime, setFocusTime] = useState(true);
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timerTime, setTimerTime] = useState({
    minutes: sessionTime,
    seconds: 0,
  });

  const [totalSeconds, setTotalSeconds] = useState(sessionTime * 60);

  const audio = useRef(null);
  const playBeep = (audioElem) => {
    const beep = audioElem;
    beep.currentTime = 0;
    beep.play();
  };
  const resetBeep = (audioElem) => {
    const beep = audioElem;
    beep.pause();
    beep.currentTime = 0;
  };

  const isMinTime = (time) => time > 1;
  const isMaxTime = (time) => time < 60;

  // The below function ensures that there's input & the input doesn't go BELOW 1 and OVER 60
  const handleInputError = (int) => (int > 60 ? 60 : int < 1 || !int ? 1 : int);

  const clockFunctions = {
    setSession: (action) => {
      if (isCountingDown) return;

      if (action === "increment") {
        if (isMaxTime(sessionTime)) {
          setSessionTime((prevSessionTime) => prevSessionTime + 1);
          setTotalSeconds((prevTotalSecs) => prevTotalSecs + 60);
          setTimerTime((prevTime) => ({
            ...prevTime,
            minutes: prevTime.minutes + 1,
            seconds: 0,
          }));
        }
      } else if (action === "decrement") {
        if (isMinTime(sessionTime)) {
          setSessionTime((prevSessionTime) => prevSessionTime - 1);
          setTotalSeconds((prevTotalSecs) => prevTotalSecs - 60);
          setTimerTime((prevTime) => ({
            ...prevTime,
            minutes: prevTime.minutes - 1,
            seconds: 0,
          }));
        }
      }
    },
    setBreak: (action) => {
      if (isCountingDown) return;

      if (action === "increment") {
        if (isMaxTime(breakTime)) {
          setBreakTime((prevBreakTime) => prevBreakTime + 1);
        }
      } else if (action === "decrement") {
        if (isMinTime(breakTime)) {
          setBreakTime((prevBreakTime) => prevBreakTime - 1);
        }
      }
    },
    handleSessionTimeInput: (input) => {
      if (isCountingDown) return;

      input = handleInputError(input);
      setSessionTime(input);
      setTotalSeconds(input * 60);
      setTimerTime({ minutes: input, seconds: 0 });
    },
    handleBreakTimeInput: (input) => {
      if (isCountingDown) return;

      input = handleInputError(input);
      setBreakTime(input);
    },
    toggleTimer: () => {
      setIsCountingDown((prevState) => !prevState);
    },
    resetTimer: () => {
      resetBeep(audio.current);
      setIsCountingDown(false);
      setFocusTime(true);
      setSessionTime(25);
      setBreakTime(5);
      setTimerTime({
        minutes: 25,
        seconds: 0,
      });
      setTotalSeconds(25 * 60);
    },
    formatTime: (integer) => {
      return integer.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    },
  };

  /* Ensures any manipulation to the to the session/break/timer times to a negative integer
     without the decrement functions are handled */
  useEffect(() => {
    if (sessionTime < 0) setSessionTime((prevState) => prevState * -1);
    if (breakTime < 0) setBreakTime((prevState) => prevState * -1);
    if (timerTime.minutes < 0) {
      setTimerTime((prevState) => ({
        ...prevState,
        minutes: prevState.minutes * -1,
        seconds: 0,
      }));
    }
  }, [sessionTime, breakTime, timerTime, setSessionTime]);

  useEffect(() => {
    if (isCountingDown) {
      if (timerTime.seconds === -1 && timerTime.minutes) {
        setTimerTime((prevTime) => ({
          ...prevTime,
          minutes: prevTime.minutes - 1,
          seconds: 59,
        }));
      } else if (timerTime.seconds < 0 && timerTime.minutes === 0) {
        playBeep(audio.current);
        if (isFocusTime) {
          setTimerTime({
            minutes: breakTime,
            seconds: 0,
          });
          setTotalSeconds(breakTime * 60);
          setFocusTime(false);
        } else if (!isFocusTime) {
          setTimerTime({
            minutes: sessionTime,
            seconds: 0,
          });
          setTotalSeconds(sessionTime * 60);
          setFocusTime(true);
        }
      }
      const countDown = setInterval(() => {
        setTimerTime((prevTime) => ({
          ...prevTime,
          minutes: prevTime.minutes,
          seconds: prevTime.seconds - 1,
        }));
      }, 1000);
      return () => clearInterval(countDown);
    }
  }, [isCountingDown, isFocusTime, sessionTime, breakTime, timerTime]);

  return (
    <div id="clock">
      <h1 id="heading">Pomodoro Clock</h1>
      <TimerSetter
        sessionTime={sessionTime}
        setSessionTime={setSessionTime}
        breakTime={breakTime}
        setBreakTime={setBreakTime}
        clockFunctions={clockFunctions}
      />
      <Timer
        timerTime={timerTime}
        totalSeconds={totalSeconds}
        clockFunctions={clockFunctions}
        isCountingDown={isCountingDown}
        isFocusTime={isFocusTime}
      />
      <audio id="beep" src={beepSound} preload="auto" ref={audio}></audio>
    </div>
  );
}

export default Clock;
