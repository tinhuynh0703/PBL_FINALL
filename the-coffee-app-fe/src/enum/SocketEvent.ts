export enum SocketEvent {
  HANDLE_ORDER_EVENT = 'handleOrder',
  ORDER_CANCELED = 'orderCanceled',

  ROOM_FOR_STAFF = 'staffRoom',
  JOIN_ROOM_STAFF_EVENT = 'joinRoomStaff',
  LEAVE_ROOM_STAFF = 'leaveRoomStaff',

  JOIN_ROOM_CUSTOMER = 'joinRoomCustomer',
  LEAVE_ROOM_CUSTOMER = 'leaveRoomCustomer',
}
