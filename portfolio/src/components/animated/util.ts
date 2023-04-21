export function getScreenCenter(): { x: number; y: number } {
  return {
    x: window.innerWidth / 2 + window.scrollX,
    y: window.innerHeight / 2 + window.scrollY,
  };
}

export function getCoordinates(ref: React.RefObject<HTMLImageElement>): {
  x: number;
  y: number;
} {
  if (!ref.current) return { x: 0, y: 0 };
  return {
    x: ref.current.x,
    y: ref.current.y,
  };
}

export function getSize(ref: React.RefObject<HTMLImageElement>): {
  x: number;
  y: number;
} {
  if (!ref.current) return { x: 0, y: 0 };
  return {
    x: ref.current.clientWidth,
    y: ref.current.clientHeight,
  };
}

export function getImageCenter(ref: React.RefObject<HTMLImageElement>): {
  x: number;
  y: number;
} {
  if (!ref.current) return { x: 0, y: 0 };
  const pos = getCoordinates(ref);
  const size = getSize(ref);
  return {
    x: pos.x + size.x / 2,
    y: pos.y + size.y / 2,
  };
}
