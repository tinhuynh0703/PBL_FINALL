import LoadingAnimation from '../../share/assets/animations/Loading.gif';

import CountUp from 'react-countup';
import './SplashScreen.scss';
const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-screen__img">
        <img src={LoadingAnimation} alt="Loading Screen" />
      </div>
      <div className=" splash-screen__title">
        <CountUp start={0} end={100} delay={0} duration={1.5}>
          {({ countUpRef }) => (
            <div>
              Loading <span ref={countUpRef} />%
            </div>
          )}
        </CountUp>
      </div>
    </div>
  );
};

export default SplashScreen;
