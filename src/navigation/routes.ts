export const HomeRouteObj = {
  title: 'Home',
  path: '/',
  action: 'read',
  subject: 'home',
  icon: 'mdi:home-outline'
}
export const PlatformRouteObj = {
  title: 'Platform Users',
  path: '/platform-users/view-platform-users',
  action: 'read',
  subject: 'home',
  icon: 'mdi:account-group-outline'
}

export const UsersRouteObj = {
  title: 'Dashboard Users',
  icon: 'mdi:account-multiple-outline',
  children: [
    {
      title: 'Create New User',
      path: '/users/create-user'
    },
    {
      title: 'View Users',
      path: '/users/view-users'
    }
  ]
}

export const TemplateObj = {
  title: 'View Templates',
  icon: 'mdi:book-outline',
  path: '/view-templates'
}
