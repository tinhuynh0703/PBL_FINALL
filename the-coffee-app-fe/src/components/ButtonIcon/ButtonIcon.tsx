import './ButtonIcon.css';

import React from 'react';

type Props = {
  src: string;
  onClickIcon?: React.MouseEventHandler<HTMLElement>;
  className?: string;
};
const ButtonIcon = (props: Props) => {
  return (
    <button onClick={props.onClickIcon} className={`button-icon ${props.className}`}>
      <img alt="icon" src={props.src} />
    </button>
  );
};

export default ButtonIcon;
