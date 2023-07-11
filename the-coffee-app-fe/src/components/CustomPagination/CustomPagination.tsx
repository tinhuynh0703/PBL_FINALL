import ButtonIcon from '../ButtonIcon/ButtonIcon';
import rightIcon from '../../share/assets/vector/RightIcon.svg';
import leftIcon from '../../share/assets/vector/LeftIcon.svg';
import './CustomPagination.css';
import React from 'react';

type Props = {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
  onClickPreviousPage?: React.MouseEventHandler<HTMLElement>;
  onClickNextPage?: React.MouseEventHandler<HTMLElement>;
};
const CustomPagination = (props: Props) => {
  const isShowPagination = props.totalItems === 0 ? false : true;
  return (
    <>
      {isShowPagination && (
        <div className="custom-pagination">
          <p className="custom-pagination__label">
            {props.startIndex} to {props.endIndex} of {props.totalItems}
          </p>
          <ButtonIcon
            onClickIcon={props.onClickPreviousPage}
            className={`mr-[12px] ${props.isFirstPage ? 'opacity-50 cursor-default' : 'hover:bg-grey-6'}`}
            src={leftIcon}
          />
          <ButtonIcon
            className={`${props.isLastPage ? 'opacity-50  cursor-default' : 'hover:bg-grey-6'}`}
            onClickIcon={props.onClickNextPage}
            src={rightIcon}
          />
        </div>
      )}
    </>
  );
};

export default CustomPagination;
