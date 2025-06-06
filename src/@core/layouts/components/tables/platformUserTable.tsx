import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import { PlatformUserColumns } from './columns/platofrmTableColumns'

function PlatformUserTable() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL // Read from env

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsLoading(true)

      const token = localStorage.getItem('accessToken')
      const response = await axios.delete(`${API_BASE_URL}/user/delete-platform-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setData(data.filter(user => user._id !== userId)) // Remove user from UI
      toast.success(response.data.message || 'User deleted successfully')
    } catch (error: any) {
      console.error('Error deleting user:', error)
      toast.error(error.response?.data?.message || 'Failed to delete user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const columns = useMemo(() => PlatformUserColumns(handleDeleteUser), [data])

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)

        const token = localStorage.getItem('accessToken')

        const response = await axios.get(`${API_BASE_URL}/user/get-platform-users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data)
        setData(response.data || [])
      } catch (error) {
        console.error('Error fetching users:', error)
        toast.error('Failed to fetch users. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  return (
    <MuiTable
      data={data}
      columns={columns}
      options={{
        state: { isLoading }
      }}
    />
  )
}

export default PlatformUserTable
