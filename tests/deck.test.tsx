import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { motionValue } from 'framer-motion';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { DECK } from '../src/components/deck/sections';
import { pointerBlend } from '../src/components/deck/pointer';
import { cleanFixture, scrollFixture } from './scroll-fixture';

const mocks = vi.hoisted(() => ({ state: null as any, resize: null as (() => void) | null }));
vi.mock('../src/components/deck/DeckContext', () => ({ useDeckState: () => mocks.state }));
vi.mock('../src/components/deck/useDeckEnabled', () => ({ useDeckEnabled: () => true }));
vi.mock('../src/components/deck/commit', () => ({ watchForStalls: () => () => {} }));
vi.mock('../src/components/deck/Shorthand', () => ({ Shorthand: () => null }));
import Deck from '../src/components/deck/Deck';

let root: Root;
let f: ReturnType<typeof scrollFixture>;
let slots: HTMLElement[];
let geometryReads: ReturnType<typeof vi.fn>[];
beforeEach(() => {
  f = scrollFixture();
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: () => void) { mocks.resize = callback; }
    observe() {} disconnect() {}
  });
  mocks.state = { dealt: Object.fromEntries(DECK.map(e => [e.id, motionValue(0)])) };
  const host = document.createElement('main'); host.id = 'main-content'; document.body.append(host);
  const mount = document.createElement('div'); host.append(mount);
  const anchor = document.createElement('div'); anchor.dataset.deckAnchor = ''; host.append(anchor);
  Object.defineProperties(anchor, { offsetLeft: { value: 100 }, offsetTop: { value: 100 }, offsetWidth: { value: 320 }, offsetHeight: { value: 400 } });
  geometryReads = [];
  slots = DECK.map((entry, i) => {
    const slot = document.createElement('div'); slot.dataset.deckSlot = entry.id;
    const read = vi.fn(() => ({ left: 100, top: 1000 + 1100 * i - window.scrollY, width: 1000, height: 1000 }));
    slot.getBoundingClientRect = read as any; geometryReads.push(read); host.append(slot); return slot;
  });
  root = createRoot(mount);
  act(() => root.render(<Deck />));
});
afterEach(() => { act(() => root.unmount()); cleanFixture(); });

it('keeps all opening cards, then limits the reading deck to three surfaces', () => {
  act(() => vi.advanceTimersByTime(2200));
  const cards = [...document.querySelectorAll<HTMLElement>('[data-deck-ghost]')];
  expect(cards.filter(e => e.style.visibility === 'visible')).toHaveLength(DECK.length);
  act(() => { mocks.state.dealt.projects.set(0.7); vi.advanceTimersByTime(64); });
  expect(cards.filter(e => e.style.visibility === 'visible')).toHaveLength(3);
  expect(cards.every(e => e.style.willChange === 'auto')).toBe(true);
});

it('uses cached geometry on scroll frames and refreshes it after layout changes', () => {
  act(() => vi.advanceTimersByTime(2200));
  geometryReads.forEach(read => read.mockClear());
  act(() => {
    mocks.state.dealt.projects.set(0.7);
    f.move(300);
    vi.advanceTimersByTime(64);
    f.move(400);
    vi.advanceTimersByTime(64);
  });
  expect(geometryReads.reduce((sum, read) => sum + read.mock.calls.length, 0)).toBe(0);
  act(() => { mocks.resize?.(); vi.advanceTimersByTime(64); });
  expect(geometryReads.every(read => read.mock.calls.length > 0)).toBe(true);
  const group = document.querySelector<HTMLElement>('[data-deck-layer]')!.firstElementChild as HTMLElement;
  expect(group.style.left).toBe('0px');
  expect(group.style.top).toBe('0px');
  expect(group.style.transform).toContain('translate3d(');
});

it('sleeps after opening and releases animation frames on unmount', () => {
  act(() => vi.advanceTimersByTime(2200));
  expect(vi.getTimerCount()).toBe(0);
  act(() => { mocks.state.dealt.projects.set(0.7); root.unmount(); });
  expect(vi.getTimerCount()).toBe(0);
});

it('gives the same pointer response at 60 and 120 Hz over the same elapsed time', () => {
  const sixty = 1 - Math.pow(1 - pointerBlend(1000 / 60), 60);
  const oneTwenty = 1 - Math.pow(1 - pointerBlend(1000 / 120), 120);
  expect(sixty).toBeCloseTo(oneTwenty, 10);
  expect(pointerBlend(0)).toBe(0);
  expect(pointerBlend(100000)).toBeLessThan(1);
});
