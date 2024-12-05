import { Box } from '@mui/material';
import { useApp } from 'providers/app-provider';
import { useSettings } from 'providers/settings-provider';
import { useEffect, useState } from 'react';
import { getCoordinates, getScreenCenter, getSize } from './util';

/**
 * Wrapper to handle animation of icon moving to position of the opened app.
 */
export function IconAnimationWrapper(props: {
  name: string;
  children: JSX.Element;
}) {
  const { getIconRef, getIsOpen } = useApp();
  const { settings } = useSettings();

  const animation = settings.useAnimations
    ? `${settings.animationDuration}ms ease-in`
    : '0ms';

  const iconRef = getIconRef(props.name);
  const isOpen = getIsOpen(props.name);

  // want to target the center of the app icon
  const [origin, setOrigin] = useState(getCoordinates(iconRef));
  const [target, setTarget] = useState({
    x: getScreenCenter().x - getSize(iconRef).x / 2,
    y: getSize(iconRef).y / 2,
  });

  useEffect(() => {
    setOrigin(getCoordinates(iconRef));
    setTarget({
      x: getScreenCenter().x - getSize(iconRef).x / 2,
      y: getSize(iconRef).y / 2,
    });
  }, [iconRef, window.innerWidth, window.innerHeight]);

  // translation from origin to target
  const transform = {
    x: target.x - origin.x,
    y: target.y - origin.y,
  };

  const sx = getSx();
  return <Box sx={sx.animated}>{props.children}</Box>;
  function getSx() {
    return {
      animated: [
        {
          transition: `transform ${animation}, opacity ${animation}`,
          opacity: 1,
        },
        settings.useAnimations &&
          isOpen && {
            transform: `translate(${transform.x}px,${transform.y}px)`,
            opacity: 0,
          },
      ],
    };
  }
}
