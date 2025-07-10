import { create } from "zustand"

interface UIStore {
    drawerOpen: boolean,
    toggleDrawer: () => void,
    setDrawerOpen: (value: boolean) => void
}

const useUIStore = create<UIStore>((set) => ({
    drawerOpen: false,
    toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
    setDrawerOpen: (value) => set({ drawerOpen: value }),

}))

export default useUIStore