import { useSyncExternalStore } from "react";

import { catalog } from "@/content/catalog";
import { createLocalStorageRepository, createMemoryRepository } from "@/lib/progress/storage";
import { type ProgressStore, createProgressStore } from "@/lib/progress/store";
import { INITIAL_PROGRESS, type ProgressState } from "@/lib/progress/types";

let store: ProgressStore | null = null;

/** Browser-only singleton; the server always renders the empty initial state. */
export function getProgressStore(): ProgressStore {
  if (!store) {
    const repo =
      typeof window !== "undefined" && window.localStorage
        ? createLocalStorageRepository(window.localStorage)
        : createMemoryRepository();
    store = createProgressStore(repo, catalog);
  }
  return store;
}

const subscribe = (l: () => void) => getProgressStore().subscribe(l);
const getSnapshot = () => getProgressStore().getState();
const getServerSnapshot = () => INITIAL_PROGRESS;

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const noop = () => () => {};
/** False during SSR and hydration, true afterwards — use it before trusting saved progress. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
