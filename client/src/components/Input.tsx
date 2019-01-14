import * as React from 'react';

import { IForm } from '../types';

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value?: string;
  readOnly?: boolean;
}

const Input: React.FC<IProps> = ({ value: propsValue = '', readOnly = false, ...restOfProps }) => {
  const [value, setValue] = React.useState(propsValue);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement> & IForm) => {
    const { value: inputValue } = ev.currentTarget;
    setValue(inputValue);
  };
  return (
    <input
      {...restOfProps}
      onChange={handleChange}
      value={value}
      onClick={ev => !readOnly && ev.stopPropagation()}
      readOnly={readOnly}
    />
  );
};

export default Input;
