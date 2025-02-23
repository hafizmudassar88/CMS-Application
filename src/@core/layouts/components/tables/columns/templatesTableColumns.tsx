import { Select, MenuItem } from '@mui/material'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'

export const TemplateColumns: any = () => [
  {
    header: 'Created By',
    accessorKey: 'createdByDetails.username', // Use the populated data
    Cell: ({ row }: any) => {
      return row.original.createdByDetails?.username || 'Unknown'
    }
  },
  {
    header: 'Status',
    accessorKey: 'status',
    Cell: ({ cell, row }: any) => {
      const [status, setStatus] = useState(cell.getValue() || 'PENDING')
      const templateId = row.original._id // Assuming _id is the template ID
      // console.log('templateId', templateId)
      const handleStatusChange = async (event: any) => {
        const newStatus = event.target.value
        setStatus(newStatus)

        try {
          const token = localStorage.getItem('accessToken')
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL // Read from env

          await axios.put(
            `${API_BASE_URL}/template/update/status`,
            {
              status: newStatus,
              templateId
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          // Show toast notification on success
          toast.success(`Status updated to ${newStatus}`)
        } catch (error) {
          console.error('Error updating status:', error)
          toast.error('Failed to update status. Please try again.')
        }
      }

      return (
        <Select value={status} onChange={handleStatusChange} size='small' variant='outlined' fullWidth>
          <MenuItem value='PENDING'>Pending</MenuItem>
          <MenuItem value='APPROVED'>Approved</MenuItem>
          <MenuItem value='CANCELLED'>Cancelled</MenuItem>
        </Select>
      )
    }
  },
  {
    header: 'Template Link',
    accessorKey: 'details.home.name',
    Cell: ({ cell }: any) => cell.getValue() || 'N/A'
  }
]
