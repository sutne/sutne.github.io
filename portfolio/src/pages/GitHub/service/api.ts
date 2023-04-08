export {};
import { RepoType } from './types';

const API_URL = 'https://personal-sutne.vercel.app/api/github';

export async function getRepositories(): Promise<RepoType[] | undefined> {
  const result = await fetch(`${API_URL}/repos`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return result;
}
