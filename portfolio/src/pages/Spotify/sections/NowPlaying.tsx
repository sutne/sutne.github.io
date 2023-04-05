import React, { useEffect, useState } from 'react';
import { VolumeOff, VolumeUp } from '@mui/icons-material';
import { alpha, Box, Grow, Stack } from '@mui/material';

import { Image } from 'components/image';
import { useTheme } from 'providers/theme-provider';

import { ItemSubtitle } from '../components/item-subtitle';
import { ItemTitle } from '../components/item-title';
import { TimeDuration } from '../components/progressbar';
import { SampleButton } from '../components/sample-button';
import { SectionTitle } from '../components/typography';
import { useMusicPlayer } from '../providers/music-player';
import * as API from '../service/api';
import { NowPlayingType } from '../service/types';


export function NowPlaying(): JSX.Element {
  const [track, setTrack] = useState<NowPlayingType | undefined>();
  const [isHovering, setIsHovering] = useState(false);

  const { addSample } = useMusicPlayer();
  const { theme } = useTheme();

  useEffect(() => {
    if (track) return;
    const getTrack = async () => {
      const response = await API.getNowPlaying();
      if (!response) return;
      setTrack(response);
      addSample(response.sample);
    };
    getTrack();
  }, [track]);

  const sx = getSx();
  return <Grow in={false} timeout={200}>
    {track ?
      <>
        <SectionTitle title='Currently Listening To' />
        <Stack sx={sx.background}
          direction={{ xs: 'column', sm: 'row' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Box sx={sx.image}>
            <Image src={track.image} size='60mm'>
              <SampleButton
                sample={track.sample}
                show={isHovering}
                playIcon={VolumeOff}
                pauseIcon={VolumeUp}
              />
            </Image>
          </Box>
          <Stack sx={sx.container} direction='column'>
            <Box sx={sx.content}>
              <ItemTitle sx={sx.title}>{track.title}</ItemTitle>
              <ItemSubtitle sx={sx.artists}>{track.artists.join(', ')}</ItemSubtitle>
              <Box sx={sx.progress}>
                <TimeDuration
                  length={track.length}
                  startedAt={track.startedAt}
                  onCompletion={() => { setTrack(undefined); }}
                />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </> : <></>
    }
  </Grow >;

  function getSx() {
    return {
      background: [{
        borderRadius: '8px',
        padding: { xs: '12px 12px 6px 12px', sm: '12px' },
        margin: '0px',
        background: `linear-gradient(0deg,
          ${theme.palette.background.paper} 10%,
          ${alpha(theme.palette.background.paper, 0.2)} 100%
        )`,
      }],
      image: [{
        display: 'flex',
        justifyContent: 'center',
      }],
      container: [{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        tableLayout: 'fixed',
        margin: { xs: '0px', sm: '0 12px' },
        display: 'table',
      }],
      content: [{
        position: 'relative',
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center',
        height: { xs: '6em', sm: '100%' },
      }],
      title: [{
        fontSize: { xs: '1.2em', sm: '1.8em' },
        fontWeight: 600,
      }],
      artists: [{
        fontSize: { xs: '0.9em', sm: '1.2em' },
        lineHeight: { xs: '0.9em', sm: '1.2em' },
        height: { xs: '1.8em', sm: '2.4em' },
        margin: '0 30px',
      }],
      progress: [{
        position: 'absolute',
        width: '100%',
        bottom: '0',
        left: '0',
      }],
    };
  }
}