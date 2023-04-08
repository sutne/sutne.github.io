export function toTimeDiffString(utcString: string) {
  const date = new Date(utcString);
  if (date.toString() === 'Invalid Date') {
    return 'Invalid Date';
  }
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffInDays < 1) {
    return 'today';
  }
  if (diffInDays < 2) {
    return 'yesterday';
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  if (diffInDays < 14) {
    return 'a week ago';
  }
  if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  }
  if (diffInDays < 60) {
    return 'a month ago';
  }
  if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 30)} months ago`;
  }
  if (diffInDays < 365 * 2) {
    return 'a year ago';
  }
  return `${Math.floor(diffInDays / 365)} years ago`;
}
