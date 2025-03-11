import { Box } from '@mui/material';
import { useApp } from 'providers/app-provider';
import { useSettings } from 'providers/settings-provider';
import type React from 'react';
import { type JSX, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlScrollPosition } from '../hooks/useUrlScrollPosition';
import { getImageCenter, getScreenCenter } from './util';

/**
 * Wrapper to handle animation of app content moving from position of the icon.
 * Also sets up the bounding box and background.
 */
export function ContentAnimationWrapper(props: {
  name: string;
  children: JSX.Element;
}) {
  const { getIconRef, getIsOpen, setIsOpen } = useApp();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const isOpen = getIsOpen(props.name);
  const iconRef = getIconRef(props.name);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useUrlScrollPosition(scrollRef);

  const animation = settings.useAnimations
    ? `${settings.animationDuration}ms ease-in`
    : '0ms';

  // needed to animate on mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    // if page is loaded directly from url, instead of clicking on app icon
    setIsOpen(props.name, true);
  }, []);

  const [origin, setOrigin] = useState(getScreenCenter());
  const [target, setTarget] = useState(getImageCenter(iconRef));

  useEffect(() => {
    setOrigin(getScreenCenter());
    setTarget(getImageCenter(iconRef));
  }, [iconRef, window.innerWidth, window.innerHeight]);

  const transform = {
    x: target.x - origin.x,
    y: target.y - origin.y,
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;
    setIsOpen(props.name, false);
    setIsMounted(false);
    setTimeout(
      () => {
        navigate('/');
      },
      settings.useAnimations ? settings.animationDuration : 0,
    );
  };

  if (!iconRef.current) return <></>;
  const sx = getSx();
  return (
    <Box sx={sx.background} ref={scrollRef} onClick={(e) => handleClose(e)}>
      <Box sx={sx.reset} onClick={(e) => handleClose(e)}>
        <Box sx={sx.container} onClick={(e) => handleClose(e)}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );

  function getSx() {
    return {
      background: [
        {
          position: 'fixed',
          zIndex: 1,
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          overflowY: 'auto',
          scrollBar: 'none',
          '&::-webkit-scrollbar': {
            width: '0px',
          },
          transition: `background-color ${animation}`,
          backgroundColor: 'rgba(0,0,0,0%)',
        },
        isOpen &&
          isMounted && {
            backgroundColor: 'rgba(0,0,0,70%)',
          },
      ],
      reset: {
        zIndex: 2,
        position: 'absolute',
        width: 'min(1024px, 100%)',
        height: '100%',
      },
      container: {
        height: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        transition: `transform ${animation}, opacity ${animation}`,
        // opacity: isOpen ? 1 : 0,
        transform:
          isOpen && isMounted
            ? 'translate(0,0) scale(1)'
            : `translate(${transform.x}px,${transform.y}px) scale(0)`,
        '&:first-of-type': {
          '&:after': {
            content: '""',
            display: 'block',
            height: '16px',
            width: '100%',
          },
        },
      },
    };
  }
}
