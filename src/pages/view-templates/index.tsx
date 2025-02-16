import { Typography } from '@mui/material'
import React from 'react'
import TemplateTable from 'src/@core/layouts/components/tables/templatesTable'

function ViewTemplates() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Templates Table
      </Typography>

      <TemplateTable />
    </>
  )
}

export default ViewTemplates
