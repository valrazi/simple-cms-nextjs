import { MenuGroupType } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface MenuGroupStore {
    menuGroup: MenuGroupType[]
    addData: (data: MenuGroupType) => void
    deleteData: (data: MenuGroupType) => void
}

const useMenuGroupStore = create(persist<MenuGroupStore>(
    (set) => ({
        menuGroup: [],
        addData: (data: MenuGroupType) => set((state) => ({menuGroup: [data, ...state.menuGroup]})),
        deleteData: (data: MenuGroupType) => set((state) => ({menuGroup: state.menuGroup.filter((item) => item.id != data.id) }))
    }),
    {
        name: 'menu-group-store',
        storage: createJSONStorage(() => localStorage)
    }
))

export default useMenuGroupStore