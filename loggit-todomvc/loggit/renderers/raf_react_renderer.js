import React from 'react';
import Timer from '../timer';


// Batches with RAF, no shouldComponentUpdate optimizations.
export default class RafReactRenderer {
  constructor(reactClass, el, loggit) {
    this.reactClass = reactClass;
    this.el = el;
    this.loggit = loggit;
    this._loop = this._loop.bind(this);

    this.timer = new Timer('RafReactRenderer.render', {
      logFn: this.logMsg.bind(this)
    });
  }

  logMsg(...params) {
    // console.log(...params);
  }

  start() {
    this._wasDestroyed = false;
    this._isDirty = true;
    this._renderCount = 0;
    this._loop();
  }

  notify() {
    this._isDirty = true;
  }

  destroy() {
    this._wasDestroyed = true;
    return undefined;
  }

  _loop() {
    if (this._wasDestroyed) return;
    if (this._isDirty) {
      this._renderCount++;
      this.logMsg('RafReactRenderer#render', this._renderCount);
      this._render();
      this._isDirty = false;
    }

    window.requestAnimationFrame(this._loop);
  }

  _render() {
    this.timer.time(() => {
      React.render(
        <this.reactClass loggit={this.loggit} />,
        this.el
      );
    });
  }
}