import type { User } from '@/payload-types'

type isAuthenticated = (args: { req: { user: User | null } }) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}
