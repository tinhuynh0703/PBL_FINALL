import './LeftSideBarItem.scss';
type Props = {
  onClickChangeTab(): void;
  isActive: boolean;
  src?: string;
  alt?: string;
  title?: string;
};
const LeftSideBarItem = (props: Props) => {
  return (
    <div
      className={props.isActive ? 'left-side-bar-item--active' : 'left-side-bar-item'}
      onClick={props.onClickChangeTab}
    >
      <img src={props.src} alt={props.alt} className="left-side-bar-item__img" />
      <span>{props.title}</span>
    </div>
  );
};
export default LeftSideBarItem;
