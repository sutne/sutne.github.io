import { useEffect } from 'react';

export function useUrlScrollPosition(
  ref: React.RefObject<HTMLDivElement | null>,
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: use href to re-run on every url change
  useEffect(() => {
    const url = window.location.href;
    const storageKey = `scroll-position-${url}`;

    const persitedScroll = sessionStorage.getItem(storageKey);
    ref.current?.scrollTo(0, !persitedScroll ? 0 : JSON.parse(persitedScroll));

    const handleScroll = () => {
      if (window.location.href !== url) return;
      const position = ref.current?.scrollTop;
      sessionStorage.setItem(storageKey, JSON.stringify(position));
    };

    ref.current?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, [window.location.href, ref.current]);
}
