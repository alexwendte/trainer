import * as React from 'react'

interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
  value?: string,
  readOnly?: boolean,
}

const TextArea: React.FC<IProps> = ({ value: propsValue, readOnly = false, ...restOfProps }) => {
  const [value, setValue] = React.useState(propsValue)

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: inputValue } = ev.currentTarget;
    setValue(inputValue);
  };
  return (
    <textarea
      {...restOfProps}
      onChange={handleChange}
      value={value}
      onClick={ev => ev.stopPropagation()}
    />
  )
}

export default TextArea
