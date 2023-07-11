import './OrderDate.css';
type Props = {
  date: string;
};
const OrderDate = (props: Props) => {
  return <p className="date">{props.date}</p>;
};

export default OrderDate;
