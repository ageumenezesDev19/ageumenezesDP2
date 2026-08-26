import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { useTheme } from "@/providers/theme-provider";
import { heroPhotos, heroText } from "../hero-content";
import Navigation from "../Navigation";

/** How far a card is pushed back, turned and shrunk per card-width of distance. */
const DEPTH = { z: 70, turn: 16, scale: 0.1, fade: 0.3 };

/** Cards further than this contribute nothing but cost a composited layer. */
const DRAW_WITHIN = 2.2;

/** The hero has to be this far gone before the header takes over its avatar. */
const BADGE_FROM = 0.15;

/**
 * The peek that teaches the swipe. `at` starts after the hero's own arrival has
 * finished, so the two never talk over each other, and the gaps widen because a
 * reminder that keeps its rhythm reads as a tic. Three, then silence for good.
 */
const PEEK = { px: 26, ms: 460, at: [2000, 5000, 9000] };

type Card = { id: string; label: string; node: React.ReactNode };

/**
 * The deck as something you handle. The sections sit side by side and the thumb
 * walks them — the gesture the phone already teaches, and the one that leaves the
 * vertical axis entirely to the reader inside each card.
 *
 * Snapping and momentum are the browser's: `scroll-snap` on a real overflow
 * container is the one scroll engine that keeps working on iOS when the
 * document's own `scrollY` stops reporting mid-flick. The 3-D is written straight
 * to style from `scrollLeft`, which is an element's property and not the
 * document's.
 */
const MobileDeck = ({ cards }: { cards: Card[] }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = heroText[language];

  const rail = useRef<HTMLDivElement>(null);
  /** The snap items — geometry is read off these, and they never move. */
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  /** Their inner wrappers, which carry the 3-D and therefore cannot be measured. */
  const tilts = useRef<(HTMLDivElement | null)[]>([]);
  const boxes = useRef<(HTMLDivElement | null)[]>([]);
  const fades = useRef<(HTMLDivElement | null)[]>([]);
  const badge = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);
  /** Sideways offset of the peek, in px. Lives outside React: it changes every
   *  frame and no one needs to re-render because of it. */
  const nudge = useRef(0);
  /** True once the reader has moved the rail themselves; ends the peek series. */
  const retired = useRef(false);
  const [active, setActive] = useState(0);
  const [hinted, setHinted] = useState(false);

  /** Shows the fade only while that card still has something below the fold. */
  const onCardScroll = (i: number) => {
    const box = boxes.current[i];
    const fade = fades.current[i];
    if (!box || !fade) return;
    const left = box.scrollHeight - box.clientHeight - box.scrollTop;
    fade.style.opacity = left > 8 ? "1" : "0";
  };

  const releasing = useRef(0);

  /**
   * Snap is switched off for the duration of a programmatic move. WebKit resolves
   * snap points *during* a smooth scroll and catches the animation at whichever
   * one it passes, which is why tapping the logo left the deck parked between two
   * cards. While we are driving, the other mechanism keeps quiet — the same deal
   * `isProgrammaticScroll` strikes on the desktop.
   */
  const go = (i: number, smooth = true) => {
    const el = slides.current[i];
    const host = rail.current;
    if (!el || !host) return;
    const left = el.offsetLeft - (host.clientWidth - el.offsetWidth) / 2;

    if (!smooth) {
      host.scrollTo({ left, behavior: "auto" });
      return;
    }

    host.style.scrollSnapType = "none";
    window.clearTimeout(releasing.current);
    const release = () => {
      host.style.removeProperty("scroll-snap-type");
      host.removeEventListener("scrollend", release);
    };
    host.addEventListener("scrollend", release);
    // `scrollend` is not everywhere yet, and a scroll that lands on the spot it
    // started never fires one at all.
    releasing.current = window.setTimeout(release, 900);
    host.scrollTo({ left, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const host = rail.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const draw = () => {
      frame = 0;
      const mid = host.scrollLeft + host.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;

      slides.current.forEach((el, i) => {
        const tilt = tilts.current[i];
        if (!el || !tilt) return;
        // Measured on the snap item, written to the wrapper inside it.
        const d = (el.offsetLeft + el.offsetWidth / 2 - mid) / el.offsetWidth;
        const far = Math.abs(d);
        if (far < best) {
          best = far;
          nearest = i;
        }
        // Beyond the draw radius the card is off-screen anyway; leaving it
        // untransformed keeps it out of the compositor.
        if (far > DRAW_WITHIN) {
          tilt.style.opacity = "0";
          tilt.style.visibility = "hidden";
          return;
        }
        tilt.style.visibility = "visible";
        tilt.style.opacity = String(Math.max(1 - far * DEPTH.fade, 0.2));
        tilt.style.transform = reduce
          ? ""
          : `translateX(${nudge.current}px) translateZ(${-far * DEPTH.z}px) ` +
            `rotateY(${-d * DEPTH.turn}deg) scale(${1 - far * DEPTH.scale})`;
      });

      // The peek rides the transform, never `scrollLeft`. Moving the scroll would
      // put this in the ring with snap and momentum, and that fight is what caused
      // the judder and the logo stopping between cards. Here the scroll never
      // moves, so a finger arriving mid-peek simply takes over.
      if (arrow.current) {
        arrow.current.style.transform = `translateX(${nudge.current * -0.5}px)`;
      }

      // The hero's own distance is what hands the avatar to the header: what card
      // zero gives up on the way out, the bar picks up.
      const hero = slides.current[0];
      if (hero && badge.current) {
        const d = Math.abs(
          (hero.offsetLeft + hero.offsetWidth / 2 - mid) / hero.offsetWidth,
        );
        badge.current.style.opacity = String(
          Math.min(Math.max((d - BADGE_FROM) / (1 - BADGE_FROM), 0), 1),
        );
      }
      setActive(nearest);
      // Any real movement of the rail retires the hint — touch, trackpad, the
      // dots or the arrow keys. Hanging it off `touchstart` alone left it up
      // forever for anyone not using a finger.
      if (host.scrollLeft > 8) {
        retired.current = true;
        setHinted(true);
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    draw();
    host.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);

    // The fade has no scroll event to hang its first state on, and the sections
    // arrive lazily — a card that was short when it mounted is tall once its
    // chunk lands. The observer catches both.
    const sizes = new ResizeObserver(() =>
      boxes.current.forEach((_, i) => onCardScroll(i)),
    );
    boxes.current.forEach((box) => {
      if (!box) return;
      sizes.observe(box);
      if (box.firstElementChild) sizes.observe(box.firstElementChild);
    });

    // The peek: the deck leans aside far enough to uncover the next card, then
    // comes back. Three of them on a widening gap and then silence for good —
    // repeating forever turns an invitation into a twitch, and the person who
    // already knows the gesture is the one it would bother most.
    let peekFrame = 0;
    const peek = () => {
      // Retired the moment the reader does anything themselves. `hinted` is state
      // and this closure was built once, so the ref is what carries the news in.
      if (retired.current) return;
      const born = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - born) / PEEK.ms, 1);
        // Out and back on one curve, so it never lands with a corner.
        nudge.current = -PEEK.px * Math.sin(t * Math.PI);
        wake();
        if (t < 1) peekFrame = requestAnimationFrame(step);
        else {
          nudge.current = 0;
          wake();
        }
      };
      peekFrame = requestAnimationFrame(step);
    };

    const timers = reduce ? [] : PEEK.at.map((ms) => window.setTimeout(peek, ms));

    return () => {
      host.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      sizes.disconnect();
      timers.forEach(window.clearTimeout);
      if (peekFrame) cancelAnimationFrame(peekFrame);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  /**
   * Where the deck opens, decided here rather than inherited. Safari restores a
   * container's `scrollLeft` across a reload, so without this a refresh dropped
   * the reader back on whatever card they left. A hash typed by hand still wins;
   * nothing else does, and no animation either — a smooth scroll from a cold
   * start reads as the page drifting on its own.
   */
  useEffect(() => {
    const wanted = cards.findIndex((c) => `#${c.id}` === window.location.hash);
    requestAnimationFrame(() => go(Math.max(wanted, 0), false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The menu and the in-card buttons still navigate by anchor; here that means
  // moving the rail, not the page.
  useEffect(() => {
    const onHash = (event: Event) => {
      const link = (event.target as HTMLElement)?.closest?.("a[href^='#']");
      const href = link?.getAttribute("href");
      const i = cards.findIndex((c) => `#${c.id}` === href);
      if (i < 0) return;
      event.preventDefault();
      go(i);
      // The URL keeps no record of where you are. It used to, and a reload then
      // reopened the deck on that card instead of the hero. The trade, agreed:
      // no copy-a-link-to-this-section on the phone.
    };
    document.addEventListener("click", onHash);
    return () => document.removeEventListener("click", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") go(Math.min(active + 1, cards.length - 1));
    if (event.key === "ArrowLeft") go(Math.max(active - 1, 0));
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-background">
      {/* The nav lives in here rather than beside it: its items are buttons, not
          anchors, so the only way they can reach the rail is a direct call. */}
      <Navigation
        onNavClick={(href) => {
          const i = cards.findIndex((c) => `#${c.id}` === href);
          if (i >= 0) go(i);
        }}
      />

      {/* The name never leaves the screen: the big portrait hands it to the bar. */}
      <div
        ref={badge}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-20 top-0 z-[60] flex h-16 items-center gap-2"
      >
        <img
          src={heroPhotos[theme]}
          alt=""
          width={800}
          height={1067}
          className="h-8 w-8 shrink-0 rounded-full border border-border object-cover object-top"
        />
        <span className="font-mono text-[0.7rem] text-muted-foreground">
          Ageu Menezes
        </span>
      </div>

      <div
        ref={rail}
        role="group"
        aria-roledescription="carousel"
        aria-label={t.swipeHint}
        tabIndex={0}
        onKeyDown={onKey}
        onTouchStart={() => {
          retired.current = true;
          setHinted(true);
        }}
        // `pan-x` settles the axis before any script runs: a thumb never swipes
        // straight down, and with `auto` on both the sideways part of the gesture
        // nudged the rail, which `mandatory` then yanked back — the judder.
        // Half a card's gap at each end lets the first and last reach the middle.
        className="flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden
          px-[4vw] pt-16 touch-pan-x [-ms-overflow-style:none] [perspective:1200px]
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          // The snap item, and deliberately not the thing that gets transformed:
          // a snap point that moves under `scale()` is a target the browser has to
          // re-resolve mid-gesture.
          <div
            key={card.id}
            ref={(node) => {
              slides.current[i] = node;
            }}
            aria-roledescription="slide"
            aria-label={card.label}
            className="w-[92vw] shrink-0 snap-center"
          >
            <div
              ref={(node) => {
                tilts.current[i] = node;
              }}
              className="relative h-full px-1.5 pb-3 pt-1
                [transform-style:preserve-3d] [transform-origin:50%_50%]"
            >
              <div
                id={card.id}
                ref={(node) => {
                  boxes.current[i] = node;
                }}
                onScroll={() => onCardScroll(i)}
                // Three things had to be true for a sideways swipe to reach the
                // rail, and two of them were mine to undo. `touch-action: pan-y`
                // forbade horizontal panning from here, and the card covers the
                // screen, so the rail never saw the gesture. `overscroll-contain`
                // on *both* axes stopped what was left from chaining outward —
                // it belongs on Y alone. `overflow-x: hidden` is stated because
                // asking for `overflow-y: auto` quietly promotes the other axis
                // from `visible` to `auto`, making this a horizontal scroller too.
                className="h-full overflow-y-auto overflow-x-hidden overscroll-y-contain
                  rounded-3xl border border-border bg-muted shadow-2xl shadow-black/40"
              >
                {card.node}
              </div>

              {/* Says "there is more below" without saying anything: he read a card
                  to the fold and took it for the whole section. Outside the
                  scrolling box — inside, it would scroll away exactly when needed. */}
              <div
                ref={(node) => {
                  fades.current[i] = node;
                }}
                style={{ opacity: 0 }}
                className="pointer-events-none absolute inset-x-1.5 bottom-3 flex h-16
                  items-end justify-center rounded-b-3xl bg-gradient-to-t from-muted
                  via-muted/80 to-transparent pb-2 transition-opacity duration-200"
              >
                <ChevronDown className="h-4 w-4 text-muted-foreground motion-safe:animate-bounce" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* One row, never two: the hint took the dots' place until the first touch
          rather than floating over the card, where it landed on the location
          line and read as part of it. */}
      <div className="flex h-9 items-center justify-center gap-2">
        {hinted ? (
          cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => go(i)}
              aria-label={card.label}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))
        ) : (
          <p className="flex items-center gap-1.5 font-mono text-[0.7rem] text-muted-foreground">
            {t.swipeHint}
            {/* Rides the same curve as the deck, so the invitation reads as one
                gesture rather than two competing ones. */}
            <span ref={arrow} className="inline-flex">
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default MobileDeck;
