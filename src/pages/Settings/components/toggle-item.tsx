import { Stack, Typography } from '@mui/material';
import { ToggleSwitch } from './toggle-switch';

export function ToggleItem(props: {
  name: string;
  isToggled: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  const sx = getSx();
  return (
    <Stack sx={sx.row} direction='row'>
      <Typography sx={sx.name} variant='h5'>
        {props.name}
      </Typography>
      <ToggleSwitch
        isOn={props.isToggled}
        disabled={props.disabled}
        onChange={props.onChange}
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
    };
  }
}
