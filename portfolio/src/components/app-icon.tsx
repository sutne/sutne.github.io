import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useApp } from 'providers/app-provider';
import { useMainTheme } from 'providers/main-theme-provider';

export function AppIcon(props: { name: string; onTap?: () => void }) {
  const { iconReferences, isOpenStates } = useApp();
  const { theme } = useMainTheme();
  const navigate = useNavigate();

  const icon = React.createRef<HTMLImageElement>();
  const isOpen = isOpenStates.get(props.name) ?? false;
  iconReferences.set(props.name, icon);

  // want to target the center of the app icon
  const [origin, setOrigin] = React.useState({ x: 0, y: 0 });
  const [target, setTarget] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (!icon?.current) return;
    setOrigin({
      x: icon.current.x,
      y: icon.current.y,
    });
    // apps are center, so target is center of screen
    setTarget({
      x: document.body.clientWidth / 2 - icon.current.clientWidth / 2,
      y: icon.current.clientHeight / 2,
    });
  }, [iconReferences]);

  React.useEffect(() => {
    if (!icon?.current) return;
    // apps are center, so target is center of screen
    setTarget({
      x: document.body.clientWidth / 2 - icon.current.clientWidth / 2,
      y: icon.current.clientHeight / 2,
    });
  }, [document.body.clientWidth, document.body.clientHeight]);

  // translation from origin to target
  const transform = {
    x: target.x - origin.x,
    y: target.y - origin.y,
  };

  const onClick = () => {
    if (props.onTap) {
      props.onTap();
      return;
    }
    isOpenStates.set(props.name, true);
    navigate(`/${props.name}`);
  };

  const animation = '300ms ease-in';
  const sx = getSx();
  return (
    <>
      <Box sx={sx.hover}>
        <Box sx={sx.container} onClick={onClick}>
          <Box
            ref={icon}
            sx={sx.icon}
            component='img'
            src={require(`assets/apps/${props.name}.png`)}
          />
          <Box sx={sx.name}>{props.name}</Box>
        </Box>
      </Box>
    </>
  );
  function getSx() {
    return {
      hover: {
        transition: 'transform ease-in 0.1s',
        '&:hover': {
          transform: 'scale(1.06)',
        },
      },
      container: [
        {
          width: { xs: '18mm', sm: '22mm' },
          height: 'fit-content',
          textAlign: 'center',
          cursor: 'pointer',
          transition: `transform ${animation}, opacity ${animation}`,
          transform: 'none',
          opacity: 1,
        },
        isOpen &&
          {
            // transform: {
            //   xs: 'none',
            //   sm: `translate(${transform.x}px,${transform.y}px)`,
            // },
            // opacity: 0,
          },
      ],
      icon: [
        {
          width: { xs: '16mm', sm: '18mm' },
          aspectRatio: '1',
          borderRadius: '25%',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 30%)',
        },
      ],
      name: [
        {
          color: theme.palette.text.primary,
          textWrap: 'wrap',
          overflowWrap: 'break-word',
          fontSize: { xs: '0.7em', sm: '0.8em' },
          marginTop: { xs: '0.5mm', sm: '1mm' },
        },
      ],
    };
  }
}
