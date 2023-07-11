import { io, Socket } from 'socket.io-client';
import { SocketEvent } from '../enum';
import Order, { OrderSocket } from '../interfaces/order';
import { envVariable } from './envVariable';

export const initSocket = () => {
  const socket = io(envVariable.API_ROOT, {
    reconnection: true,
    reconnectionAttempts: 3,
  });
  return socket;
};

export const joinRoomStaff = (socket: Socket) => {
  socket.emit(SocketEvent.JOIN_ROOM_STAFF_EVENT, SocketEvent.ROOM_FOR_STAFF);
};

export const leaveRoomStaff = (socket: Socket) => {
  socket.emit(SocketEvent.LEAVE_ROOM_STAFF, SocketEvent.ROOM_FOR_STAFF);
};

export const joinRoomCustomer = (socket: Socket, userId: string) => {
  socket.emit(SocketEvent.JOIN_ROOM_CUSTOMER, userId);
};

export const leaveRoomCustomer = (socket: Socket, userId: string) => {
  socket.emit(SocketEvent.LEAVE_ROOM_CUSTOMER, userId);
};

export const onListenEventStaff = (socket: Socket, event: string, callback: (order: OrderSocket) => void) => {
  socket.on(event, (data: OrderSocket) => callback(data));
};

export const onListenEventCustomer = (socket: Socket, event: string, callback: (order: Order) => void) => {
  socket.on(event, (data: Order) => callback(data));
};
