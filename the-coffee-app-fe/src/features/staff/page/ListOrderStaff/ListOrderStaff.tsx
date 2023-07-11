import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColumnOrder, OrderStatus, SocketEvent } from '../../../../enum';
import {
  getOrdersByStatus,
  selectOrderByStatusState,
  undoUpdateOrder,
  updateOrder,
  updateOrderFromCustomer,
} from '../../../orderStatus/action/orderStatus';
import { joinRoomStaff, onListenEventStaff } from '../../../../services/socketService';
import { useAppDispatch } from '../../../../storage/hooks';
import { SocketContext } from '../../../../utils/socketContext';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { OrderSocket } from '../../../../interfaces/order';
import { updateStatusOrder } from '../../../updateOrder/action/updateOrder';
import ColumnOrderStaff from '../../../../components/ColumnOrderStaff/ColumnOrderStaff';

import './ListOrderStaff.scss';

type Props = {
  setIsShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

enum IndexColumnOrder {
  orderStatusNew,
  orderStatusProcessing,
  orderStatusReady,
}

const ListOrderStaff = (props: Props) => {
  const [indexColumnOnDragStart, setIndexColumnOnDragStart] = useState<number>();

  const dispatch = useAppDispatch();
  const ordersByStatus = useSelector(selectOrderByStatusState);
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(getOrdersByStatus(OrderStatus.NEW)).unwrap();
    dispatch(getOrdersByStatus(OrderStatus.PROCESSING)).unwrap();
    dispatch(getOrdersByStatus(OrderStatus.READY_FOR_PICKUP)).unwrap();
  }, []);

  useEffect(() => {
    joinRoomStaff(socket);
    onListenEventStaff(socket, SocketEvent.HANDLE_ORDER_EVENT, handleOrder);
    return () => {
      socket.off(SocketEvent.HANDLE_ORDER_EVENT);
    };
  }, [socket]);

  const handleOrder = (data: OrderSocket) => {
    if (data.newOrderStatus) {
      const audio = new Audio('order.mp3');
      switch (data.newOrderStatus) {
        case OrderStatus.NEW:
          dispatch(updateOrder(data.order, OrderStatus.NEW));
          audio.play();
          break;
        case OrderStatus.PROCESSING:
          dispatch(updateOrder(data.order, OrderStatus.PROCESSING));
          break;

        case OrderStatus.READY_FOR_PICKUP:
          dispatch(updateOrder(data.order, OrderStatus.READY_FOR_PICKUP));
          break;

        case OrderStatus.CANCELED:
          dispatch(updateOrder(data.order, OrderStatus.CANCELED, data.currentOrderStatus as OrderStatus));
          break;

        case OrderStatus.DONE:
          dispatch(updateOrder(data.order, OrderStatus.DONE));
          break;
      }
    } else {
      dispatch(updateOrderFromCustomer(data.order));
    }
  };

  const onDragStart = (initial: DragStart) => {
    const indexColOnDragStart = IndexColumnOrder[initial.source.droppableId as keyof typeof IndexColumnOrder];

    setIndexColumnOnDragStart(indexColOnDragStart);
  };

  const onDragEnd = async (result: DropResult) => {
    setIndexColumnOnDragStart(undefined);

    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const listOrderStartDrag = ordersByStatus[source.droppableId as keyof typeof ordersByStatus];
    const orderIsDragging = listOrderStartDrag[source.index];
    const valueNewStatus = orderIsDragging.orderStatus.value + 1;

    switch (destination.droppableId) {
      case ColumnOrder.PROCESSING:
        dispatch(updateOrder(orderIsDragging, OrderStatus.PROCESSING));
        break;
      case ColumnOrder.READY_FOR_PICKUP:
        dispatch(updateOrder(orderIsDragging, OrderStatus.READY_FOR_PICKUP));
        break;
    }

    const response = await dispatch(updateStatusOrder({ id: orderIsDragging.id, newStatus: valueNewStatus }));

    if (!updateStatusOrder.fulfilled.match(response)) {
      switch (destination.droppableId) {
        case ColumnOrder.PROCESSING:
          dispatch(undoUpdateOrder(orderIsDragging, source.index, OrderStatus.PROCESSING));
          break;
        case ColumnOrder.READY_FOR_PICKUP:
          dispatch(undoUpdateOrder(orderIsDragging, source.index, OrderStatus.READY_FOR_PICKUP));
          break;
      }
    }
  };

  const checkIsDropDisable = (indexColOnDragEnd: number): boolean => {
    const indexColOnDragStart = Number(indexColumnOnDragStart);
    if (indexColOnDragEnd - indexColOnDragStart !== 1) {
      return true;
    }

    return false;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className="list-order">
        <ColumnOrderStaff
          title="New"
          listOrder={ordersByStatus.orderStatusNew}
          isDropDisabled={checkIsDropDisable(IndexColumnOrder.orderStatusNew)}
        />
        <ColumnOrderStaff
          title="Processing"
          listOrder={ordersByStatus.orderStatusProcessing}
          isDropDisabled={checkIsDropDisable(IndexColumnOrder.orderStatusProcessing)}
        />
        <ColumnOrderStaff
          title="Ready"
          listOrder={ordersByStatus.orderStatusReady}
          setIsShowNotification={props.setIsShowNotification}
          isDropDisabled={checkIsDropDisable(IndexColumnOrder.orderStatusReady)}
        />
      </div>
    </DragDropContext>
  );
};

export default ListOrderStaff;
