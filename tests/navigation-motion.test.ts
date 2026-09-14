import { afterEach, beforeEach, expect, it, vi } from 'vitest';
vi.mock('framer-motion', async (original) => ({ ...(await original<any>()), animate: vi.fn() }));
import { animate } from 'framer-motion';
import { retainProgrammaticScrollValue } from '../src/components/deck/useProgrammaticScroll';
import { cancelScroll, scrollToY } from '../src/lib/scroll';
import { cleanFixture, scrollFixture } from './scroll-fixture';

let releases: (() => void)[];
beforeEach(() => { scrollFixture(); releases = []; vi.mocked(animate).mockClear(); });
afterEach(() => { releases.forEach(stop => stop()); cancelScroll(); cleanFixture(); });

it('six mounted slides animate the shared flag only once per navigation change', () => {
  releases = Array.from({ length: 6 }, retainProgrammaticScrollValue);
  scrollToY(800);
  expect(animate).toHaveBeenCalledTimes(1);
  expect(vi.mocked(animate).mock.calls[0][1]).toBe(1);
  vi.advanceTimersByTime(1000);
  expect(animate).toHaveBeenCalledTimes(2);
  expect(vi.mocked(animate).mock.calls[1][1]).toBe(0);
});

it('the last unmount removes the subscription; double cleanup and remount are safe', () => {
  const stop = retainProgrammaticScrollValue();
  stop(); stop();
  scrollToY(800);
  expect(animate).not.toHaveBeenCalled();
  releases.push(retainProgrammaticScrollValue());
  cancelScroll();
  expect(animate).toHaveBeenCalledTimes(1);
});
