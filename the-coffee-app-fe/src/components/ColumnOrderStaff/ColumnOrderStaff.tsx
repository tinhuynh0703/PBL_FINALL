import Order from '../../interfaces/order';
import OrderItemStaff from '../../features/staff/components/OrderItemStaff/OrderItemStaff';
import './ColumnOrderStaff.css';
import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import './ColumnOrderStaff.css';

type Props = {
  title: string;
  listOrder: Order[];
  setIsShowNotification?: React.Dispatch<React.SetStateAction<boolean>>;
  isDropDisabled: boolean;
};
const ColumnOrderStaff = (props: Props) => {
  console.log(123, props.listOrder);
  return (
    <div className="column-order">
      <div className="column-order-header">
        <p className="column-order-header__title">
          {props.title.toLocaleUpperCase()} {props.listOrder.length}
        </p>
      </div>
      <Droppable droppableId={'orderStatus' + props.title} isDropDisabled={props.isDropDisabled}>
        {(provided, snapshot) => {
          return (
            <div className="h-full" ref={provided.innerRef}>
              <div className="column-order__content">
                {props.listOrder.map((order, index) => (
                  <OrderItemStaff
                    order={order}
                    key={order.id}
                    setIsShowNotification={props.setIsShowNotification}
                    index={index}
                  />
                ))}

                {snapshot.isDraggingOver && !props.isDropDisabled && (
                  <div className="bg-grey-6 h-5 rounded-[8px] border-dashed border-[2px] border-grey-2 flex items-center justify-center">
                    <p>Drop</p>
                  </div>
                )}
              </div>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default ColumnOrderStaff;
