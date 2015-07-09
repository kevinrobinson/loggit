import React from 'react';
import Timer from '../timer';


// Starting super naive, no shouldComponentUpdate or any
// optimization.
export default class NaiveReactRenderer {
  constructor(reactClass, el, loggit) {
    this.reactClass = reactClass;
    this.el = el;
    this.loggit = loggit;

    this.timer = new Timer('NaiveReactRenderer.render', {
      logFn: this.logMsg.bind(this)
    });
  }

  logMsg(...params) {
    // console.log(...params);
  }

  start() {
    return undefined;
  }

  destroy() {
    return undefined;
  }

  notify() {
    this._render();
  }

  _render() {
    this.logMsg('NaiveReactRenderer#render');
    this.timer.time(() => {
      React.render(
        <this.reactClass loggit={this.loggit} />,
        this.el
      );
    });
    return undefined;
  }
}