// For timing blocks of code
export default class Timer {
  constructor(timerName, options = {}) {
    this.timerName = timerName;
    this.options = options;
    this.reset();
  }

  time(fn) {
    const before = window.performance.now();
    const returnValue = fn();
    const after = window.performance.now();
    const elapsedTime = after - before;
    this.totalTime = this.totalTime + elapsedTime;
    this.calls++;
    this.logMsg(this.timerName, 'elapsedTime:', elapsedTime, 'totalTime:', this.totalTime);
    return returnValue;
  }

  reset() {
    this.calls = 0;
    this.totalTime = 0;
  }

  logMsg(...params) {
    (this.options.logFn || console.log.bind(console))(...params);
  }
}
