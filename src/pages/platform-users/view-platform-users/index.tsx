import { Typography } from '@mui/material'
import React from 'react'
import PlatformUserTable from 'src/@core/layouts/components/tables/platformUserTable'

function ViewPlatformUsers() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Platform Users
      </Typography>

      <PlatformUserTable />
    </>
  )
}

export default ViewPlatformUsers
