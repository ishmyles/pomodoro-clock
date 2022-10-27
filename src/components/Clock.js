import Timer from "./Timer.js";
import TimerSetter from "./TimerSetter.js";
import "../assets/styles/Clock.css";

function Clock() {
  return (
    <div>
      <h2>Clock Component</h2>
      <Timer />
      <TimerSetter />
    </div>
  );
}

export default Clock;
