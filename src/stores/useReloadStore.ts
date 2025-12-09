import { create } from "zustand";

interface ReloadState {
  reloadKey: number;
  reload: () => void;
}

export const useReloadStore = create<ReloadState>((set) => ({
  reloadKey: Date.now(),

  reload: () => set({ reloadKey: Date.now() })
}));
