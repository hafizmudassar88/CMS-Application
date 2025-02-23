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

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsLoading(true)
      await axios.delete('/api/user/delete', {
        data: { user_id: userId },
        headers: { authorization: localStorage.getItem('token') || '' }
      })
      setData(data.filter(user => user._id !== userId))
      toast.success('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL // Read from env

  const columns = useMemo(() => UserColumns(handleUpdateUser, handleDeleteUser), [data])
  useEffect(() => {
    const getAdminUsers = async () => {
      try {
        setIsLoading(true)

        const token = localStorage.getItem('accessToken') // Ensure token is used properly
        const res = await axios.get(`${API_BASE_URL}/user/get-admin-dashboard-users`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setData(res.data)
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
