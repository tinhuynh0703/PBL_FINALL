import { ROLE } from '../../enum';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, Switch, SwitchProps, useLocation } from 'react-router-dom';
import { selectLoginState, selectUserState } from '../../features/auth/actions/auth';
import ErrorPage from '../../pages/404Page/ErrorPage';

type CustomRouteProps = Omit<RouteProps, 'children'>;
interface Props extends CustomRouteProps, SwitchProps {
  roles?: Array<ROLE>;
  redirectPath?: string;
  protectedPaths?: string[];
}

function ProtectedSwitch(props: Props) {
  const { children, roles, path, redirectPath, protectedPaths, ...rest } = props;
  const location = useLocation();
  const user = useSelector(selectUserState);
  const accessToken = useSelector(selectLoginState);
  const userHasRequiredRole = !!(user && roles?.includes(user.role as ROLE));
  const currentPathName = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
  return (
    <Route
      {...rest}
      path={path}
      render={() =>
        accessToken && userHasRequiredRole ? (
          <Switch>
            {children}
            <Route component={ErrorPage} />
          </Switch>
        ) : !protectedPaths?.includes(currentPathName) ? (
          <ErrorPage />
        ) : (
          <Redirect
            to={{
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              pathname: redirectPath || '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default ProtectedSwitch;
