import { Box, type SxProps } from '@mui/material';
import { useState } from 'react';
import { usePhoneAccelerometer } from '../providers/phone-accelerometer-provider';

export function Shine3D(props: {
  disable?: boolean;
  sx?: SxProps;
  children: React.ReactNode;
  // masking is blocked by CORS for external images, such as for playstation trophy icons
  // which is where i wanted to use this as they are partilly transparent
  maskImage?: never;
}) {
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { isPhone, beta, gamma } = usePhoneAccelerometer();

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (2 * (e.clientX - rect.left)) / rect.width - 1;
    const y = (-2 * (e.clientY - rect.top)) / rect.height + 1;
    setMouse({ x, y });
  }

  function handleMouseLeave() {
    setMouse({ x: 0, y: 0 });
  }

  const maxX = 30;
  const minX = -30;
  const xRange = maxX - minX;
  const maxY = 80;
  const minY = 0;
  const yRange = maxY - minY;

  const gyroX = Math.max(minX, Math.min(maxX, gamma ?? 0)) / (xRange / 2);
  const gyroY =
    2 - (2 * Math.max(minY, Math.min(maxY, beta ?? 0))) / (yRange / 2);

  const perspective = 512; // px
  const scale = 100; // %
  const maxRotation = 7; // deg
  const xRotation = (isPhone ? 0 : mouse.y) * maxRotation;
  const yRotation = (isPhone ? 0 : mouse.x) * maxRotation;
  const xShineOffset = 50 + -2 * (isPhone ? gyroX : mouse.x) * 50; // %
  const yShineOffset = -75 + 4 * (isPhone ? gyroY : mouse.y) * 50; // %
  const maxTranslation = 6; // px
  const xTranslation = (isPhone ? 0 : mouse.x) * -maxTranslation;
  const yTranslation = (isPhone ? 0 : mouse.y) * maxTranslation;

  const sx = getSx();
  return (
    <>
      <Box
        sx={[
          ...sx.container,
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onContextMenu={(e) => e.stopPropagation()}
      >
        {props.children}
      </Box>
    </>
  );

  function getSx() {
    return {
      container: [
        {
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: 'fit-content',
        },
        !props.disable && {
          transition: '300ms',
          boxShadow: '0px 6px 10px rgba(0,0,0,0.7)',
          zIndex: 0,
          '&:hover': {
            transition: '0ms',
            zIndex: 1,
            transform: `
            perspective(${perspective}px)
            scale(${scale}%)
            rotateX(${xRotation}deg) 
            rotateY(${yRotation}deg)
            translate(${xTranslation}px, ${yTranslation}px)
          `,
          },
          '&:after': [
            {
              content: "''",
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              background: `radial-gradient(ellipse at ${xShineOffset}% ${yShineOffset}%,
              rgba(255,255,255,0.2) 5%,
              transparent 60%
            )`,
              pointerEvents: 'none',
            },
            props.maskImage && {
              maskImage: `url(${props.maskImage})`,
              maskPosition: 'center center',
              maskRepeat: 'no-repeat',
              maskSize: 'cover',
            },
          ],
        },
      ],
    };
  }
}
