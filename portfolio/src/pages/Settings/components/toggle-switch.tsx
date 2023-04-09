import React from 'react';
import { Box } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

type props = {
  isOn: boolean;
  onChange: () => void;
};
export function ToggleSwitch({ ...props }: props) {
  const { themeIsDark } = useTheme();

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
          bgcolor: 'grey',
          boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 1)',
        },
        props.isOn && {
          bgcolor: themeIsDark ? '#2ECA45' : '#65C466',
        },
      ],
      thumb: [
        {
          height: height - 2,
          width: height - 2,
          bgcolor: 'white',
          borderRadius: (height - 2) / 2,
          transition: 'all 300ms',
          boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
        },
        props.isOn && {
          transform: `translateX(${width - height}px)`,
        },
      ],
    };
  }
}
