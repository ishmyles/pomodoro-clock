import "../assets/styles/Timer.css";

function Timer(props) {
  const { isCountingDown, isFocusTime } = props;
  const { minutes, seconds } = props.timerTime;
  const { formatTime, toggleTimer, resetTimer } = props.clockFunctions;

  return (
    <div>
      <div id="progress-bar">
        <div id="timer">
          <p id="time-left">
            {" "}
            {formatTime(minutes)}:{formatTime(seconds)}
          </p>
          <p id="timer-label">{isFocusTime ? "Focus" : "Break"}</p>
        </div>
      </div>
      <div id="timer-buttons">
        <button id="start_stop" onClick={() => toggleTimer()}>
          {isCountingDown ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={() => resetTimer()}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
