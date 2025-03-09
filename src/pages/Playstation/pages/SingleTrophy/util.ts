export function getRarityDescription(rarity: string) {
  const value = Number(rarity);
  if (Number.isNaN(value) && value < 0) return 'Unknown';
  if (value === 0) return 'Unobtainable';
  if (value < 1) return 'Ultra Rare';
  if (value < 3) return 'Very Rare';
  if (value < 10) return 'Rare';
  if (value < 30) return 'Common';
  if (value < 60) return 'Very Common';
  return 'Universal';
}
