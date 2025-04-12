// import axios from 'axios'
import React, { useMemo, useState, useEffect } from 'react'
import MuiTable from './MuiTable'
import { TemplateColumns } from './columns/templatesTableColumns'
import axios from 'axios'
import toast from 'react-hot-toast'

function TemplateTable() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL // Read from env

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem('accessToken')

        const response = await axios.get(`${API_BASE_URL}/template/all-sorted`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const rawTemplates = response.data

        // Log raw response for confirmation

        console.log('Raw templates:', rawTemplates)

        // Filter out resume templates

        const templates = Array.isArray(rawTemplates)
          ? rawTemplates.filter((t: any) => {
              const isResume = !!t.details?.resume
              console.log(`Template ${t._id} isResume:`, isResume)

              return !isResume // ✅ Keep only non-resume templates
            })
          : []

        console.log('Filtered templates (non-resume):', templates)
        setData(templates)
      } catch (error) {
        console.error('Error fetching templates:', error)
        toast.error('Failed to fetch templates. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  // const handleUpdateUser = (updatedUser: any) => {
  //   const newData = data.map(user => (user._id === updatedUser._id ? updatedUser : user))
  //   setData(newData)
  // }

  // const handleDeleteUser = async (userId: string) => {
  //   try {
  //     setIsLoading(true)
  //     await axios.delete('/api/user/delete', {
  //       data: { user_id: userId },
  //       headers: { authorization: localStorage.getItem('token') || '' }
  //     })
  //     setData(data.filter(user => user._id !== userId))
  //     toast.success('User deleted successfully')
  //   } catch (error) {
  //     console.error('Error deleting user:', error)
  //     toast.error('Failed to delete user. Please try again.')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const columns = useMemo(() => UserColumns(handleUpdateUser, handleDeleteUser), [data])

  const columns = useMemo(() => TemplateColumns(), [])

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setIsLoading(true)
  //       const res = await axios.get('/api/user/get-all', {
  //         headers: { authorization: localStorage.getItem('token') || '' }
  //       })
  //       setData(res.data.payload.users)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //       toast.error('Network error. Please refresh the page.')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   getData()
  // }, [])

  return (
    <MuiTable
      data={data || []} // Ensuring it's an array
      columns={columns || []} // Ensuring it's an array
      options={{
        state: { isLoading }
      }}
    />
  )
}

export default TemplateTable
