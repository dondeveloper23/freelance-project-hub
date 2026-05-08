import { create} from "zustand";

interface UIStore {
  isProjectFormUIOpen: boolean;
  toggleProjectFormUI: () => void;
  isClientFormUIOpen: boolean;
  toggleClientFormUI: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isProjectFormUIOpen: false,
  toggleProjectFormUI: () => set((state) => ({ isProjectFormUIOpen: !state.isProjectFormUIOpen })),
  isClientFormUIOpen: false,
  toggleClientFormUI: () => set((state) => ({ isClientFormUIOpen: !state.isClientFormUIOpen })),
}))
