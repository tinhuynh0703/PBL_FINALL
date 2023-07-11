export default interface Order {
  id: string;
  note: string;
  quantity: number;
  createdAt: string;
  product: {
    id: string;
    name: string;
    images: string;
    price: number;
  };
  orderStatus: {
    id: string;
    name: string;
    value: number;
  };
  user: {
    id: string;
    name: string;
    phoneNumber: string;
    avatarUrl: string;
  };
  quantityBilled: number;
  reason: string;
  productPrice: number;
}

export interface OrderSocket {
  order: Order;
  newOrderStatus?: string;
  currentOrderStatus?: string;
}

export interface OrderReportType {
  id?: string;
  createAt: string;
  user: string;
  product: any;
  quantity: number;
  orderStatus: string;
  price: number;
}

export interface OrderAmount {

}