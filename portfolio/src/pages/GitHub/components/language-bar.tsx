import React from 'react';
import { Box, Grid } from '@mui/material';

import { useTheme } from 'providers/theme-provider';

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
  const num_langs = Object.keys(props.languages).length;
  if (num_langs == 0) return <></>;

  const { theme } = useTheme();

  const toPercentString = (num: number) => {
    const percent = (100 * num) / props.size;
    return (Math.round(percent * 100) / 100).toFixed(1);
  };

  const sx = getSx();
  return (
    <>
      <Box sx={sx.colorBar}>
        {Object.keys(props.languages).map((language, i) => {
          return <Box key={i} sx={getBarSx(language)}></Box>;
        })}
      </Box>
      <Grid container sx={sx.nameBar} rowSpacing={1} columnSpacing={2}>
        {Object.keys(props.languages).map((language, i) => {
          const amount = props.languages[language];
          if (num_langs > 5 && amount / props.size < 0.001) return <></>;
          return (
            <Grid item key={i}>
              <LanguageName
                name={language}
                percentage={toPercentString(amount)}
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
      amountBefore += props.languages[key];
    }
    let border = 'none';
    if (index < 10) {
      border = '2px solid ' + theme.palette.background.paper;
    } else if (index < num_langs - 1) {
      border = '1px solid ' + theme.palette.background.paper;
    }

    return {
      height: '100%',
      width: `${100 * (props.languages[language] / props.size)}%`,
      bgcolor: LanguageColorMap[language] ?? 'pink',
      position: 'absolute',
      boxSizing: 'border-box',
      borderRight: border,
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
        marginTop: '8px',
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
            content: `" ${props.percentage}%"`,
            fontWeight: 300,
          },
        },
      };
    }
  }
}
