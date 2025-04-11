import { Box, Stack, Typography, alpha, useTheme } from '@mui/material';

export function GroupButton(props: {
  type: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const theme = useTheme();

  const sx = getSx();
  return (
    <Box sx={sx.container} onClick={props.onClick}>
      <Stack sx={sx.content} direction='row' spacing={1} alignItems={'center'}>
        <Typography sx={sx.label} variant='body2'>
          {props.type}
        </Typography>
      </Stack>
    </Box>
  );
  function getSx() {
    return {
      container: [
        {
          border: '1px dashed',
          color: 'text.secondary',
          borderRadius: '20px',
          '&:hover': {
            backgroundColor: alpha(theme.palette.text.secondary, 0.15),
            color: 'text.primary',
          },
          cursor: 'pointer',
        },
        props.isSelected && {
          border: '1px solid',
          color: 'text.primary',
        },
      ],
      label: {
        whiteSpace: 'nowrap',
      },
      icon: {
        height: '18px',
        width: '18px',
        fontSize: '22px',
        marginLeft: '-8px',
      },
      content: {
        margin: '1mm 4mm 1mm 4mm',
      },
    };
  }
}
