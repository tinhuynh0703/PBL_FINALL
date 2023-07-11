export type createOrderParams = {
  orderId?: string;
  quantity: number;
  note: string;
  productId: string;
};
export type updateOrderBody = {
  quantity?: number;
  note?: string;
  status?: number;
};

export type updateOrderParams = {
  orderId: string;
  body: updateOrderBody;
};

export type getOrderByDateParams = {
  code?: string;
  type: string;
  from: Date;
  to: Date | null;
  offset: number;
  limit: number;
};
