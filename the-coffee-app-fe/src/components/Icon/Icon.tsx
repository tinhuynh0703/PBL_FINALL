import './Icon.scss';

type Props = {
  src: string;
  href?: string;
  className?: string;
};

const Icon = (props: Props) => {
  return (
    <div className={props.className}>
      <a href={props.href} target="_blank" rel="noreferrer">
        <img src={props.src} alt={props.src} />
      </a>
    </div>
  );
};

export default Icon;
