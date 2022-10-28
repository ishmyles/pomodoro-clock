import "../assets/styles/TimerSetter.css";

function TimerSetter({ sessionTime, breakTime, clockFunctions }) {
  const { setSession, setBreak, handleSessionTimeInput, handleBreakTimeInput } =
    clockFunctions;
  const minTime = 1;
  const maxTime = 60;

  const handleSessionInputChange = (e) => {
    handleSessionTimeInput(e.target.value);
  };

  const handleBreakInputChange = (e) => {
    handleBreakTimeInput(e.target.value);
  };

  return (
    <div id="timer-setter">
      <div id="session-setter">
        <p id="session-label">Session Length</p>
        {/* <p id="session-length">{sessionTime}</p> */}
        <input
          type="number"
          min={minTime}
          max={maxTime}
          name="session-length"
          id="session-length"
          value={sessionTime}
          onChange={handleSessionInputChange}
        />
        <div className="setter-btns">
          <button
            id="session-increment"
            className="btn-setter btn-plus"
            onClick={() => setSession("increment")}
          >
            +{/* <i className="bi bi-plus"></i> */}
          </button>
          <button
            id="session-decrement"
            className="btn-setter btn-minus"
            onClick={() => setSession("decrement")}
          >
            -{/* <i className="bi bi-dash"></i> */}
          </button>
        </div>
      </div>
      <div id="break-setter">
        <p id="break-label">Break Length</p>
        {/* <p id="break-length">{breakTime}</p> */}
        <input
          type="number"
          min={minTime}
          max={maxTime}
          name="break-length"
          id="break-length"
          value={breakTime}
          onChange={handleBreakInputChange}
        />
        <div className="setter-btns">
          <button
            id="break-increment"
            className="btn-setter btn-plus"
            onClick={() => setBreak("increment")}
          >
            +{/* <i className="bi bi-plus"></i> */}
          </button>
          <button
            id="break-decrement"
            className="btn-setter btn-minus"
            onClick={() => setBreak("decrement")}
          >
            -{/* <i className="bi bi-dash"></i> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimerSetter;
