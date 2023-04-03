import { UNSAFE_invariant, UNSAFE_warning } from '@remix-run/router';
import { useContext, useEffect } from 'react';
import {
  RelativeRoutingType,
  UNSAFE_DataRouterStateContext,
  UNSAFE_NavigationContext,
  useInRouterContext,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export interface PrefixNavigateProps {
  fromPrefix: string;
  toPrefix: string;
  replace?: boolean;
  state?: any;
  relative?: RelativeRoutingType;
}

export function PrefixNavigate({
  fromPrefix,
  toPrefix,
  replace,
  state,
  relative,
}: PrefixNavigateProps): null {
  // eslint-disable-next-line new-cap
  UNSAFE_invariant(
    useInRouterContext(),
    `<NavigateRelative> may be used only in the context of a <Router> component.`,
  );

  // eslint-disable-next-line new-cap
  UNSAFE_warning(
    !useContext(UNSAFE_NavigationContext).static,
    `<NavigateRelative> must not be used on the initial render in a <StaticRouter>. ` +
      `This is a no-op, but you should modify your code so the <NavigateRelative> is ` +
      `only ever rendered in response to some user interaction or state change.`,
  );

  const dataRouterState = useContext(UNSAFE_DataRouterStateContext);
  const navigate = useNavigate();
  const location = useLocation();
  const to = location.pathname.replace(fromPrefix, toPrefix);

  useEffect(() => {
    if (dataRouterState && dataRouterState.navigation.state !== 'idle') {
      return;
    }
    navigate(to, { replace, state, relative });
  });

  return null;
}
