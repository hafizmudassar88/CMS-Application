// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import adminNavigation from '../adminRoutes'
import superAdminNavigation from '../superAdminRoutes'

const navigation = (): VerticalNavItemsType => {
  let userData: any = ''
  let role = ''

  if (typeof window !== 'undefined') {
    userData = localStorage.getItem('userData')

    if (userData) {
      role = JSON.parse(userData).role
    }
  }

  switch (role) {
    case 'Admin':
      return adminNavigation()
    case 'SUPER_ADMIN':
      return superAdminNavigation()

    default:
      return []
  }
}

export default navigation
