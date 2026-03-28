import { useContext } from 'react'
import { AppContext } from './appContextInstance'

export const useAppContext = () => {
  return useContext(AppContext)
}
