import "../assets/styles/Timer.css";

function Timer(props) {
  const { isCountingDown, isFocusTime, totalSeconds } = props;
  const { minutes, seconds } = props.timerTime;
  const { formatTime, toggleTimer, resetTimer } = props.clockFunctions;

  const remainingSeconds = minutes * 60 + seconds;
  const timePercentage = (remainingSeconds / totalSeconds) * 100;

  const barColor =
    timePercentage < 10
      ? "#ff7477"
      : timePercentage < 25
      ? "#faa381"
      : "#7be0ad";

  return (
    <div id="timer-wrapper">
      <div
        id="progress-bar"
        style={{
          background: `conic-gradient(${barColor} ${timePercentage}%, #bbb 0.01%)`,
        }}
      >
        <div id="timer">
          <div id="timer-content">
            <p id="time-left">
              {" "}
              {formatTime(minutes)}:{formatTime(seconds)}
            </p>
            <p id="timer-label" className="text-uppercase">
              {isFocusTime ? "Focus" : "Break"}
            </p>
          </div>
        </div>
      </div>
      <div id="timer-buttons">
        <button
          id="start_stop"
          className="btn-timer"
          onClick={() => toggleTimer()}
        >
          {isCountingDown ? (
            <i className="bi bi-pause-fill"></i>
          ) : (
            <i className="bi bi-play-fill"></i>
          )}
        </button>
        <button id="reset" className="btn-timer" onClick={() => resetTimer()}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </div>
  );
}

export default Timer;
