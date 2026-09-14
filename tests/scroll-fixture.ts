import { vi } from 'vitest';

export function scrollFixture() {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'requestAnimationFrame', 'cancelAnimationFrame', 'performance'] });
  const queries = new Map<string, MediaQueryList>();
  vi.stubGlobal('matchMedia', vi.fn((media: string) => {
    if (!queries.has(media)) {
      const query = Object.assign(new EventTarget(), { media, matches: media.includes('min-width'), onchange: null });
      queries.set(media, query as unknown as MediaQueryList);
    }
    return queries.get(media);
  }));
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 });
  Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: 0 });
  Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 10000 });
  const move = (y: number) => {
    Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: y });
    window.dispatchEvent(new Event('scroll'));
  };
  const scroll = vi.spyOn(window, 'scrollTo').mockImplementation((x: number | ScrollToOptions, y?: number) => {
    move(typeof x === 'object' ? x.top ?? window.scrollY : y ?? 0);
  });
  const media = (name: string, matches: boolean) => {
    const query = window.matchMedia(name);
    Object.defineProperty(query, 'matches', { configurable: true, value: matches });
    query.dispatchEvent(new Event('change'));
  };
  const wheel = (target: EventTarget = window, deltaY = 100) => target.dispatchEvent(new WheelEvent('wheel', { deltaY, bubbles: true }));
  const end = () => document.dispatchEvent(new Event('scrollend'));
  const gesture = (y: number) => { wheel(); move(y); end(); };
  const section = (top = 1000) => {
    const node = document.createElement('section');
    node.id = 'projects';
    node.getBoundingClientRect = () => ({ top: top - window.scrollY, height: 1200, width: 1000, left: 0, right: 1000, bottom: top + 1200 - window.scrollY, x: 0, y: top - window.scrollY, toJSON() {} });
    document.body.append(node);
    return node;
  };
  return { scroll, move, media, wheel, end, gesture, section };
}

export function cleanFixture() {
  document.body.innerHTML = '';
  vi.useRealTimers();
  vi.unstubAllGlobals();
}
