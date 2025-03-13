import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import MuiTable from './MuiTable'
import { UserColumns } from './columns/userTableColumns'

function UserTable() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateUser = (updatedUser: any) => {
    const newData = data.map(user => (user._id === updatedUser._id ? updatedUser : user))
    setData(newData)
  }
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL // Read from env

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('accessToken') // Get token from local storage

      await axios.delete(`${API_BASE_URL}/user/delete-dashboard-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` } // Pass token in headers
      })

      setData(data.filter(user => user._id !== userId)) // Remove user from UI
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const columns = useMemo(() => UserColumns(handleUpdateUser, handleDeleteUser), [data])
  useEffect(() => {
    const getAdminUsers = async () => {
      try {
        setIsLoading(true)

        const token = localStorage.getItem('accessToken') // Ensure token is used properly
        const res = await axios.get(`${API_BASE_URL}/user/get-admin-dashboard-users`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        // Sort so that SUPER_ADMIN appears first
        const sortedData = res.data.sort((a: any, b: any) =>
          a.role === 'SUPER_ADMIN' ? -1 : b.role === 'SUPER_ADMIN' ? 1 : 0
        )

        setData(sortedData)
        toast.success('Admin dashboard users loaded successfully')
      } catch (error) {
        console.error('Error fetching admin users:', error)
        toast.error('Failed to fetch admin users. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    getAdminUsers()
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

export default UserTable
