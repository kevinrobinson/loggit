import Timer from '../timer';

// Maintains a cache of calls, for repeats calls to the same fn
// with the same set of facts.
// This is attempting to optimize the way the cache actual works but doesn't
// change the semantics.
export default class MemoizingOptimizerV2 {
  constructor(log, options = {}) {
    this.log = log;

    // {[fn,offset] -> value}
    this._cacheSize = options.cacheSize || 10;
    this._keys = Array(this._cacheSize);
    this._values = Array(this._cacheSize);
    this._heat = Array(this._cacheSize);
    this._nextCacheIndex = 0;

    this._hitCount = 0;
    this._missCount = 0;
    this.timer = new Timer('MemoizingOptimizerV2.compute', {
      logFn: this.logMsg.bind(this)
    });
  }

  logMsg(...params) {
    // console.log(...params);
  }

  compute(computations) {
    return this.timer.time(() => {
      return Object.keys(computations).reduce((slots, key) => {
        slots[key] = this.reduce(this.log, computations[key]);
        return slots;
      }, {});
    });
  }

  // This conflicts a bit with compaction, since if the log length
  // changes we can get collisions.  With immutability, saving a reference
  // to 'facts' and checking that for equality would be better.
  reduce(log, computation) {
    // read cache
    const cacheKey = [
      JSON.stringify(computation.initial), // TODO(kr) would require this to be serializable
      computation.reducer,
      log.facts.length
    ].join('@@loggit');

    const index = this._keys.indexOf(cacheKey);
    if (index !== -1) {
      const value = this._values[index];
      if (value !== undefined) {
        this._hitCount++;
        this.logMsg('MemoizingOptimizerV2#hit:', this._hitCount);
        return value;
      }
    }

    // compute
    this._missCount++;
    this.logMsg('MemoizingOptimizerV2#miss:', this._missCount);
    const computedValue = this.log.reduceComputation(computation);

    // new key, may rollover bounds
    if (this._nextCacheIndex >= this._cacheSize) {
      this.logMsg('MemoizingOptimizerV2#rolling over');
      this._nextCacheIndex = 0;
    }
    
    this.logMsg('MemoizingOptimizerV2#writing for new key', cacheKey, computedValue);
    this._keys[this._nextCacheIndex] = cacheKey;
    this._values[this._nextCacheIndex] = computedValue;
    this._nextCacheIndex++;

    return computedValue;
  }
}
