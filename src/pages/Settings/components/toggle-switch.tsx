import { Box } from '@mui/material';

export function ToggleSwitch(props: { isOn: boolean; onChange: () => void }) {
  const IOS = getIOSStyle();
  return (
    <Box sx={IOS.container} onClick={props.onChange}>
      <Box sx={IOS.background}>
        <Box sx={IOS.thumb} />
      </Box>
    </Box>
  );

  function getIOSStyle() {
    const width = 42;
    const height = 26;
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
          borderRadius: height / 2,
          padding: '1px',
          transition: 'all 500ms',
          bgcolor: 'rgb(164,164,164)',
          boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.5)',
        },
        props.isOn && {
          bgcolor: '#2ECA45',
        },
      ],
      thumb: [
        {
          height: height - 2,
          width: height - 2,
          bgcolor: 'white',
          borderRadius: (height - 2) / 2,
          transition: 'all 300ms',
          boxShadow: `
            inset 
            0 -6px 8px rgba(0, 0, 0, 0.1),
            0    0 3px rgba(0, 0, 0, 0.3)`,
        },
        props.isOn && {
          transform: `translateX(${width - height}px)`,
        },
      ],
    };
  }
}
