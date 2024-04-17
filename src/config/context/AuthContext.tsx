import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Props from '../../common/types/Props'

type IAuthContext = {
  authenticated: boolean
  setAuthenticated: (newState: boolean) => void
}

const initialValue = {
  authenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(initialValue.authenticated)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
