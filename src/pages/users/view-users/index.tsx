import { Typography } from '@mui/material'
import React from 'react'
import UserTable from 'src/@core/layouts/components/tables/userTable'

function ViewAdminUsers() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Admin Dashboard Users
      </Typography>

      <UserTable />
    </>
  )
}

export default ViewAdminUsers
