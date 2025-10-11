import { Box } from '@mui/material';

export function ToggleSwitch(props: {
  isOn: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  const IOS = getIOSStyle();
  return (
    <Box
      sx={IOS.container}
      onClick={props.onChange}
      aria-disabled={props.disabled}
    >
      <Box sx={IOS.background}>
        <Box sx={IOS.thumb} />
      </Box>
    </Box>
  );

  function getIOSStyle() {
    const width = 44;
    const height = 20;
    return {
      container: {
        width: width,
        height: height,
        borderRadius: height / 2,
        overflow: 'hidden',
        cursor: 'pointer',
      },
      background: [
        {
          height: '100%',
          width: '100%',
          padding: '2px',
          transition: 'all 500ms',
          bgcolor: 'rgb(164,164,164)',
          boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.1)',
        },
        props.isOn && {
          bgcolor: '#2ECA45',
        },
      ],
      thumb: [
        {
          height: height - 4,
          width: width * 0.58,
          bgcolor: 'white',
          borderRadius: (height - 4) / 2,
          transition: 'all 300ms',
          boxShadow: `
            inset
            0 -6px 8px rgba(0, 0, 0, 0.1),
            0    0 3px rgba(0, 0, 0, 0.3)`,
        },
        props.isOn && {
          transform: `translateX(${width * 0.43 - 4}px)`,
        },
      ],
    };
  }
}
