// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { HomeRouteObj, PlatformRouteObj, TemplateObj, UsersRouteObj } from './routes'

const superAdminNavigation = (): VerticalNavItemsType => {
  return [HomeRouteObj, PlatformRouteObj, UsersRouteObj, TemplateObj]
}

export default superAdminNavigation
