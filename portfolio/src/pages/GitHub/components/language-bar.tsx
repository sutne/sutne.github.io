import React from 'react';
import { Box, Stack } from '@mui/material';

import { LanguageColorMap } from '../service/types';

const height = 12;

type props = {
  size: number;
  languages: { [key: string]: number };
};
export function LanguageBar({ ...props }: props) {
  if (Object.keys(props.languages).length == 0) return <></>;

  const sx = getSx();
  return (
    <>
      <Box sx={sx.colorBar}>
        {Object.keys(props.languages).map((language, i) => (
          <Box key={i} sx={getBarSx(language)}></Box>
        ))}
      </Box>
      <Stack sx={sx.nameBar} direction='row' spacing={2}>
        {Object.keys(props.languages).map((language, i) => (
          <LanguageName key={i} name={language} />
        ))}
      </Stack>
    </>
  );

  function getBarSx(language: string) {
    let amountBefore = 0;
    for (const key in props.languages) {
      if (key == language) break;
      amountBefore += props.languages[key];
    }
    return {
      height: '100%',
      width: `${100 * (props.languages[language] / props.size)}%`,
      bgcolor: LanguageColorMap[language] ?? 'pink',
      position: 'absolute',
      left: `${100 * (amountBefore / props.size)}%`,
    };
  }

  function getSx() {
    return {
      colorBar: {
        position: 'relative',
        height: height,
        bgcolor: 'pink',
        borderRadius: height / 2,
        overflow: 'hidden',
      },
      nameBar: {
        height: height,
        marginTop: '8px',
      },
    };
  }
}

type nameProps = {
  name: string;
};
function LanguageName({ ...props }: nameProps) {
  const sx = getSx();
  return <Box sx={sx.languageName}>{props.name}</Box>;

  function getSx() {
    return {
      languageName: {
        alignSelf: 'center',
        color: 'text.secondary',
        fontSize: height,
        fontWeight: 500,
        '&:before': {
          content: '""',
          position: 'relative',
          top: '1px',
          display: 'inline-block',
          height: height,
          width: height,
          // alignSelf: 'center',
          borderRadius: height / 2,
          marginRight: '3px',
          backgroundColor: LanguageColorMap[props.name],
        },
      },
    };
  }
}
