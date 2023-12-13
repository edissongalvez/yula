import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { User } from '../controllers/user'

interface UserContextProps {
    user: User | null
    setUser: (user: User | null) => void
}

interface UserProviderProps {
    children: ReactNode
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('Yula perdió UserProvider')
    }
    return context
}