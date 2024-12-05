import type { Sorting } from '../../providers/sort-provider';
import type { RepoType } from './service/types';

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
  const year = date.getFullYear();
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  return `${monthName} ${year}`;
}

export function sortRepos(repos: RepoType[], sorting: Sorting): RepoType[] {
  const sorted = repos.sort((a, b) => {
    const langA = Object.keys(a.languages)[0];
    const langB = Object.keys(b.languages)[0];
    switch (sorting.type) {
      case 'Language':
        if (!langA) return 1;
        if (!langB) return -1;
        return langA.localeCompare(langB);
      case 'Name':
        return a.name.localeCompare(b.name);
      case 'Updated':
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case 'Created':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });
  if (sorting.order === 'desc') return sorted.reverse();
  return sorted;
}
