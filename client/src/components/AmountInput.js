import * as React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { isNotNumber } from 'utils/utils';
import { transition } from 'utils/mixins';

export default class AmountInput extends React.Component {
  static defaultProps = {
    id: 'amount',
    'aria-label': 'amount',
    placeholder: '$3.78',
    value: undefined,
    className: null,
    inTable: false,
    readOnly: false,
  };

  state = {
    // eslint-disable-next-line
    inputValue: this.props.value || '',
    invalid: false,
  };

  validateAndGetReturnString = value => {
    const dollarParts = value.split('$');
    const { inTable } = this.props;

    let invalid = false;
    if (!inTable && value.includes('-')) invalid = true;
    if (dollarParts.length > 2) invalid = true;
    const noDollar = dollarParts.length === 2 ? dollarParts[0] + dollarParts[1] : dollarParts[0];
    if (value.split('-').length > 2) invalid = true;
    const noMinusOrDollar = noDollar[0] === '-' ? noDollar.substr(1) : noDollar;
    if (isNotNumber(noMinusOrDollar)) invalid = true;
    const withMinusAndDollar = v => {
      if (v === '$' || v === '-' || v === '') return v;
      return `${v.includes('-') ? '-' : ''}$${noMinusOrDollar}`;
    };
    return { invalid, returnString: withMinusAndDollar(value) };
  };

  handleChange = ev => {
    ev.preventDefault();
    const { value } = ev.currentTarget;
    const { invalid, returnString } = this.validateAndGetReturnString(value);
    if (invalid) {
      // Change this quickly so the animation restarts
      this.setState({ invalid: false }, () => {
        this.setState({ invalid: true });
      });
    } else {
      this.setState({ inputValue: returnString, invalid: false });
    }
  };

  handleBlur = () => {
    this.setState(state => {
      const val = state.inputValue.toString();
      const noDollar = val.replace('$', '');
      const formatted = `$${parseFloat(noDollar).toFixed(2)}`;
      if (val === '') {
        return { inputValue: '', invalid: false };
      }
      if (val === '$') {
        return { inputValue: '', invalid: true };
      }
      return { inputValue: formatted, invalid: false };
    });
  };

  render() {
    const { readOnly, className, ...rest } = this.props;
    const { inputValue, invalid } = this.state;
    return (
      <StyledInput
        {...rest}
        value={inputValue}
        onChange={this.handleChange}
        className={`${className || ''} ${invalid ? 'invalid' : ''} `}
        onBlur={this.handleBlur}
        onClick={ev => !readOnly && ev.stopPropagation()}
        readOnly={readOnly}
      />
    );
  }
}

AmountInput.propTypes = {
  id: propTypes.string,
  // eslint-disable-next-line
  'aria-label': propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  className: propTypes.string,
  inTable: propTypes.bool,
  readOnly: propTypes.bool,
};

const StyledInput = styled.input`
  @keyframes invalid {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(2px);
    }
    50% {
      transform: translateX(0);
    }
    75% {
      transform: translateX(2px);
    }
    100% {
      transform: translateX(0);
    }
  }
  ${transition({ name: 'easeInCubic', prop: 'transform' })};
  &.invalid {
    border: 1px solid red;
    outline: none;
    animation-name: invalid;
    animation-duration: 0.5s;
  }
`;
