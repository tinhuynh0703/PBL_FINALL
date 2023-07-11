import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { InputParams } from '../../interfaces';
import './CustomInput.scss';

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  value?: string | number;
  onChange: (inputParam: InputParams) => void;
  onClickIcon?: () => void;
  error?: FieldError;
  icon?: string;
  className?: string;
}
const CustomInput = (props: Props) => {
  const [outlinedText, setOutlinedText] = useState(props.value ? true : false);

  const handleOnFocus: React.FocusEventHandler<HTMLInputElement> = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      event.target.placeholder = '';
    }
    setOutlinedText(true);
  };
  const handleOnBlur: React.FocusEventHandler<HTMLInputElement> = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      event.target.placeholder = props.placeholder ? props.placeholder : '';
      setOutlinedText(false);
    } else {
      setOutlinedText(true);
    }
  };

  return (
    <div className={`outlined-text-input ${props.className}`}>
      {outlinedText && (
        <label htmlFor="inputText" className="outlined-text-input__label">
          {props.placeholder}
        </label>
      )}
      <input
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        type={props.type ?? 'text'}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        value={props.value ?? ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange({ event })}
      />
      {props.icon && (
        <img
          src={props.icon}
          alt={props.icon}
          className="absolute right-[18px] top-[12px]"
          onClick={props.onClickIcon}
        />
      )}
      {props.error && <p className="text-style-vendor-caption text-error mx-[4px] ml-1">{props.error.message}</p>}
    </div>
  );
};
export default CustomInput;
