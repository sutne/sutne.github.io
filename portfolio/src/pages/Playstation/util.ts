export function getTrophyLevelImage(level: number): string {
  if (level < 100) return '0-99.png';
  if (level < 200) return '100-199.png';
  if (level < 300) return '200-299.png';
  if (level < 400) return '300-399.png';
  if (level < 500) return '400-499.png';
  if (level < 600) return '500-599.png';
  if (level < 700) return '600-699.png';
  if (level < 800) return '700-799.png';
  if (level < 900) return '800-899.png';
  return 'platinum.png';
}

export function getDateString(date: string | undefined): string {
  if (!date) return 'Unknown';
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${day}/${month}/${year} ${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}
