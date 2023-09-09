import { RefObject, useEffect, useState, DependencyList } from 'react';
export const useIntersection = (
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit,
  deps: DependencyList,
): IntersectionObserverEntry | null => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === 'function') {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setIntersectionObserverEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      return () => {
        setIntersectionObserverEntry(null);
        observer.disconnect();
      };
    }
    return () => {};
  }, [...deps, ref.current, options.threshold, options.root, options.rootMargin]);

  return intersectionObserverEntry;
};
