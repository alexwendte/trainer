import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
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
    const { readOnly, ...rest } = this.props;
    const { value } = this.state;
    return (
      <input
        {...rest}
        onChange={this.handleChange}
        value={value}
        onClick={ev => !readOnly && ev.stopPropagation()}
        readOnly={readOnly}
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};
