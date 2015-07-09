import _ from 'lodash';

// Holds the log data
export default class Log {
  constructor(options = {}) {
    this.options = options;
    this.facts = options.initialFacts || [];
    this.offset = this.facts.length;
  }

  logMsg(...params) {
    // console.log(...params);
  }
  
  recordFact(fact) {
    if (!fact.type) {
      console.warn('Log#recordFact missing fact.type: ', fact);
    }
    this._persistStampedFact(this._stampFact(fact));
    return undefined;
  }

  // impure, adds some stateful bits to the fact
  _stampFact(fact) {
    return _.extend({}, fact, {
      '@@loggit': {
        timestamp: Date.now(),
        offset: ++this.offset
      }
    });
  }

  _persistStampedFact(stampedFact) {
    this.logMsg('Log#_persistStampedFact', this.facts.length, stampedFact);
    this.facts = this.facts.concat(stampedFact);
    if (this.options.onFact) {
      this.options.onFact(this);
    }
  }

  // quirk here, probably a bad idea.  but [].reduce short-circuits and doesn't
  // call the reducer, meaning we won't get the same shape from the value in the
  // reducer's optional argument and consumers have to handle the shape of the
  // data changing.
  // this keeps the shape of the data the same.
  reduceComputation(computation) {
    this.logMsg('Log#reduce:', computation);
    return (this.facts.length === 0)
     ? computation.initial
     : this.facts.reduce(computation.reducer, computation.initial)
  }
}