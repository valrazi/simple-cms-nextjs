import { UserType } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserStore {
    user: UserType | null
    signIn: (authUser: UserType) => void,
    signOut: () => void
}

const useUserStore = create(persist<UserStore>(
    (set) => ({
        user: null,
        signIn: (authUser: UserType) => set({ user: authUser }),
        signOut: () => set({ user: null })
    }),
    {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage)
    }
))

export default useUserStore