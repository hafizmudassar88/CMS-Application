import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import Avatar from 'src/@core/components/mui/avatar'
import { useAuth } from 'src/hooks/useAuth'

import ViewAdminUsers from '../users/view-users'
import ViewTemplates from '../view-templates'

const Home = () => {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    // Get current time
    const currentTime = new Date()

    // Set Colorado time zone
    const coloradoTime = currentTime.toLocaleString('en-US', {
      timeZone: 'America/Denver',
      hour12: true,
      hour: 'numeric'
    })

    // Extract hour from Colorado time
    const hour = parseInt(coloradoTime)

    // Determine the greeting based on the hour
    let newGreeting = ''
    if (hour >= 0 && hour < 12) {
      newGreeting = 'Hi Good Morning'
    } else if (hour >= 12 && hour < 18) {
      newGreeting = 'Good Afternoon'
    } else {
      newGreeting = 'Good Evening'
    }

    // Add an excited message to the greeting
    const excitedMessage = 'Welcome back to your dashboard!'

    // Combine the greeting with the excited message
    const greetingMessage = `${newGreeting}, ${user?.username}! ${excitedMessage}`

    // Update state with the greeting
    setGreeting(greetingMessage)
  }, []) // Run only once when component mounts

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Card sx={{ pt: '20px', pb: '20px', border: 0, color: 'common.white', backgroundColor: '#666CFF' }}>
            <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
              <Typography
                variant='h4'
                sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
              >
                <Avatar alt='Eugene Clarke' src='/images/avatars/1.png' sx={{ width: 34, height: 34, mr: 2.75 }} />
                {`${user?.username}`}
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '16px', mb: 3, color: 'common.white' }}>
                {`${greeting}`}
              </Typography>
              <Box
                sx={{
                  borderTop: '1px solid rgba(76, 78, 100, 0.8)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' sx={{ mt: '5px', color: 'common.white', fontSize: '17px' }}>
                    {/* {`Role: ${user?.}`} */}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ViewAdminUsers />
      <ViewTemplates />
      {/* <ViewPlatformUsers /> */}
    </>
  )
}

export default Home
