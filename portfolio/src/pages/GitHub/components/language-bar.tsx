import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';

import { LanguageColorMap } from '../service/types';

type props = {
  size: number;
  languages: { [key: string]: number };
  height?: number;
  textSize?: number;
};
export function LanguageBar({ ...props }: props) {
  const height = props.height ?? 12;
  const textSize = props.textSize ?? 12;
  const numLangs = Object.keys(props.languages).length;
  const amount = (lang: string) => props.languages[lang];

  const theme = useTheme();

  const toPercentage = (lang: string) => {
    const percent = (100 * amount(lang)) / props.size;
    return (Math.round(percent * 100) / 100).toFixed(1);
  };

  const sx = getSx();

  if (numLangs == 0) return <></>;
  return (
    <>
      <Box sx={sx.colorBar}>
        {Object.keys(props.languages).map((language, i) => {
          return <Box key={i} sx={getBarSx(language)} />;
        })}
      </Box>
      <Grid container rowSpacing={1} columnSpacing={2}>
        {Object.keys(props.languages).map((language, i) => {
          return (
            <Grid item key={i}>
              <LanguageName
                name={language}
                percentage={toPercentage(language)}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );

  function getBarSx(language: string) {
    let amountBefore = 0;
    let index = 0;
    for (const key in props.languages) {
      if (key == language) break;
      index += 1;
      amountBefore += amount(key);
    }
    let border = '';
    if (index == numLangs - 1) {
      border = 'none';
    } else if (amount(language) > 0.05 * props.size) {
      border = '2px solid ' + theme.palette.background.paper;
    } else if (amount(language) > 0.01 * props.size) {
      border = '1px solid ' + theme.palette.background.paper;
    } else {
      border = 'none';
    }

    return {
      height: '100%',
      width: `${100 * (amount(language) / props.size)}%`,
      bgcolor: LanguageColorMap[language] ?? 'white',
      position: 'absolute',
      boxSizing: 'border-box',
      borderRight: border,
      left: `${100 * (amountBefore / props.size)}%`,
    };
  }

  function getSx() {
    return {
      colorBar: {
        marginY: '12px',
        position: 'relative',
        height: height,
        bgcolor: 'pink',
        borderRadius: height / 2,
        overflow: 'hidden',
      },
    };
  }

  type nameProps = {
    name: string;
    percentage: string;
  };
  function LanguageName({ ...props }: nameProps) {
    const sx = getSx();
    return <Box sx={sx.languageName}>{props.name}</Box>;

    function getSx() {
      return {
        languageName: {
          whiteSpace: 'nowrap',
          alignSelf: 'center',
          color: 'text.secondary',
          fontSize: textSize,
          fontWeight: 600,
          '&:before': {
            content: '""',
            position: 'relative',
            top: '1px',
            display: 'inline-block',
            height: textSize,
            width: textSize,
            borderRadius: textSize / 2,
            marginRight: '3px',
            backgroundColor: LanguageColorMap[props.name],
          },
          '&:after': {
            content: `"${props.percentage}%"`,
            marginLeft: '5px',
            fontWeight: 300,
          },
        },
      };
    }
  }
}
