import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cancelScroll, isProgrammaticScroll, isScrollAnimating, scrollToY } from '../src/lib/scroll';
import { cleanFixture, scrollFixture } from './scroll-fixture';

let f: ReturnType<typeof scrollFixture>;
beforeEach(() => { f = scrollFixture(); });
afterEach(() => { cancelScroll(); cleanFixture(); });

describe('document scroll ownership', () => {
  it('replaces navigation with a settle, and calls each completion once', () => {
    const first = vi.fn(), second = vi.fn();
    const cancelFirst = scrollToY(1200, { onDone: first });
    vi.advanceTimersByTime(100);
    scrollToY(800, { silent: true, duration: 450, onDone: second });
    expect(first).toHaveBeenCalledExactlyOnceWith(true);
    cancelFirst();
    expect(isProgrammaticScroll()).toBe(false);
    expect(isScrollAnimating()).toBe(true);
    vi.advanceTimersByTime(500);
    expect(window.scrollY).toBeCloseTo(800);
    expect(second).toHaveBeenCalledExactlyOnceWith(false);
    expect(first).toHaveBeenCalledTimes(1);
    expect(isScrollAnimating()).toBe(false);
  });

  it('gives newer navigation priority over a settle', () => {
    const done = vi.fn();
    scrollToY(800, { silent: true, onDone: done });
    scrollToY(1600);
    expect(done).toHaveBeenCalledExactlyOnceWith(true);
    expect(isProgrammaticScroll()).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(1600);
  });

  it('an old cancel handle cannot stop the current animation', () => {
    const cancel = scrollToY(800);
    scrollToY(1600);
    cancel();
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(1600);
  });

  it('wheel interruption stops all later writes and releases ownership', () => {
    const done = vi.fn();
    const cancel = scrollToY(800, { onDone: done });
    vi.advanceTimersByTime(200);
    f.wheel();
    const y = window.scrollY;
    vi.advanceTimersByTime(2000);
    cancel();
    expect(window.scrollY).toBe(y);
    expect(done).toHaveBeenCalledExactlyOnceWith(true);
    expect(isScrollAnimating()).toBe(false);
  });

  it('ignores typing, horizontal gestures, and nested scrolling', () => {
    const input = document.createElement('input');
    document.body.append(input);
    scrollToY(900);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    window.dispatchEvent(new WheelEvent('wheel', { deltaX: 100, deltaY: 10 }));
    const nested = document.createElement('div');
    nested.style.overflowY = 'auto';
    Object.defineProperties(nested, { scrollHeight: { value: 1000 }, clientHeight: { value: 200 } });
    document.body.append(nested);
    f.wheel(nested);
    expect(isScrollAnimating()).toBe(true);
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(900);
  });

  it.each(['(prefers-reduced-motion: reduce)', '(min-width: 1024px)'])('cancels on a live change to %s', (query) => {
    const done = vi.fn();
    scrollToY(1000, { onDone: done });
    vi.advanceTimersByTime(100);
    f.media(query, query.includes('reduced'));
    const y = window.scrollY;
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(y);
    expect(done).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('reduced motion jumps immediately and still has a cancellable completion', () => {
    f.media('(prefers-reduced-motion: reduce)', true);
    const first = vi.fn(), second = vi.fn();
    scrollToY(500, { onDone: first });
    expect(window.scrollY).toBe(500);
    const cancel = scrollToY(900, { onDone: second });
    expect(first).toHaveBeenCalledExactlyOnceWith(true);
    cancel();
    vi.advanceTimersByTime(100);
    expect(second).toHaveBeenCalledExactlyOnceWith(true);
    expect(isProgrammaticScroll()).toBe(false);
  });

  it('tracks layout changes and clamps the destination to document bounds', () => {
    let destination = 800;
    scrollToY(destination, { settle: () => destination - window.scrollY });
    vi.advanceTimersByTime(300);
    destination = 1200;
    vi.advanceTimersByTime(700);
    expect(window.scrollY).toBe(1200);
    scrollToY(100000);
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(9000);
  });

  it('respects a newer request made inside a cancellation callback', () => {
    scrollToY(500, { onDone: () => scrollToY(1200) });
    const superseded = vi.fn();
    scrollToY(800, { onDone: superseded });
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(1200);
    expect(superseded).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('pagehide cleans up the active animation', () => {
    const done = vi.fn();
    scrollToY(800, { onDone: done });
    window.dispatchEvent(new Event('pagehide'));
    vi.advanceTimersByTime(1000);
    expect(window.scrollY).toBe(0);
    expect(done).toHaveBeenCalledExactlyOnceWith(true);
  });
});
