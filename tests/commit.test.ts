import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { watchForStalls } from '../src/components/deck/commit';
import { cancelScroll, isScrollAnimating, scrollToY } from '../src/lib/scroll';
import { cleanFixture, scrollFixture } from './scroll-fixture';

let f: ReturnType<typeof scrollFixture>;
let stop: () => void;
beforeEach(() => { f = scrollFixture(); f.section(); stop = watchForStalls(); });
afterEach(() => { stop(); cancelScroll(); cleanFixture(); });

describe('soft desktop settling', () => {
  it('does not move on mount, layout-only scroll, or input without movement', () => {
    vi.advanceTimersByTime(1000);
    f.move(400); f.end();
    vi.advanceTimersByTime(2000);
    expect(f.scroll).not.toHaveBeenCalled();
    f.wheel();
    vi.advanceTimersByTime(2000);
    f.move(450); f.end();
    vi.advanceTimersByTime(2000);
    expect(f.scroll).not.toHaveBeenCalled();
  });

  it('settles forward in the requested direction to the shared reading point', () => {
    f.gesture(400);
    vi.advanceTimersByTime(349);
    expect(f.scroll).not.toHaveBeenCalled();
    vi.advanceTimersByTime(550);
    expect(window.scrollY).toBe(850);
    expect(isScrollAnimating()).toBe(false);
    const count = f.scroll.mock.calls.length;
    vi.advanceTimersByTime(3000);
    expect(f.scroll).toHaveBeenCalledTimes(count);
  });

  it('settles backward when scrolling up, even past the position threshold', () => {
    f.move(600);
    f.gesture(500);
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(0);
  });

  it('does not settle between wheel notches or while momentum continues', () => {
    f.gesture(100);
    vi.advanceTimersByTime(300);
    f.gesture(200);
    vi.advanceTimersByTime(400);
    f.gesture(300);
    vi.advanceTimersByTime(400);
    expect(f.scroll).not.toHaveBeenCalled();
    f.move(350);
    vi.advanceTimersByTime(200);
    f.move(400);
    vi.advanceTimersByTime(200);
    expect(f.scroll).not.toHaveBeenCalled();
    f.end();
    vi.advanceTimersByTime(1200);
    expect(window.scrollY).toBe(850);
  });

  it('interruption suppresses re-settling until meaningful user movement', () => {
    f.gesture(400);
    vi.advanceTimersByTime(500);
    f.wheel();
    const interrupted = window.scrollY;
    f.move(interrupted + 10); f.end();
    vi.advanceTimersByTime(2000);
    expect(window.scrollY).toBe(interrupted + 10);
    f.gesture(interrupted + 80);
    vi.advanceTimersByTime(1200);
    expect(window.scrollY).toBe(850);
  });

  it('navigation does not arm a settle; its interrupting wheel still earns one', () => {
    scrollToY(400);
    vi.advanceTimersByTime(1200);
    f.end();
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(400);
    scrollToY(600);
    vi.advanceTimersByTime(100);
    f.gesture(450);
    vi.advanceTimersByTime(1200);
    expect(window.scrollY).toBe(850);
  });

  it('ignores typing and nested wheel events', () => {
    const field = document.createElement('textarea');
    document.body.append(field);
    field.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    f.move(400); f.end();
    vi.advanceTimersByTime(1500);
    expect(f.scroll).not.toHaveBeenCalled();
  });

  it('waits for held scrolling keys to be released', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown' }));
    f.move(400); f.end();
    vi.advanceTimersByTime(1200);
    expect(f.scroll).not.toHaveBeenCalled();
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'PageDown' }));
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(850);
  });

  it('unmount cancels a pending or active settle and removes listeners', () => {
    f.gesture(400);
    vi.advanceTimersByTime(500);
    stop();
    const y = window.scrollY;
    vi.advanceTimersByTime(2000);
    expect(window.scrollY).toBe(y);
    f.gesture(450);
    vi.advanceTimersByTime(2000);
    expect(window.scrollY).toBe(450);
  });

  it.each(['(prefers-reduced-motion: reduce)', '(min-width: 1024px)'])('stops pending settling on %s changes', (query) => {
    f.gesture(400);
    f.media(query, query.includes('reduced'));
    vi.advanceTimersByTime(2000);
    expect(f.scroll).not.toHaveBeenCalled();
  });

  it('has a timer fallback on browsers without scrollend', () => {
    stop();
    const owners: [object, PropertyDescriptor][] = [];
    for (let node: object | null = document; node; node = Object.getPrototypeOf(node)) {
      const descriptor = Object.getOwnPropertyDescriptor(node, 'onscrollend');
      if (descriptor) { owners.push([node, descriptor]); delete node['onscrollend']; }
    }
    try {
      stop = watchForStalls();
      f.wheel(); f.move(400);
      vi.advanceTimersByTime(1000);
      expect(window.scrollY).toBe(850);
    } finally {
      owners.forEach(([node, descriptor]) => Object.defineProperty(node, 'onscrollend', descriptor));
    }
  });
});
