import { Box, useTheme } from '@mui/material';
import { useApp } from 'providers/app-provider';
import { useNavigate } from 'react-router-dom';
import { IconAnimationWrapper } from './animated/icon-animation-wrapper';

export function AppIcon(props: { name: string; onTap?: () => void }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { getIconRef, setIsOpen } = useApp();

  const iconRef = getIconRef(props.name);

  const onClick = () => {
    if (props.onTap) {
      props.onTap();
      return;
    }
    setIsOpen(props.name, true);
    navigate(`/${props.name}`);
  };

  const sx = getSx();
  return (
    <IconAnimationWrapper name={props.name}>
      <Box sx={sx.container} onClick={onClick}>
        <Box ref={iconRef} sx={sx.icon} />
        <Box sx={sx.name}>{props.name}</Box>
      </Box>
    </IconAnimationWrapper>
  );

  function getSx() {
    return {
      container: {
        textAlign: 'center',
        margin: { xs: '0.5mm', sm: '1mm' },
        transition: 'transform ease-in 0.1s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.06)',
        },
      },
      icon: {
        width: { xs: '16mm', sm: '18mm' },
        aspectRatio: '1',
        borderRadius: '30%',
        backgroundImage: `url(${
          new URL(`/src/assets/apps/${props.name}.png`, import.meta.url).href
        })`,
        backgroundSize: 'cover',
        boxShadow: `
          2px 4px 6px rgba(0, 0, 0, 30%),
          inset 1px 1px 1px rgba(200, 255, 231, 0.18),
          inset -2px -4px 4px -5px rgba(200, 255, 231, 0.18)
        `,
      },
      name: {
        color: theme.palette.text.primary,
        textWrap: 'wrap',
        overflowWrap: 'break-word',
        fontSize: { xs: '0.7em', sm: '0.8em' },
        marginTop: { xs: '0.5mm', sm: '1mm' },
      },
    };
  }
}
