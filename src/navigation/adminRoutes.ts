// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { HomeRouteObj, PlatformRouteObj, UsersRouteObj } from './routes'

const adminNavigation = (): VerticalNavItemsType => {
  return [HomeRouteObj, PlatformRouteObj, UsersRouteObj]
}

export default adminNavigation
