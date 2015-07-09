// code for pulling out profiling data and reporting it
export default class ProfilingReporter {
  constructor(loggitShell) {
    this.loggitShell = loggitShell;
  }

  printStats() {
    const {renderer, optimizer} = loggitShell;
    const optimizerPercentHits = Math.round(100 * optimizer._hitCount / optimizer.timer.calls);
    return [
      'r:',
      Math.round(renderer.timer.totalTime),
      renderer.timer.calls,
      this.timePerCall(renderer.timer),
      'c:',
      Math.round(optimizer.timer.totalTime),
      optimizer.timer.calls,
      this.timePerCall(optimizer.timer),
      // 'c+:',
      // isNaN(optimizerPercentHits) ? 0 : optimizerPercentHits,
      // optimizer.timer.calls,
      '|',
      optimizer,
      renderer
    ];
  }

  timePerCall(timer) {
    return parseFloat((timer.totalTime / timer.calls).toFixed(4));
  }
}