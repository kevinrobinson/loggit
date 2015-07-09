import _ from 'lodash';

// Naive key compaction
// obviously not efficient
export default class Compactor {
  // keyFn returns tuples of primitives
  compacted(facts, keyFn) {
    const serializedKeyFn = _.compose(JSON.stringify, keyFn);
    const groupedFacts = _.groupBy(facts, serializedKeyFn);
    const compactedFacts = Object.keys(groupedFacts).map((compactionKey) => {
      return _.last(groupedFacts[compactionKey]);
    });
    return _.sortBy(compactedFacts, (fact) => fact['@@loggit'].timestamp);
  }
}