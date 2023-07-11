import React from 'react';
import { FieldError } from 'react-hook-form';
import './Input.css';

type Props = {
  src?: string;
  src2?: string | undefined;
  placeholder?: string;
  className?: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onClickFirstIcon?: React.MouseEventHandler<HTMLImageElement>;
  onClickSecondIcon?: React.MouseEventHandler<HTMLImageElement>;
  value?: string | number;
  readOnly?: boolean | false;
  error?: FieldError;
};
const Input = (props: Props) => {
  return (
    <>
      <div className={`block-input ${props.className} `}>
        <input
          placeholder={props.placeholder}
          type={props.type}
          onChange={props.onChange}
          readOnly={props.readOnly}
          onFocus={props.onFocus}
          value={props.value}
        />
        {props.src2 && (
          <img src={props.src2} alt="icon-input-2" className="right-4.5" onClick={props.onClickFirstIcon} />
        )}
        {props.src && (
          <img src={props.src} alt="icon-input-1" className="right-1.5" onClick={props.onClickSecondIcon} />
        )}
      </div>
      {props.error && (
        <p className="text-error ml-[5px] my-[10px] sm:text-style-375-caption md:text-style-768-caption xxl:text-style-1440-caption">
          {props.error.message}
        </p>
      )}
    </>
  );
};
export default Input;
