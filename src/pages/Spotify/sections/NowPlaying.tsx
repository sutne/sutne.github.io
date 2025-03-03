import { VolumeOff, VolumeUp } from '@mui/icons-material';
import { Box, Collapse, Stack, alpha, useTheme } from '@mui/material';
import { Image } from 'components/image';
import { useState } from 'react';
import { ItemSubtitle } from '../components/item-subtitle';
import { ItemTitle } from '../components/item-title';
import { SampleButton } from '../components/sample-button';
import { TrackProgress } from '../components/track-progress';
import { SectionTitle } from '../components/typography';
import { useNowPlaying } from '../providers/now-playing-provider';

export function NowPlaying() {
  const [isHovering, setIsHovering] = useState(false);

  const theme = useTheme();
  const { track, shouldShow } = useNowPlaying();

  const onClickTitle = !track?.href
    ? undefined
    : () => window.open(track.href, '_blank');

  const sx = getSx();
  return (
    <Collapse in={shouldShow} timeout={2000}>
      <Box>
        {track ? (
          <>
            <SectionTitle title='Currently Listening To' />
            <Stack
              sx={sx.background}
              direction={{ xs: 'column', sm: 'row' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Box sx={sx.image}>
                <Image src={track.image} size='60mm'>
                  {track.sample ? (
                    <>
                      <SampleButton
                        sample={track.sample}
                        show={isHovering}
                        playIcon={VolumeOff}
                        pauseIcon={VolumeUp}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Image>
              </Box>
              <Stack sx={sx.container} direction='column'>
                <Box sx={sx.content}>
                  <ItemTitle sx={sx.title} onClick={onClickTitle}>
                    {track.title}
                  </ItemTitle>
                  <ItemSubtitle sx={sx.artists}>
                    {track.artists.join(', ')}
                  </ItemSubtitle>
                  <Box sx={sx.progress}>
                    <TrackProgress />
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Collapse>
  );

  function getSx() {
    return {
      background: [
        {
          borderRadius: '8px',
          padding: { xs: '12px 12px 6px 12px', sm: '12px' },
          margin: '0px',
          background: `linear-gradient(0deg,
          ${theme.palette.background.paper} 10%,
          ${alpha(theme.palette.background.paper, 0.2)} 100%
        )`,
        },
      ],
      image: [
        {
          display: 'flex',
          justifyContent: 'center',
        },
      ],
      container: [
        {
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          tableLayout: 'fixed',
          margin: { xs: '0px', sm: '0 12px' },
          display: 'table',
        },
      ],
      content: [
        {
          position: 'relative',
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center',
          height: { xs: '6em', sm: '100%' },
        },
      ],
      title: [
        {
          fontSize: { xs: '1.2em', sm: '1.8em' },
          fontWeight: 600,
        },
      ],
      artists: [
        {
          fontSize: { xs: '0.9em', sm: '1.2em' },
          lineHeight: { xs: '0.9em', sm: '1.2em' },
          height: { xs: '1.8em', sm: '2.4em' },
          margin: '0 30px',
        },
      ],
      progress: [
        {
          position: 'absolute',
          width: '100%',
          bottom: '0',
          left: '0',
        },
      ],
    };
  }
}
