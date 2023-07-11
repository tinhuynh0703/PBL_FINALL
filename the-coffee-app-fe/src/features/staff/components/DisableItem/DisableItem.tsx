import './DisableItem.scss';
import React from 'react';
type Props = {
  image: string;
  title: string;
  titleButton: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const DisableItem = (props: Props) => {
  return (
    <div className="disable-item">
      <div className="flex">
        <img src={props.image} alt={props.title} className="lg:pr-1" />
        <p>{props.title}</p>
      </div>
      <button className="disable-item__button" onClick={props.onClick}>
        {props.titleButton}
      </button>
    </div>
  );
};
export default DisableItem;
