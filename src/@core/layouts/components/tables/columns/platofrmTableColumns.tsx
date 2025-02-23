import DeleteUserDialog from '../../dialogs/DeleteUserDialog'

export const PlatformUserColumns = (handleDeleteUser: any) => {
  let userRole = ''
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData')
    if (userData) {
      userRole = JSON.parse(userData).role
    }
  }

  const columns: Array<{ header: string; accessorKey: string; Cell?: (props: any) => JSX.Element | string }> = [
    {
      header: 'Username',
      accessorKey: 'username'
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Role',
      accessorKey: 'role'
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      Cell: ({ cell }: any) => new Date(cell.getValue()).toLocaleString()
    }
  ]

  // Conditionally add the "Action" column if the user is SUPER__ADMIN
  if (userRole === 'SUPER_ADMIN') {
    columns.push({
      header: 'Action',
      accessorKey: 'actions',
      Cell: ({ cell }: any) => {
        const userDetails = cell.row.original

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Delete user dialog */}
            <DeleteUserDialog userDetails={userDetails} handleDeleteUser={handleDeleteUser} />
          </div>
        )
      }
    })
  }

  return columns
}
