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
      <div id="session-setter" className="setter-group">
        <p id="session-label" className="setter-type">
          Session Length
        </p>
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
            +
          </button>
          <button
            id="session-decrement"
            className="btn-setter btn-minus"
            onClick={() => setSession("decrement")}
          >
            -
          </button>
        </div>
      </div>
      <div id="break-setter" className="setter-group">
        <p id="break-label" className="setter-type">
          Break Length
        </p>
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
            +
          </button>
          <button
            id="break-decrement"
            className="btn-setter btn-minus"
            onClick={() => setBreak("decrement")}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimerSetter;
