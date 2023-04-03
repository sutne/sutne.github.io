export function msToString(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function isString(value: any): value is string {
  return typeof value === 'string' || value instanceof String;
}