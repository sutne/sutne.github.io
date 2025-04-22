export function getTrophyLevelImage(level: number): string {
  if (level < 100) return '0-99.png';
  if (level < 200) return '100-199.png';
  if (level < 300) return '200-299.png';
  if (level < 400) return '300-399.png';
  if (level < 500) return '400-499.png';
  if (level < 600) return '500-599.png';
  if (level < 700) return '600-699.png';
  if (level < 800) return '700-799.png';
  if (level < 999) return '800-998.png';
  return '999.png';
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

export const trophyColors = {
  bronze: 'rgb(138, 85, 77)',
  silver: 'rgb(134, 137, 139)',
  gold: 'rgb(181, 143, 75)',
  platinum: 'rgb(29, 73, 153)',
} as const;

export function getRarityDescription(rarity: string) {
  const value = Number(rarity);
  if (Number.isNaN(value) && value < 0) return 'Unknown';
  if (value === 0) return 'Unobtainable';
  if (value < 1) return 'Ultra Rare';
  if (value < 5) return 'Very Rare';
  if (value < 15) return 'Rare';
  if (value < 30) return 'Uncommon';
  if (value < 50) return 'Common';
  if (value < 85) return 'Very Common';
  return 'Universal';
}
