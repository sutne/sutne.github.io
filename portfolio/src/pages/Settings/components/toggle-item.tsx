import React from 'react';
import { QuestionMarkRounded } from '@mui/icons-material';
import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';

import { ToggleSwitch } from './toggle-switch';

export function ToggleItem(props: {
  name: string;
  isToggled: boolean;
  onChange: () => void;
  tooltip?: JSX.Element;
}) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const theme = useTheme();

  const sx = getSx();
  return (
    <Stack sx={sx.row} direction='row'>
      <Typography sx={sx.name} variant='h5'>
        {props.name}
      </Typography>
      {props.tooltip && (
        <Box
          sx={sx.tooltip}
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Typography>
            <QuestionMarkRounded sx={sx.tooltipIcon} />
          </Typography>
          <Box sx={sx.tooltipContent}>{props.tooltip}</Box>
        </Box>
      )}
      <ToggleSwitch
        isOn={props.isToggled}
        onChange={() => {
          setShowTooltip(false);
          props.onChange();
        }}
      />
    </Stack>
  );

  function getSx() {
    return {
      row: {
        paddingY: '1mm',
      },
      name: {
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 300,
        alignSelf: 'center',
      },
      tooltip: {
        height: '1.5rem',
        width: '1.5rem',
        position: 'relative',
        top: '0.1em',
        borderRadius: '50%',
        bgcolor: alpha(theme.palette.background.paper, 0.2),
        cursor: 'pointer',
        margin: '0 0.5em',
        textAlign: 'center',
        '&:hover': {
          backgroundColor: alpha(theme.palette.background.paper, 0.4),
        },
      },
      tooltipIcon: {
        position: 'relative',
        top: '0.2rem',
        fontSize: '1rem',
      },
      tooltipContent: {
        visibility: showTooltip ? 'visible' : 'hidden',
        position: 'absolute',
        zIndex: 1,
        transform: 'translate(-50%, 5%)',
        width: '500px',
        padding: '2em',
        bgcolor: 'background.default',
        textAlign: 'left',
        borderRadius: '0.5em',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 70%)',
      },
    };
  }
}
