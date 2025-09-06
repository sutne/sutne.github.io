import { useMediaQuery, useTheme } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';

const PhoneAccelerometerContext = createContext<
  | {
      isPhone: boolean;
      /** Rotation around the z-axis, [0, 360] */
      alpha: number;
      /** Rotation around the x-axis, [-180, 180] */
      beta: number;
      /** Rotation around the y-axis, [-90, 90] */
      gamma: number;
      /** Wether device requires extra permission due to privacy (iOS) */
      requiresAccess: boolean;
      /** Wether access is granted for the current device */
      hasAccess: boolean;
      /** Prompt the user to request access, must be done through user interaction */
      requestAccess: () => void;
    }
  | undefined
>(undefined);

export function PhoneAccelerometerProvider(props: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.only('xs'));
  const requiresAccess =
    // @ts-expect-error
    typeof DeviceOrientationEvent.requestPermission === 'function';
  const [hasAccess, setHasAccess] = useState(isPhone && !requiresAccess);

  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(0);

  function requestAccess() {
    // @ts-expect-error
    DeviceOrientationEvent.requestPermission()
      .then((response: string) => setHasAccess(response === 'granted'))
      .catch(() => setHasAccess(false));
  }

  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma } = event;
      setAlpha(alpha ?? 0);
      setBeta(beta ?? 0);
      setGamma(gamma ?? 0);
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  return (
    <PhoneAccelerometerContext.Provider
      value={{
        isPhone,
        alpha,
        beta,
        gamma,
        requiresAccess,
        hasAccess,
        requestAccess,
      }}
    >
      {props.children}
    </PhoneAccelerometerContext.Provider>
  );
}

export function usePhoneAccelerometer() {
  const context = useContext(PhoneAccelerometerContext);
  if (context !== undefined) return context;
  throw new Error(
    'usePhoneAccelerometer must be used within a PhoneAccelerometerProvider',
  );
}
