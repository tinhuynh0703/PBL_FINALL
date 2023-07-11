export enum OrderStatus {
  CART = 'cart',
  NEW = 'new',
  PROCESSING = 'processing',
  READY_FOR_PICKUP = 'ready for pickup',
  CANCELED = 'canceled',
  DONE = 'done',
}

export enum ColumnOrderStatus {
  NEW = 'NEW',
  PROCESSING = 'PROCESSING',
  READY_FOR_PICKUP = 'READY',
}

export enum OrderStatusNumber {
  CART = 0,
  NEW = 1,
  PROCESSING = 2,
  READY_FOR_PICKUP = 3,
  CANCELED = -1,
  DONE = 4,
}

export enum ColumnOrder {
  NEW = 'orderStatusNew',
  PROCESSING = 'orderStatusProcessing',
  READY_FOR_PICKUP = 'orderStatusReady',
}
