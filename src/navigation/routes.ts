export const HomeRouteObj = {
  title: 'Home',
  path: '/',
  action: 'read',
  subject: 'home',
  icon: 'mdi:home-outline'
}
export const PlatformRouteObj = {
  title: 'Platform Users',
  path: '/',
  action: 'read',
  subject: 'home',
  icon: 'mdi:account-group-outline'
}

export const UsersRouteObj = {
  title: 'Users',
  icon: 'mdi:account-multiple-outline',
  children: [
    {
      title: 'Create New User',
      path: '/users/create-user'
    },
    {
      title: 'View Users',
      path: '/users/view-users'
    },
    {
      title: 'View Users',
      path: '/users/view-users'
    }
  ]
}
