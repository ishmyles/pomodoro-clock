import "../assets/styles/Clock.css";

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
    <div>
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
        <button id="session-increment" onClick={() => setSession("increment")}>
          Increment Session
        </button>
        <button id="session-decrement" onClick={() => setSession("decrement")}>
          Decrement Session
        </button>
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
        <button id="break-increment" onClick={() => setBreak("increment")}>
          Increment Break
        </button>
        <button id="break-decrement" onClick={() => setBreak("decrement")}>
          Decrement Break
        </button>
      </div>
    </div>
  );
}

export default TimerSetter;
