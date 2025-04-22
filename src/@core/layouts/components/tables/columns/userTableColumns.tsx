import UpdateUserDialog from '../../dialogs/UpdateUserDialog'
import DeleteUserDialog from '../../dialogs/DeleteUserDialog'

export const UserColumns: any = (handleUpdateUser: any, handleDeleteUser: any) => {
  let userRole = ''
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData')
    if (userData) {
      userRole = JSON.parse(userData).role
    }
  }

  const columns: any[] = [
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

  // Only add the "Action" column if the current user is SUPER_ADMIN
  if (userRole === 'SUPER_ADMIN') {
    columns.push({
      header: 'Action',
      Cell: ({ cell }: any) => {
        const userDetails = cell.row.original

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UpdateUserDialog userDetails={userDetails} handleUpdateUser={handleUpdateUser} />
            {userDetails.role !== 'SUPER_ADMIN' && (
              <DeleteUserDialog userDetails={userDetails} handleDeleteUser={handleDeleteUser} />
            )}
          </div>
        )
      }
    })
  }

  return columns
}
