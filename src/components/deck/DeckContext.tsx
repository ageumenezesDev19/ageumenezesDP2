import { createContext, useContext, useMemo } from "react";
import { motionValue, type MotionValue } from "framer-motion";
import { DECK } from "./sections";

/**
 * How far each section has come out of the deck, 0 to 1. The slides write it and
 * the fan reads it — that is how the deck knows which cards it has already dealt
 * without either side re-rendering as the page scrolls.
 */
type DeckState = {
  dealt: Record<string, MotionValue<number>>;
};

const DeckStateContext = createContext<DeckState | null>(null);

export const DeckProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(
    () => ({
      dealt: Object.fromEntries(DECK.map((entry) => [entry.id, motionValue(0)])),
    }),
    [],
  );

  return (
    <DeckStateContext.Provider value={value}>
      {children}
    </DeckStateContext.Provider>
  );
};

/** The dealt-progress value for one section, or null outside the provider. */
export function useDealt(id: string) {
  return useContext(DeckStateContext)?.dealt[id] ?? null;
}

export function useDeckState() {
  return useContext(DeckStateContext);
}
