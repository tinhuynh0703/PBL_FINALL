import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderStatus, OrderStatusNumber, RequestState } from '../../../enum';
import Order from '../../../interfaces/order';
import { RootState } from '../../../storage';
import OrderByStatusApi from '../api/orderStatusApi';

export interface OrderByStatusState {
  data: {
    orderStatusNew: Order[];
    orderStatusProcessing: Order[];
    orderStatusReady: Order[];
  };
  loading?: RequestState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const initialState: OrderByStatusState = {
  data: {
    orderStatusNew: [],
    orderStatusProcessing: [],
    orderStatusReady: [],
  },
  loading: RequestState.PENDING,
  error: {
    message: '',
    status: null,
  },
};

export const getOrdersByStatus = createAsyncThunk(
  '/orders/status',
  async (orderStatus: OrderStatus, { rejectWithValue }) => {
    try {
      const response = await OrderByStatusApi.getOrdersByStatus(orderStatus);

      return {
        status: orderStatus,
        orders: response.data,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  },
);

function prepare(order: Order, newStatus?: OrderStatus, currentStatus?: OrderStatus) {
  return {
    payload: {
      order,
      newStatus,
      currentStatus,
    },
  };
}

function prepareActionUndoUpdateOrder(order: Order, index: number, newStatus?: OrderStatus) {
  return {
    payload: {
      order,
      index,
      newStatus,
    },
  };
}
export const updateOrder = createAction('orderByStatus/addOrder', prepare);

export const undoUpdateOrder = createAction('orderByStatus/undo', prepareActionUndoUpdateOrder);

const removeOrderInColumn = (order: Order, listOrderStatus: Order[]) =>
  listOrderStatus.filter((item) => item.id !== order.id);

const addOrderInColumn = (order: Order, listOrderStatus: Order[], newStatus?: string) => {
  const duplicateOrder = listOrderStatus.find((ord) => ord.id === order.id);

  if (duplicateOrder) {
    return;
  }

  if (newStatus && order.orderStatus.name !== newStatus) {
    const cloneOrder = JSON.parse(JSON.stringify(order));
    cloneOrder.orderStatus.name = newStatus;

    switch (newStatus) {
      case OrderStatus.PROCESSING:
        cloneOrder.orderStatus.value = OrderStatusNumber.PROCESSING;
        break;
      case OrderStatus.READY_FOR_PICKUP:
        cloneOrder.orderStatus.value = OrderStatusNumber.READY_FOR_PICKUP;
        break;
    }

    listOrderStatus.push(cloneOrder);

    return;
  }

  listOrderStatus.push(order);
};

const orderByStatusSlice = createSlice({
  name: 'orderByStatus',
  initialState,
  reducers: {
    updateOrderFromCustomer: (state, action: PayloadAction<Order>) => {
      const updateOrderIndex = state.data.orderStatusNew.findIndex((item) => item.id === action.payload.id);
      Object.assign(state.data.orderStatusNew[updateOrderIndex], action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder, (state, action) => {
        switch (action.payload.newStatus) {
          case OrderStatus.NEW:
            addOrderInColumn(action.payload.order, state.data.orderStatusNew);
            break;
          case OrderStatus.PROCESSING:
            state.data.orderStatusNew = removeOrderInColumn(action.payload.order, state.data.orderStatusNew);
            addOrderInColumn(action.payload.order, state.data.orderStatusProcessing, OrderStatus.PROCESSING);
            break;
          case OrderStatus.READY_FOR_PICKUP:
            state.data.orderStatusProcessing = removeOrderInColumn(
              action.payload.order,
              state.data.orderStatusProcessing,
            );
            addOrderInColumn(action.payload.order, state.data.orderStatusReady, OrderStatus.READY_FOR_PICKUP);
            break;
          case OrderStatus.CANCELED:
            if (action.payload.currentStatus === OrderStatus.PROCESSING) {
              state.data.orderStatusProcessing = removeOrderInColumn(
                action.payload.order,
                state.data.orderStatusProcessing,
              );
            } else {
              state.data.orderStatusNew = removeOrderInColumn(action.payload.order, state.data.orderStatusNew);
            }
            break;
          case OrderStatus.DONE:
            state.data.orderStatusReady = removeOrderInColumn(action.payload.order, state.data.orderStatusReady);
        }
      })
      .addCase(undoUpdateOrder, (state, action) => {
        switch (action.payload.newStatus) {
          case OrderStatus.PROCESSING: {
            state.data.orderStatusNew.splice(action.payload.index, 0, action.payload.order);

            state.data.orderStatusProcessing = removeOrderInColumn(
              action.payload.order,
              state.data.orderStatusProcessing,
            );
            break;
          }
          case OrderStatus.READY_FOR_PICKUP:
            state.data.orderStatusProcessing.splice(action.payload.index, 0, action.payload.order);

            state.data.orderStatusReady = removeOrderInColumn(action.payload.order, state.data.orderStatusReady);
            break;
        }
      })
      .addCase(getOrdersByStatus.pending, (state) => {
        state.loading = RequestState.PENDING;
      })
      .addCase(getOrdersByStatus.fulfilled, (state, action) => {
        state.loading = RequestState.FULFILLED;
        switch (action.payload.status) {
          case OrderStatus.NEW:
            state.data.orderStatusNew = action.payload.orders;
            break;

          case OrderStatus.PROCESSING:
            state.data.orderStatusProcessing = action.payload.orders;
            break;

          case OrderStatus.READY_FOR_PICKUP:
            state.data.orderStatusReady = action.payload.orders;
            break;
        }
      })
      .addCase(getOrdersByStatus.rejected, (state, action) => {
        state.loading = RequestState.REJECTED;
        state.error = action.payload;
      });
  },
});

export const selectOrderByStatusState = (state: RootState) => state.orderByStatus.data;
export const { updateOrderFromCustomer } = orderByStatusSlice.actions;
export default orderByStatusSlice.reducer;
