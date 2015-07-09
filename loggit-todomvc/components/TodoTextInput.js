import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    isNewTodo: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.defaultProps = {
      isNewTodo: false,
      editing: false
    };
    this.state = {
      text: this.props.text || ''
    };
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which !== 13) return;

    this.props.onSave(text);
    if (this.props.isNewTodo) {
      this.setState({ text: '' });
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleBlur(e) {
    if (!this.props.isNewTodo) {
      this.props.onSave(e.target.value);
    }
  }

  render() {
    return (
      <input className={classnames({
              edit: this.props.editing,
              'new-todo': this.props.isNewTodo
             })}
             type='text'
             placeholder={this.props.placeholder}
             autoFocus='true'
             value={this.state.text}
             onBlur={::this.handleBlur}
             onChange={::this.handleChange}
             onKeyDown={::this.handleSubmit} />
    );
  }
}
