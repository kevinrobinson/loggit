import 'todomvc-app-css/index.css';
import React from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Debugger from '../components/Debugger';

export default class TodoApp {
  static propTypes = {
    loggit: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        <Debugger loggit={this.props.loggit} />
        <Header loggit={this.props.loggit} />
        <MainSection loggit={this.props.loggit} />
      </div>
    );
  }
}
