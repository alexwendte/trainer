import React from 'react';
import PropTypes from 'prop-types';

export default class TextArea extends React.Component {
  static defaultProps = {
    value: undefined,
    readOnly: false,
  };

  state = {
    // eslint-disable-next-line
    value: this.props.value || '',
  };

  handleChange = ev => {
    const { value } = ev.currentTarget;
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return <textarea {...this.props} onChange={this.handleChange} value={value} onClick={ev => ev.stopPropagation()} />;
  }
}

TextArea.propTypes = {
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};
