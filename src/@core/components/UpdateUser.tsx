import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  InputAdornment,
  OutlinedInput
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import Icon from 'src/@core/components/icon'
import { UserRoleValues } from '../../shared/enums/UserRole.enum'

// ** Define State Interface for Password Visibility
interface State {
  showPassword: boolean
}

// ** Define Form Input Types
interface FormInputs {
  username: string
  email: string
  password?: string
  role: string
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .matches(
      /^[a-zA-Z0-9_-]{3,20}$/,
      'Username must be 3-20 characters with no spaces, underscore or hyphen is allowed'
    ),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().notRequired(),
  role: yup.string().required('Role is required')
})

const UpdateUser = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [state, setState] = useState<State>({ showPassword: false })

  const { userDetails, handleUpdateUser, setShow } = props

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  })

  // ** Reset form values when userDetails change
  useEffect(() => {
    if (userDetails) {
      reset({
        username: userDetails.username || '',
        email: userDetails.email || '',
        password: '',
        role: userDetails.role_id || '' // Ensure role_id is correctly set
      })
    }
  }, [userDetails, reset])

  const handleClickShowPassword = () => {
    setState(prevState => ({ ...prevState, showPassword: !prevState.showPassword }))
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL // Read from env
  const onSubmit = async (data: FormInputs) => {
    if (loading) return
    try {
      setLoading(true)

      const token = localStorage.getItem('accessToken') // Ensure token is stored in local storage

      const res = await axios.put(
        `${API_BASE_URL}/user/update-dashboard-user/${userDetails._id}`,
        {
          username: data.username,
          email: data.email,
          password: data.password || undefined, // Only send password if provided
          role: data.role
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Pass token in the headers
          }
        }
      )

      toast.success('User updated successfully')
      handleUpdateUser(res.data.user) // Update local state
      setShow(false) // Close the modal
    } catch (error: any) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader title='Update User' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={5}>
            {/* Username Field */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Username'
                      {...field}
                      error={Boolean(errors.username)}
                      helperText={errors.username?.message}
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='Email'
                      {...field}
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      disabled={loading}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      type={state.showPassword ? 'text' : 'password'}
                      error={Boolean(errors.password)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <Icon icon={state.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Role Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Controller
                  name='role'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} error={Boolean(errors.role)} disabled={loading}>
                      {UserRoleValues.map(role => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button fullWidth variant='contained' size='large' type='submit' disabled={loading}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white', marginRight: 1 }} /> : 'Update User'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default UpdateUser
