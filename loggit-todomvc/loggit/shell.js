import Log from './log';

import NoopOptimizer from './optimizers/noop_optimizer';
import MemoizingOptimizer from './optimizers/memoizing_optimizer';
import MemoizingOptimizerV2 from './optimizers/memoizing_optimizer_v2';
import MemoizingSnapshotOptimizer from './optimizers/memoizing_snapshot_optimizer';

import NaiveReactRenderer from './renderers/naive_react_renderer';
import RafReactRenderer from './renderers/raf_react_renderer';
import PrecomputeReactRenderer from './renderers/precompute_react_renderer';

import Compactor from './compactor';
import compactionFn from '../stores/compaction_fn'
import ReactInterpreter from './react_interpreter'


// Outermost layer of the system.  defines API to components,
// and assembles the pieces together so it all works.
export default class Shell {
  constructor(reactClass, el, options = {}) {
    this.reactClass = reactClass;
    this.el = el;
    this.options = options;

    this.log = new Log({
      onFact: this._onFact.bind(this),
      initialFacts: options.initialFacts || []
    });
    this.initComponents();
  }

  // this sets up the pieces of the system.  comment here to swap implementations
  // for profiling.
  initComponents() {
    // precomputed
    // const components = this._withPrecomputeRenderer(this.reactClass, this.el, this.log, MemoizingSnapshotOptimizer);

    // isolated
    const partially = this._withIsolatedComponents.bind(this, this.reactClass, this.el, this.log);
    // const components = partially(NoopOptimizer, NaiveReactRenderer);
    // const components = partially(MemoizingSnapshotOptimizer, NaiveReactRenderer);

    const components = partially(NoopOptimizer, RafReactRenderer);
    // const components = partially(MemoizingOptimizer, RafReactRenderer);
    // const components = partially(MemoizingSnapshotOptimizer, RafReactRenderer);
    
    console.info('initComponents:', components);
    this.renderer = components.renderer;
    this.optimizer = components.optimizer;
    this.loggit = components.loggit;
  }

  // inits with the optimizer and renderer isolated from each other.
  // they aren't coupled, but can't cooperate to be more efficient.
  _withIsolatedComponents(reactClass, el, log, optimizerClass, rendererClass) {
    const optimizer = new optimizerClass(log);
    const loggit = {
      recordFact: log.recordFact.bind(log),
      computeFor: this._isolatedComputeForWrapper.bind(this),
      experimental: {
        forceCompaction: this._experimentalCompaction.bind(this)
      }
    };
    const renderer = new rendererClass(reactClass, el, loggit);
    return {optimizer, renderer, loggit};
  }

  // This pulls out the computations from the component and computes
  // them with the optimizer.
  _isolatedComputeForWrapper(component) {
    const computations = ReactInterpreter.computations(component);
    return this.optimizer.compute(computations);
  }

  // This requires cooperation between the optimizer and the renderer,
  // so we create a loggit API that allows that.
  // It also breaks the loggit.compute method to take a component instead
  // of just a description of computation.
  _withPrecomputeRenderer(reactClass, el, log, optimizerClass) {
    const optimizer = new optimizerClass(log);
    const loggit = {
      recordFact: log.recordFact.bind(log),
      computeFor: this._precomputeComputeForWrapper.bind(this),
      experimental: {
        forceCompaction: this._experimentalCompaction.bind(this)
      }
    };
    const renderer = new PrecomputeReactRenderer(reactClass, el, loggit, { optimizer });
    return {optimizer, renderer, loggit};
  }
  
  // the precompute renderer setup funnels calls to loggit.computeFor through here
  // in order to collect information about the read path, so the renderer
  // can use that optimizing rendering updates.
  _precomputeComputeForWrapper(component) {
    const computations = ReactInterpreter.computations(component);
    const computedValues = this.optimizer.compute(computations);
    this.renderer.notifyAboutCompute(component, computations, computedValues);
    return computedValues;
  }

  // public
  start() {
    this.renderer.start();
    this._notifyRenderer();
    return undefined;
  }

  // public
  destroy() {
    this.renderer.destroy();
    return undefined;
  }

  _onFact() {
    this._notifyRenderer();  
  }

  // This inform the renderer that something has occurred.
  // It can decide whether to respond synchronously, or to 
  // batch, etc.
  _notifyRenderer() {
    this.renderer.notify();
  }

  // Just hacking to see the effects here
  _experimentalCompaction() {
    const compactor = new Compactor();
    const previousSize = this.log.facts.length;
    this.log.facts = compactor.compacted(this.log.facts, compactionFn);

    const compactionSize = previousSize - this.log.facts.length;
    const percentText = Math.round(100 * (compactionSize / previousSize)) + '%';
    console.log('compaction freed: ', compactionSize, percentText);

    this._notifyRenderer();
  }
}
