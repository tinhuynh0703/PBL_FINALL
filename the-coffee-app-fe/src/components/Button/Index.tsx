import LoadingButton from '../LoadingButton/LoadingButton';
import './styles.css';
import React from 'react';
type Props = {
  isLoading?: boolean;
  titleButton: string;
  className?: string;
  type?: string | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled?: boolean | false;
};

const Button = ({ isLoading = false, ...props }: Props) => {
  return (
    <button disabled={props.isDisabled} className={`btn ${props.className}`} onClick={props.onClick} type="submit">
      {!isLoading ? props.titleButton : <LoadingButton />}
    </button>
  );
};
export default Button;
