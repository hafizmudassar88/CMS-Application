// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { HomeRouteObj, TemplateObj } from './routes'

const adminNavigation = (): VerticalNavItemsType => {
  return [HomeRouteObj, TemplateObj]
}

export default adminNavigation
