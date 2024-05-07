import { AppBar, Badge, Box, Button, Container, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { CartComponent } from './Cart';
import { logout } from '../redux/slices/auth.slice';
import { useCookies } from 'react-cookie';

export const NavBar: React.FC<{}> = () => {

  const navigate = useNavigate()
  const [, , removeCookie] = useCookies()
  const { isAuth } = useAppSelector((state) => state.authReducer)
  const items = useAppSelector((state) => state.cartReducer)
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    removeCookie('accessToken')
    navigate('/login')
  }

  const handleStateViewDrawer = () => {
    setOpen((state) => !state);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Grid item>
                <Typography>Angello</Typography>
              </Grid>
              <Grid item>
                {
                  isAuth ? (
                    <Button
                      variant="contained"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <IconButton
                        color="primary"
                        onClick={() => handleStateViewDrawer()}
                      >
                        <Badge color="error" badgeContent={items.length}>
                          <ShoppingCartOutlinedIcon />
                        </Badge>
                      </IconButton>
                      <Button variant="contained" onClick={() => navigate('login')}>
                        Login
                      </Button>
                      <Button variant="outlined">Register</Button>
                    </Stack>
                  )
                }
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <CartComponent
        open={open}
        handleStateViewDrawer={handleStateViewDrawer}
      />
    </Box>
  )
}
