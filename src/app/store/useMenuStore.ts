import { MenuType } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MenuStore {
    menu: MenuType[]
    addData: (data: MenuType) => void
    deleteData: (data: MenuType) => void
}

const useMenuStore = create(persist<MenuStore>(
    (set) => ({
        menu: [],
        addData: (data: MenuType) => set((state) => ({ menu: [data, ...state.menu] })),
        deleteData: (data: MenuType) => set((state) => ({ menu: state.menu.filter((d) => d.id != data.id) }))
    }),
    {
        name: 'menu-store',
        storage: createJSONStorage(() => localStorage)
    }
))

export default useMenuStore