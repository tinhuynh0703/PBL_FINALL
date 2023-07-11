import './AddButton.css';
import AddButtonIcon from '../../share/assets/vector/AddButton.svg';
import React from 'react';

type Props = {
  icon?: string;
  className?: string;
  name: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const AddButton = (props: Props) => {
  return (
    <div className={props.className || 'add-button btn-opacity'} onClick={props.onClick}>
      <button className="add-button__group">
        <img src={props.icon || AddButtonIcon} alt="Add Button Icon" className="add-button__icon" />
        <p className="add-button__text">{props.name}</p>
      </button>
    </div>
  );
};

export default AddButton;
