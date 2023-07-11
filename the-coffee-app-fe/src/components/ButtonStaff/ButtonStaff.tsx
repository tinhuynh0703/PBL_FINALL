import './ButtonStaff.css';
import React from 'react';
type Props = {
  className: string;
  titleButton: string;
  type?: string | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled?: boolean | false;
};

const ButtonStaff = (props: Props) => {
  return (
    <button
      disabled={props.isDisabled}
      className={`btn-staff ${props.className}`}
      onClick={props.onClick}
      type="submit"
    >
      <span className="text-style-vendor-sub-2 text-white">{props.titleButton}</span>
    </button>
  );
};
export default ButtonStaff;
