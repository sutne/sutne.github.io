import { Typography } from '@mui/material';

export function ItemTitle(props: {
  children?: string;
  onClick?: () => void;
  sx?: any;
}) {
  const sx = getSx();
  return (
    <Typography sx={sx} onClick={props.onClick}>
      {props.children}
    </Typography>
  );

  function getSx() {
    return [
      {
        fontSize: '1.1em',
        color: 'text.primary',
        cursor: props.onClick ? 'pointer' : 'text',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&:hover': {
          textDecoration: props.onClick ? 'underline' : 'none',
        },
      },
    ].concat(props.sx ?? [{}]);
  }
}
